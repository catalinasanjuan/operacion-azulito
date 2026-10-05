# Verificación — 2026-10-05

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
