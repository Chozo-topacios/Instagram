"""Genera la narración por frases con Piper y escribe timings.json + voz.wav + subtítulos .srt."""
import json, sys, wave, io
from pathlib import Path
from piper import PiperVoice, SynthesisConfig

here = Path(__file__).parent
out = here.parent
model = sys.argv[1]
data = json.loads((here / "script.json").read_text())
voice = PiperVoice.load(model)
cfg = SynthesisConfig(length_scale=0.86, noise_scale=0.6, noise_w_scale=0.8)

GAP = {"same": 0.12, "scene": 0.35}
LEAD_IN = 0.25
rate, frames_all, t = None, bytearray(), LEAD_IN
timeline = []
prev_scene = None
for i, line in enumerate(data["lines"]):
    buf = io.BytesIO()
    with wave.open(buf, "wb") as w:
        voice.synthesize_wav(line["tts"], w, syn_config=cfg)
    buf.seek(0)
    with wave.open(buf, "rb") as r:
        rate = r.getframerate(); sw = r.getsampwidth()
        pcm = r.readframes(r.getnframes())
    if i == 0:
        frames_all += b"\x00" * int(LEAD_IN * rate) * sw
    elif line["scene"] != prev_scene:
        frames_all += b"\x00" * int(GAP["scene"] * rate) * sw; t += GAP["scene"]
    else:
        frames_all += b"\x00" * int(GAP["same"] * rate) * sw; t += GAP["same"]
    dur = len(pcm) / sw / rate
    timeline.append({**line, "start": round(t, 3), "end": round(t + dur, 3)})
    frames_all += pcm; t += dur
    prev_scene = line["scene"]
TAIL = 1.4
frames_all += b"\x00" * int(TAIL * rate) * sw
total = t + TAIL
with wave.open(str(out / "voz.wav"), "wb") as w:
    w.setnchannels(1); w.setsampwidth(sw); w.setframerate(rate); w.writeframes(bytes(frames_all))

(here / "timings.json").write_text(json.dumps({"duration": round(total, 3), "lines": timeline}, ensure_ascii=False, indent=1))

def ts(s):
    ms = int(round(s * 1000)); h, ms = divmod(ms, 3600000); m, ms = divmod(ms, 60000); s, ms = divmod(ms, 1000)
    return f"{h:02}:{m:02}:{s:02},{ms:03}"
srt = "\n".join(f"{i+1}\n{ts(l['start'])} --> {ts(l['end'])}\n{l['text']}\n" for i, l in enumerate(timeline))
(out / "subtitulos.srt").write_text(srt)
print(f"duración total: {total:.2f}s")
for l in timeline: print(f"{l['start']:6.2f}-{l['end']:6.2f} [{l['scene']}] {l['text']}")
