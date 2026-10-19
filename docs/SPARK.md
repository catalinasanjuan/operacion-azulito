# Misión Spark — implementación y fuentes

La aplicación existente conserva las 160 preguntas, 45 lecciones, motor y resultados Hadoop/Hive. Un selector de misión permite pasar a Spark. Ambas misiones usan los estilos existentes, la escala chilena y la exportación/importación del mismo progreso.

## Fuentes verificadas

Se consultaron los tres archivos originales de `juliopez/Hadoop`, en `material_docente/presentaciones`, fijados al commit **6dbb5edb023d218b50b9d2494676ceb0de51ecb5**. Los enlaces de cada actividad apuntan a esa revisión, para evitar que una modificación posterior cambie su trazabilidad.

- [Semana_09_SPARK.md](https://github.com/juliopez/Hadoop/blob/6dbb5edb023d218b50b9d2494676ceb0de51ecb5/material_docente/presentaciones/Semana_09_SPARK.md): historia, memoria/disco, arquitectura, ejecución, RDD, transformaciones, acciones, DAG, DataFrames y panorama del ecosistema, HDFS/Hive, Scala/Python.
- [Semana_09_SPARK_Ejercicios.md](https://github.com/juliopez/Hadoop/blob/6dbb5edb023d218b50b9d2494676ceb0de51ecb5/material_docente/presentaciones/Semana_09_SPARK_Ejercicios.md): Standalone, parallelize, particiones, map/filter, evaluación diferida, lectura HDFS, parsing y agregaciones RDD; ejercicios 1–15.
- [Semana_10_SPARK_Ejercicios.md](https://github.com/juliopez/Hadoop/blob/6dbb5edb023d218b50b9d2494676ceb0de51ecb5/material_docente/presentaciones/Semana_10_SPARK_Ejercicios.md): DataFrames, esquema inferido/explícito, select/filter/withColumn, CSV, groupBy/agg, SQL, fechas, comparaciones Hive y programas .py; ejercicios 1–17.

Los ejercicios indican si adaptan una actividad o son una aplicación original de sus conceptos. No se incorporó contenido de semanas 11/12. El panorama teórico de Streaming/MLlib/GraphX no se convierte en ejercicios avanzados ajenos a las guías prácticas.

## Contenido y experiencia

| Semana | Lecciones | Ejercicios | Contenido |
|---|---:|---:|---|
| 9 | 8 | 20 | Arquitectura, RDD, particiones, Scala/PySpark, transformaciones/acciones, lazy evaluation, HDFS y ventas |
| 10 | 9 | 22 | DataFrames, esquemas, columnas, filtros, CSV, agregaciones, SQL, fechas, programas y documentación |
| Total | 17 | 42 | 10 de reconocimiento, 6 de completar, 9 de corrección, 12 de construcción y 5 casos |

**32/42 actividades requieren completar, corregir o producir código.** Los ejercicios de nivel 0 piden respuestas cortas; las lecciones tienen una comprobación conceptual. El laboratorio no se reduce a alternativas.

Cada ejercicio conserva un ID estable, semana/concepto, lenguaje, nivel, plantilla, objetivo de salida, pistas, solución, explicación, fuente y modo de revisión. Cada lección ofrece explicación, analogía, código, lectura línea por línea, comprobación y resumen. El glosario se consulta en la misma pantalla. El editor usa texto plano con una vista de resaltado; Tab mantiene la navegación accesible.

El laboratorio permite sesiones de hasta seis ejercicios o elegir uno del banco. Detective filtra las correcciones. Modo 4,0 prioriza conceptos débiles, evita variantes recientes cuando hay suficientes y avanza de niveles 0–1 a 2 y 3 según aciertos sin ayuda. Nunca duplica un ejercicio dentro de una sesión ni promete aprobación. Sus sesiones adaptan la selección al prepararse; los errores alimentan las sesiones siguientes.

Las simulaciones de 10/20 minutos y las configurables combinan lectura/predicción, completar, corregir y desarrollo. El tiempo es orientativo: no hay entrega forzada. Se bloquea material de ayuda y cambio de misión durante una simulación. La sesión se guarda y puede retomarse tras recargar. Salir sin entregar conserva borradores y no crea una nota.

## Qué valida realmente

| Mecanismo | Cantidad | Evidencia |
|---|---:|---|
| Respuesta cerrada | 10 | Valor numérico o término conceptual del enunciado |
| Modelo RDD local | 10 | Analiza una gramática restringida e interpreta operaciones sobre la colección finita del ejercicio; compara resultado y operaciones solicitadas |
| Proyección DataFrame | 3 | Analiza la estructura de `df.select(...).show()`, las columnas y su orden; acepta nombres y objetos `df.columna` |
| Rúbrica guiada | 15 | La estudiante contrasta criterios y referencia; no se certifica corrección ni se dan puntos automáticos |
| Spark real requerido | 4 | Casos de clúster/HDFS/programas que necesitan ejecutarse fuera de esta web; quedan pendientes de verificación |

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
