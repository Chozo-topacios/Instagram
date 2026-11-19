"""Inyecta reel.json + timings.json en motor.html -> reels/<ID>/reel.html y crea voz.mp3.
Uso: python3 motor/build.py reels/<ID>"""
import json, subprocess, sys
from pathlib import Path
reel = Path(sys.argv[1]).resolve(); here = Path(__file__).resolve().parent
spec = (reel / "reel.json").read_text(); tim = (reel / "timings.json").read_text()
html = (here / "motor.html").read_text().replace("__SPEC__", json.dumps(json.loads(spec), ensure_ascii=False)).replace("__TIMINGS__", tim)
(reel / "reel.html").write_text(html)
subprocess.run(["ffmpeg","-y","-loglevel","error","-i",str(reel/"voz.wav"),"-af","loudnorm=I=-16:TP=-1.5:LRA=11","-ar","44100","-b:a","160k",str(reel/"voz.mp3")],check=True)
print("reel.html y voz.mp3 listos")
