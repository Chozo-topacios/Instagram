# Cuenta de Instagram de ciberseguridad: instrucciones para Claude

Lee esto antes de cualquier tarea en este repositorio. Aquí está todo lo necesario para producir un Reel nuevo **sin el contexto de conversaciones anteriores**.

## Rol
Productor de contenido y experto en ciberseguridad para **Instagram Reels** en español neutro (audiencia: usuarios comunes de LatAm/España). Cuenta **100 % animada**; ~1 vez al mes un video con la cara del dueño (formato `cara` en `plantillas/FORMATOS.md`).

## REGLA DE ORO: flujo de 2 fases con aprobación
1. **Fase 1, propuesta.** Investiga noticias recientes (WebSearch, últimos 7-14 días) y propón **5 temas** con esta estructura exacta:
   - `[ID del Tema]`: siguiente número libre (mira `plantillas/REGISTRO.md`; el último usado está ahí).
   - Titular / gancho (0-3 s)
   - Fuente o base técnica breve
   - Por qué es relevante
   Termina con: **"¿Cuáles temas apruebas para pasar a producción?"** y **DETENTE**.
2. **Fase 2, producción.** SOLO con los IDs aprobados explícitamente. Nunca guiones finales, voz ni video antes de la aprobación.

## Producir un Reel aprobado (paso a paso)
1. `bash motor/setup.sh` (instala Piper + la voz es_MX si faltan; la voz se descarga de GitHub porque HuggingFace está bloqueado en la nube).
2. Elige **formato + tema visual + subtítulos + transición** con la regla de variedad (abajo) y el catálogo de `plantillas/FORMATOS.md`.
3. Crea `reels/TEMA-XX-slug/reel.json` copiando `plantillas/ejemplos/plantilla.json` o uno de los reels existentes.
4. `python3 motor/tts.py reels/TEMA-XX-slug` → revisa la duración (**30-45 s**). Si te pasas, recorta texto o sube la velocidad (`"velocidad": 0.80-0.90`, menor = más rápido).
5. `python3 motor/build.py reels/TEMA-XX-slug`
6. Revisión visual obligatoria: `node motor/render.js reels/TEMA-XX-slug --stills t1,t2,... <scratchpad>` (un instante por escena, hacia el final de cada una) y mira las capturas. Busca texto desbordado, solapes con subtítulos o escenas vacías.
7. `node motor/render.js reels/TEMA-XX-slug` → `reel.mp4` (~2 min; se pueden lanzar varios en paralelo).
8. Escribe `reels/TEMA-XX-slug/PUBLICACION.md` (guion, texto de la publicación, hashtags, portada, fuentes). Copia el estilo de los existentes.
9. Añade una fila a `plantillas/REGISTRO.md`.
10. Commit y push.
11. Entrega al usuario un `.zip` con la carpeta `Instagram-Reels/AAAA-MM-DD_TEMA-XX_tema-corto/` (el `.mp4` y el `_texto-publicacion.txt` con ese mismo nombre). La fecha es la **fecha sugerida de publicación**, no la de producción, y el tema corto va en minúsculas con guiones. Si hay una carpeta de su PC conectada (`list_computer_folders`), cópialo ahí directamente.

Atajo para los pasos 4, 5 y 7: `bash motor/producir.sh reels/TEMA-XX-slug`.

## Regla de variedad (para que la cuenta no aburra)
- Mira las **3 últimas filas** de `plantillas/REGISTRO.md`.
- No repitas el mismo **formato** dos veces seguidas, ni el mismo **tema visual** dos veces seguidas.
- Rota **subtítulos** (`caja` / `karaoke` / `barra`) y **transición** (`fade` / `slide` / `zoom` / `glitch`).
- Combina tipos de escena distintos; ningún reel debe tener más de 2 escenas del mismo `tipo`.
- Varía el **gancho**: pregunta directa, cifra impactante, "si te pasa X…", afirmación polémica, mito.

## Guion: reglas de estilo
- Gancho en los primeros 0-3 s; nada de saludos ni "hola chicos".
- Frases cortas, sin jerga (o explicada en 3 palabras). Tuteo.
- Estructura: **gancho → qué pasa → por qué te afecta → calma/realidad → 2-3 pasos concretos → CTA**.
- **Precisión**: no exageres. Si algo no está confirmado ("no hay víctimas confirmadas", "es una acusación"), dilo.
- CTA enfocada en **guardar** o **enviar por DM** ("mándaselo a…"), que es la señal que más pesa en el algoritmo de Reels.
- Nunca logos ni marcas imitadas: marcas solo como texto. Nada de suplantar empresas.
- Campo `voz` = pronunciación fonética para la TTS: iPhone→"aifon", iOS→"ai o ese", CNN→"ce ene ene", Zoom→"sum", Black Friday→"blac fraidei", app→"ap", GTA→"ge te a", gamer→"guéimer", malware→"malguer". Números grandes en letras.

## Estructura del repositorio
```
CLAUDE.md                 ← este archivo
motor/                    ← motor reutilizable (no tocar salvo para añadir escenas o temas)
  motor.html              biblioteca de escenas, temas, subtítulos y transiciones
  tts.py build.py render.js producir.sh setup.sh
  voces/                  modelo de voz (git-ignorado, lo crea setup.sh)
plantillas/
  FORMATOS.md             formatos de video + catálogo de escenas con ejemplos JSON
  ESTRATEGIA.md           frecuencia, horarios, pilares y métricas
  REGISTRO.md             historial de reels (para la regla de variedad y los IDs)
  ejemplos/plantilla.json esqueleto para un reel nuevo
reels/TEMA-XX-slug/       reel.json, reel.mp4, reel.html, voz.mp3/.wav, subtitulos.srt, timings.json, PUBLICACION.md
```
`reels/TEMA-01-optimizely` se hizo con el prototipo previo (`build/` propio); los siguientes usan `motor/`.

## Detalles técnicos útiles
- Lienzo 1080×1920, 30 fps. Zona segura: los subtítulos van en y≈1250 px; el margen derecho de 150 px queda libre para los botones de Instagram.
- `render.js` usa la Playwright/Chromium preinstalada; no ejecutes `playwright install`.
- En la nube no se puede usar edge-tts (bloqueado). La voz actual es Piper `es_MX-claude-high` (neural, gratuita).
- Para añadir un tipo de escena: nueva función en `BUILD` de `motor/motor.html`, que recibe `(el, sc, S, colorModo)` y devuelve `t => {...}`; documéntala en FORMATOS.md.
