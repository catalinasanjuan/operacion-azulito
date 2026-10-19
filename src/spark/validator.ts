import type {Exercise,Language,ValidationResult} from './types';
type Node={kind:'literal';value:number|string}|{kind:'id';name:string}|{kind:'array';items:Node[]}|{kind:'member';base:Node;name:string}|{kind:'call';callee:Node;args:Node[]}|{kind:'binary';op:string;left:Node;right:Node}|{kind:'unary';op:string;value:Node}|{kind:'lambda';params:string[];body:Node};
type Statement={name?:string;node:Node};
class Unsupported extends Error {}
// Restricted grammar, never JS/Python/Scala execution. Whitespace inside strings is preserved.
class Parser {
 tokens:string[]=[]; i=0;
 constructor(code:string,private language:Language){
  if(code.length>12000)throw new Error('Máximo 12000 caracteres por respuesta.');
  const re=/[ \t\r]+|\n|#[^\n]*|\/\/[^\n]*|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\d+(?:\.\d+)?|[A-Za-z_][A-Za-z_0-9]*|=>|==|!=|>=|<=|\*\*|[+*/%><=().,:;\[\]-]/gy;
  let pos=0,depth=0;
  while(pos<code.length){re.lastIndex=pos;const m=re.exec(code);if(!m)throw new Unsupported('Símbolo fuera del subconjunto local.');const t=m[0];pos=re.lastIndex;
   if(/^[ \t\r]|^#|^\/\//.test(t))continue;
   if(t==='\n'){if(depth===0&&this.tokens.at(-1)!==';')this.tokens.push(';');continue;}
   if(['(','['].includes(t))depth++;if([')',']'].includes(t))depth--;
   if(depth<0)throw new Error('Hay un cierre de paréntesis o corchete sin apertura.');
   this.tokens.push(t);if(this.tokens.length>2500)throw new Error('La respuesta supera el límite del analizador.');
  }
  if(depth!==0)throw new Error('Revisa los paréntesis y corchetes sin cerrar.');
 }
 peek(){return this.tokens[this.i];} take(){return this.tokens[this.i++];}
 expect(t:string){if(this.take()!==t)throw new Error(`Se esperaba ${t}.`);}
 program(){const result:Statement[]=[];while(this.i<this.tokens.length){if(this.peek()===';'){this.i++;continue;}let name:string|undefined;
  if(this.peek()==='val'){if(this.language!=='Scala')throw new Error('val pertenece a Scala; en PySpark asigna sin val.');this.i++;name=this.take();this.expect('=');}
  else if(this.tokens[this.i+1]==='='){name=this.take();this.i++;}
  if(name&&!/^[A-Za-z_]\w*$/.test(name))throw new Error('Nombre de variable inválido.');
  result.push({name,node:this.expr()});if(this.i<this.tokens.length&&this.peek()!==';')throw new Error('Separa las instrucciones con un salto de línea.');
 }if(!result.length)throw new Error('Escribe una respuesta primero.');return result;}
 expr(min=0):Node{
  let node=this.prefix();
  const precedence:Record<string,number>={'to':1,'==':2,'!=':2,'>':2,'<':2,'>=':2,'<=':2,'+':3,'-':3,'*':4,'/':4,'%':4,'**':5};
  while(this.i<this.tokens.length){const t=this.peek();if(t==='.'&&min<7){this.i++;const name=this.take();if(!name||!/^\w+$/.test(name))throw new Error('Falta el nombre del método.');node={kind:'member',base:node,name};continue;}
   if(t==='('&&min<7){this.i++;const args:Node[]=[];if(this.peek()!==')'){do{args.push(this.expr());if(this.peek()!==',')break;this.i++;}while(true);}this.expect(')');node={kind:'call',callee:node,args};continue;}
   const p=precedence[t];if(p===undefined||p<min)break;if((t==='to'&&this.language!=='Scala')||(t==='**'&&this.language!=='PySpark'))throw new Unsupported('Este operador no pertenece al subconjunto del lenguaje elegido.');this.i++;node={kind:'binary',op:t,left:node,right:this.expr(p+(t==='**'?0:1))};
  }return node;
 }
 prefix():Node{
  const t=this.take();if(!t)throw new Error('La expresión está incompleta.');
  if(t==='to'&&this.language!=='Scala')throw new Unsupported('El rango inclusivo to pertenece a Scala.');
  if(t==='lambda'){if(this.language!=='PySpark')throw new Error('lambda pertenece a Python; en Scala usa =>.');const params=[this.take()];while(this.peek()===','){this.i++;params.push(this.take());}this.expect(':');return {kind:'lambda',params,body:this.expr()};}
  if(this.peek()==='=>'){if(this.language!=='Scala')throw new Error('En PySpark escribe lambda x: expresión.');this.i++;return {kind:'lambda',params:[t],body:this.expr()};}
  if(t==='('){const start=this.i;const params:string[]=[];while(/^[A-Za-z_]\w*$/.test(this.peek()??'')){params.push(this.take());if(this.peek()!==',')break;this.i++;}
   if(this.peek()===')'&&this.tokens[this.i+1]==='=>'){if(this.language!=='Scala')throw new Error('En PySpark usa lambda a, b: expresión.');this.i+=2;return {kind:'lambda',params,body:this.expr()};}
   this.i=start;const n=this.expr();this.expect(')');return n;
  }
  if(t==='['){const items:Node[]=[];if(this.peek()!==']'){do{items.push(this.expr());if(this.peek()!==',')break;this.i++;}while(true);}this.expect(']');return {kind:'array',items};}
  if(t==='-'||t==='+')return {kind:'unary',op:t,value:this.expr(5)};
  if(/^\d/.test(t))return {kind:'literal',value:Number(t)};
  if(/^['"]/.test(t))return {kind:'literal',value:t.slice(1,-1)};
  if(/^[A-Za-z_]\w*$/.test(t))return {kind:'id',name:t};
  throw new Error('Expresión incompleta o sintaxis inválida.');
 }
}
type RDD={type:'rdd';values:number[];partitions:number;ops:string[]};
type Output={type:'output';value:number|number[];ops:string[]};
type Lambda={type:'lambda';params:string[];body:Node};
type Value=number|string|boolean|number[]|RDD|Output|Lambda;
const isRDD=(v:Value):v is RDD=>typeof v==='object'&&!Array.isArray(v)&&v.type==='rdd';
const numeric=(v:Value):number=>{if(typeof v!=='number'||!Number.isFinite(v))throw new Error('Se esperaba un número finito.');return v;};
const sequence=(start:number,end:number,step=1)=>{if(!Number.isInteger(start)||!Number.isInteger(end)||!Number.isInteger(step)||step===0||Math.abs((end-start)/step)>10000)throw new Error('Rango no permitido: máximo 10000 elementos y paso entero distinto de cero.');const a:number[]=[];for(let i=start;step>0?i<end:i>end;i+=step)a.push(i);return a;};
function evaluate(node:Node,env:Map<string,Value>,budget:{remaining:number}):Value {
 if(--budget.remaining<0)throw new Error('La respuesta excede el límite de operaciones locales.');
 const run=(n:Node)=>evaluate(n,env,budget);
 switch(node.kind){
  case 'literal':return node.value;
  case 'id':{const v=env.get(node.name);if(v===undefined)throw new Unsupported(`Variable no disponible: ${node.name}.`);return v;}
  case 'array':return node.items.map(n=>numeric(run(n)));
  case 'lambda':return {type:'lambda',params:node.params,body:node.body};
  case 'unary':return (node.op==='-'?-1:1)*numeric(run(node.value));
  case 'binary':{const a=numeric(run(node.left)),b=numeric(run(node.right));switch(node.op){case '+':return a+b;case '-':return a-b;case '*':return a*b;case '/':return a/b;case '%':return a%b;case '**':return a**b;case '>':return a>b;case '<':return a<b;case '>=':return a>=b;case '<=':return a<=b;case '==':return a===b;case '!=':return a!==b;case 'to':return sequence(a,b+1);default:throw new Unsupported('Operador no soportado.');}}
  case 'member':{const base=run(node.base);if(isRDD(base)&&node.name==='getNumPartitions')return {type:'output',value:base.partitions,ops:[...base.ops,node.name]};throw new Unsupported('Propiedad no soportada en el modelo local.');}
  case 'call':{
   if(node.callee.kind==='id'){
    const name=node.callee.name,args=node.args.map(n=>numeric(run(n)));
    if(name==='range'){if(args.length<1||args.length>3)throw new Error('range admite de uno a tres argumentos.');return args.length===1?sequence(0,args[0]):sequence(args[0],args[1],args[2]??1);}
    if(['Seq','List'].includes(name))return args;
    throw new Unsupported(`Función no soportada: ${name}.`);
   }
   if(node.callee.kind!=='member')throw new Unsupported('Solo se permiten llamadas de la gramática documentada.');
   const {base,name}=node.callee;
   if(base.kind==='id'&&base.name==='sc'&&name==='parallelize'){
    if(node.args.length<1||node.args.length>2)throw new Error('parallelize recibe colección y particiones opcionales.');const values=run(node.args[0]);const partitions=node.args[1]?numeric(run(node.args[1])):4;
    if(!Array.isArray(values)||!Number.isInteger(partitions)||partitions<1||partitions>100)throw new Error('Revisa colección y número de particiones (1–100).');return {type:'rdd',values,partitions,ops:['parallelize']};
   }
   const rdd=run(base);if(!isRDD(rdd))throw new Error('Una acción ya devolvió un resultado; no puedes tratarlo como RDD.');
   if(!['map','filter','reduce','take','count','sum','getNumPartitions'].includes(name))throw new Unsupported(`Método no soportado: ${name}.`);
   const ops=[...rdd.ops,name];
   if(['map','filter','reduce'].includes(name)){
    if(node.args.length!==1)throw new Error(`${name} necesita una función.`);const f=run(node.args[0]);if(typeof f!=='object'||Array.isArray(f)||f.type!=='lambda'||f.params.length!==(name==='reduce'?2:1))throw new Error('Revisa los parámetros de la función anónima.');
    const apply=(...args:number[])=>{const scope=new Map(env);f.params.forEach((p,i)=>scope.set(p,args[i]));return evaluate(f.body,scope,budget);};
    if(name==='filter')return {...rdd,ops,values:rdd.values.filter(x=>{const v=apply(x);if(typeof v!=='boolean')throw new Error('En estos ejercicios, filter debe usar una comparación booleana; para cambiar valores usa map.');return v;})};
    if(name==='map')return {...rdd,ops,values:rdd.values.map(x=>numeric(apply(x)))};
    if(!rdd.values.length)throw new Error('reduce no puede operar sobre una colección vacía.');return {type:'output',value:rdd.values.reduce((a,b)=>numeric(apply(a,b))),ops};
   }
   if(name==='take'){if(node.args.length!==1)throw new Error('take necesita una cantidad.');const n=numeric(run(node.args[0]));if(!Number.isInteger(n)||n<0||n>10000)throw new Error('Cantidad de muestra inválida.');return {type:'output',value:rdd.values.slice(0,n),ops};}
   if(node.args.length)throw new Error(`${name} no recibe argumentos en estos ejercicios.`);
   if(name==='count')return {type:'output',value:rdd.values.length,ops};
   if(name==='sum')return {type:'output',value:rdd.values.reduce((a,b)=>a+b,0),ops};
   if(name==='getNumPartitions')return {type:'output',value:rdd.partitions,ops};
   throw new Unsupported(`Método no soportado: ${name}.`);
  }
 }
}
export function checkCode(exercise:Exercise,answer:string):ValidationResult {
 const v=exercise.validation;if(!answer.trim())return {outcome:v.kind==='rubric'||v.kind==='runtime'?'review':'incorrect',message:'Sin respuesta; este ejercicio sigue pendiente.'};
 if(v.kind==='rubric'||v.kind==='runtime')return {outcome:'review',message:v.kind==='runtime'?'Este caso necesita Spark real. Guarda tu código y contrasta evidencia con la rúbrica; aquí no se ejecuta.':'Revisión guiada: compara tu código con los criterios y la referencia. No se asigna un acierto automático.'};
 if(v.kind==='answer'){
  const normalized=(s:string)=>s.trim().toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[.!?]+$/,'');
  const ok=v.values.some(value=>typeof value==='number'?/^\d+(?:[.,]\d+)?$/.test(answer.trim())&&Number(answer.replace(',','.'))===value:normalized(answer)===normalized(value));
  return {outcome:ok?'correct':'incorrect',message:ok?'Respuesta comprobada para este enunciado.':'Todavía no coincide. Revisa la operación y vuelve a intentarlo.'};
 }
 try{
  const program=new Parser(answer,exercise.language).program();
  if(v.kind==='projection'){
   if(program.length!==1||program[0].name)throw new Unsupported('Usa una sola expresión df.select(...).show() para esta comprobación local.');
   const show=program[0].node;
   if(show.kind!=='call'||show.args.length||show.callee.kind!=='member'||show.callee.name!=='show')throw new Error('Termina la proyección con show().');
   const select=show.callee.base;
   if(select.kind!=='call'||select.callee.kind!=='member'||select.callee.name!=='select'||select.callee.base.kind!=='id'||select.callee.base.name!=='df')throw new Error('Selecciona columnas del DataFrame df mediante select.');
   const columns=select.args.map(n=>{if(n.kind==='literal'&&typeof n.value==='string')return n.value;if(n.kind==='member'&&n.base.kind==='id'&&n.base.name==='df')return n.name;throw new Unsupported('Usa nombres entre comillas u objetos df.columna.');});
   const ok=JSON.stringify(columns)===JSON.stringify(v.columns);return {outcome:ok?'correct':'incorrect',message:ok?'Proyección comprobada por estructura: columnas y orden correctos. No se ejecutó Spark.':'Revisa los nombres y el orden de las columnas.',actual:columns};
  }
  if(v.kind!=='rdd')throw new Unsupported('Validador no disponible.');
  const env=new Map<string,Value>([['datos',{type:'rdd',values:sequence(1,101),partitions:4,ops:[]}]]);let result:Value=0;const budget={remaining:100000};
  for(const statement of program){result=evaluate(statement.node,env,budget);if(statement.name)env.set(statement.name,result);}
  if(typeof result!=='object'||Array.isArray(result)||result.type!=='output')throw new Error('Termina con una acción o consulta de particiones que devuelva el resultado solicitado.');
  const same=(a:number|number[],b:number|number[]):boolean=>Array.isArray(a)&&Array.isArray(b)?a.length===b.length&&a.every((n,i)=>Math.abs(n-b[i])<1e-9):typeof a==='number'&&typeof b==='number'&&Math.abs(a-b)<1e-9;
  const ok=same(result.value,v.expected)&&v.operations.every(op=>result.ops.includes(op));
  return {outcome:ok?'correct':'incorrect',message:ok?'Resultado comprobado en el modelo local con los datos del enunciado. No es una ejecución Spark.':'El resultado o las operaciones no cumplen el enunciado. Revisa el flujo y reintenta.',actual:result.value};
 }catch(e){return {outcome:e instanceof Unsupported?'review':'incorrect',message:e instanceof Unsupported?`${e.message} Esta variante queda sin verificar; consulta la referencia o ejecuta Spark real.`:(e as Error).message};}
}
