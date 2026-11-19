"""Inyecta timings.json en template.html -> ../reel.html y convierte la voz a MP3."""
import json, subprocess
from pathlib import Path
here = Path(__file__).parent; out = here.parent
t = json.loads((here / "timings.json").read_text())
html = (here / "template.html").read_text().replace("__TIMINGS__", json.dumps(t, ensure_ascii=False))
(out / "reel.html").write_text(html)
subprocess.run(["ffmpeg","-y","-loglevel","error","-i",str(out/"voz.wav"),"-af","loudnorm=I=-16:TP=-1.5:LRA=11","-ar","44100","-b:a","160k",str(out/"voz.mp3")],check=True)
print("ok")
