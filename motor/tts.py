"""Narración con Piper a partir de reels/<ID>/reel.json -> voz.wav, timings.json, subtitulos.srt.
Uso: python3 motor/tts.py reels/<ID>"""
import json, sys, wave, io, os
from pathlib import Path
from piper import PiperVoice, SynthesisConfig

reel = Path(sys.argv[1]).resolve()
spec = json.loads((reel / "reel.json").read_text())
here = Path(__file__).resolve().parent
model = os.environ.get("PIPER_MODEL") or str(here / "voces" / "vits-piper-es_MX-claude-high" / "es_MX-claude-high.onnx")
if not Path(model).exists():
    sys.exit(f"No encuentro el modelo de voz en {model}. Ejecuta: bash motor/setup.sh")
voice = PiperVoice.load(model)
cfg = SynthesisConfig(length_scale=spec.get("velocidad", 0.86), noise_scale=0.6, noise_w_scale=0.8)
GAP_SAME, GAP_SCENE, LEAD, TAIL = 0.12, 0.35, 0.25, 1.4

pcm_all, t, timeline, rate, sw = bytearray(), LEAD, [], 22050, 2
first = True
for si, sc in enumerate(spec["escenas"]):
    for li, ln in enumerate(sc["lineas"]):
        buf = io.BytesIO()
        with wave.open(buf, "wb") as w:
            voice.synthesize_wav(ln.get("voz") or ln["texto"], w, syn_config=cfg)
        buf.seek(0)
        with wave.open(buf, "rb") as r:
            rate, sw = r.getframerate(), r.getsampwidth(); pcm = r.readframes(r.getnframes())
        gap = LEAD if first else (GAP_SAME if li else GAP_SCENE)
        pcm_all += b"\x00" * int(gap * rate) * sw
        if not first: t += gap
        first = False
        d = len(pcm) / sw / rate
        timeline.append({"scene": si, "text": ln["texto"], "start": round(t, 3), "end": round(t + d, 3)})
        pcm_all += pcm; t += d
pcm_all += b"\x00" * int(TAIL * rate) * sw
total = t + TAIL
with wave.open(str(reel / "voz.wav"), "wb") as w:
    w.setnchannels(1); w.setsampwidth(sw); w.setframerate(rate); w.writeframes(bytes(pcm_all))
(reel / "timings.json").write_text(json.dumps({"duration": round(total, 3), "lines": timeline}, ensure_ascii=False, indent=1))
def ts(s):
    ms = int(round(s * 1000)); h, ms = divmod(ms, 3600000); m, ms = divmod(ms, 60000); s, ms = divmod(ms, 1000)
    return f"{h:02}:{m:02}:{s:02},{ms:03}"
(reel / "subtitulos.srt").write_text("\n".join(f"{i+1}\n{ts(l['start'])} --> {ts(l['end'])}\n{l['text']}\n" for i, l in enumerate(timeline)))
print(f"duración total: {total:.2f}s  (objetivo 30–45 s)")
for l in timeline: print(f"{l['start']:6.2f}-{l['end']:6.2f} [esc {l['scene']}] {l['text']}")
