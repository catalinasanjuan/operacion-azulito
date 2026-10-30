import test from 'node:test';import assert from 'node:assert/strict';
import oldBank from '../src/spark/exercises.json';import oldDevelopment from '../src/spark/development.json';import oldPy from '../src/spark/pyspark-development.json';
import {exercises,sparkLessons,sourceURL,sourceCommit,week11SourceCommit,examPriorities,developmentExercises} from '../src/spark/content.ts';
import fixture from '../src/spark/week11-fixture.json';
import {selectDevelopmentExam,initialSpark,parseSpark,examSummary} from '../src/spark/progress.ts';
import {parseProgress,initial} from '../src/lib/storage.ts';import {defaultScale,seeded} from '../src/lib/engine.ts';import {checkCode} from '../src/spark/validator.ts';import type {SparkAttempt} from '../src/spark/types.ts';
test('Week 11 adds sourced pipeline/session learning while keeping all prior exercises byte-for-byte',()=>{
 const newBank=exercises.filter(e=>e.week===11);assert.equal(newBank.length,14);assert.equal(newBank.filter(e=>e.language==='PySpark').length,8);assert.equal(newBank.filter(e=>e.language==='Scala').length,6);assert.equal(newBank.filter(e=>e.training?.track==='pipeline').length,10);assert.equal(newBank.filter(e=>e.training?.track==='session').length,4);assert.equal(sparkLessons.filter(l=>l.week===11).length,6);
 assert.deepEqual(exercises.filter(e=>e.week<=10),[...oldBank,...oldDevelopment,...oldPy]);
 for(const e of newBank){assert.equal(e.validation.kind,'runtime');assert.equal(checkCode(e,e.solution).outcome,'review');assert.ok(e.training?.context&&e.training.steps.length>=3);assert.equal(e.source.file,'Semana_11_SPARK_Ejercicios.md');if(e.language==='Scala')assert.match(e.explanation,/adaptación explícita a Scala/);}
 assert.equal(developmentExercises.filter(e=>e.week===11&&e.training?.format==='block').length,3);
});
test('Source links retain old revisions and use the actual published week 11 revision',()=>{
 assert.ok(sourceURL('Semana_10_SPARK_Ejercicios.md').includes(sourceCommit));assert.ok(sourceURL('Semana_11_SPARK_Ejercicios.md').includes(week11SourceCommit));assert.equal(week11SourceCommit,'11d2cee2b28af20d7da8b9692595962d59ea0582');assert.deepEqual(examPriorities.map(p=>[p.week,p.track]),[[10,'exercise12'],[10,'level4'],[11,'pipeline'],[11,'session']]);
});
test('Fixture independently validates boundaries, missing regions, left/inner counts and duplicate-key multiplication',()=>{
 const levels=fixture.ventas.map(v=>v.monto<100000?'BAJA':v.monto<300000?'MEDIA':'ALTA');assert.deepEqual(levels,['BAJA','MEDIA','MEDIA','ALTA','BAJA','ALTA','MEDIA']);
 const references=new Map(fixture.ciudades.map(c=>[c.ciudad,c.region]));assert.equal(fixture.ventas.filter(v=>references.has(v.ciudad)).length,6);assert.equal(fixture.ventas.filter(v=>!references.has(v.ciudad)).length,1);
 const grouped=new Map<string,number[]>();fixture.ventas.forEach((v,i)=>{const key=(references.get(v.ciudad)??'NULL')+'/'+levels[i];grouped.set(key,[...(grouped.get(key)??[]),v.monto]);});assert.equal(grouped.size,6);assert.deepEqual(grouped.get('Metropolitana/MEDIA'),[100000,200000]);assert.equal(grouped.get('Metropolitana/MEDIA')!.reduce((a,b)=>a+b)/2,150000);assert.deepEqual(grouped.get('NULL/BAJA'),[50000]);assert.deepEqual(grouped.get('Biobio/MEDIA'),[299999]);assert.deepEqual(grouped.get('Biobio/ALTA'),[300000]);
 const duplicated=[...fixture.ciudades,fixture.ciudades[0]];const joinCount=fixture.ventas.reduce((n,v)=>n+Math.max(1,duplicated.filter(c=>c.ciudad===v.ciudad).length),0);assert.equal(joinCount,10);assert.notEqual(joinCount,fixture.ventas.length);
});
test('Priority simulation with four cases covers all four confirmed topics in each language',()=>{
 for(let seed=0;seed<100;seed++)for(const language of ['Scala','PySpark','both'] as const){const selected=selectDevelopmentExam(4,[10,11],language,'priority',seeded(seed));assert.equal(selected.length,4);assert.equal(new Set(selected.map(e=>e.id)).size,4);assert.deepEqual(new Set(selected.map(e=>e.training!.track)),new Set(examPriorities.map(p=>p.track)));assert.ok(selected.every(e=>e.training!.format!=='block'&&(language==='both'||e.language===language)));}
 for(const language of ['Scala','PySpark'] as const){const subset=selectDevelopmentExam(2,[11],language,'priority',seeded(3));assert.deepEqual(new Set(subset.map(e=>e.training!.track)),new Set(['pipeline','session']));}
 const partial=selectDevelopmentExam(1,[10,11],'PySpark','priority');assert.equal(partial.length,1);assert.equal(partial[0].training!.track,'exercise12');
});
test('Week 11 drafts, lessons, attempts and resumed exams roundtrip without losing old Hadoop/Spark data',()=>{
 const p=initial();p.studied=['hdfs'];p.spark!.lessons=['architecture','w11-session'];const e=exercises.find(e=>e.id==='spark-dev-w11-muestra-py')!;p.spark!.drafts[e.id]=e.solution;p.spark!.session={format:'development',id:'w11',ids:[e.id],index:0,answers:{[e.id]:e.solution},duration:40,started:1,scale:{...defaultScale}};assert.deepEqual(parseProgress(JSON.stringify(p)),p);
 const a:SparkAttempt={id:'w11-attempt',exerciseId:e.id,answer:e.solution,at:2,hints:0,solutionSeen:false,outcome:'review',mode:'exam',criteria:e.validation.kind==='runtime'?e.validation.criteria.map(()=>true):[]};p.spark!.session=null;p.spark!.attempts=[a];p.spark!.exams=[{format:'development',id:'w11',ids:[e.id],started:1,at:2,duration:40,scale:{...defaultScale},attempts:[a]}];const recovered=parseProgress(JSON.stringify(p));assert.deepEqual(recovered,p);assert.equal(examSummary(recovered.spark!.exams[0]).grade,null);
 const bad=initialSpark();bad.session={id:'bad',format:'development',ids:['spark-dev-w11-integrar-py'],index:0,answers:{},started:1,duration:10,scale:{...defaultScale}};assert.throws(()=>parseSpark(bad));
});
