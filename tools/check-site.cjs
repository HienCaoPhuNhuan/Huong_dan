const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom');
const root=path.resolve(__dirname,'..');
const files=fs.readdirSync(root).filter(f=>f.endsWith('.html'));
const docs=new Map(files.map(f=>[f,new JSDOM(fs.readFileSync(path.join(root,f),'utf8')).window.document]));
let count=0;
for(const [file,doc] of docs){
 const ids=[...doc.querySelectorAll('[id]')].map(e=>e.id);assert.equal(ids.length,new Set(ids).size,file+' duplicate ID');
 for(const el of doc.querySelectorAll('[href],[src]')){
  const raw=el.getAttribute('href')||el.getAttribute('src');if(!raw||/^(https?:|mailto:|data:)/.test(raw))continue;
  const url=new URL(raw,'https://example.com/'+file),local=decodeURIComponent(url.pathname.slice(1));
  assert.ok(fs.existsSync(path.join(root,local)),file+' missing '+raw);
  if(url.hash&&docs.has(local))assert.ok(docs.get(local).getElementById(decodeURIComponent(url.hash.slice(1))),file+' missing anchor '+raw);
  count++;
 }
}
assert.equal(docs.get('index.html').querySelectorAll('.topic-band').length,3);
assert.ok(docs.get('index.html').querySelector('[data-kinetic]'));
assert.ok(!fs.existsSync(path.join(root,'web-thuyet-trinh.html')));
assert.equal(docs.get('ke-chuyen-thi-giac.html').querySelectorAll('.lesson-content>section').length,8);
assert.equal(docs.get('yeu-cau-chatgpt.html').querySelectorAll('#palette option').length,6);
console.log('PASS: '+files.length+' HTML files, '+count+' local links/resources; cover and three home groups preserved.');
