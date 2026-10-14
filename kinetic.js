(() => {
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 document.querySelectorAll('[data-kinetic]').forEach(scene=>{
  const canvas=scene.querySelector('canvas'),ctx=canvas?.getContext('2d'),photo=scene.querySelector('.kinetic-photo'),video=scene.querySelector('video');
  let width=1,height=1,raf=0,last=0,mediaTimer=0,visible=false,x=0,y=0,tx=0,ty=0,px=0,py=0;
  const particles=Array.from({length:24},()=>({x:Math.random(),y:Math.random(),size:2+Math.random()*3,speed:.025+Math.random()*.035,angle:Math.random()*6.28}));
  const resize=()=>{width=scene.clientWidth;height=scene.clientHeight;const dpr=Math.min(devicePixelRatio||1,1.5);if(ctx){canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0)}};
  const reducedNow=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
  const running=()=>visible&&!document.hidden&&!reducedNow();
  function frame(time){
   raf=0;if(!running()){sync();return}const dt=last?Math.min((time-last)/1000,.064):0;last=time;
   const easing=1-Math.exp(-dt*7);px+=(tx-px)*easing;py+=(ty-py)*easing;
   if(photo)photo.style.transform='translate('+px+'px,'+py+'px) scale(1.02)';
   if(video)video.style.transform='translate('+px+'px,'+py+'px) scale(1.02)';
   if(ctx){ctx.clearRect(0,0,width,height);if(!scene.classList.contains('no-particles'))particles.forEach((p,i)=>{p.y=(p.y+p.speed*dt)%1;p.angle+=dt*.3;ctx.save();ctx.translate(p.x*width+Math.sin(p.y*12+i)*12-px*.5,p.y*height);ctx.rotate(p.angle);ctx.strokeStyle=i%3===0?'#efb7cd80':'#bde7cf80';ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(0,0,p.size,p.size*.4,0,0,Math.PI*2);ctx.stroke();ctx.restore()})}
   raf=requestAnimationFrame(frame);
  }
  const sync=()=>{
   cancelAnimationFrame(raf);clearTimeout(mediaTimer);raf=0;last=0;scene.dataset.paused=String(!running());
   if(running()){raf=requestAnimationFrame(frame);if(video&&scene.dataset.video==='true')video.play().catch(()=>scene.classList.remove('video-ready'))}
   else{video?.pause();if(reducedNow()){ctx?.clearRect(0,0,width,height);if(photo)photo.style.transform='none';if(visible&&!document.hidden)mediaTimer=setTimeout(sync,500)}}
  };
  scene.addEventListener('pointermove',e=>{if(scene.classList.contains('no-parallax')||reducedNow())return;const r=scene.getBoundingClientRect();x=(e.clientX-r.left)/r.width-.5;y=(e.clientY-r.top)/r.height-.5;tx=x*18;ty=y*12});
  scene.addEventListener('pointerleave',()=>{tx=ty=0});
  scene.addEventListener('kinetic-settings',()=>{if(scene.classList.contains('no-parallax'))tx=ty=0;sync()});
  video?.addEventListener('playing',()=>scene.classList.add('video-ready'));video?.addEventListener('error',()=>scene.classList.remove('video-ready'));
  const observer=new IntersectionObserver(es=>{visible=es.some(e=>e.isIntersecting);sync()},{threshold:.05});
  const sizeObserver=new ResizeObserver(resize);sizeObserver.observe(scene);resize();observer.observe(scene);
  document.addEventListener('visibilitychange',sync);reduce.addEventListener('change',sync);
  window.addEventListener('pagehide',()=>{cancelAnimationFrame(raf);clearTimeout(mediaTimer);video?.pause();observer.disconnect();sizeObserver.disconnect();document.removeEventListener('visibilitychange',sync);reduce.removeEventListener('change',sync)});
  window.addEventListener('pageshow',event=>{if(event.persisted){sizeObserver.observe(scene);observer.observe(scene);document.addEventListener('visibilitychange',sync);reduce.addEventListener('change',sync);resize();sync()}});
 });
 const lab=document.getElementById('layer-scene');
 if(lab){
  const names={marquee:'chữ nền trôi',float:'ảnh và chữ nổi nhẹ',parallax:'parallax theo chuột',particles:'hạt rơi',scan:'vệt sáng quét',glass:'kính mờ'};
  const update=()=>{const chosen=[];document.querySelectorAll('[data-layer]').forEach(input=>{lab.classList.toggle('no-'+input.dataset.layer,!input.checked);if(input.dataset.layer==='glass')lab.classList.toggle('has-glass',input.checked);if(input.checked)chosen.push(names[input.dataset.layer])});lab.dispatchEvent(new Event('kinetic-settings'));document.getElementById('layer-request').value='Tạo section mở đầu bằng ảnh của nhóm tại assets/images/[ten-anh]. Các lớp: '+(chosen.join(', ')||'chỉ ảnh và chữ tĩnh')+'. Tự chạy khi mở trang, chữ chính luôn dễ đọc. Giới hạn parallax khoảng 9px ngang/6px dọc, hạt ít và nằm sau chữ. Không tự phát âm thanh. Dừng khi tab ở nền hoặc rời vùng xem; giảm chuyển động thì dùng bản tĩnh. Thiết kế cho PC, giữ nguồn và giấy phép của tài nguyên.'};
  document.querySelectorAll('[data-layer]').forEach(input=>input.addEventListener('change',update));update();
 }
})();
