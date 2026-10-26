import {checkCode} from './validator';
import {exercises,sparkLessons} from './content';
import {grade,shuffle} from '../lib/engine';
import type {Scale} from '../types';
import type {Exercise,SparkAttempt,SparkExam,SparkProgress,SparkSession} from './types';
export const initialSpark=():SparkProgress=>({version:1,lessons:[],attempts:[],exams:[],drafts:{},session:null});
const obj=(x:unknown):x is Record<string,unknown>=>!!x&&typeof x==='object'&&!Array.isArray(x);
const time=(x:unknown)=>typeof x==='number'&&Number.isFinite(x)&&x>=0;
const idsOK=(x:unknown):x is string[]=>Array.isArray(x)&&x.length>0&&x.length<=exercises.length&&new Set(x).size===x.length&&x.every(id=>exercises.some(e=>e.id===id));
const scaleOK=(s:unknown):s is Scale=>obj(s)&&[s.min,s.pass,s.max,s.threshold].every(time)&&Number(s.min)>=1&&Number(s.min)<Number(s.pass)&&Number(s.pass)<Number(s.max)&&Number(s.max)<=7&&Number(s.threshold)>0&&Number(s.threshold)<100;
function attemptOK(a:unknown):a is SparkAttempt{
 if(!obj(a))return false;const e=exercises.find(e=>e.id===a.exerciseId);
 return !!e&&a.outcome===checkCode(e,String(a.answer??'')).outcome&&typeof a.id==='string'&&a.id.length>0&&time(a.at)&&typeof a.answer==='string'&&a.answer.length<=12000&&['correct','incorrect','review'].includes(String(a.outcome))&&Number.isInteger(a.hints)&&Number(a.hints)>=0&&Number(a.hints)<=e.hints.length&&typeof a.solutionSeen==='boolean'&&['lab','detective','minimum','exam'].includes(String(a.mode))&&Array.isArray(a.criteria)&&a.criteria.every(v=>typeof v==='boolean')&&a.criteria.length===(e.validation.kind==='rubric'||e.validation.kind==='runtime'?e.validation.criteria.length:0)&&(!['rubric','runtime'].includes(e.validation.kind)||a.outcome==='review');
}
const formatOK=(s:Record<string,unknown>)=>(s.format===undefined||s.format==='mixed'||s.format==='development'&&Array.isArray(s.ids)&&s.ids.every(id=>exercises.some(e=>e.id===id&&e.training&&e.training.format!=='block'&&(e.task==='case'||e.task==='build'))));
function sessionOK(s:unknown):s is SparkSession{return obj(s)&&formatOK(s)&&typeof s.id==='string'&&idsOK(s.ids)&&Number.isInteger(s.index)&&Number(s.index)>=0&&Number(s.index)<s.ids.length&&time(s.started)&&Number.isInteger(s.duration)&&Number(s.duration)>=1&&Number(s.duration)<=180&&scaleOK(s.scale)&&obj(s.answers)&&Object.entries(s.answers).every(([id,a])=>(s.ids as string[]).includes(id)&&typeof a==='string'&&a.length<=12000);}
export function parseSpark(x:unknown):SparkProgress{
 if(!obj(x)||x.version!==1||!Array.isArray(x.lessons)||new Set(x.lessons).size!==x.lessons.length||!x.lessons.every(id=>sparkLessons.some(l=>l.id===id))||!Array.isArray(x.attempts)||!x.attempts.every(attemptOK)||new Set(x.attempts.map(a=>a.id)).size!==x.attempts.length||!Array.isArray(x.exams)||!obj(x.drafts)||(x.session!==null&&!sessionOK(x.session)))throw Error('Progreso Spark inválido. No se reemplazaron tus datos.');
 if(!Object.entries(x.drafts).every(([id,a])=>exercises.some(e=>e.id===id)&&typeof a==='string'&&a.length<=12000))throw Error('Borradores Spark inválidos.');
 if(!x.exams.every(e=>obj(e)&&formatOK(e)&&typeof e.id==='string'&&time(e.at)&&time(e.started)&&Number(e.at)>=Number(e.started)&&Number.isInteger(e.duration)&&Number(e.duration)>=1&&Number(e.duration)<=180&&scaleOK(e.scale)&&idsOK(e.ids)&&Array.isArray(e.attempts)&&e.attempts.length===e.ids.length&&e.attempts.every((a,i)=>attemptOK(a)&&a.mode==='exam'&&a.exerciseId===(e.ids as string[])[i]&&a.hints===0&&!a.solutionSeen)))throw Error('Simulaciones Spark inválidas.');
 return x as unknown as SparkProgress;
}
export function competencies(p:SparkProgress){return [...new Set(exercises.map(e=>e.concept))].map(concept=>{const all=p.attempts.filter(a=>exercises.find(e=>e.id===a.exerciseId)?.concept===concept);const checked=all.filter(a=>a.outcome!=='review');const independent=checked.filter(a=>a.outcome==='correct'&&!a.hints&&!a.solutionSeen);const unique=new Set(independent.map(a=>a.exerciseId));const writing=independent.some(a=>exercises.find(e=>e.id===a.exerciseId)!.level>=1);return {concept,attempts:all.length,hits:checked.filter(a=>a.outcome==='correct').length,checked:checked.length,reviews:all.length-checked.length,hints:all.reduce((n,a)=>n+a.hints,0),mastered:unique.size>=2&&writing&&checked.slice(-3).every(a=>a.outcome==='correct'),weakness:all.reduce((n,a)=>n+(a.outcome==='incorrect'?2:a.outcome==='review'?.5:0)+a.hints*.5,0)/(all.length||1)};});}
export function selectPractice(p:SparkProgress,options:{week?:number;level?:number;detective?:boolean;minimum?:boolean;count:number},rng:()=>number=Math.random):Exercise[]{
 const correct=p.attempts.filter(a=>a.outcome==='correct'&&!a.hints&&!a.solutionSeen).length;
 const maxLevel=options.minimum?(correct<2?1:correct<5?2:3):4;
 let bank=exercises.filter(e=>(!options.week||e.week===options.week)&&(options.level===undefined||e.level===options.level)&&(!options.detective||e.task==='fix')&&(!options.minimum||e.fundamental&&e.level<=maxLevel));
 const stats=competencies(p);const recent=p.attempts.slice(-4).map(a=>a.exerciseId);
 const available=bank.filter(e=>!recent.includes(e.id));if(available.length>=Math.min(options.count,bank.length))bank=available;
 const weighted=shuffle(bank,rng).map(e=>{const s=stats.find(s=>s.concept===e.concept)!;const last=p.attempts.filter(a=>a.exerciseId===e.id).at(-1);return {e,score:s.weakness*3+(last?.outcome==='incorrect'?2:0)+(!s.attempts?1:0)-(recent.includes(e.id)?5:0)-(last?.outcome==='correct'?1:0)};}).sort((a,b)=>b.score-a.score);
 const result:Exercise[]=[];while(weighted.length&&result.length<options.count){let i=weighted.findIndex(x=>x.e.concept!==result.at(-1)?.concept);if(i<0)i=0;result.push(weighted.splice(i,1)[0].e);}return result;
}
export function selectSparkExam(count:number,weeks:number[],rng:()=>number=Math.random){
 const bank=shuffle(exercises.filter(e=>weeks.includes(e.week)),rng);
 if(!weeks.length)throw Error('Selecciona al menos una semana.');if(!Number.isInteger(count)||count<4||count>bank.length)throw Error(`Selecciona entre 4 y ${bank.length} ejercicios para combinar lectura, completar, corregir y desarrollo.`);
 const result:Exercise[]=[];for(const tasks of [['read'],['complete'],['fix'],['build','case']]){const e=bank.find(e=>tasks.includes(e.task)&&!result.includes(e));if(!e)throw Error('La selección no cubre todos los tipos de ejercicio.');result.push(e);}
 // Include both selected weeks whenever possible.
 for(const week of weeks){if(result.some(e=>e.week===week))continue;const e=bank.find(e=>e.week===week&&!result.includes(e));if(e&&result.length<count)result.push(e);}
 result.push(...bank.filter(e=>!result.includes(e)).slice(0,count-result.length));return shuffle(result,rng);
}
export function examSummary(exam:SparkExam){const automatic=exam.attempts.filter(a=>{const v=exercises.find(e=>e.id===a.exerciseId)!.validation;return v.kind!=='rubric'&&v.kind!=='runtime';});const verified=automatic.filter(a=>a.outcome!=='review');const hits=verified.filter(a=>a.outcome==='correct').length;const percentage=verified.length?100*hits/verified.length:0;return {total:exam.ids.length,automatic:automatic.length,verified:verified.length,hits,pending:exam.ids.length-verified.length,percentage,grade:verified.length?grade(percentage,exam.scale):null};}

export function selectDevelopmentExam(count:number,weeks:number[],language:'Scala'|'PySpark'|'both'='Scala',focus:'priority'|'all'|'transfer'='priority',rng:()=>number=Math.random):Exercise[]{
 const pool=shuffle(exercises.filter(e=>e.training&&e.training.format!=='block'&&weeks.includes(e.week)&&(language==='both'||e.language===language)&&(focus==='all'||(focus==='transfer'?e.training.track==='transfer':e.training.track!=='transfer'))),rng);
 if(!weeks.length)throw Error('Selecciona al menos una semana.');
 if(!Number.isInteger(count)||count<1||count>pool.length)throw Error(`Hay ${pool.length} casos completos de desarrollo para estos filtros. Elige entre 1 y ${pool.length} o amplía la selección.`);
 const result:Exercise[]=[];
 if(focus==='priority'&&count>=2){for(const track of ['exercise12','level4']){const e=pool.find(e=>e.training?.track===track);if(e)result.push(e);}}
 for(const week of weeks){if(result.length>=count)break;if(!result.some(e=>e.week===week)){const e=pool.find(e=>e.week===week&&!result.includes(e));if(e)result.push(e);}}
 result.push(...pool.filter(e=>!result.includes(e)).slice(0,count-result.length));return shuffle(result,rng);
}
