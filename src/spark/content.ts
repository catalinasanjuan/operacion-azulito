import week11 from './week11-exercises.json';
import week11Lessons from './week11-lessons.json';
import pysparkDevelopment from './pyspark-development.json';
import development from './development.json';
import bank from './exercises.json';
import units from './lessons.json';
import type {Exercise,SparkLesson,WeekContent} from './types';
const allExercises=[...bank,...development,...pysparkDevelopment,...week11] as Exercise[];
export const sourceCommit='6dbb5edb023d218b50b9d2494676ceb0de51ecb5';
export const week11SourceCommit='11d2cee2b28af20d7da8b9692595962d59ea0582';
export const sourceURL=(file:string)=>`https://github.com/juliopez/Hadoop/blob/${file==='Semana_11_SPARK_Ejercicios.md'?week11SourceCommit:sourceCommit}/material_docente/presentaciones/${file}`;
export const sparkWeeks:WeekContent[]=[
 {id:9,title:'Fundamentos y RDD',version:3,status:'published',sources:['Semana_09_SPARK.md','Semana_09_SPARK_Ejercicios.md'],concepts:[...new Set(allExercises.filter(e=>e.week===9).map(e=>e.concept))]},
 {id:10,title:'DataFrames y Spark SQL',version:3,status:'published',sources:['Semana_10_SPARK_Ejercicios.md'],concepts:[...new Set(allExercises.filter(e=>e.week===10).map(e=>e.concept))]},
 {id:11,title:'Pipeline batch y SparkSession',version:1,status:'published',sources:['Semana_11_SPARK_Ejercicios.md'],concepts:[...new Set(allExercises.filter(e=>e.week===11).map(e=>e.concept))]}
];
export const publishedSparkWeeks=sparkWeeks.filter(w=>w.status==='published');
export const exercises=allExercises.filter(e=>publishedSparkWeeks.some(w=>w.id===e.week));
export const developmentExercises=exercises.filter(e=>e.training);
export const sparkLessons=([...units,...week11Lessons] as SparkLesson[]).filter(l=>publishedSparkWeeks.some(w=>w.id===l.week));
export const glossary:Record<string,string>={Pipeline:'Secuencia de lectura, validación, integración, transformación, agregación y persistencia. Aquí es batch, no ML Pipeline.',Parquet:'Formato columnar con esquema para guardar y recuperar el producto de datos.',Batch:'Procesamiento de un conjunto acumulado ya disponible. Repetirlo periódicamente no lo convierte en streaming.',RDD:'Colección distribuida e inmutable, dividida en particiones; conserva su lineage.',Partición:'División lógica de datos para organizar tareas. No equivale a Worker ni bloque HDFS.',Transformación:'Operación que produce una representación nueva y describe un plan: map, filter, select.',Acción:'Operación que solicita un resultado y desencadena el procesamiento necesario: count, take, show.',DataFrame:'Datos distribuidos con filas, columnas y esquema.',Esquema:'Nombres, tipos y nulabilidad de las columnas.',Master:'Administrador de recursos del clúster Standalone.',Worker:'Nodo que aporta recursos donde pueden ejecutarse Executors.',Driver:'Proceso que coordina la aplicación Spark.',Executor:'Proceso de una aplicación que ejecuta Tasks en un Worker.',Shuffle:'Redistribución de datos entre particiones, por ejemplo para agregar por clave.',DAG:'Grafo dirigido sin ciclos que describe dependencias entre operaciones.',SparkContext:'Punto de acceso a las operaciones RDD; sc es su referencia en las consolas.',SparkSession:'Punto de entrada a DataFrames y Spark SQL; spark es su referencia habitual.',Stage:'Etapa de un Job que agrupa tareas; el shuffle puede separar etapas.',Task:'Unidad de procesamiento sobre una partición, ejecutada por un Executor.',Lineage:'Historial de transformaciones que permite reconstruir particiones.',Job:'Trabajo desencadenado por una acción; puede dividirse en Stages y Tasks.',Scala:'Lenguaje de la API con funciones como x => x * 2.',PySpark:'API de Spark en Python; usa funciones como lambda x: x * 2.'};

export const conceptLabels:Record<string,string>={architecture:'Arquitectura Spark',partitions:'Particiones y paralelismo',rdd:'Colecciones RDD',transformations:'Transformaciones',map:'Transformar con map',filter:'Filtrar RDD',languages:'Scala y PySpark',actions:'Acciones',lazy:'Evaluación diferida',hdfs:'Lectura desde HDFS','sales-rdd':'Ventas con RDD',dataframe:'DataFrames',schema:'Esquemas',select:'Seleccionar columnas','filter-df':'Filtrar DataFrames',withColumn:'Columnas derivadas',csv:'CSV y estructura',aggregation:'Agrupar y agregar',sql:'Spark SQL',dates:'Fechas y meses','sales-df':'Ventas con DataFrames',program:'Programas PySpark',pipeline:'Pipeline batch','spark-session':'SparkSession y ciclo de vida','join-validation':'Validar integración y faltantes','parquet-validation':'Parquet y validación de salida'};

export const examPriorities=[
 {track:'exercise12',week:10,label:'Semana 10 · Nivel 3 · Ejercicio 12'},
 {track:'level4',week:10,label:'Semana 10 · Nivel 4 completo'},
 {track:'pipeline',week:11,label:'Semana 11 · Pipeline batch'},
 {track:'session',week:11,label:'Semana 11 · SparkSession'},
] as const;
