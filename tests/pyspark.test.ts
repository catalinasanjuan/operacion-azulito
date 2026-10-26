import test from 'node:test';import assert from 'node:assert/strict';
import {developmentExercises,exercises} from '../src/spark/content.ts';
import {selectDevelopmentExam,parseSpark,examSummary} from '../src/spark/progress.ts';
import {initial,parseProgress} from '../src/lib/storage.ts';
import {defaultScale,seeded} from '../src/lib/engine.ts';
import {checkCode} from '../src/spark/validator.ts';
import type {SparkAttempt} from '../src/spark/types.ts';
const py=developmentExercises.filter(e=>e.language==='PySpark');
test('PySpark has its own eight-step level 4 sequence plus independent complete cases for weeks 9 and 10',()=>{
 assert.equal(py.length,22);const blocks=py.filter(e=>e.training!.format==='block').sort((a,b)=>a.training!.order!-b.training!.order!);assert.equal(blocks.length,8);assert.equal(new Set(blocks.map(e=>e.training!.order)).size,8);assert.ok(blocks.every(e=>e.training!.track==='level4'&&e.week===10));assert.deepEqual(blocks.map(e=>e.id.split('-').at(-1)),['sesion','dataframe','promedio','ejecutar','reconstruir','decision','interpretacion','schema']);
 assert.equal(py.filter(e=>e.training!.artifact==='fragment').length,5);assert.equal(py.filter(e=>e.training!.format!=='block').length,14);
 for(const concept of ['sql','schema','aggregation','dates','withColumn','sales-rdd','rdd','program'])assert.ok(py.some(e=>e.concept===concept),concept);
 assert.equal(py.filter(e=>e.training!.track==='transfer'&&e.week===9).length,3);assert.equal(py.filter(e=>e.training!.track==='transfer'&&e.week===10).length,6);
 for(const e of blocks){assert.ok(e.source.section.includes('Ejercicio 16')||e.source.section.includes('Ejercicio 17'));assert.ok(e.training!.steps.length>=3&&e.validation.kind!=='answer');if(e.training!.artifact==='fragment')assert.match(e.training!.run,/no es un programa autónomo|No es un programa autónomo/);assert.equal(checkCode(e,e.solution).outcome,'review');}
});
test('PySpark simulation can cover priority and full-transfer programs without ever selecting short blocks',()=>{
 for(let seed=0;seed<50;seed++)for(const focus of ['priority','all','transfer'] as const){const selected=selectDevelopmentExam(3,[9,10],'PySpark',focus,seeded(seed));assert.equal(selected.length,3);assert.equal(new Set(selected.map(e=>e.id)).size,3);assert.ok(selected.every(e=>e.language==='PySpark'&&e.training!.format!=='block'&&e.training!.artifact!=='fragment'));if(focus==='priority')assert.deepEqual(new Set(selected.map(e=>e.training!.track)),new Set(['exercise12','level4']));}
 const transfer=selectDevelopmentExam(9,[9,10],'PySpark','transfer',seeded(4));assert.deepEqual(new Set(transfer.map(e=>e.week)),new Set([9,10]));assert.throws(()=>selectDevelopmentExam(15,[9,10],'PySpark','all'),/Hay 14 casos completos/);
});
test('Fragment attempts and drafts roundtrip while malformed development exams cannot label blocks as complete cases',()=>{
 const p=initial(),id='spark-dev-py-06-decision',e=exercises.find(e=>e.id===id)!;p.spark!.drafts[id]=e.solution;
 const a:SparkAttempt={id:'py-comment',exerciseId:id,answer:e.solution,at:1,outcome:'review',hints:1,solutionSeen:true,mode:'lab',criteria:e.validation.kind==='rubric'?e.validation.criteria.map(()=>true):[]};p.spark!.attempts=[a];assert.deepEqual(parseProgress(JSON.stringify(p)),p);p.spark!.session={id:'bad-fragment',format:'development',ids:[id],index:0,answers:{},started:1,duration:10,scale:{...defaultScale}};assert.throws(()=>parseSpark(p.spark));
});
test('PySpark full-program review never grants a grade just because all rubric boxes are checked',()=>{
 const e=exercises.find(e=>e.id==='spark-dev-py-caso-entrega')!,id=e.id;const a:SparkAttempt={id:'py-case',exerciseId:id,answer:e.solution,at:2,outcome:'review',hints:0,solutionSeen:false,mode:'exam',criteria:e.validation.kind==='runtime'?e.validation.criteria.map(()=>true):[]};const p=initial();p.spark!.attempts=[a];p.spark!.exams=[{id:'py-exam',ids:[id],format:'development',started:1,at:2,duration:20,scale:{...defaultScale},attempts:[a]}];assert.deepEqual(parseProgress(JSON.stringify(p)),p);assert.equal(examSummary(p.spark!.exams[0]).grade,null);assert.equal(examSummary(p.spark!.exams[0]).pending,1);
});
test('New delivery case and update exercise have independently checked expected arithmetic',()=>{
 assert.equal([120000,60000,180000].reduce((a,b)=>a+b)/3,120000);assert.equal([120000,60000,180000,40000].reduce((a,b)=>a+b)/4,100000);assert.equal([150000,85000,210000,95000,180000,120000].reduce((a,b)=>a+b)/6,140000);
 const delivery=py.find(e=>e.id==='spark-dev-py-caso-entrega')!;assert.match(delivery.expected,/120000\.0.*100000\.0/);assert.match(py.find(e=>e.id==='spark-dev-py-05-reconstruir')!.solution,/datos\.append[\s\S]*df = spark\.createDataFrame/);
});
