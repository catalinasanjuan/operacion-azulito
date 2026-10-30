import test from 'node:test';
import assert from 'node:assert/strict';
import {exercises,sparkLessons,sparkWeeks} from '../src/spark/content.ts';
import {checkCode} from '../src/spark/validator.ts';
import {initialSpark,parseSpark,competencies,selectPractice,selectSparkExam,examSummary} from '../src/spark/progress.ts';
import {initial,parseProgress,save,load,KEY} from '../src/lib/storage.ts';
import {defaultScale,seeded} from '../src/lib/engine.ts';
import {questions} from '../src/data/index.ts';
import type {SparkAttempt,SparkExam} from '../src/spark/types.ts';
const byId=(id:string)=>exercises.find(e=>e.id===id)!;
const attempt=(id:string,outcome:SparkAttempt['outcome']='correct',hints=0):SparkAttempt=>({id:crypto.randomUUID(),exerciseId:id,at:Date.now(),answer:outcome==='correct'?byId(id).solution:'0',outcome,hints,solutionSeen:false,mode:'lab',criteria:[]});
test('Spark bank: stable unique content, complete metadata, published weeks and significant writing coverage',()=>{
 assert.equal(exercises.filter(e=>!e.training).length,42);assert.equal(exercises.length,88);assert.equal(sparkLessons.length,23);assert.equal(new Set(exercises.map(e=>e.id)).size,88);assert.equal(new Set(exercises.map(e=>e.prompt)).size,88);
 assert.deepEqual(sparkWeeks.map(w=>w.id),[9,10,11]);assert.ok(exercises.filter(e=>e.level>0).length>=30);assert.ok(exercises.some(e=>e.source.origin==='original'));
 for(const e of exercises){assert.ok(sparkWeeks.some(w=>w.id===e.week&&w.status==='published'&&w.concepts.includes(e.concept)));for(const k of ['id','title','prompt','solution','expected','explanation'] as const)assert.ok(e[k].trim(),e.id+' '+k);assert.ok(e.hints.length>=2);assert.ok(e.source.file.startsWith('Semana_'));assert.ok(e.source.section);if(e.validation.kind==='runtime'||e.validation.kind==='rubric')assert.ok(e.validation.criteria.length>=2);}
 for(const l of sparkLessons){assert.ok(l.code&&l.lines.length&&l.analogy&&l.remember&&l.source.file);assert.ok(l.correct>=0&&l.correct<l.answers.length);assert.ok([9,10,11].includes(l.week));}
});
test('Spark validators: all reference answers pass or explicitly require guided/runtime review',()=>{
 for(const e of exercises){const guided=e.validation.kind==='runtime'||e.validation.kind==='rubric';assert.equal(checkCode(e,e.solution).outcome,guided?'review':'correct',e.id);if(!guided)assert.notEqual(checkCode(e,'respuesta equivocada').outcome,'correct',e.id);}
});
test('RDD validator accepts equivalent expressions, variable names, comments and chained/multiline solutions',()=>{
 const e=byId('spark-w9-011');
 for(const code of ['datos.filter(lambda n: n % 2 == 0).map(lambda n: 10 * n).sum()','# Mi análisis\na = datos.filter(lambda z: z % 2 == 0)\nb = a.map(lambda z: z * 10)\nb.reduce(lambda x, y: y + x)','datos.filter(lambda n: n % 2 == 0).map(lambda n: n * 10).reduce(lambda a, b: (a + b))'])assert.equal(checkCode(e,code).outcome,'correct',code);
 assert.equal(checkCode(byId('spark-w9-012'),'datos.filter(lambda x: x % 2 == 0).map(lambda x: x ** 2).take(3)').outcome,'correct');
 assert.equal(checkCode(byId('spark-w9-006'),'// Scala\nval resultado = datos.map(n => 2 * n); resultado.take(3)').outcome,'correct');
});
test('RDD validator rejects wrong outputs, wrong actions, mixed language, malformed syntax and constant answer bypass',()=>{
 const e=byId('spark-w9-011');
 for(const code of ['25500','datos.count()','datos.filter(lambda x: x % 2 == 1).map(lambda x: x * 10).sum()','datos.filter(lambda x: x % 2 == 0).sum()','datos.filter(x => x > 50).count()','datos.filter(lambda x: x > 50','datos.count().filter(lambda x: x > 50)'])assert.notEqual(checkCode(e,code).outcome,'correct',code);
 assert.equal(checkCode(byId('spark-w9-009'),'datos.filter(lambda x: x * 2).take(4)').outcome,'incorrect');
 assert.equal(checkCode(byId('spark-w9-010'),'datos.filter(lambda x: x >= 50).count()').outcome,'incorrect');
 assert.equal(checkCode(byId('spark-w9-005'),'datos = sc.parallelize(range(1, 100), 4)\ndatos.count()').outcome,'incorrect');
});
test('Local parser bounds work and never executes arbitrary code; unsupported valid variants remain unverified',()=>{
 const e=byId('spark-w9-011');(globalThis as Record<string,unknown>).sparkSentinel=0;
 for(const code of ['globalThis.sparkSentinel = 1','eval("globalThis.sparkSentinel = 1")','datos.__proto__.constructor("return 1")()','import os\nos.system("echo unsafe")','sc.parallelize(range(100000000), 4).sum()','sc.parallelize(range(1, 2, 0), 4).count()','datos.map(lambda x: x ** 100000).sum()', 'datos.filter(lambda x: __import__("os")).count()'])assert.notEqual(checkCode(e,code).outcome,'correct');
 assert.equal((globalThis as Record<string,unknown>).sparkSentinel,0);assert.equal(checkCode(e,'datos.filter(lambda x: x % 2 == 0).map(lambda x: x * 10).fold(0, lambda a, b: a + b)').outcome,'review');
 assert.equal(checkCode(e,'a'.repeat(12001)).outcome,'incorrect');
});
test('Projection structural validator accepts both documented Column syntaxes and rejects incorrect columns/order',()=>{
 const e=byId('spark-w10-003');for(const code of ['df.select("cliente", "ciudad").show()',"df.select('cliente', 'ciudad').show()",'df.select(df.cliente, df.ciudad).show()','df.select("cliente", df.ciudad).show()'])assert.equal(checkCode(e,code).outcome,'correct');
 for(const code of ['df.select("ciudad", "cliente").show()','df.select("cliente", "ciudad", "monto").show()','df.filter("cliente", "ciudad").show()','df.select("cliente", "ciudad")','df.select("cliente", "ciudad").show(); df.select("ciudad").show()'])assert.notEqual(checkCode(e,code).outcome,'correct');
});
test('Legacy migration preserves all Hadoop/Hive data, introduces independent Spark and roundtrips both missions',()=>{
 const old=initial();delete old.spark;delete old.mission;old.studied=['hdfs'];old.difficult=['hive'];const q=questions[0];old.attempts=[{questionId:q.id,concept:q.concept,week:q.week,difficulty:q.difficulty,chosen:q.correctAnswer,correct:true,at:1234,mode:'practice'}];
 const migrated=parseProgress(JSON.stringify(old));assert.deepEqual(migrated.studied,old.studied);assert.deepEqual(migrated.attempts,old.attempts);assert.deepEqual(migrated.spark,initialSpark());
 migrated.spark!.attempts.push(attempt('spark-w9-005'));migrated.spark!.lessons.push('architecture');migrated.spark!.drafts['spark-w9-005']='datos.count()';migrated.mission='spark';
 const db=new Map<string,string>();save(migrated,{setItem:(k,v)=>{db.set(k,v);}});assert.ok(db.has(KEY));const reloaded=load({getItem:k=>db.get(k)??null});assert.deepEqual(reloaded,migrated);assert.equal(reloaded.attempts.length,1);assert.equal(reloaded.spark!.attempts.length,1);
});
test('Spark import rejects corrupt outcomes, unknown IDs, malformed criteria and invalid session/exam state',()=>{
 const good=initialSpark();good.attempts=[attempt('spark-w9-005')];assert.deepEqual(parseSpark(good),good);
 for(const change of [(p:any)=>p.version=2,(p:any)=>p.lessons=['future-week'],(p:any)=>p.drafts.unknown='x',(p:any)=>p.attempts[0].answer='0',(p:any)=>p.attempts[0].hints=99,(p:any)=>p.attempts[0].criteria=['bad'],(p:any)=>p.session={id:'x',ids:['spark-w9-001','spark-w9-001'],index:0,answers:{},started:1,duration:10,scale:defaultScale},(p:any)=>p.exams=[{id:'bad'}]]){const bad=structuredClone(good);change(bad);assert.throws(()=>parseSpark(bad));}
});
test('Spark adaptive selection prioritizes repeated failures, spaces recent items and never duplicates in a session',()=>{
 const p=initialSpark();p.attempts=[attempt('spark-w9-005','incorrect'),attempt('spark-w9-005','incorrect')];
 const chosen=selectPractice(p,{count:6},seeded(4));assert.equal(chosen[0].concept,'rdd');assert.ok(!chosen.some(e=>e.id==='spark-w9-005'));assert.equal(new Set(chosen.map(e=>e.id)).size,chosen.length);
 const detective=selectPractice(p,{count:20,detective:true},seeded(1));assert.ok(detective.every(e=>e.task==='fix'));
 const beginner=selectPractice(initialSpark(),{minimum:true,count:42},seeded(1));assert.ok(beginner.every(e=>e.level<=1&&e.fundamental));
 p.attempts=Array.from({length:5},()=>attempt('spark-w9-005'));assert.ok(selectPractice(p,{minimum:true,count:42},seeded(1)).some(e=>e.level===3));
});
test('Spark mastery requires varied independent writing evidence; hints and rubric cannot establish mastery',()=>{
 const p=initialSpark();p.attempts=[attempt('spark-w9-007'),attempt('spark-w9-011')];assert.ok(competencies(p).find(s=>s.concept==='filter')!.mastered);
 p.attempts[1].hints=1;assert.equal(competencies(p).find(s=>s.concept==='filter')!.mastered,false);
 p.attempts=[attempt('spark-w9-007'),attempt('spark-w9-007')];assert.equal(competencies(p).find(s=>s.concept==='filter')!.mastered,false);
});
test('Spark exams combine reading/completion/correction/development across seeds without duplicate items',()=>{
 for(let seed=0;seed<100;seed++)for(const weeks of [[9],[10],[9,10]])for(const count of [4,8,12]){const exam=selectSparkExam(count,weeks,seeded(seed));assert.equal(exam.length,count);assert.equal(new Set(exam.map(e=>e.id)).size,count);for(const task of ['read','complete','fix'])assert.ok(exam.some(e=>e.task===task));assert.ok(exam.some(e=>e.task==='build'||e.task==='case'));assert.ok(exam.every(e=>weeks.includes(e.week)));}
 assert.throws(()=>selectSparkExam(4,[]));assert.throws(()=>selectSparkExam(100,[9]));assert.throws(()=>selectSparkExam(2,[9]));
});
test('Spark estimated grades exclude rubric and unsupported reviews and retain the original scale',()=>{
 const attempts=[attempt('spark-w9-001'),attempt('spark-w9-002','incorrect'),{...attempt('spark-w10-006','review'),criteria:[true,true,true]}];const exam:SparkExam={id:'exam',ids:attempts.map(a=>a.exerciseId),at:100,started:0,duration:10,scale:{...defaultScale},attempts:attempts.map(a=>({...a,mode:'exam'}))};
 const result=examSummary(exam);assert.equal(result.verified,2);assert.equal(result.pending,1);assert.equal(result.grade,3.5);assert.equal(result.percentage,50);
 exam.scale.threshold=50;assert.equal(examSummary(exam).grade,4);exam.attempts=[{...attempts[2],mode:'exam'}];exam.ids=[attempts[2].exerciseId];assert.equal(examSummary(exam).grade,null);
});
test('Unanswered simulation preserves rubric pending state and survives import; only checked automatic blanks count wrong',()=>{
 const ids=['spark-w9-001','spark-w9-018','spark-w10-006','spark-w10-003'];const p=initialSpark();const at=Date.now();
 const attempts=ids.map((id,i):SparkAttempt=>{const e=byId(id);return {id:'blank-'+i,exerciseId:id,at,answer:'',outcome:checkCode(e,'').outcome,hints:0,solutionSeen:false,mode:'exam',criteria:e.validation.kind==='rubric'||e.validation.kind==='runtime'?e.validation.criteria.map(()=>false):[]};});
 p.attempts=attempts;p.exams=[{id:'blank',ids,started:at-1000,at,duration:10,scale:{...defaultScale},attempts}];assert.deepEqual(parseSpark(JSON.parse(JSON.stringify(p))),p);const s=examSummary(p.exams[0]);assert.equal(s.verified,2);assert.equal(s.pending,2);assert.equal(s.grade,1);
});
