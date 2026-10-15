const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),vm=require('node:vm'),crypto=require('node:crypto'),{JSDOM}=require('jsdom');
const root=path.resolve(__dirname,'..'),lessons=JSON.parse(fs.readFileSync(path.join(root,'curriculum.json'),'utf8'));
const read=f=>fs.readFileSync(path.join(root,f),'utf8'),doc=f=>new JSDOM(read(f)).window.document;
const home=doc('index.html'),cards=[...home.querySelectorAll('.topic-links>a')];assert.equal(cards.length,lessons.length);assert.equal(new Set(lessons.map(l=>l.file)).size,lessons.length);assert.equal(new Set(lessons.map(l=>l.icon)).size,lessons.length);
assert.equal(crypto.createHash('sha256').update(home.querySelector('.kinetic-hero').outerHTML).digest('hex'),'26535f2959b6f1944fedeb8293d3a042ddd44a659bbcc69c1bba9cb4b4c658ea','homepage cover changed');
for(const [i,lesson]of lessons.entries()){
 assert.equal(cards[i].getAttribute('href'),lesson.file);assert.equal(cards[i].closest('.topic-band').id,lesson.group);assert.equal(cards[i].querySelector('[data-icon]').dataset.icon,lesson.icon);
 const d=doc(lesson.file),actions=d.querySelectorAll('.chapter-actions');assert.equal(actions.length,1,lesson.file+' needs one route');assert.equal(d.querySelector('.lesson-goal').textContent,'Kết quả cần đạt: '+lesson.goal);const links=[...actions[0].querySelectorAll('a')];assert.equal(links.length,3);assert.equal(links[0].getAttribute('href'),i?lessons[i-1].file:'index.html#web');assert.equal(links[1].getAttribute('href'),'index.html#'+lesson.group);assert.equal(links[2].getAttribute('href'),i<lessons.length-1?lessons[i+1].file:'index.html');
 assert.ok(!read(lesson.file).includes('không cần đọc hay tạo tệp README'));assert.ok(!/href="web-la-gi.html#(?:setup|security|readme-handoff)/.test(read(lesson.file)),lesson.file+' old internal setup link');
 for(const a of d.querySelectorAll('a[href]')){
  const url=new URL(a.getAttribute('href'),'https://guide.local/'+lesson.file);
  if(url.origin!=='https://guide.local')continue;
  const target=lessons.findIndex(l=>'/'+l.file===url.pathname);
  if(target>i)assert.ok(a===links[2]&&target===i+1,lesson.file+' skips ahead: '+a.getAttribute('href'));
 }
}
const web=doc('web-la-gi.html'),setup=doc('thiet-lap-github.html');assert.ok(!web.getElementById('setup'));for(const id of ['setup','readme-handoff','security'])assert.ok(setup.getElementById(id));for(const id of ['overview','static-dynamic','origin','github'])assert.ok(web.getElementById(id));
const redirect=read('legacy-setup-links.js');for(const [hash,expected]of [['#setup','thiet-lap-github.html?v=test#setup'],['#readme-handoff','thiet-lap-github.html?v=test#readme-handoff'],['#security','thiet-lap-github.html?v=test#security'],['#origin',null],['#%bad',null]]){let target=null;vm.runInNewContext(redirect,{location:{hash,search:'?v=test',replace:x=>{target=x}},window:{addEventListener(){}}});assert.equal(target,expected)}
assert.ok(!doc('animation.html').querySelector('th')?.textContent.includes('Trigger / tự động'));
console.log('PASS: '+lessons.length+' unique lessons, ordered home and previous/next routes, lesson goals, original cover, separated setup/theory and compatible old links.');
