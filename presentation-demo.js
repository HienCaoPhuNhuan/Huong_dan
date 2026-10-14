(() => {
 if(!window.Reveal)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const deck=new Reveal(document.querySelector('.reveal'),{embedded:true,keyboardCondition:'focused',width:960,height:540,hash:false,controls:true,progress:true,loop:true,autoSlide:0,autoSlideStoppable:true,transition:reduced.matches?'none':'fade',autoAnimate:!reduced.matches});
 let visible=false,manual=false,timer=null;
 const clear=()=>{clearTimeout(timer);timer=null};
 const sync=()=>{clear();if(visible&&!document.hidden&&!reduced.matches&&!manual)timer=setTimeout(()=>{deck.next();sync()},5000)};
 deck.initialize().then(()=>{document.body.classList.add('deck-ready');const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync()},{threshold:.2});observer.observe(document.querySelector('.reveal'));document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',()=>{deck.configure({transition:reduced.matches?'none':'fade',autoAnimate:!reduced.matches});sync()});document.addEventListener('pointerdown',()=>{manual=true;sync()});document.addEventListener('keydown',()=>{manual=true;sync()});window.addEventListener('pagehide',()=>{clear();observer.disconnect()});}).catch(()=>{document.getElementById('deck-fallback').textContent='Không tải được trình chiếu; xem nội dung tĩnh phía trên.'});
})();
