/* VISI · mascota de Brecha Invisible.
   visi(expresion, opciones) -> contenido SVG para un viewBox "0 0 600 700".
   expresiones: neutral | feliz | alerta | guino | sospecha | sorpresa
   Fuente única: build.py la inyecta en motor.html (__VISI__) y marca/*.html la cargan con <script src>. */
function visi(expr, o) {
  expr = expr || "neutral"; o = o || {};
  const id = "v" + Math.random().toString(36).slice(2, 7);
  const C = o.cian || "#00e5ff", V = o.violeta || "#8b6bff", M = o.magenta || "#ff2e88", R = "#ff3b5c";
  const alert = expr === "alerta" || expr === "sorpresa";
  const visorC = alert ? R : V, coreC = alert ? R : "#2ee59d";
  const blink = o.parpadeo ? `transform="translate(0 ${295 * (1 - o.parpadeo)}) scale(1 ${o.parpadeo})"` : "";
  const eye = (x, kind) => {
    if (kind === "feliz") return `<path d="M${x - 34} 312 q34 -46 68 0" fill="none" stroke="#eaffff" stroke-width="20" stroke-linecap="round"/>`;
    if (kind === "alerta") return `<circle cx="${x}" cy="296" r="40" fill="#eaffff"/><circle cx="${x}" cy="296" r="16" fill="#0a0f2a"/>`;
    if (kind === "sorpresa") return `<circle cx="${x}" cy="296" r="38" fill="none" stroke="#eaffff" stroke-width="14"/><circle cx="${x}" cy="296" r="10" fill="#eaffff"/>`;
    if (kind === "sospecha") return `<rect x="${x - 30}" y="292" width="60" height="34" rx="16" fill="#eaffff"/><path d="M${x - 40} ${x < 300 ? 280 : 292} L${x + 40} ${x < 300 ? 292 : 280}" stroke="#0a0f2a" stroke-width="16" stroke-linecap="round"/>`;
    return `<g ${blink}><rect x="${x - 28}" y="262" width="56" height="68" rx="26" fill="#eaffff"/><circle cx="${x - 10}" cy="282" r="9" fill="#fff"/></g>`;
  };
  const eyes = { neutral: ["n", "n"], feliz: ["feliz", "feliz"], alerta: ["alerta", "alerta"], guino: ["feliz", "n"], sospecha: ["sospecha", "sospecha"], sorpresa: ["sorpresa", "sorpresa"] }[expr] || ["n", "n"];
  const mouth = {
    neutral: `<path d="M272 402 q28 20 56 0" fill="none" stroke="#eaffff" stroke-width="10" stroke-linecap="round"/>`,
    feliz: `<path d="M258 394 q42 0 84 0 q-6 46 -42 46 q-36 0 -42 -46 Z" fill="#0a0f2a" stroke="#eaffff" stroke-width="8" stroke-linejoin="round"/><path d="M280 428 q20 -12 40 0" fill="${M}"/>`,
    alerta: `<ellipse cx="300" cy="414" rx="22" ry="28" fill="#0a0f2a" stroke="#eaffff" stroke-width="8"/>`,
    sorpresa: `<ellipse cx="300" cy="414" rx="18" ry="22" fill="#0a0f2a" stroke="#eaffff" stroke-width="8"/>`,
    guino: `<path d="M268 404 q36 22 66 -6" fill="none" stroke="#eaffff" stroke-width="10" stroke-linecap="round"/>`,
    sospecha: `<path d="M276 410 H326" stroke="#eaffff" stroke-width="10" stroke-linecap="round"/>`
  }[expr] || "";
  const cheeks = (expr === "feliz" || expr === "guino") ? `<circle cx="178" cy="392" r="22" fill="${M}" opacity=".45"/><circle cx="422" cy="392" r="22" fill="${M}" opacity=".45"/>` : "";
  // brazos
  const armL = `<path d="M118 440 Q70 470 66 520" fill="none" stroke="${C}" stroke-width="26" stroke-linecap="round" opacity=".9"/>`;
  let armR = `<path d="M482 440 Q530 470 534 520" fill="none" stroke="${C}" stroke-width="26" stroke-linecap="round" opacity=".9"/>`;
  if (alert) armR = `<path d="M482 420 Q540 360 548 270" fill="none" stroke="${C}" stroke-width="26" stroke-linecap="round" opacity=".9"/><circle cx="548" cy="262" r="20" fill="${C}"/>`;
  if (expr === "feliz" || expr === "guino") armR = `<path d="M482 430 Q548 420 556 350" fill="none" stroke="${C}" stroke-width="26" stroke-linecap="round" opacity=".9"/><rect x="536" y="300" width="40" height="52" rx="18" fill="${C}"/><rect x="548" y="270" width="18" height="40" rx="9" fill="${C}"/>`;
  return `
  <defs>
    <linearGradient id="${id}b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C}" stop-opacity=".42"/><stop offset=".6" stop-color="${V}" stop-opacity=".22"/><stop offset="1" stop-color="${V}" stop-opacity=".38"/></linearGradient>
    <linearGradient id="${id}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <filter id="${id}f" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <ellipse cx="300" cy="668" rx="150" ry="20" fill="#000" opacity=".35"/>
  <!-- antena con la grieta (la "brecha") -->
  <path d="M300 146 V96" stroke="${C}" stroke-width="12" stroke-linecap="round"/>
  <path d="M284 30 L312 58 L292 64 L318 98" fill="none" stroke="${M}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" filter="url(#${id}f)"/>
  ${armL}${armR}
  <!-- pies -->
  <ellipse cx="236" cy="640" rx="44" ry="22" fill="${C}" opacity=".85"/><ellipse cx="364" cy="640" rx="44" ry="22" fill="${C}" opacity=".85"/>
  <!-- cuerpo de cristal -->
  <path d="M300 140 C452 140 502 250 502 380 C502 540 422 632 300 632 C178 632 98 540 98 380 C98 250 148 140 300 140 Z" fill="url(#${id}b)" stroke="${C}" stroke-width="10" filter="url(#${id}f)"/>
  <!-- circuitos visibles a través del cuerpo -->
  <g fill="none" stroke="${C}" stroke-opacity=".45" stroke-width="5" stroke-linecap="round">
    <path d="M170 470 H220 L245 495 V560"/><path d="M430 470 H380 L355 495 V560"/><path d="M300 560 V600"/><path d="M150 420 H190"/><path d="M450 420 H410"/></g>
  <g fill="${C}" opacity=".7"><circle cx="245" cy="560" r="7"/><circle cx="355" cy="560" r="7"/><circle cx="300" cy="600" r="7"/></g>
  <!-- núcleo escudo -->
  <g transform="translate(300 512)" filter="url(#${id}f)"><path d="M0 -40 L36 -27 V2 C36 26 20 40 0 48 C-20 40 -36 26 -36 2 V-27 Z" fill="${coreC}" opacity=".95"/>
    ${alert ? `<rect x="-5" y="-26" width="10" height="34" rx="5" fill="#0a0f2a"/><circle cx="0" cy="22" r="6" fill="#0a0f2a"/>` : `<path d="M-15 4 L-4 15 L17 -9" fill="none" stroke="#0a0f2a" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>`}</g>
  <!-- brillo del cristal -->
  <path d="M190 200 C230 168 280 158 320 160 C250 180 210 220 186 280 C176 250 176 222 190 200 Z" fill="url(#${id}g)"/>
  ${cheeks}
  <!-- visor -->
  <rect x="148" y="228" width="304" height="136" rx="68" fill="#0a0f2a" stroke="${visorC}" stroke-width="8" filter="url(#${id}f)"/>
  <rect x="166" y="244" width="268" height="18" rx="9" fill="#fff" opacity=".08"/>
  <g filter="url(#${id}f)">${eye(232, eyes[0])}${eye(368, eyes[1])}</g>
  ${mouth}
  ${alert ? `<g filter="url(#${id}f)"><path d="M86 210 l-30 -26 M70 262 l-40 -6 M108 170 l-14 -36" stroke="${R}" stroke-width="10" stroke-linecap="round"/></g>` : ""}`;
}
if (typeof module !== "undefined") module.exports = { visi };
