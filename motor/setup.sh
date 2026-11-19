#!/usr/bin/env bash
# Instala la voz (Piper, español de México) y dependencias. Idempotente.
set -e
cd "$(dirname "$0")"
pip install -q piper-tts
command -v ffmpeg >/dev/null || (apt-get update -qq && apt-get install -y -qq ffmpeg)
if [ ! -f voces/vits-piper-es_MX-claude-high/es_MX-claude-high.onnx ]; then
  mkdir -p voces && curl -sSL -o voces/v.tar.bz2 \
    https://github.com/k2-fsa/sherpa-onnx/releases/download/tts-models/vits-piper-es_MX-claude-high.tar.bz2
  tar -xjf voces/v.tar.bz2 -C voces && rm voces/v.tar.bz2
fi
node -e "require('playwright')" 2>/dev/null || echo "AVISO: falta Playwright (npm i playwright && npx playwright install chromium)"
echo "Motor listo."
