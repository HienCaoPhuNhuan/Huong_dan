(() => {
 if(!window.lottie||!('IntersectionObserver' in window))return;
 const motion=matchMedia('(prefers-reduced-motion: reduce)'),items=[...document.querySelectorAll('[data-icon]')].map(el=>({el,link:el.closest('a'),cover:el.parentElement,animation:null,visible:false,ready:false,played:false,failed:false}));
 const canPlay=item=>item.visible&&item.ready&&!document.hidden&&!motion.matches&&!item.link.hidden;
 const play=item=>{if(canPlay(item)&&item.animation.isPaused){item.played=true;item.animation.goToAndPlay(0,true)}};
 const init=item=>{
  if(item.animation||item.failed||motion.matches)return;
  try{
   item.animation=lottie.loadAnimation({container:item.el,renderer:'svg',autoplay:false,loop:false,path:'assets/icons/'+item.el.dataset.icon+'.json'});
   item.animation.addEventListener('DOMLoaded',()=>{item.ready=true;item.cover.classList.add('icon-ready');item.animation.goToAndStop(0,true);if(!item.played)play(item)});
   item.animation.addEventListener('data_failed',()=>{item.failed=true;item.animation?.destroy();item.animation=null;item.ready=false;item.cover.classList.remove('icon-ready')});
  }catch{item.failed=true;item.animation?.destroy();item.animation=null;item.cover.classList.remove('icon-ready')}
 };
 const sync=item=>{
  if(motion.matches){item.animation?.goToAndStop(0,true);return}
  if(item.visible&&!document.hidden&&!item.link.hidden){init(item);if(!item.played)play(item)}else item.animation?.pause();
 };
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{const item=items.find(i=>i.cover===entry.target);item.visible=entry.isIntersecting;sync(item)}),{threshold:.2});
 items.forEach(item=>{observer.observe(item.cover);item.link.addEventListener('pointerenter',()=>{init(item);play(item)});item.link.addEventListener('focus',()=>{init(item);play(item)})});
 const syncAll=()=>items.forEach(sync);document.addEventListener('visibilitychange',syncAll);motion.addEventListener('change',syncAll);
 window.addEventListener('pagehide',event=>{observer.disconnect();items.forEach(item=>{item.animation?.pause();if(!event.persisted)item.animation?.destroy()})});
 window.addEventListener('pageshow',event=>{if(event.persisted){items.forEach(item=>observer.observe(item.cover));syncAll()}});
})();
