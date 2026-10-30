# Operación Azulito

Aplicación de estudio adaptativo para Big Data, con **Misión Hadoop + Hive** (evaluación 2) y **Misión Spark ⚡** (evaluación 3). [Contenido, fuentes, validación y arquitectura Spark](docs/SPARK.md).

La misión original parte desde conceptos esenciales de **HDFS y Hive de las semanas 5–8**, entrena selección múltiple y transforma los errores en prioridades de refuerzo.

Meta académica mínima: **4,0**. Margen de entrenamiento deseado: **5,0–5,5 consistente**. El entrenamiento no garantiza la nota de una evaluación real.

## Requisitos y ejecución

Node.js **22.12 o superior** (verificado con Node 24.19) y npm.

```bash
git clone https://github.com/catalinasanjuan/operacion-azulito.git
cd operacion-azulito
npm install
npm run dev
```

Abre la dirección que Vite muestra, normalmente **http://localhost:5173**. No necesita credenciales, backend, API de IA ni base de datos remota. El contenido está incluido en el proyecto; la instalación inicial necesita descargar dependencias.

```bash
npm test
npm run build
npm run preview
```

`npm run build` comprueba TypeScript y genera `dist/`. `preview` sirve el build localmente, normalmente en **http://localhost:4173**. Para alojamiento estático, publica `dist/`; la navegación de la aplicación no requiere rutas de servidor adicionales.

## Misión Spark ⚡

**Listado actualizado de la prueba:** semana 10, nivel 3, ejercicio 12; semana 10, nivel 4 completo; semana 11, Pipeline batch y SparkSession. La nueva entrada **Semana 11 · Pipeline y sesión** añade 6 lecciones y 14 actividades de desarrollo en PySpark/Scala. La simulación prioritaria abre con 4 casos para cubrir los cuatro focos; no incluye alternativas.

**Desarrollo de la prueba** prioriza semana 10, nivel 3, ejercicio 12, y todo el nivel 4: 46 actividades de desarrollo (16 Scala / 30 PySpark), pasos guiados, código descargable y simulación por defecto solo de desarrollo. El nivel 4 original es PySpark; las adaptaciones a Scala se identifican. El repaso conceptual queda como apoyo separado. **Ruta PySpark** ofrece 11 bloques progresivos y 19 casos completos: sesión, DataFrame, promedio, guardado/ejecución, modificación, comentarios y casos de semanas 9–11. Los fragmentos están identificados y la simulación solo selecciona casos completos.

23 lecciones y 88 ejercicios de las semanas 9–11: laboratorio con escritura de código, detective, simulaciones prácticas, Modo 4,0, glosario y progreso separado. 23 ejercicios tienen comprobación automática local, 18 usan rúbrica y 47 requieren Spark real. La web no ejecuta PySpark/Scala. La exportación incluye ambas misiones y admite los archivos antiguos. Consulta [docs/SPARK.md](docs/SPARK.md) para fuentes, límites y ampliación a nuevas semanas.

## Qué incluye Hadoop + Hive

- **Aprender:** 45 unidades breves, analogías, laboratorio, trampas, explicación más sencilla predefinida, «Entendido» y «Todavía me cuesta».
- **Practicar:** preguntas individuales, corrección inmediata, explicación de la alternativa, regla de memoria y fuente.
- **Modo 4,0:** 10 preguntas de conceptos esenciales de alto retorno. **Repaso Express:** 5 preguntas, unos 3 minutos.
- Selección por semanas, dificultad, temas débiles y conceptos seleccionados desde progreso o errores de simulación.
- **Simular prueba:** 10/15/20/30/40 preguntas; todas o algunas semanas; dificultad equilibrada o específica; navegación, cambios de respuesta y entrega anticipada confirmada. Sin respuestas, feedback ni referencias de estudio durante la prueba.
- Resultados: nota, porcentaje, respuestas correctas/incorrectas, desglose por semana/concepto/dificultad, prioridades y revisión completa. Los errores enfocan una nueva práctica en conceptos, con variantes.
- **Mi progreso:** rendimiento, promedio reciente, mejor/última nota, acierto, dominio, fortalezas/debilidades, recomendaciones, evolución y revisión de simulaciones, días de actividad y racha.
- **Mapa de supervivencia** y tablas de comandos HDFS/HiveQL.
- Persistencia local, exportación/importación JSON validada y reinicio con dos confirmaciones.
- Diseño responsivo con foco visible, controles etiquetados, navegación por teclado y enlace para saltar al contenido. No se depende solo del color.

## Fuentes y alcance

El repositorio original estaba vacío. No se encontraron los archivos `Semana_05_HDFS_Ejercicios.md`, `Semana_06_HIVE.md`, `Semana_06_HIVE_Ejercicios.md`, `Semana_07_HIVE_Ejercicios.md` o `Semana_08_HIVE_Ejercicios.md`, ni PPT/PDF asociados.

**El temario maestro proporcionado por la usuaria es la fuente del banco y las lecciones.** Cada pregunta lo indica; no se atribuyen páginas o secciones inexistentes. No se consultó contenido académico externo. Ese banco original no incorpora Spark, Kafka ni Machine Learning. Misión Spark agrega por separado el contenido de las guías originales de semanas 9–11; no modifica ese banco.

Los casos incluyen bloques de 128 MiB, archivos de 29/155/305 MiB, un DataNode y replicación objetivo 3, HEALTHY con réplicas insuficientes, tablas externas y LOCATION, DROP externo con archivos persistentes, copias locales/HDFS, RAW/PROCESSED/ARCHIVE y bloques antiguos sin namespace recuperable.

Si se agregan las guías originales, deben revisarse **antes** de ampliar o corregir el banco: guía original > temario maestro > conocimiento general. El comportamiento de DROP externo se formula en el contexto básico del curso, sin generalizar configuraciones ajenas al material.

### Banco

| Semana | Tema | Preguntas | Básicas | Intermedias | Difíciles |
|---|---|---:|---:|---:|---:|
| 5 | HDFS | 40 | 12 | 20 | 8 |
| 6 | Hive | 45 | 14 | 22 | 9 |
| 7 | Datos, metadata y persistencia | 30 | 9 | 15 | 6 |
| 8 | HiveQL | 45 | 14 | 22 | 9 |
| **Total** | | **160** | **49** | **79** | **32** |

Cada pregunta tiene cuatro alternativas y una sola respuesta correcta. Las posiciones correctas del banco se distribuyen uniformemente, y se mezclan otra vez al mostrar cada pregunta. No se pide calcular resultados desconocidos del dataset. Las variaciones son preguntas y escenarios distintos, no plantillas con nombres cambiados automáticamente.

## Stack y estructura

React 19, TypeScript 5, Vite 7 y CSS adaptable. Tests con Node Test Runner + `tsx`; `happy-dom` se usa solo para pruebas de integración, no como dependencia de la aplicación.

```text
src/
  App.tsx                    # Experiencia y controles
  main.tsx                   # Montaje React
  types.ts                   # Modelos
  styles.css                 # Diseño y responsive
  data/
    index.ts                 # Contenido y taxonomía
    questions/week5..8.json   # Banco separado por semana
    lessons/week5..8.json     # Unidades de aprendizaje
  lib/
    engine.ts                # Nota, adaptación, selección y estadísticas
    storage.ts               # Persistencia y validación JSON
tests/
  engine.test.ts              # Reglas del motor y banco
  ui.test.ts                  # Flujos reales sobre DOM simulado
docs/
  ACADEMIC_MAP.md             # Alcance, fuentes y relaciones
  VALIDATION.md               # Evidencia y límites de verificación
```

## Agregar preguntas

Edita el JSON de la semana correspondiente. Modelo:

```json
{
  "id": "w5-041",
  "week": 5,
  "topic": "HDFS",
  "subtopic": "namenode",
  "concept": "namenode",
  "difficulty": "intermediate",
  "type": "comprensión",
  "prompt": "Pregunta inequívoca respaldada por el curso",
  "options": ["A", "B", "C", "D"],
  "correctAnswer": 1,
  "explanation": "Explicación breve y precisa.",
  "optionExplanations": ["Por qué A no aplica", "Explicación correcta", "Por qué C no aplica", "Por qué D no aplica"],
  "memoryTip": "NameNode = mapa.",
  "source": "Semana 5 · fuente real verificable",
  "highValue": true
}
```

`correctAnswer` comienza en 0. No dupliques IDs, prompts ni alternativas. Usa `concept` de una lección existente o agrega la unidad correspondiente. La taxonomía agrupa operaciones relacionadas para generar variantes sin confundir la trazabilidad: `subtopic` conserva el foco particular. Valida con `npm test` y actualiza expectativas de distribución si se amplía el banco intencionalmente.

## Agregar lecciones

Edita `src/data/lessons/weekN.json`. Incluye `id` (concepto), `week`, `title`, `what`, `analogy`, `lab`, `remember`, `trap`, `easy`. Mantén frases cortas y casos del material. `easy` es contenido fijo: no usa IA. Cuando una unidad cubre varios operadores relacionados, la referencia rápida complementa su función individual.

## Cálculo de nota

Configuración inicial: mínima 1,0, aprobación 4,0, máxima 7,0, exigencia 60%. Con porcentaje `p` y exigencia `e`:

- `p <= e`: `mínima + (aprobación - mínima) × p / e`.
- `p > e`: `aprobación + (máxima - aprobación) × (p - e) / (100 - e)`.

Se limita a la escala y se muestra un decimal. 60% → 4,0; 80% → 5,5; 100% → 7,0 con valores iniciales. Se guarda la escala al salir del campo de configuración. Cada simulación conserva su escala original; el semáforo compara solo simulaciones con la escala actual. El objetivo académico del producto sigue siendo 4,0.

## Adaptación y selección

La lógica admite un generador pseudoaleatorio inyectado para pruebas deterministas. La producción usa aleatoriedad normal.

Prioridad por concepto: errores recientes + baja tasa de acierto + dudas marcadas + poca práctica + tiempo sin repaso. Rachas correctas reducen gradualmente el peso, sin llevarlo a cero. La selección pondera **conceptos**, no cantidad de preguntas, evitando favorecer temas solo por tener más variantes.

Práctica evita las cuatro preguntas más recientes cuando es posible y excluye conceptos de los dos últimos intentos si hay alternativas. Dentro de la sesión no vuelve a usar IDs ya respondidos. Tras cada respuesta recalcula la siguiente selección con el historial actualizado. Para un concepto con pocas variantes, una práctica focalizada puede incluir preguntas de su semana para permitir repaso y espaciamiento; una sesión puede ser menor a diez si el filtro tiene menos preguntas disponibles.

Simulación distribuye preguntas por rondas entre semanas y aproxima 30% básica / 50% intermedia / 20% difícil. Si un filtro tiene menos preguntas que las solicitadas, muestra un aviso y **no duplica** para rellenar. Las alternativas y sus explicaciones se mezclan juntas; la respuesta correcta conserva correspondencia.

## Semáforo y progreso

Una simulación cuenta para consistencia si incluye **al menos 10 preguntas**, las **cuatro semanas**, todas respondidas y la **misma escala actual**. Las sesiones focalizadas o parciales aparecen en el historial y alimentan la adaptación, pero no justifican consistencia global.

Se usan las últimas cinco válidas:

- En riesgo: promedio menor a la nota de aprobación configurada.
- Con menos de cinco: construyendo evidencia; nunca muestra verde.
- Todavía inestable: todavía no cumple condiciones de consistencia.
- Objetivo 4,0 consistente (escala inicial): todas ≥4,0 y promedio ≥4,5.
- Con colchón: todas ≥4,5 y promedio ≥5,0.

El dominio conservador por concepto es `aciertos / (intentos + 2)`; reduce confianza en muestras pequeñas. Los porcentajes por semana son acierto observado, no probabilidad de aprobar.

## Exportar / importar

Configuración → **Exportar progreso** descarga un JSON. Incluye lecciones, dudas, respuestas, historial, simulaciones, notas, escala y sesión actual. En otro navegador abre Configuración → **Importar progreso** y elige el archivo. Requiere confirmación antes de reemplazar. Los JSON inválidos se rechazan sin alterar el progreso actual.

El guardado usa `localStorage`, clave `operacion-azulito-v1`. Cambiar de origen/puerto o borrar datos del navegador puede hacer que el progreso no esté disponible; conserva un JSON para trasladarlo. Si se detecta almacenamiento ilegible, no se sobrescribe automáticamente y se ofrece exportar una copia de recuperación.

## Verificación y limitaciones

Consulta [docs/VALIDATION.md](docs/VALIDATION.md). Los tests cubren integridad, distribución, nota, mezcla, selección determinista, espaciamiento, semáforo, serialización y flujos integrados de aprendizaje/práctica/simulación/progreso/configuración.

La revisión académica está limitada al temario proporcionado; faltan guías originales para contrastar con detalle. La integración se prueba en DOM simulado: no sustituye una revisión visual real en Chrome/Firefox/Safari ni una auditoría completa de accesibilidad. No se incluye despliegue público ni PWA/offline instalable.
