// Renderiza reels/<ID>/reel.html a reel.mp4 (1080x1920, 30 fps, con voz).
// Uso: node motor/render.js reels/<ID>            -> MP4
//      node motor/render.js reels/<ID> --stills 1,5,9 [carpeta]  -> capturas PNG para revisar
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path'); const fs = require('fs');
const dir = path.resolve(process.argv[2]);
const T = JSON.parse(fs.readFileSync(path.join(dir, 'timings.json')));
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  page.on('pageerror', e => console.error('ERROR EN PÁGINA:', e.message));
  await page.goto('file://' + path.join(dir, 'reel.html') + '?render=1');
  await page.evaluate(() => document.fonts.ready);
  const si = process.argv.indexOf('--stills');
  if (si > 0) {
    const out = process.argv[si + 2] || dir;
    for (const t of process.argv[si + 1].split(',').map(Number)) {
      await page.evaluate(t => window.seek(t), t);
      await page.screenshot({ path: path.join(out, `still_${t}.png`) });
    }
    await browser.close(); return;
  }
  const fps = 30, n = Math.ceil(T.duration * fps);
  const ff = spawn('ffmpeg', ['-y','-loglevel','error','-f','image2pipe','-framerate',String(fps),'-c:v','mjpeg','-i','-',
    '-i', path.join(dir,'voz.mp3'),'-c:v','libx264','-preset','medium','-crf','19','-pix_fmt','yuv420p',
    '-c:a','aac','-b:a','160k','-shortest','-movflags','+faststart', path.join(dir,'reel.mp4')], { stdio: ['pipe','inherit','inherit'] });
  for (let i = 0; i < n; i++) {
    await page.evaluate(t => window.seek(t), i / fps);
    const buf = await page.screenshot({ type: 'jpeg', quality: 92 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (i % 300 === 0) console.log(`fotograma ${i}/${n}`);
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r));
  await browser.close(); console.log('listo:', path.join(dir, 'reel.mp4'));
})();
