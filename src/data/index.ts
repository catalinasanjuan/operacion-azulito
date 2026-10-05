import w5 from './questions/week5.json'; import w6 from './questions/week6.json'; import w7 from './questions/week7.json'; import w8 from './questions/week8.json';
import l5 from './lessons/week5.json'; import l6 from './lessons/week6.json'; import l7 from './lessons/week7.json'; import l8 from './lessons/week8.json';
import type {Question,Lesson,Week} from '../types';
export const questions = [...w5,...w6,...w7,...w8] as Question[];
export const lessons = [...l5,...l6,...l7,...l8] as Lesson[];
export const weeks:Week[]=[5,6,7,8];
export const weekNames:Record<Week,string>={5:'HDFS',6:'Apache Hive',7:'Datos y persistencia',8:'HiveQL progresivo'};
export const conceptName=(id:string)=>lessons.find(l=>l.id===id)?.title ?? ({ls:'Listar archivos',mkdir:'Crear directorios',put:'Cargar a HDFS',get:'Recuperar desde HDFS',cat:'Inspeccionar contenido',mv:'Mover y renombrar',rm:'Eliminar archivos',du:'Espacio utilizado',df:'Capacidad HDFS',count:'Contar registros / archivos',stat:'Factor configurado',setrep:'Solicitar replicación',fsck:'Diagnóstico HDFS',report:'Estado del clúster',limit:'LIMIT',where:'WHERE',sum:'SUM',avg:'AVG',or:'OR',select:'SELECT',from:'FROM',types:'Tipos de columnas',table:'Tablas',metadata:'Metadata Hive',corruption:'Corrupción y bloques faltantes',conditions:'Condiciones combinadas',executive:'Informe ejecutivo',interpretation:'Interpretar resultados',hiveql:'HiveQL',volume:'Volumen persistente',container:'Contenedores',local:'Local versus HDFS','hdfs-hive':'HDFS versus Hive'} as Record<string,string>)[id] ?? id;
