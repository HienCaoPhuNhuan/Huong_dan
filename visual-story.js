(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),cleanups=[];
 const gsap=window.gsap;
 if(gsap&&window.ScrollTrigger)gsap.registerPlugin(ScrollTrigger);
 if(gsap&&window.MotionPathPlugin)gsap.registerPlugin(MotionPathPlugin);
 // Each demo owns one timer; viewport, page visibility and preference changes share a gate.
 function lifecycle(element,period,tick,toggle,active=()=>true){
  let visible=false,hover=false,focused=false,timer=null;
  const stop=()=>{clearTimeout(timer);timer=null};
  const sync=()=>{stop();const running=visible&&!document.hidden&&!reduced.matches&&!hover&&!focused&&active();element.dataset.running=String(running);toggle?.(running);if(running)timer=setTimeout(()=>{tick();sync()},period)};
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync()},{threshold:.15});observer.observe(element);
  element.addEventListener('mouseenter',()=>{hover=true;sync()});element.addEventListener('mouseleave',()=>{hover=false;sync()});
  element.addEventListener('focusin',()=>{focused=true;sync()});element.addEventListener('focusout',()=>{focused=element.contains(document.activeElement);sync()});
  document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);sync();
  cleanups.push(()=>{stop();observer.disconnect();document.removeEventListener('visibilitychange',sync);reduced.removeEventListener('change',sync)});
  return sync;
 }
 const theme=document.getElementById('theme-demo'),themeSelect=document.getElementById('visual-theme'),themeAuto=document.getElementById('theme-auto');
 const themes=['academic','editorial','infographic','cinematic'];let themeIndex=0;
 const themeSync=lifecycle(theme,4500,()=>{themeIndex=(themeIndex+1)%themes.length;theme.dataset.theme=themes[themeIndex];themeSelect.value=themes[themeIndex]},null,()=>themeAuto.checked);
 themeSelect.addEventListener('change',()=>{themeIndex=themes.indexOf(themeSelect.value);theme.dataset.theme=themeSelect.value;themeAuto.checked=false;themeSync()});themeAuto.addEventListener('change',themeSync);

 const scroller=document.getElementById('story-scroller'),scrollAuto=document.getElementById('scroll-auto'),callouts=[...document.querySelectorAll('.story-callouts span')];
 let storyTween=null,direction=1;
 if(gsap&&window.ScrollTrigger){storyTween=gsap.timeline({scrollTrigger:{trigger:document.querySelector('.story-inner'),scroller,start:'top top',end:'bottom bottom',scrub:.35}});storyTween.fromTo(callouts,{opacity:.15,x:18},{opacity:1,x:0,stagger:1,duration:.7});}
 const updateCaption=()=>{const extent=scroller.scrollHeight-scroller.clientHeight;const progress=extent>0?scroller.scrollTop/extent:0;document.getElementById('story-caption').textContent=['Quan sát không gian','Thu thập minh chứng','Rút ra thông điệp'][Math.min(2,Math.floor(progress*3))]};
 scroller.addEventListener('scroll',updateCaption,{passive:true});
 const scrollSync=lifecycle(scroller,45,()=>{const end=scroller.scrollHeight-scroller.clientHeight;scroller.scrollTop+=direction*3;if(scroller.scrollTop>=end)direction=-1;if(scroller.scrollTop<=0)direction=1},()=>{if(reduced.matches){storyTween?.scrollTrigger?.disable(false);if(gsap)gsap.set(callouts,{opacity:1,x:0})}else storyTween?.scrollTrigger?.enable()},()=>scrollAuto.checked);
 scrollAuto.addEventListener('change',scrollSync);scroller.addEventListener('wheel',()=>{scrollAuto.checked=false;scrollSync()},{passive:true});cleanups.push(()=>{storyTween?.scrollTrigger?.kill();storyTween?.kill()});

 const chartHost=document.getElementById('story-chart'),dataSelect=document.getElementById('data-period'),dataAuto=document.getElementById('data-auto');
 const sets=[[24,36,18],[36,42,30]],names=['Đọc sách','Thể thao','Nghệ thuật'];let dataIndex=0,chart=null;
 const conclusion=document.getElementById('data-conclusion');
 function renderData(){const values=sets[dataIndex];conclusion.textContent=`Lần ${dataIndex+1}: Thể thao có số người chọn cao nhất (${values[1]} học sinh). Chưa đủ dữ liệu để kết luận nguyên nhân.`;dataSelect.value=String(dataIndex);chart?.setOption({animation:!reduced.matches,animationDurationUpdate:700,aria:{enabled:true,decal:{show:true}},tooltip:{trigger:'axis'},grid:{left:45,right:25,top:25,bottom:45},xAxis:{type:'category',data:names,axisLabel:{fontSize:13}},yAxis:{type:'value',min:0,max:50,name:'Học sinh'},series:[{type:'bar',barMaxWidth:80,label:{show:true,position:'top'},data:values.map((value,i)=>({value,itemStyle:{color:['#087957','#ba365c','#385ba1'][i]}}))}]});}
 try{if(window.echarts){chartHost.replaceChildren();chart=echarts.init(chartHost,null,{renderer:'svg'});}}catch{chartHost.textContent='Không dựng được biểu đồ. Xem bảng dữ liệu bên dưới.';}
 renderData();const chartSync=lifecycle(chartHost,5000,()=>{dataIndex=1-dataIndex;renderData()},null,()=>dataAuto.checked);
 dataSelect.addEventListener('change',()=>{dataIndex=Number(dataSelect.value);dataAuto.checked=false;renderData();chartSync()});dataAuto.addEventListener('change',chartSync);reduced.addEventListener('change',renderData);
 const resize=new ResizeObserver(()=>chart?.resize());resize.observe(chartHost);cleanups.push(()=>{resize.disconnect();chart?.dispose();reduced.removeEventListener('change',renderData)});

 const diagram=document.getElementById('diagram-demo');let routeTween=null;
 if(gsap&&window.MotionPathPlugin)routeTween=gsap.to('#data-packet',{duration:5,repeat:-1,repeatDelay:1,ease:'none',paused:true,motionPath:{path:'#data-route',align:'#data-route',alignOrigin:[.5,.5]}});
 else document.getElementById('data-packet').setAttribute('transform','translate(60 92)');
 lifecycle(diagram,6000,()=>{},running=>{if(reduced.matches){routeTween?.pause(0)}else if(running)routeTween?.resume();else routeTween?.pause()});cleanups.push(()=>routeTween?.kill());

 const state=document.getElementById('state-demo'),transitionAuto=document.getElementById('transition-auto');let pendingTransition=null;
 const supported=typeof document.startViewTransition==='function';document.getElementById('transition-status').textContent=supported?'Trình duyệt hỗ trợ View Transition API: ảnh nối giữa hai trạng thái.':'Trình duyệt chưa hỗ trợ View Transition API: vẫn đổi bố cục bằng CSS.';
 function changeState(){const update=()=>{state.dataset.expanded=String(state.dataset.expanded!=='true')};if(supported&&!reduced.matches){pendingTransition=document.startViewTransition(update);pendingTransition.finished.catch(()=>{}).finally(()=>{pendingTransition=null})}else update()}
 const stateSync=lifecycle(state,4500,changeState,running=>{if(!running)pendingTransition?.skipTransition()},()=>transitionAuto.checked);transitionAuto.addEventListener('change',stateSync);

 const gallery=document.getElementById('story-gallery');let swiper=null;
 if(window.Swiper)try{swiper=new Swiper(gallery,{effect:'coverflow',centeredSlides:true,slidesPerView:'auto',spaceBetween:24,rewind:true,speed:reduced.matches?0:700,coverflowEffect:{rotate:20,depth:80,slideShadows:false},pagination:{el:gallery.querySelector('.swiper-pagination'),clickable:true},a11y:{enabled:true}})}catch{gallery.dataset.fallback='true'}
 if(!swiper)gallery.dataset.fallback='true';
 let galleryManual=false;const gallerySync=lifecycle(gallery,5000,()=>swiper?.slideNext(),null,()=>!galleryManual);const stopGallery=()=>{galleryManual=true;gallerySync()};gallery.addEventListener('pointerdown',stopGallery);gallery.addEventListener('keydown',stopGallery);cleanups.push(()=>swiper?.destroy());
 window.addEventListener('pagehide',()=>{cleanups.forEach(fn=>fn());pendingTransition?.skipTransition()});
 window.addEventListener('pageshow',event=>{if(event.persisted)location.reload()});
})();
