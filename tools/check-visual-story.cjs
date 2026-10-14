const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'ke-chuyen-thi-giac.html'),'utf8'),script=fs.readFileSync(path.join(root,'visual-story.js'),'utf8');
function setup({reduce=false,libraries=true}={}){
 const dom=new JSDOM(html,{url:'https://example.com/ke-chuyen-thi-giac.html',runScripts:'outside-only'}),w=dom.window;
 const observers=[],timers=new Map(),mediaListeners=[],charts=[];let next=0,hidden=false;
 Object.defineProperty(w.document,'hidden',{get:()=>hidden});
 const media={matches:reduce,addEventListener:(_name,fn)=>mediaListeners.push(fn),removeEventListener:(_name,fn)=>{const i=mediaListeners.indexOf(fn);if(i>=0)mediaListeners.splice(i,1)}};
 w.matchMedia=()=>media;w.setTimeout=(fn,delay)=>{timers.set(++next,{fn,delay});return next};w.clearTimeout=id=>timers.delete(id);
 w.IntersectionObserver=class{constructor(fn){this.fn=fn;observers.push(this)}observe(el){this.el=el}disconnect(){this.off=true}};
 w.ResizeObserver=class{observe(){}disconnect(){}};
 if(libraries){w.echarts={init:()=>{const chart={options:[],setOption(o){this.options.push(o)},resize(){},dispose(){this.disposed=true}};charts.push(chart);return chart}};w.Swiper=class{slideNext(){}destroy(){}};}
 w.eval(script);
 const show=()=>observers.filter(o=>!o.off).forEach(o=>o.fn([{isIntersecting:true}]));
 const tick=delay=>{const entry=[...timers].find(([,t])=>t.delay===delay);assert.ok(entry,'timer '+delay);timers.delete(entry[0]);entry[1].fn()};
 const hide=value=>{hidden=value;w.document.dispatchEvent(new w.Event('visibilitychange'))};
 return {w,timers,charts,media,mediaListeners,show,tick,hide,dom,observers};
}
const s=setup();assert.equal(s.timers.size,0,'offscreen has no timers');s.show();assert.equal(s.timers.size,6);
s.tick(4500);assert.equal(s.w.document.getElementById('theme-demo').dataset.theme,'editorial');
const choice=s.w.document.getElementById('visual-theme');choice.value='cinematic';choice.dispatchEvent(new s.w.Event('change'));assert.equal(s.w.document.getElementById('theme-auto').checked,false);
s.tick(5000);assert.equal(s.w.document.getElementById('data-period').value,'1');assert.ok(s.w.document.getElementById('data-conclusion').textContent.includes('42'));
const period=s.w.document.getElementById('data-period');period.value='0';period.dispatchEvent(new s.w.Event('change'));assert.equal(s.w.document.getElementById('data-auto').checked,false);assert.equal(s.charts[0].options.at(-1).yAxis.max,50);assert.ok(s.charts[0].options.at(-1).aria.decal.show);
s.hide(true);assert.equal(s.timers.size,0);s.hide(false);assert.equal(s.timers.size,4);
const scroller=s.w.document.getElementById('story-scroller');scroller.dispatchEvent(new s.w.Event('mouseenter'));assert.equal(scroller.dataset.running,'false');scroller.dispatchEvent(new s.w.Event('mouseleave'));assert.equal(scroller.dataset.running,'true');
s.media.matches=true;s.mediaListeners.slice().forEach(fn=>fn());assert.equal(s.timers.size,0);assert.equal(s.charts[0].options.at(-1).animation,false);
s.w.dispatchEvent(new s.w.Event('pagehide'));assert.equal(s.timers.size,0);assert.ok(s.charts[0].disposed);s.dom.window.close();
const r=setup({reduce:true,libraries:false});r.show();assert.equal(r.timers.size,0);assert.ok(r.w.document.querySelector('#story-chart').textContent.includes('bảng'));assert.equal(r.w.document.querySelectorAll('#data-story tbody tr').length,3);r.w.dispatchEvent(new r.w.Event('pagehide'));r.dom.window.close();
console.log('PASS: lifecycle, themes, shared data/conclusion, manual pause, offscreen/hidden/reduced-motion, missing-library fallback. Browser rendering requires separate QA.');
