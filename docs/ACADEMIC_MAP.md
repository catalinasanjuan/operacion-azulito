# Mapa académico y procedencia

Fuente utilizada: temario maestro completo de Operación Azulito entregado por la usuaria. Fecha de inspección: 2026-10-05. Repositorio GitHub vacío; workspace sin las cinco guías solicitadas. No se consultaron fuentes académicas externas.

| Semana | Objetivo | Ejes evaluables | Casos de laboratorio |
|---|---|---|---|
| 5 | Administrar e inspeccionar archivos HDFS | Namespace, NameNode/DataNode, bloques, replicación, operaciones, diagnósticos, organización | 128 MiB; 29/155/305 MiB; 1 DataNode, factor 3, HEALTHY; local/HDFS; RAW/PROCESSED/ARCHIVE |
| 6 | Estructurar y consultar archivos | Hive/HDFS, Metastore, base/tabla/tipos, LOCATION, externa/administrada, DROP, filtros/agregados, JOIN, partición, ALTER | Tabla externa sobre archivos HDFS; DROP conserva datos del caso |
| 7 | Identificar capas que deben persistir | Host, contenedor/volumen, persistencia/backup, datos/metadata, PostgreSQL Metastore, namespace/bloques | Bloques antiguos sin mapa suficiente para reconstrucción automática |
| 8 | Transformar preguntas en HiveQL | Selección, comparación, condiciones, agrupación, agregación, orden y análisis | ventas_hive: id_venta, fecha, cliente, ciudad, categoria, monto; análisis 2026 y campaña |

## Distinciones rectoras

- HDFS almacena archivos distribuidos; Hive agrega estructura lógica y consultas.
- NameNode administra namespace y metadata HDFS; DataNode guarda bloques.
- Hive Metastore describe tablas; no sustituye al NameNode.
- Archivo lógico, bloque y réplica son unidades distintas.
- Under-replicated no equivale automáticamente a corrupto.
- LOCATION vincula definición externa con archivos existentes.
- Datos pueden sobrevivir a la eliminación de metadata externa en el caso trabajado.
- WHERE filtra filas; GROUP BY agrupa; HAVING filtra grupos; ORDER BY ordena.
- Contenedor no equivale a volumen; persistencia no equivale a backup.
- Bloques físicos presentes no garantizan recuperar nombres y rutas originales.

## Salvaguardas editoriales

160 prompts escritos individualmente. Cada item declara semana y origen real. No hay resultados inventados del dataset: se evalúa la lógica de consultas. Las explicaciones simplifican sin introducir tecnología nueva. Los bloques y réplicas se relacionan con las cifras proporcionadas, sin parámetros oscuros.

El mini-mapa visual expresa relaciones, no un pipeline físico literal: Hive utiliza metadata de tablas y archivos HDFS; el NameNode administra su namespace y los DataNodes mantienen bloques. Docker ejecuta los servicios y los volúmenes permiten persistir recursos de cada capa.

## Pendiente académico real

Contrastar con guías originales cuando se incorporen. No se afirma aprobación por el docente ni equivalencia exacta con la prueba real.
