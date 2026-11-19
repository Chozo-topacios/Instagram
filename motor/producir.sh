#!/usr/bin/env bash
# Produce un reel completo: voz -> HTML -> MP4.  Uso: bash motor/producir.sh reels/<ID>
set -e
python3 "$(dirname "$0")/tts.py" "$1"
python3 "$(dirname "$0")/build.py" "$1"
node "$(dirname "$0")/render.js" "$1"
