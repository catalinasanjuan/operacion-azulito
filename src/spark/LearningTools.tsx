import React,{useId} from 'react';
import {glossary} from './content';
export function Code({children}:{children:string}){
 const tokens=children.split(/("[^"\n]*"|'[^'\n]*'|#[^\n]*|\/\/[^\n]*|\b(?:val|lambda|from|import|True|False|SELECT|FROM|WHERE|GROUP BY|ORDER BY)\b|\b\d+(?:\.\d+)?\b)/g);
 return <pre className="spark-code"><code>{tokens.map((t,i)=><span key={i} className={/^['"]/.test(t)?'code-string':/^(#|\/\/)/.test(t)?'code-comment':/^\d/.test(t)?'code-number':'code-word'}>{t}</span>)}</code></pre>;
}
export function Editor({value,onChange,label,disabled=false}:{value:string;onChange:(s:string)=>void;label:string;disabled?:boolean}){
 const id=useId();return <div className="spark-editor"><label htmlFor={id}>{label}</label><p id={id+'-help'} className="fine">Texto plano · Tab conserva la navegación por teclado · máximo 12000 caracteres.</p><textarea id={id} aria-describedby={id+'-help'} value={value} maxLength={12000} spellCheck={false} autoCapitalize="off" autoCorrect="off" rows={Math.min(16,Math.max(5,value.split('\n').length+1))} disabled={disabled} onChange={e=>onChange(e.target.value)}/><details><summary>Ver código con resaltado</summary><Code>{value||'// Tu código aparecerá aquí'}</Code></details></div>;
}
export function Glossary(){return <details className="spark-glossary panel"><summary>Glosario de bolsillo · consultar sin salir</summary><dl>{Object.entries(glossary).map(([term,definition])=><div key={term}><dt>{term}</dt><dd>{definition}</dd></div>)}</dl></details>;}
