import test from 'node:test';
import assert from 'node:assert/strict';
import {developmentExercises,exercises} from '../src/spark/content.ts';
import fixture from '../src/spark/training-fixture.json';
import {selectDevelopmentExam,parseSpark,initialSpark,examSummary} from '../src/spark/progress.ts';
import {initial,parseProgress} from '../src/lib/storage.ts';
import {checkCode} from '../src/spark/validator.ts';
import {defaultScale,seeded} from '../src/lib/engine.ts';
import type {SparkAttempt} from '../src/spark/types.ts';
test('Development content covers guide exercise 12 and every level 4 activity with explicit Scala adaptations',()=>{
 assert.equal(developmentExercises.filter(e=>!e.id.startsWith('spark-dev-py-')).length,14);assert.equal(developmentExercises.length,32);assert.equal(developmentExercises.filter(e=>e.language==='Scala').length,10);assert.equal(developmentExercises.filter(e=>e.language==='PySpark').length,22);
 assert.equal(developmentExercises.filter(e=>e.training!.track==='exercise12').length,3);assert.equal(developmentExercises.filter(e=>e.training!.track==='level4').length,14);assert.equal(developmentExercises.filter(e=>e.training!.track==='transfer').length,15);
 for(const language of ['Scala','PySpark'])for(const id of ['16-','16-cambio-','17-'])assert.ok(developmentExercises.some(e=>e.language===language&&e.id.includes(id)));
 for(const e of developmentExercises){assert.equal(e.task,'case');assert.ok(e.validation.kind==='runtime'||e.validation.kind==='rubric');assert.ok(e.training!.context&&e.training!.steps.length>=3&&e.training!.run);assert.equal(checkCode(e,e.solution).outcome,'review');assert.ok(e.source.section);if(e.language==='Scala'&&e.training!.track==='level4')assert.match(e.explanation,/adaptación educativa/);}
 assert.ok(developmentExercises.some(e=>e.week===9));assert.ok(developmentExercises.every(e=>[9,10].includes(e.week)));
});
test('Training fixture has traceable correct totals, means, months and threshold variants without guessing real CSV totals',()=>{
 assert.equal(fixture.length,6);const technology=fixture.filter(r=>r.categoria==='Tecnologia');const group=(data:typeof fixture,key:'ciudad'|'categoria')=>Object.fromEntries([...new Set(data.map(r=>r[key]))].map(k=>[k,data.filter(r=>r[key]===k).reduce((n,r)=>n+r.monto,0)]));
 assert.deepEqual(group(technology,'ciudad'),{Santiago:245000,Concepcion:210000,Temuco:180000});assert.deepEqual(group(technology.filter(r=>r.monto>100000),'ciudad'),{Santiago:150000,Concepcion:210000,Temuco:180000});
 assert.deepEqual(group(fixture.filter(r=>r.monto>100000),'categoria'),{Tecnologia:540000,Hogar:120000});
 assert.deepEqual([1,2,3].map(m=>fixture.filter(r=>Number(r.fecha.slice(5,7))===m).reduce((n,r)=>n+r.monto,0)),[235000,305000,300000]);
 const original=[150000,85000,210000,95000,180000];assert.equal(original.reduce((a,b)=>a+b)/5,144000);assert.equal([...original,120000].reduce((a,b)=>a+b)/6,140000);
 assert.match(developmentExercises.find(e=>e.id==='spark-dev-caso-hdfs')!.expected,/deben obtenerse ejecutando/);
});
test('Development simulation selects only code cases; priority covers exercise 12 and level 4 without repetitions',()=>{
 for(let seed=0;seed<50;seed++)for(const language of ['Scala','PySpark','both'] as const){const selected=selectDevelopmentExam(2,[10],language,'priority',seeded(seed));assert.equal(selected.length,2);assert.equal(new Set(selected.map(e=>e.id)).size,2);assert.ok(selected.every(e=>e.task==='case'&&e.training&&e.week===10&&(language==='both'||e.language===language)));assert.deepEqual(new Set(selected.map(e=>e.training!.track)),new Set(['exercise12','level4']));}
 const integrated=selectDevelopmentExam(6,[9,10],'Scala','transfer',seeded(3));assert.equal(integrated.length,6);assert.deepEqual(new Set(integrated.map(e=>e.week)),new Set([9,10]));assert.ok(integrated.every(e=>e.language==='Scala'));
 assert.throws(()=>selectDevelopmentExam(20,[10],'Scala','priority'),/Hay 4 casos/);assert.throws(()=>selectDevelopmentExam(1,[9],'Scala','priority'),/Hay 0 casos/);assert.equal(selectDevelopmentExam(9,[9,10],'PySpark','transfer').length,9);assert.throws(()=>selectDevelopmentExam(1,[]),/Selecciona/);
});
test('Development drafts, resumable session and pending review survive combined export/import without invented grades',()=>{
 const p=initial();p.studied=['hdfs'];const id='spark-dev-12-scala';const e=exercises.find(e=>e.id===id)!;p.spark!.drafts[id]=e.solution;p.spark!.session={format:'development',id:'session',ids:[id],index:0,answers:{[id]:e.solution},started:1,duration:20,scale:{...defaultScale}};
 assert.deepEqual(parseProgress(JSON.stringify(p)),p);
 const a:SparkAttempt={id:'dev-attempt',exerciseId:id,at:10,answer:e.solution,outcome:'review',hints:0,solutionSeen:false,mode:'exam',criteria:e.validation.kind==='runtime'?e.validation.criteria.map(()=>true):[]};p.spark!.session=null;p.spark!.attempts=[a];p.spark!.exams=[{format:'development',id:'exam',ids:[id],at:10,started:1,duration:20,scale:{...defaultScale},attempts:[a]}];
 const restored=parseProgress(JSON.stringify(p));assert.deepEqual(restored,p);assert.deepEqual(restored.studied,['hdfs']);assert.equal(examSummary(restored.spark!.exams[0]).grade,null);assert.equal(examSummary(restored.spark!.exams[0]).pending,1);
});
test('Legacy Spark exports and mixed sessions still load; forged development formats cannot include recognition exercises',()=>{
 const p=initialSpark();p.session={id:'legacy',ids:['spark-w9-001'],index:0,answers:{},started:1,duration:10,scale:{...defaultScale}};assert.deepEqual(parseSpark(JSON.parse(JSON.stringify(p))),p);
 p.session.format='development';assert.throws(()=>parseSpark(p));p.session.format='mixed';assert.deepEqual(parseSpark(p),p);
});
