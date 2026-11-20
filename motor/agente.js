// Agente Sombra · personaje de Brecha Invisible.
// agenteSVG(expresion, opciones) -> string <svg> (viewBox 0 0 600 600, fondo transparente)
// expresiones: "neutral" | "alerta" | "calma" | "guino" | "lupa" | "pensando"
// opciones: { brillo: 0..1 (intensidad de los lentes), id: prefijo único para defs }
(function (root) {
  const PAL = {
    neutral:  ["#00e5ff", "#8b6bff"],
    alerta:   ["#ff3b5c", "#ff7a45"],
    calma:    ["#2ee59d", "#00e5ff"],
    guino:    ["#00e5ff", "#ff2e88"],
    lupa:     ["#00e5ff", "#8b6bff"],
    pensando: ["#8b6bff", "#ff2e88"],
  };
  function agenteSVG(expr = "neutral", o = {}) {
    const id = o.id || ("ag" + Math.random().toString(36).slice(2, 7));
    const [c1, c2] = PAL[expr] || PAL.neutral;
    const br = o.brillo == null ? 1 : o.brillo;
    const coat = "#07040f", coat2 = "#140b26", band = "#ff2e88";
    // boca
    const mouth = {
      neutral:  `<path d="M268 372 Q300 388 332 372" fill="none" stroke="#3a2a55" stroke-width="7" stroke-linecap="round"/>`,
      alerta:   `<ellipse cx="300" cy="380" rx="16" ry="20" fill="#3a2a55"/>`,
      calma:    `<path d="M262 366 Q300 400 338 366" fill="none" stroke="#3a2a55" stroke-width="8" stroke-linecap="round"/>`,
      guino:    `<path d="M268 376 Q305 392 338 364" fill="none" stroke="#3a2a55" stroke-width="8" stroke-linecap="round"/>`,
      lupa:     `<path d="M272 374 Q300 386 328 374" fill="none" stroke="#3a2a55" stroke-width="7" stroke-linecap="round"/>`,
      pensando: `<path d="M276 380 Q296 372 326 380" fill="none" stroke="#3a2a55" stroke-width="7" stroke-linecap="round"/>`,
    }[expr] || "";
    // lentes
    const lensL = `<rect x="205" y="270" width="85" height="50" rx="20" fill="url(#${id}l)"/>`;
    const lensR = expr === "guino"
      ? `<path d="M318 300 Q352 280 388 300" fill="none" stroke="url(#${id}l)" stroke-width="14" stroke-linecap="round"/>`
      : `<rect x="310" y="270" width="85" height="50" rx="20" fill="url(#${id}l)"/>`;
    const bridge = `<rect x="288" y="288" width="24" height="10" fill="url(#${id}l)"/>`;
    const lensFx = expr === "alerta"
      ? `<g fill="#1a0306"><rect x="242" y="279" width="10" height="22" rx="4"/><circle cx="247" cy="308" r="5"/><rect x="347" y="279" width="10" height="22" rx="4"/><circle cx="352" cy="308" r="5"/></g>`
      : expr === "pensando"
      ? `<g fill="#fff" opacity=".9"><circle cx="270" cy="285" r="7"/><circle cx="375" cy="285" r="7"/></g>`
      : `<g fill="#fff" opacity=".85"><rect x="216" y="278" width="26" height="7" rx="3"/><rect x="321" y="278" width="26" height="7" rx="3"/></g>`;
    const extra = expr === "lupa"
      ? `<g transform="translate(430 455) rotate(-20)"><rect x="-12" y="40" width="24" height="95" rx="10" fill="#2a1a40"/><circle r="62" fill="${c1}" fill-opacity=".18" stroke="#e8e6ff" stroke-width="14"/><path d="M-30 -22 A40 40 0 0 1 10 -42" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".8"/></g>
         <ellipse cx="395" cy="560" rx="40" ry="30" fill="${coat}"/>`
      : expr === "pensando"
      ? `<path d="M240 600 C250 520 300 470 340 430 C360 412 385 420 380 445 C372 480 330 500 330 600Z" fill="${coat2}"/><circle cx="350" cy="430" r="26" fill="${coat2}"/>`
      : expr === "alerta"
      ? `<g transform="translate(470 220)"><path d="M0 -60 L52 30 H-52Z" fill="${c1}" stroke="#fff" stroke-width="6" stroke-linejoin="round"/><rect x="-6" y="-28" width="12" height="36" rx="5" fill="#fff"/><circle cx="0" cy="20" r="7" fill="#fff"/></g>`
      : "";
    return `<svg viewBox="0 0 600 600" width="600" height="600" xmlns="http://www.w3.org/2000/svg">
<defs>
 <linearGradient id="${id}l" x1="0" x2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
 <linearGradient id="${id}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${coat2}"/><stop offset="1" stop-color="${coat}"/></linearGradient>
 <filter id="${id}g" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="${10 * br + 2}" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>
<path d="M115 600 C125 470 200 420 300 420 C400 420 475 470 485 600Z" fill="url(#${id}c)"/>
<path d="M230 420 L300 525 L370 420 L345 420 L300 470 L255 420Z" fill="#241640"/>
<path d="M262 430 L300 470 L338 430 L300 600Z" fill="${coat}"/>
<path d="M300 470 L318 492 L300 560 L282 492Z" fill="${band}" opacity=".9"/>
<ellipse cx="300" cy="300" rx="110" ry="130" fill="${coat}"/>
<ellipse cx="300" cy="200" rx="195" ry="32" fill="${coat}"/>
<path d="M188 206 C192 96 408 96 412 206Z" fill="${coat}"/>
<path d="M196 160 C240 150 360 150 404 160" fill="none" stroke="#2a1a45" stroke-width="6"/>
<rect x="190" y="178" width="220" height="22" fill="${band}"/>
<g filter="url(#${id}g)" opacity="${0.35 + 0.65 * br}">${lensL}${lensR}${bridge}</g>
${lensFx}
${mouth}
${extra}
</svg>`;
  }
  root.agenteSVG = agenteSVG;
  if (typeof module !== "undefined") module.exports = { agenteSVG };
})(typeof window !== "undefined" ? window : globalThis);
