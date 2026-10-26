# Verificación

## Desarrollo de la prueba — 2026-10-26

- Estado inicial de esta ampliación: 30/30 pruebas aprobadas; checkout sin cambios.
- Guías contrastadas en el repositorio del profesor: semana 10, nivel 3, ejercicio 12 y nivel 4 completo; se comprobó que las semanas Spark publicadas en presentaciones son 9/10. Mismo commit académico fijado.
- 14 casos nuevos (10 Scala / 4 PySpark), conservando los 42 anteriores: total 56. Se comprueban referencias, datos y resultados esperados de la muestra; no se afirma ejecución Spark.
- `npm test`: **36 pruebas aprobadas, 0 fallos ni omisiones**. Incluye selección de casos sin alternativas, focos/lenguajes, cobertura nivel 4, resultados de la muestra, formato de sesiones, compatibilidad, código propio descargable y todos los flujos anteriores.
- `npm run build`: TypeScript/Vite correctos. Prueba Chromium sobre la compilación servida por preview: recorrido focalizado, lenguajes, descarga, recarga/entrega de simulación y escritorio/móvil. No se certifica ejecución Scala/PySpark ni compatibilidad de clúster.


## Misión Spark — 2026-10-19

- Estado inicial antes de cambios: 15/15 pruebas aprobadas, TypeScript y Vite correctos, checkout limpio.
- Estado final: `npm test` ejecutó **30 pruebas: 30 aprobadas, 0 fallidas, 0 omitidas**. Incluye las 15 originales sin cambiar sus expectativas.
- `npm run build`: TypeScript correcto y compilación estática generada en `dist/`. React se separa como vendor para mantener los bundles debajo del umbral de aviso de Vite.
- Banco: 42 ejercicios únicos (20 semana 9 / 22 semana 10), 17 lecciones; referencias comprobadas en todos los validadores automáticos y revisión explícita para rúbricas/runtime.
- Nuevas pruebas: integridad, equivalencias de código, rechazo de resultados incorrectos y mezclas de sintaxis, gramática acotada sin ejecución arbitraria, migración antigua, módulos independientes, importación inválida, persistencia, adaptación/espaciamiento, dominio sin ayudas y simulaciones sin duplicados.
- Flujos DOM: navegación entre misiones, lecciones, código, pistas, rúbrica, borradores, reanudación tras desmontar, entrega, exportación conjunta e importación; JSON corrupto preservado.
- Chromium real: `scripts/smoke-browser.cjs` pasó en el servidor de desarrollo y en el build servido por `npm run preview`. Comprobó escritura/validación, respuesta guardada tras recarga, entrega y regreso a Hadoop/Hive, sin errores de página.
- Revisión de capturas a 1440 px (escritorio) y 390 px (móvil): navegación y editor visibles; sin desbordamiento horizontal de la página. Capturas temporales en `/tmp/azulito-spark-*.png`.
- Node 24.19.0 / npm 11.9.0. Sin nuevas dependencias de aplicación ni cambios en el lockfile.

Limitaciones: no se ejecutaron PySpark, Scala ni el clúster del profesor; sus cuatro actividades se marcan como pendientes de Spark real. La validación local comprueba los casos cerrados documentados, no código Spark general. No se certifican Firefox/Safari ni accesibilidad completa. No se realizó despliegue externo. Fuentes y extensión de semanas en [SPARK.md](SPARK.md).

## Registro original de Hadoop/Hive — 2026-10-05

## Resultados reproducibles

- `npm test`: 15 tests, 15 aprobados, 0 fallos.
- `npm run build`: TypeScript sin errores; Vite genera `dist/index.html` y assets.
- Node 24.19.0, npm 11.9.0.
- Banco: 160 IDs y prompts únicos; cuatro alternativas únicas por pregunta, índice válido, explicaciones y fuentes no vacías; conceptos asociados a lecciones.
- Distribución: 40 / 45 / 30 / 45 por semanas 5 / 6 / 7 / 8; 49 básicas, 79 intermedias, 32 difíciles.

## Qué se probó

1. Escala chilena por tramos, límites y configuración diferente.
2. Integridad y validación de errores deliberados del banco.
3. Correspondencia respuesta/alternativas/explicaciones después de mezclar (160 preguntas × 8 semillas).
4. Simulación sin duplicados, balance de semanas y dificultad (5 tamaños × 100 semillas); filtros específicos y rechazo de combinaciones insuficientes.
5. Adaptación determinista: prioridad de errores/dudas, repaso espaciado, variantes, prioridad distinta de cantidad de preguntas y peso mínimo para conceptos dominados.
6. Semáforo: muestras insuficientes, riesgo, inestabilidad, consistencia, colchón y escalas distintas.
7. Serialización, guardado/relectura, rechazo de formatos e índices inválidos, conservación de datos ante importación fallida.
8. Integración React sobre DOM simulado: montaje inicial, navegación, aprendizaje semanas 5–8, explicación fácil, marcas, práctica con feedback, Modo 4,0, Express, cambio y navegación de respuestas en simulación sin feedback, bloqueo del material, cierre/reapertura conservando sesión, entrega confirmada, resultados, progreso, mapa, escala, exportación/importación y doble confirmación de reinicio.
9. Entrega anticipada: respuestas omitidas cuentan como errores, la simulación no cuenta como muestra válida del semáforo.

## Alcance real de la verificación

Los tests de integración usan `happy-dom`, no un navegador real. Comprueban eventos, renders y persistencia, pero **no certifican presentación visual, compatibilidad Safari/Firefox ni consola de navegador**. El entorno de esta tarea no expone la infraestructura de preview/navegador admitida para una revisión visual.

El CSS contiene diseños adaptables a desktop, tablet y móvil, contraste legible, foco visible, estados con texto y símbolos, controles etiquetados y enlace para saltar al contenido. Esto se inspeccionó en código; la revisión visual real permanece pendiente.

Las preguntas se contrastaron con el temario maestro suministrado. No se encontraron guías originales, por lo que no se afirma contraste con documentos docentes no disponibles.

## Criterios implementados y ejercitados

Aprender, práctica, 4,0, Express, simulación, progreso, mapa/comandos, semanas 5–8, banco mínimo, nota/configuración, persistencia, JSON, adaptación por errores, mezcla, ausencia de duplicados, estadísticas y recomendaciones tienen cobertura automatizada. README describe ejecución, arquitectura, contenido y funcionamiento.

## No incluido

Despliegue público, autenticación, backend, IA o PWA instalable. La entrega está lista para instalación y ejecución local.
