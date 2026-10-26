const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',args:['--no-sandbox']});
 try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept());
 await page.goto(process.env.APP_URL || 'http://127.0.0.1:5173/');await page.getByRole('button',{name:'Misión Spark ⚡',exact:true}).click();await page.getByRole('button',{name:'Desarrollo de la prueba',exact:true}).click();await page.getByRole('heading',{name:'Desarrollo de la prueba.',exact:true}).waitFor();
 assert.equal(await page.locator('.spark-development .answers').count(),0);assert.equal(await page.getByLabel('Lenguaje de desarrollo',{exact:true}).inputValue(),'Scala');
 await page.getByLabel('Tu código',{exact:true}).fill('// Mi código Scala conservado\nventas.show()');await page.getByRole('button',{name:'Guardar intento y revisar',exact:true}).click();assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('operacion-azulito-v1')).spark.attempts.at(-1).outcome),'review');
 const downloadPromise=page.waitForEvent('download');await page.getByRole('button',{name:/Descargar mi código/}).click();const download=await downloadPromise;assert.equal(download.suggestedFilename(),'spark-dev-12-scala.scala');await download.saveAs('/tmp/azulito-own-code.scala');
 await page.screenshot({path:'/tmp/azulito-development-desktop.png',fullPage:true});
 for(const width of [390,320]){await page.setViewportSize({width,height:844});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Overflow at ${width}px`);}await page.screenshot({path:'/tmp/azulito-development-mobile.png',fullPage:true});
 await page.getByRole('button',{name:/Todo el nivel 4/}).click();assert.equal(await page.getByLabel('Ejercicio de desarrollo',{exact:true}).locator('option').count(),3);await page.getByLabel('Lenguaje de desarrollo',{exact:true}).selectOption('PySpark');assert.equal(await page.getByLabel('Ejercicio de desarrollo',{exact:true}).locator('option').count(),3);
 await page.getByRole('button',{name:/Casos desde cero/}).click();await page.getByRole('heading',{name:'No hay casos de este recorrido en PySpark.'}).waitFor();await page.getByLabel('Lenguaje de desarrollo',{exact:true}).selectOption('Scala');await page.getByLabel('Ejercicio de desarrollo',{exact:true}).selectOption('spark-dev-caso-rdd');
 await page.getByRole('button',{name:'Simular evaluación',exact:true}).click();assert.equal(await page.locator('#spark-format').inputValue(),'development');await page.getByRole('button',{name:'Comenzar práctica Spark',exact:true}).click();
 assert.equal(await page.locator('.spark-review, .answers').count(),0);assert.ok(await page.getByRole('button',{name:'Misión Hadoop + Hive',exact:true}).isDisabled());await page.locator('textarea').fill('// Caso en desarrollo');await page.reload();assert.equal(await page.locator('textarea').inputValue(),'// Caso en desarrollo');await page.getByRole('button',{name:'Entregar práctica Spark',exact:true}).click();await page.getByRole('heading',{name:'Tu progreso Spark.'}).waitFor();
 assert.deepEqual(errors,[]);console.log('Chromium: focused development, Scala/PySpark routes, own-code download, desktop/390/320px, code-only simulation and reload passed; no page errors.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
