import fs from 'node:fs';import path from 'node:path';import http from 'node:http';import {spawn} from 'node:child_process';
const root=process.cwd(),out=path.join(root,'output/orbit-polish');
const server=http.createServer((q,r)=>{let p=path.join(root,decodeURIComponent(q.url.split('?')[0]));if(p.endsWith('/'))p+='index.html';try{const ext=path.extname(p);r.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.jpg':'image/jpeg','.png':'image/png'})[ext]||'application/octet-stream');r.end(fs.readFileSync(p));}catch{r.statusCode=404;r.end();}}).listen(4188,'127.0.0.1');
const profile=fs.mkdtempSync('/tmp/orbit-chrome-'),child=spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',['--headless=new',`--user-data-dir=${profile}`,'--remote-debugging-port=0','--no-first-run','--hide-scrollbars','about:blank'],{stdio:'ignore'});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));let ws;
try{
let port;for(let i=0;i<150&&!port;i++){await sleep(100);try{port=parseInt(fs.readFileSync(path.join(profile,'DevToolsActivePort'),'utf8'));}catch{}}
if(!port)throw Error('Chrome unavailable');
const v=await(await fetch(`http://127.0.0.1:${port}/json/version`)).json();ws=new WebSocket(v.webSocketDebuggerUrl);await new Promise(r=>ws.addEventListener('open',r,{once:true}));let id=0;const pending=new Map();ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(pending.has(m.id)){pending.get(m.id)(m);pending.delete(m.id);}});const send=(method,params={},sessionId)=>new Promise(r=>{const n=++id;pending.set(n,r);ws.send(JSON.stringify({id:n,method,params,sessionId}));});
const {result:{targetId}}=await send('Target.createTarget',{url:'about:blank'});const {result:{sessionId}}=await send('Target.attachToTarget',{targetId,flatten:true});const S=async(m,p)=>(await send(m,p,sessionId)).result;const ev=async(expression)=>{const r=await S('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result.value;};
await S('Page.enable');await S('Page.navigate',{url:'http://127.0.0.1:4188/previews/orbit-polish/work.html'});await sleep(1200);
const data=await ev(`(()=>{const results=document.querySelector('#work-results').cloneNode(true);results.querySelectorAll('.work-card').forEach(c=>{c.style.removeProperty('--card-title-height');c.setAttribute('href',window.portfolioProjectHref(c.dataset.projectId));});return{results:results.outerHTML,years:document.querySelector('#year-filters').innerHTML,types:document.querySelector('#type-filters').innerHTML,cards:results.querySelectorAll('.work-card').length}})()`);
if(data.cards!==17)throw Error('Expected 17 projects, got '+data.cards);
const file=path.join(root,'previews/orbit-polish/work.html');let html=fs.readFileSync(file,'utf8');
html=html.replace(/(<div id="year-filters"[^>]*>)[\s\S]*?(<\/div>)/,'$1'+data.years+'$2').replace(/(<div id="type-filters"[^>]*>)[\s\S]*?(<\/div>)/,'$1'+data.types+'$2');
const block='<!-- WORK_RESULTS_START -->'+data.results+'<!-- WORK_RESULTS_END -->';
html=html.includes('<!-- WORK_RESULTS_START -->')?html.replace(/<!-- WORK_RESULTS_START -->[\s\S]*?<!-- WORK_RESULTS_END -->/,block):html.replace('<div id="work-results" class="work-results"></div>',block);
fs.writeFileSync(file,html);console.log('Prerendered '+data.cards+' cards and both filter rows');

}finally{ws?.close();child.kill();server.close();}
