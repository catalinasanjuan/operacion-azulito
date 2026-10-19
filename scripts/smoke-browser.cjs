const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept());
 await page.goto(process.env.APP_URL || 'http://127.0.0.1:5173/');await page.getByRole('button',{name:'Misión Spark ⚡',exact:true}).click();
 await page.getByRole('heading',{name:'Misión Spark ⚡'}).waitFor();await page.screenshot({path:'/tmp/azulito-spark-desktop.png',fullPage:true});
 await page.getByRole('button',{name:'Laboratorio de código',exact:true}).click();await page.getByLabel('Elegir ejercicio Spark').selectOption('spark-w9-011');
 await page.getByLabel('Tu código',{exact:true}).fill('datos.filter(lambda x: x % 2 == 0).map(lambda x: x * 10).sum()');await page.getByRole('button',{name:'Comprobar respuesta',exact:true}).click();await page.getByText('✓ Comprobado',{exact:true}).waitFor();
 assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('operacion-azulito-v1')).spark.attempts.at(-1).outcome),'correct');
 await page.screenshot({path:'/tmp/azulito-spark-lab-desktop.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:'/tmp/azulito-spark-mobile.png',fullPage:true});
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Mobile page overflows horizontally');
 await page.getByRole('button',{name:'Simular evaluación',exact:true}).click();await page.getByRole('button',{name:'Comenzar práctica Spark',exact:true}).click();assert.ok(await page.getByRole('button',{name:'Misión Hadoop + Hive',exact:true}).isDisabled());
 await page.locator('textarea').fill('Mi respuesta guardada');await page.reload();await page.getByRole('heading',{name:'Una tarea a la vez.'}).waitFor();assert.equal(await page.locator('textarea').inputValue(),'Mi respuesta guardada');
 await page.getByRole('button',{name:'Entregar práctica Spark',exact:true}).click();await page.getByRole('heading',{name:'Tu progreso Spark.'}).waitFor();assert.ok(!(await page.getByRole('button',{name:'Misión Hadoop + Hive',exact:true}).isDisabled()));
 await page.getByRole('button',{name:'Misión Hadoop + Hive',exact:true}).click();await page.getByRole('button',{name:'Aprender',exact:true}).click();await page.getByRole('heading',{name:'HDFS: archivos distribuidos'}).waitFor();assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Legacy mobile overflows horizontally');
 assert.deepEqual(errors,[]);console.log('Chromium: desktop/mobile, code validation, persisted exam reload, submission, legacy navigation; no page errors or horizontal overflow.');await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
