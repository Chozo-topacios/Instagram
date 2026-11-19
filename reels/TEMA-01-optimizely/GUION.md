# TEMA-01 · "¿Entraste a CNN, IKEA o Zoom esta semana? Revisa tu iPhone YA."

**Formato:** Reel vertical 9:16 (1080×1920) · **Duración:** 40,7 s · **Voz:** narración IA en español (es-MX)

## Archivos

| Archivo | Para qué |
|---|---|
| `reel.mp4` | Video final con voz y subtítulos integrados, listo para subir a Instagram |
| `voz.mp3` / `voz.wav` | Narración suelta (por si la montas en CapCut u otro editor) |
| `subtitulos.srt` | Subtítulos con tiempos exactos |
| `reel.html` | Animación original: ábrela en el navegador y pulsa ▶ para verla con voz |
| `build/` | Fuentes para regenerar (guion, plantilla, scripts) |

---

## 1. Guion (narración)

| Tiempo | Bloque | Voz en off |
|---|---|---|
| 0:00–0:06 | **GANCHO** | ¿Entraste a CNN, IKEA o Zoom esta semana? Revisa tu iPhone. Ya. |
| 0:06–0:11 | Desarrollo | Unos hackers infectaron una herramienta que usan 178 sitios web gigantes. |
| 0:11–0:16 | Desarrollo | Si pagaste ahí, podían robar tu tarjeta y desviar tus pagos en cripto. |
| 0:16–0:21 | Desarrollo | Y en iPhones con versiones viejas, intentaban hackearlo, sin que tocaras nada. |
| 0:21–0:27 | Calma | Tranquilo: no hay iPhones confirmados como infectados. Si actualizaste, estás protegido. |
| 0:27–0:35 | Acción | Uno: actualiza tu iPhone. Dos: revisa los movimientos de tu tarjeta. Tres: activa alertas en tu banco. |
| 0:35–0:41 | **CTA** | Guarda este video y compártelo con quien nunca actualiza su teléfono. |

## 2. Instrucciones visuales

Estilo: fondo azul noche con cuadrícula "cyber" en movimiento, rojo = peligro, verde = solución. Subtítulos palabra por palabra en la zona segura (fuera del área de botones de Instagram).

| Escena | Qué se ve |
|---|---|
| Gancho | "¿Entraste a…" + chips CNN / IKEA / Zoom que entran rebotando y se encienden en rojo. iPhone con alerta ⚠ que tiembla; cierra con "YA." gigante en rojo. |
| Ataque | Un nodo central `</>` (la herramienta) se infecta y "contagia" en cadena a una red de 178 cuadritos; contador de 0 a **178 sitios web infectados**. |
| Robo | Tarjeta bancaria escaneada por una barra roja, el número se revela y aparece sello **ROBADA**. Debajo, una dirección cripto cambia letra a letra por la del atacante. |
| iPhone | Teléfono con "iOS 17.2": las apps se vuelven rojas una a una, barra de escaneo, insignia **0 CLICS**. |
| Calma | Cambio de color a verde: escudo con check animado, "0 iPhones infectados confirmados", "Actualizado = protegido". |
| Acción | Checklist de 3 pasos que entran desde la izquierda y se marcan ✓: iOS 18.7.3+ o iOS 26.3+ · ¿compraste en esos sitios el 16 de nov? · alertas instantáneas. |
| CTA | Iconos de **Guardar** y **Compartir** flotando + "Guárdalo y compártelo". Handle `@tu_cuenta`. |

## 3. Texto de la publicación (copiar y pegar)

```
🚨 ¿Visitaste CNN, IKEA, Zoom o HSBC esta semana?

El 16 de noviembre, hackers infectaron Optimizely, una herramienta que usan 178 sitios web enormes. El código malicioso podía:
💳 Robar datos de tarjetas en páginas de pago
🪙 Cambiar direcciones de billeteras cripto
📱 Intentar hackear iPhones con iOS antiguo… sin un solo clic

✅ La buena noticia: no hay iPhones confirmados como infectados y los sitios ya limpiaron el código.

Haz esto hoy:
1️⃣ Actualiza tu iPhone (iOS 18.7.3+ o iOS 26.3+)
2️⃣ Revisa los movimientos de tu tarjeta
3️⃣ Activa alertas de tu banco

🔖 Guárdalo y 📤 compártelo con quien nunca actualiza su celular.

Fuentes: Report URI, The Hacker News, The Record.

#ciberseguridad #iphone #hackers #seguridadinformatica #estafas #tecnologia #privacidad #ios #consejosdetecnologia #seguridaddigital
```

**Texto de portada sugerido:** `¿Entraste a CNN o Zoom? 🚨 Revisa tu iPhone`

## 4. Datos verificados (base técnica)

- Ataque a la cadena de suministro de **Optimizely Web**, detectado el 16-nov-2026 por Report URI: JavaScript malicioso en **178 sitios** (CNN, IKEA, HSBC, Zoom, BBC, Salesforce, Equifax…).
- Funciones: robo de tarjetas, cookies y capturas; sustitución de direcciones cripto; envío de los kits de exploits **Coruna** (iOS 13.0–17.2.1) y **DarkSword** (iOS 18.4–18.7) a iPhone/iPad.
- Protegidos: **iOS 18.7.3+** e **iOS 26.3+** (también el Modo Aislamiento / Lockdown Mode).
- **No hay** dispositivos confirmados como comprometidos por esta campaña; los scripts se limpiaron ese mismo día.
- Fuentes: [The Hacker News](https://thehackernews.com/2026/11/hijacked-optimizely-scripts-served-card.html) · [The Record](https://therecord.media/optimizely-malicious-code-customer-sites) · [ITPro](https://www.itpro.com/security/cyber-attacks/optimizely-hack-everything-we-know-so-far-as-hundreds-of-websites-found-serving-malware-to-visitors)

## 5. Regenerar (si cambias el texto)

1. Edita `build/script.json` (`text` = subtítulo en pantalla, `tts` = cómo debe pronunciarlo la voz).
2. `python3 build/tts.py <ruta>/es_MX-claude-high.onnx` (voz Piper: `vits-piper-es_MX-claude-high` de sherpa-onnx).
3. `python3 build/build.py && node build/render.js`
