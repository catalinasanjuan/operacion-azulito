# Misión Spark — implementación y fuentes

La aplicación existente conserva las 160 preguntas, 45 lecciones, motor y resultados Hadoop/Hive. Un selector de misión permite pasar a Spark. Ambas misiones usan los estilos existentes, la escala chilena y la exportación/importación del mismo progreso.

## Fuentes verificadas

Se consultaron los archivos originales de `juliopez/Hadoop`, en `material_docente/presentaciones`, fijados al commit **6dbb5edb023d218b50b9d2494676ceb0de51ecb5**. Las fuentes anteriores mantienen esa revisión; semana 11 se fija por separado al commit **11d2cee2b28af20d7da8b9692595962d59ea0582**. Los enlaces de cada actividad apuntan a su revisión correspondiente, para evitar que una modificación posterior cambie su trazabilidad.

- [Semana_09_SPARK.md](https://github.com/juliopez/Hadoop/blob/6dbb5edb023d218b50b9d2494676ceb0de51ecb5/material_docente/presentaciones/Semana_09_SPARK.md): historia, memoria/disco, arquitectura, ejecución, RDD, transformaciones, acciones, DAG, DataFrames y panorama del ecosistema, HDFS/Hive, Scala/Python.
- [Semana_09_SPARK_Ejercicios.md](https://github.com/juliopez/Hadoop/blob/6dbb5edb023d218b50b9d2494676ceb0de51ecb5/material_docente/presentaciones/Semana_09_SPARK_Ejercicios.md): Standalone, parallelize, particiones, map/filter, evaluación diferida, lectura HDFS, parsing y agregaciones RDD; ejercicios 1–15.
- [Semana_10_SPARK_Ejercicios.md](https://github.com/juliopez/Hadoop/blob/6dbb5edb023d218b50b9d2494676ceb0de51ecb5/material_docente/presentaciones/Semana_10_SPARK_Ejercicios.md): DataFrames, esquema inferido/explícito, select/filter/withColumn, CSV, groupBy/agg, SQL, fechas, comparaciones Hive y programas .py; ejercicios 1–17.

- [Semana_11_SPARK_Ejercicios.md](https://github.com/juliopez/Hadoop/blob/11d2cee2b28af20d7da8b9692595962d59ea0582/material_docente/presentaciones/Semana_11_SPARK_Ejercicios.md): pipeline batch, SparkSession, validación de dos fuentes, joins, clasificación, agregación, Parquet y relectura; foco en ejercicios 11–14 y antecedentes necesarios.

Los ejercicios indican si adaptan una actividad o son una aplicación original de sus conceptos. Semana 11 se incorporó tras publicarse la guía original; no se inventa contenido de semana 12. El panorama teórico de Streaming/MLlib/GraphX no se convierte en ejercicios avanzados ajenos a las guías prácticas.

## Contenido y experiencia

| Semana | Lecciones | Ejercicios | Contenido |
|---|---:|---:|---|
| 9 | 8 | 24 | Arquitectura, RDD, particiones, Scala/PySpark, transformaciones/acciones, lazy evaluation, HDFS y ventas |
| 10 | 9 | 50 | DataFrames, esquemas, columnas, filtros, CSV, agregaciones, SQL, fechas, programas y documentación |
| 11 | 6 | 14 | Pipeline batch, SparkSession, integración, clasificación, Parquet y comprobación |
| Total | 23 | 88 | 10 de reconocimiento, 6 de completar, 9 de corrección, 12 de construcción y 51 casos/bloques |

**78/88 actividades requieren completar, corregir o producir código o comentarios técnicos.** Los ejercicios de nivel 0 piden respuestas cortas; las lecciones tienen una comprobación conceptual. El laboratorio no se reduce a alternativas.

Cada ejercicio conserva un ID estable, semana/concepto, lenguaje, nivel, plantilla, objetivo de salida, pistas, solución, explicación, fuente y modo de revisión. Cada lección ofrece explicación, analogía, código, lectura línea por línea, comprobación y resumen. El glosario se consulta en la misma pantalla. El editor usa texto plano con una vista de resaltado; Tab mantiene la navegación accesible.

El laboratorio permite sesiones de hasta seis ejercicios o elegir uno del banco. Detective filtra las correcciones. Modo 4,0 prioriza conceptos débiles, evita variantes recientes cuando hay suficientes y avanza de niveles 0–1 a 2 y 3 según aciertos sin ayuda. Nunca duplica un ejercicio dentro de una sesión ni promete aprobación. Sus sesiones adaptan la selección al prepararse; los errores alimentan las sesiones siguientes.

La simulación abre por defecto en **solo desarrollo**, con Scala, cuatro casos y foco ejercicio 12 + nivel 4 + Pipeline + SparkSession; no incluye alternativas ni reconocimiento. Permite 1 o más casos, lenguajes y focos. El modo mixto de apoyo conserva lectura/predicción, completar, corregir y desarrollo. El tiempo es orientativo: no hay entrega forzada. Se bloquea material de ayuda y cambio de misión durante una simulación. La sesión se guarda y puede retomarse tras recargar. Salir sin entregar conserva borradores y no crea una nota.

## Foco de la prueba — 2026-10-26

Se revisó de nuevo el repositorio del profesor: su rama predeterminada seguía en el mismo commit y las semanas Spark publicadas en presentaciones son 9 y 10. La pista comunicada por la estudiante prioriza **semana 10, nivel 3, ejercicio 12 y todo el nivel 4**; no se atribuye al profesor una pauta, número de casos o ponderación desconocidos.

El ejercicio 12 pide total vendido por ciudad para Tecnologia mediante vista temporal y Spark SQL, y comparación con DataFrame API. El nivel 4 **original está escrito en PySpark**. Sus adaptaciones a Scala se identifican; no se presenta Scala como el lenguaje original de los ejercicios 16–17.

La sección **Desarrollo de la prueba** y la entrada **Ruta PySpark** ofrecen 32 actividades: las 14 iniciales y 18 añadidas para PySpark. Se conservan los 42 IDs/enunciados del banco inicial y los 14 de la ampliación anterior:

| Recorrido | Scala | PySpark | Cobertura |
|---|---:|---:|---|
| Ejercicio 12 | 1 | 2 | DataFrame, vista, WHERE, GROUP BY, SUM, ORDER BY y equivalencia de API |
| Todo el nivel 4 | 3 | 11 | Ej. 16: tres bloques, editar/guardar/comprobar/ejecutar, añadir sexto registro y volver a ejecutar; ej. 17: decisión, interpretación y respuesta conceptual en comentarios |
| Casos desde cero | 6 | 9 | SQL con dos condiciones, agregaciones, fechas/columnas, CSV HDFS/schema, RDD semana 9 y programa completo |

La muestra original de seis ventas de estos casos está en `training-fixture.json`; no representa el archivo de cien mil filas del profesor. El programa de cinco clientes del ejercicio 16 sí mantiene sus datos: promedio esperado 144000, que pasa a 140000 al añadir Diego 120000. Los casos HDFS no inventan valores del archivo real.

La entrada general inicia en Scala; la Ruta PySpark y semana 11 abren en PySpark. Se pueden ocultar los pasos guiados y escribir la solución, consultar pistas/referencia, registrar rúbrica y descargar **el código propio** como .scala/.py. El editor guarda los borradores en el progreso existente. Un contador de casos intentados no certifica dominio.

La simulación predeterminada selecciona casos de programación: con cuatro casos y semanas 10/11 seleccionadas incluye uno por cada punto del listado. Con solo dos casos de semana 10 conserva ejercicio 12 + nivel 4. El foco integrado permite incluir fundamentos de semana 9. El modo mixto sigue disponible como apoyo separado; no es el formato anunciado de la prueba. Las sesiones e historiales antiguos siguen importándose sin `format`; los nuevos guardan opcionalmente `format: development|mixed` y se comprueba que un formato de desarrollo no incluya reconocimiento.

Los casos completos requieren contraste en Spark real; tres fragmentos de comentarios usan revisión conceptual guiada: la rúbrica no otorga nota automática. Los resultados quedan pendientes de revisión y la simulación puede terminar **sin nota**. No hay backend ni ejecución Scala/PySpark en esta web.

**Scala y archivos:** un script puede cargarse con `:load` en spark-shell; un `object` con `main` necesita ser invocado o compilarse como aplicación. `spark-submit --class ...` recibe un **JAR compatible**, no directamente el archivo .scala. PySpark utiliza .py con spark-submit y Python 3 configurado como en la guía. `ls -l` y `cat` permiten comprobar el archivo guardado. Nunca se da por ejecutado un código que solo se descargó.

Implementación: `Development.tsx`, `development.json`, `LearningTools.tsx` (editor/código compartidos), selección en `progress.ts`. Los contenidos de semanas 9 y 10 se mantienen, con versión de catálogo 3 y almacenamiento compatible; no se borró progreso ni se inventaron semanas futuras.

## Ampliación PySpark: recorrido propio

Se volvió a leer la semana 10, nivel 4 completo (incluidos los pasos de los ejercicios 16–17), el ejercicio 12 y los apartados prácticos de semanas 9–10. El repositorio académico sigue en el commit fijado. El objetivo es desarrollar competencias separadas, no multiplicar variantes numéricas para inflar el banco.

En la ampliación previa de semana 10, **Misión Spark → Ruta PySpark** pasó a **22 actividades PySpark**, frente a las cuatro de desarrollo iniciales. La incorporación posterior de semana 11 suma ocho y deja el total actual en **30** (11 bloques y 19 casos completos). El recorrido previo se desglosa así:

- **8 bloques nuevos**, en orden pedagógico: sesión/datos locales; creación/inspección del DataFrame; medida promedio; guardar/verificar/ejecutar el archivo; reconstruir el DataFrame después de cambiar datos; comentario DECISIÓN; INTERPRETACIÓN con límite de evidencia; RESPUESTA sobre schema.
- **14 casos completos**: los cuatro previos, un caso nuevo del ejercicio 12 sobre el archivo real de HDFS y nueve casos de transferencia. Estos últimos cubren condiciones Column/select/withColumn, medidas agrupadas, SQL con dos condiciones, fechas, schema/CSV, entrega de un programa con comparación antes/después, y tres casos RDD de semana 9.

En el nivel 4 de PySpark hay 11 actividades: los ocho bloques y los tres casos integrados previos. Los bloques con código parcial o comentarios (cinco) se rotulan **fragmento**, especifican las variables y el archivo donde insertarlos y no se presentan como programas autónomos. Los otros tres bloques producen archivos completos, pero siguen siendo aprendizaje por pasos. Un selector permite ver todas las actividades, solo bloques o solo casos completos; el contador desglosa el lenguaje actual.

Las simulaciones de desarrollo excluyen TODOS los bloques breves, incluso cuando tienen un .py completo. Así entrenan resolución integral, no un comentario aislado. PySpark dispone de 14 casos completos seleccionables: cinco prioritarios (ejercicio 12/nivel 4) y nueve de transferencia; estos incluyen semanas 9 y 10. Una importación no puede etiquetar un bloque como simulación de desarrollo. Las sesiones antiguas mantienen compatibilidad.

Las soluciones Python se comprobaron mediante `ast.parse`: eso acredita sintaxis Python, **no ejecución ni corrección Spark**. Las rúbricas no asignan aciertos automáticos por marcar casillas. Los conteos de 8 bloques/14 casos describen la sección de desarrollo PySpark; no confunden todo el banco Spark ni los ejercicios Scala con cobertura de Python.

Contenido: `pyspark-development.json` añade 18 IDs estables sin cambiar los previos; `Training` añade metadatos opcionales `format`, `artifact` y `order`. El progreso conserva la versión 1 y sus borradores/intentos; no requiere borrar datos ni cambiar de clave.

## Semana 11 y listado actualizado — 2026-10-29

Se encontró la guía recién publicada en `material_docente/presentaciones/Semana_11_SPARK_Ejercicios.md`, commit **11d2cee2b28af20d7da8b9692595962d59ea0582**. Se leyeron el propósito, conocimientos previos y ejercicios 11–14 completos, además de antecedentes de fuentes/joins, cache/persist y formatos. **Pipeline significa aquí pipeline batch de datos; no `pyspark.ml.Pipeline`.** SparkSession se estudia como punto de entrada y ciclo de vida de esa aplicación; no se inventa un temario de `newSession`, múltiples usuarios ni servidores de sesiones.

El listado visible en inicio y la simulación prioritaria incluyen:

1. Semana 10 → nivel 3 → ejercicio 12 (se mantiene intacto).
2. Semana 10 → nivel 4 completo (se mantiene intacto).
3. Semana 11 → Pipeline batch.
4. Semana 11 → SparkSession.

La entrada **Semana 11 · Pipeline y sesión** usa el editor, rúbricas, borradores y descargas existentes. Hay **6 lecciones y 14 actividades** nuevas (8 PySpark / 6 Scala): diez de pipeline y cuatro de sesión. Tres actividades PySpark son bloques guiados, dos de ellos fragmentos explícitos; se excluyen de simulaciones. Las otras once son programas/casos completos. Las adaptaciones Scala están identificadas porque la guía utiliza PySpark.

Cobertura: lectura del CSV ventas sin encabezado con esquema explícito; lectura de ciudades con encabezado; entradas no vacías, muestras/tipos y clave ciudad; referencia única por ciudad y multiplicación por duplicados; left frente a inner; regiones NULL conservadas; BAJA `<100000`, MEDIA `>=100000 && <300000`, ALTA `>=300000`; cantidad/total/promedio por región+nivel; `overwrite` únicamente en la ruta de trabajo del ejercicio; Parquet, relectura y validación; límites del conteo; cache/persist temporal frente a producto HDFS; batch frente a ejecución continua. El refuerzo de detección de claves duplicadas se identifica en la referencia como validación original basada en la advertencia de joins.

SparkSession cubre builder/appName/getOrCreate, uso de la misma sesión para DataFrame/vista/SQL, Master configurado al ejecutar, cierre después de todas las etapas, diagnóstico de cierre prematuro y recuperación del producto desde una aplicación nueva. La escritura HDFS sobrevive al cierre; una variable, una vista o la caché de la aplicación anterior no es ese producto.

La muestra `week11-fixture.json` es ORIGINAL: siete ventas y tres ciudades de referencia; incluye fronteras 99999/100000/299999/300000, una venta sin región y un grupo con dos ventas para comprobar promedio real. Left conserva siete, inner recupera seis; una referencia Santiago duplicada produciría diez filas en el join. El producto tiene seis grupos, incluido NULL/BAJA y Metropolitana/MEDIA (cantidad 2, total 300000, promedio 150000). No representa el archivo real de cien mil ventas ni permite inventar sus resultados.

La selección prioritaria con cuatro casos y semanas 10/11 incluye ejercicio 12, nivel 4, pipeline y sesión, para Scala/PySpark o ambos. Mantiene sesiones cortas configurables y avisa que 1–2 casos cubren solo parte del temario. Se preservaron byte por byte los 74 ejercicios previos, los 17 IDs de lecciones anteriores y la persistencia versión 1. Los enlaces antiguos siguen fijados al commit anterior; solo las nuevas fuentes usan el commit nuevo.

Contenido: `week11-exercises.json`, `week11-lessons.json`, `week11-fixture.json`. Nuevas etiquetas de recorrido `pipeline` y `session`; semana 11 publicada en el catálogo. El contenido nuevo se empaqueta en un chunk independiente de datos; no cambia dependencias ni lockfile. No se implementan Kafka/streaming ni ML como si fueran parte del programa batch de esta guía.

Las ocho referencias PySpark nuevas pasan `ast.parse` (sintaxis, no ejecución). Las actividades abiertas se registran como pendientes de revisión; no obtienen nota automática al marcar rúbricas. Para comprobar ejecución y archivos se requiere Spark/HDFS del curso.

## Qué valida realmente

| Mecanismo | Cantidad | Evidencia |
|---|---:|---|
| Respuesta cerrada | 10 | Valor numérico o término conceptual del enunciado |
| Modelo RDD local | 10 | Analiza una gramática restringida e interpreta operaciones sobre la colección finita del ejercicio; compara resultado y operaciones solicitadas |
| Proyección DataFrame | 3 | Analiza la estructura de `df.select(...).show()`, las columnas y su orden; acepta nombres y objetos `df.columna` |
| Rúbrica guiada | 18 | La estudiante contrasta criterios y referencia; no se certifica corrección ni se dan puntos automáticos |
| Spark real requerido | 47 | Casos de clúster/HDFS/programas que necesitan ejecutarse fuera de esta web; quedan pendientes de verificación |

**Ninguno de estos mecanismos ejecuta Spark.** No hay backend, JVM, Scala, PySpark, Docker ni archivo de cien mil ventas dentro de la web. No se inventan conteos/totales de ese archivo. Los resultados numéricos de las colecciones cerradas y las cinco ventas del ejemplo se deducen de los datos explícitos.

El modelo RDD admite números, listas, `range`, rangos Scala `to`, `sc.parallelize`, asignaciones, lambdas, operaciones aritméticas/comparaciones y `map`, `filter`, `reduce`, `sum`, `count`, `take`, `getNumPartitions`. Usa `datos = 1..100` con cuatro particiones cuando el enunciado entrega esa variable. Acepta nombres distintos, variables intermedias, comentarios, expresiones equivalentes y sum/reduce equivalentes sobre estos datos. Comprueba el caso cerrado; no demuestra equivalencia universal ni compatibilidad con una versión de Spark.

No utiliza `eval`, `Function`, subprocesos ni ejecución del código ingresado. Limita respuesta a 12000 caracteres, 2500 tokens, rangos a 10000 elementos y 100000 pasos. Las variantes fuera de la gramática quedan **sin verificar**, con mensaje específico, en lugar de asignar un acierto. El parser no es un compilador completo de Python o Scala.

`SparkRunner` en `src/spark/types.ts` define el contrato para un futuro ejecutor aislado (lenguaje, código, ejercicio, cancelación/timeout y resultado con versión). No se conecta a ningún servicio. Su integración futura necesitará aislamiento, límites de recursos y pruebas contra un Spark real.

## Progreso y compatibilidad

Se conserva la clave **operacion-azulito-v1** y el esquema original Hadoop/Hive. Se añaden propiedades opcionales `spark` (versión propia 1) y `mission`; importar un archivo antiguo inicializa Spark vacío sin alterar respuestas, estadísticas, simulaciones ni sesiones anteriores. La lectura valida ambos módulos antes de reemplazar datos.

Spark guarda lecciones, borradores, respuestas, intentos, resultados comprobados/incorrectos/en revisión, pistas, consulta de referencia, rúbricas, simulaciones y sesión activa. Los aciertos con ayudas quedan distinguidos para no acreditar dominio independiente. El dominio observado exige dos ejercicios distintos, incluida escritura, aciertos sin ayuda y ausencia de fallos entre los últimos intentos comprobados. Las competencias solo revisables mediante rúbrica permanecen en desarrollo: marcar casillas no acredita ejecución.

Exportar incluye ambas misiones; importar reemplaza ambas después de confirmar. Un JSON inválido no reemplaza el progreso. Un almacenamiento ilegible se conserva y permite exportar recuperación antes de reiniciar. Dos confirmaciones siguen siendo necesarias para borrar todo. **Exporta una copia antes de cambiar de origen/dispositivo**: localStorage depende del navegador y el origen.

La estimación chilena usa la escala configurada (por defecto 1–7, 60% de exigencia), capturada al iniciar la simulación. Se calcula **solo sobre ejercicios automáticos efectivamente comprobados** y muestra el denominador y cuántos quedan pendientes. No es una nota oficial ni una nota completa de programación. Las rúbricas y variantes no verificadas se excluyen, no reciben puntos ficticios.

## Organización y nuevas semanas

- `src/spark/exercises.json`, `lessons.json`: contenido y fuentes.
- `content.ts`: semanas publicadas, versión del contenido, conceptos, fuentes fijadas y glosario.
- `validator.ts`: analizador/validadores locales.
- `progress.ts`: validación de persistencia, selección, competencias y estimaciones.
- `SparkMission.tsx`: lecciones, editor, laboratorio, detective, simulaciones y progreso.
- `src/lib/storage.ts`: migración aditiva e importación/exportación comunes.

Para una nueva semana, estudia primero su guía real, registra una entrada `WeekContent` con ID, título, versión, estado, fuentes y conceptos, y añade sus lecciones y ejercicios con IDs nuevos. Publica solo cuando el contenido y validadores estén revisados. Los IDs existentes no deben reutilizarse ni borrarse si tienen progreso; una modificación incompatible de almacenamiento necesita nueva migración. Actualiza integridad/distribución de tests de forma deliberada. No hace falta reescribir la navegación ni vaciar datos. La semana se representa mediante un número, no una unión cerrada 9/10.

## Ejecutar y desplegar

Requiere Node >=22.12 (validado con 24.19.0) y npm. Sin nuevas dependencias de aplicación, secretos ni servicios externos.

```bash
npm ci
npm test
npm run build
npm run dev
```

Para probar la compilación: `npm run preview`. Para desplegar, publica **dist/** en un alojamiento estático con HTTPS. Las pantallas no dependen de rutas de servidor. El progreso permanece local en cada origen; publicar no traslada automáticamente el progreso del navegador. No se ha publicado en un servicio externo como parte de esta implementación.

Prueba Chromium opcional en este entorno (servidor activo en 5173):

```bash
PLAYWRIGHT_MODULE=/opt/codex/cua_node/lib/node_modules/playwright \
CHROMIUM_PATH=/usr/bin/chromium node scripts/smoke-browser.cjs
```

En otra máquina, proporciona `PLAYWRIGHT_MODULE` apuntando a una instalación de Playwright y `CHROMIUM_PATH` a Chromium; ambos son herramientas opcionales de QA, no dependencias del producto. `APP_URL` permite probar otro servidor. Las capturas se guardan en /tmp.

Para la prueba Chromium específica del recorrido nuevo usa los mismos parámetros de entorno con `node scripts/smoke-development.cjs`. Comprueba descarga del código propio, casos guiados, lenguajes, simulación solo desarrollo, recarga y anchuras 1440/390/320 px.

Prueba de la Ruta PySpark: `node scripts/smoke-pyspark.cjs` con las mismas variables opcionales `PLAYWRIGHT_MODULE`, `CHROMIUM_PATH` y `APP_URL`. Verifica fragmentos, descarga propia, nueve casos de transferencia y simulación PySpark reanudable, en escritorio y móvil.

Prueba Chromium de semana 11: `node scripts/smoke-week11.cjs` con las mismas variables de QA. Revisa lecciones, pipeline/sesión, ambos lenguajes, pantalla móvil y simulación prioritaria reanudable.
