# Formatos de video y catálogo de escenas

Un reel = `reel.json` = ajustes globales + lista de **escenas**. Cada escena tiene un `tipo` (cómo se ve) y `lineas` (lo que dice la voz y los subtítulos).

## 1. Ajustes globales de `reel.json`

| Campo | Valores | Nota |
|---|---|---|
| `id`, `titulo` | texto | `TEMA-XX` |
| `formato` | `alerta`, `top3`, `es-estafa`, `simulacion`, `mito-realidad`, `truco`, `cara` | solo informativo, va al REGISTRO |
| `tema` | `noche` (azul + rojo/verde), `neon` (morado/rosa/cian), `papel` (claro, crema), `terminal` (negro + verde hacker, monoespaciada) | paleta y fondo |
| `subtitulos` | `caja` (cuadro redondeado), `karaoke` (MAYÚSCULAS grandes con contorno), `barra` (franja a todo el ancho con borde de color) | |
| `transicion` | `fade`, `slide`, `zoom`, `glitch` | entrada y salida de escenas |
| `insignia` | texto | etiqueta superior por defecto (cada escena puede cambiarla) |
| `handle`, `fecha` | texto | el handle aparece en la escena `cta` |
| `velocidad` | 0.80-0.95 | ritmo de la voz (menor = más rápido) |

Cada escena admite además `modo`: `peligro` (rojo) · `calma` (verde) · `neutral` (azul o violeta), que define el color de acento de la escena, y `insignia` opcional.

**Texto enriquecido:** `*palabra*` = resaltada con el color del modo · `[texto]` = enlace falso subrayado · `\n` = salto de línea.

**Líneas:** `{"texto": "lo que se lee", "voz": "cómo se pronuncia (opcional)"}`. En las escenas con elementos (chat, checklist, top, pills) **el elemento N aparece cuando empieza la línea N**: pon una línea por elemento.

## 2. Catálogo de escenas

| `tipo` | Para qué | Campos |
|---|---|---|
| `titular` | Gancho, frase clave, dato | `texto`, `sub?`, `icono?`, `pills?[]`, `tam?` (px, def. 100), `icono_tam?` |
| `contador` | Cifra impactante animada | `valor`, `prefijo?`, `sufijo?`, `etiqueta`, `texto?`, `icono?`, `puntos?` (red de puntos que se infectan), `tam?` |
| `chat` | Mensaje, SMS o nota de voz falsos con banderas rojas | `remitente`, `detalle?`, `texto?`, `mensajes[]: {texto, de?:"yo", alerta?}` |
| `tarjeta` | Robo de tarjeta | `texto?`, `etiqueta?` (def. ROBADA), `sub?` |
| `telefono` | Teléfono infectado o escaneado | `texto?`, `pantalla?` (texto en pantalla), `insignia?`, `insignia_sub?`, `infectado?` (false = limpio) |
| `checklist` | Pasos para protegerse (se marcan ✓) | `texto?`, `pasos[]: {t, d?}` |
| `mito` | Mito contra realidad | `mito`, `realidad`, `texto?`, `etiqueta_mito?`, `etiqueta_realidad?` (2 líneas: mito, luego realidad) |
| `top` | Ranking o señales (cuenta atrás 3-2-1) | `texto?`, `items[]: {t, d?, icono?}`, `cuenta_atras?` (def. true) |
| `escudo` | Momento de calma / solución | `texto`, `sub?` |
| `cta` | Cierre | `texto`, `sub?`, `iconos?` (de `guardar`, `compartir`, `seguir`), `tam?` |

**Iconos disponibles:** `alerta candado anzuelo robot paquete mensaje wifi llave ojo dinero usuario escudo tarjeta telefono bomba regalo x check guardar compartir seguir`

## 3. Formatos (estructuras probadas)

Duración objetivo: **30-45 s**, de 5 a 7 escenas.

### `alerta`: noticia urgente (ej. TEMA-01)
`titular(peligro, gancho pregunta)` → `contador` (alcance) → `tarjeta`/`telefono` (qué roban) → `escudo(calma)` → `checklist` → `cta`

### `top3`: N señales o errores (ej. TEMA-02)
`titular(gancho)` → `contador` (dato) → `titular` (dato 2) → `top` (3 items, 1 línea c/u) → `escudo` → `cta`

### `es-estafa`: análisis de un mensaje real (ej. TEMA-04)
`titular("¿Te llegó…?")` → `chat` (3 mensajes con `alerta`) → `tarjeta`/`titular` (qué buscan) → `titular` (cuándo llega) → `checklist` → `cta`

### `simulacion`: dramatización de un caso (ej. TEMA-03)
`titular` (situación emocional) → `contador` (dato técnico) → `chat` (cómo suena) → `titular` (caso real) → `escudo` (solución) → `cta`

### `mito-realidad`: desmontar creencias (ej. TEMA-05)
`titular(gancho)` → `titular` (contexto con `pills`) → `mito` → `mito` → `checklist` → `cta`

### `truco`: ajuste de un minuto (WhatsApp, iPhone, Android)
`titular("Activa esto YA")` → `telefono(infectado:false, pantalla:"Ajustes")` → `checklist` (ruta de menús paso a paso) → `escudo` (qué te evita) → `cta`

### `cara`: video mensual con la cara del dueño
No se renderiza entero con el motor. Entregables:
1. Guion de teleprompter (30-60 s), con frases cortas marcadas por respiración.
2. Indicaciones de grabación: vertical, luz frontal, encuadre de pecho hacia arriba, primeras palabras = gancho.
3. **Inserts animados** hechos con el motor (2-4 reels cortos de 1-2 escenas: `contador`, `chat`, `checklist`) para intercalarlos en CapCut.
4. Ideas buenas: "Mi top de estafas del mes", "Respondo sus preguntas", "Me intentaron estafar así".

## 4. Bancos de ideas para variar

**Ganchos:** "¿Te llegó…?" · "Si te pasa esto, cuelga" · "El 90 % no sabe que…" · "Esto le pasó a…" · "No vuelvas a hacer esto con tu…" · "Esta app te está…" · Mito: "Tener antivirus no te protege de…"
**CTA:** "Guárdalo para cuando lo necesites" · "Mándaselo a tu mamá" · "Etiqueta a quien siempre cae" · "Síguenos y no te vuelven a estafar" · "Comenta ALERTA y te mando la guía"
