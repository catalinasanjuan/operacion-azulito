import type {Scale} from '../types';
export type SparkWeek = number;
export type Language = 'PySpark' | 'Scala';
export type Validation =
 | {kind:'answer'; values:(number|string)[]}
 | {kind:'rdd'; expected:number|number[]; operations:string[]}
 | {kind:'projection'; columns:string[]}
 | {kind:'rubric'|'runtime'; criteria:string[]};
export type Training = {format?:'block'|'case'; artifact?:'fragment'|'program'; order?:number; track:'exercise12'|'level4'|'transfer'|'pipeline'|'session'; context:string; steps:{title:string;body:string}[]; run:string};
export type Exercise = {training?:Training; id:string; week:SparkWeek; concept:string; title:string; language:Language; level:0|1|2|3|4; task:'read'|'complete'|'fix'|'build'|'case'; prompt:string; starter:string; expected:string; hints:string[]; solution:string; explanation:string; source:{file:string; section:string; origin:'adapted'|'original'}; validation:Validation; fundamental:boolean};
export type SparkLesson = {id:string; week:SparkWeek; title:string; explanation:string; analogy:string; code:string; lines:string[]; check:string; answers:string[]; correct:number; remember:string; source:{file:string; section:string}};
export type WeekContent = {id:number; title:string; version:number; status:'published'|'draft'; sources:string[]; concepts:string[]};
export type SparkAttempt = {id:string; exerciseId:string; at:number; answer:string; outcome:'correct'|'incorrect'|'review'; hints:number; solutionSeen:boolean; mode:'lab'|'detective'|'minimum'|'exam'; criteria:boolean[]};
export type SparkSession = {format?:'development'|'mixed'; id:string; ids:string[]; index:number; answers:Record<string,string>; started:number; duration:number; scale:Scale};
export type SparkExam = {format?:'development'|'mixed'; id:string; ids:string[]; at:number; started:number; duration:number; scale:Scale; attempts:SparkAttempt[]};
export type SparkProgress = {version:1; lessons:string[]; attempts:SparkAttempt[]; exams:SparkExam[]; drafts:Record<string,string>; session:SparkSession|null};
export type ValidationResult = {outcome:'correct'|'incorrect'|'review'; message:string; actual?:unknown};
// A future implementation must execute only on an isolated, authenticated backend.
export interface SparkRunner {run(request:{exerciseId:string; language:Language; code:string; timeoutMs:number; signal:AbortSignal}):Promise<{stdout:string; stderr:string; exitCode:number; runtimeVersion:string}>}
