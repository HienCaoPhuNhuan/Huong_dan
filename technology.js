(() => {
 const $=id=>document.getElementById(id),stage=$('bench-stage'),motion=matchMedia('(prefers-reduced-motion: reduce)');
 let frame=0,running=false,start=0,last=0,intervals=[],count=0,animations=[];
 function environment(){const text='Khung trình duyệt: '+innerWidth+' × '+innerHeight+' px CSS; tỷ lệ điểm ảnh thiết bị: '+devicePixelRatio+'. Giảm chuyển động: '+(motion.matches?'bật':'tắt')+'.';$('browser-environment').textContent=text;return text}
 function request(){
  const values=['device-cpu','device-ram','device-gpu','device-browser','device-conditions'].map(id=>$(id).value.trim()||'chưa biết');
  $('device-request').value='Tôi dùng ChatGPT Free để thiết kế bài web. Thiết bị trình bày: CPU '+values[0]+', RAM '+values[1]+', GPU '+values[2]+', trình duyệt '+values[3]+'. Điều kiện: '+values[4]+'. '+environment()+' Hãy chọn thiết kế phù hợp, có phương án nhẹ; không suy ra độ mượt chỉ từ thông số. Nếu bài tải chậm hoặc giật, hướng dẫn tôi kiểm tra và sửa từng nguyên nhân.';
 }
 function cleanup(){cancelAnimationFrame(frame);animations.forEach(a=>a.cancel());animations=[];running=false;$('bench-start').disabled=false;$('bench-mode').disabled=false}
 function cancel(){if(!running)return;cleanup();$('bench-status').textContent='Đã hủy bài thử; không dùng lần này để so sánh.'}
 function render(){
  stage.classList.toggle('dense',$('bench-mode').value==='dense');stage.replaceChildren();
  for(let i=0;i<($('bench-mode').value==='dense'?6:1);i++){const image=document.createElement('img');image.src='assets/media-effects/phu-nhuan.webp';image.alt='Ảnh trường trong mẫu '+(i+1);stage.append(image)}
 }
 function finish(now){
  const elapsed=now-start,sorted=[...intervals].sort((a,b)=>a-b),p95=sorted[Math.min(sorted.length-1,Math.floor(sorted.length*.95))]||0,max=sorted.at(-1)||0,rate=intervals.length/(elapsed/1000);
  cleanup();$('bench-status').textContent='Đã hoàn tất bài thử 5 giây.';$('bench-result').textContent='Mẫu: '+$('bench-mode').selectedOptions[0].text+'. Nhịp callback trung bình: '+rate.toFixed(1)+' / giây; P95 khoảng cách: '+p95.toFixed(1)+'ms; khoảng cách lớn nhất: '+max.toFixed(1)+'ms. '+(motion.matches?'Ảnh tĩnh do giảm chuyển động. ':'')+'Chỉ là lần đo mẫu này; phụ thuộc tần số màn hình, tab và tải máy. So sánh cùng điều kiện, rồi kiểm tra bài thật.';
 }
 function tick(now){
  if(!running)return;if(!start)start=now;if(last)intervals.push(now-last);last=now;count++;
  if(now-start>=5000){finish(now);return}
  $('bench-status').textContent='Đang quan sát: '+Math.floor((now-start)/1000)+' / 5 giây.';
  frame=requestAnimationFrame(tick);
 }
 $('bench-start').onclick=()=>{cleanup();render();stage.scrollIntoView({block:'center'});running=true;start=0;last=0;count=0;intervals=[];$('bench-start').disabled=true;$('bench-mode').disabled=true;$('bench-result').textContent='Đang đo; giữ tab và cửa sổ này ổn định.';
  if(!motion.matches)[...stage.children].forEach((image,i)=>animations.push(image.animate([{transform:'translateX(0)'},{transform:'translateX('+(i%2?'-':'')+'35px)'}],{duration:1300+i*100,iterations:Infinity,direction:'alternate',easing:'ease-in-out'})));
  frame=requestAnimationFrame(tick);
 };
 $('bench-stop').onclick=cancel;$('bench-mode').onchange=()=>{cancel();render()};
 for(const id of ['device-cpu','device-ram','device-gpu','device-browser','device-conditions'])$(id).oninput=request;
 window.addEventListener('resize',()=>{cancel();request()});document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel()});window.addEventListener('pagehide',cleanup);
 new IntersectionObserver(entries=>{if(entries.some(e=>!e.isIntersecting))cancel()},{threshold:0}).observe(stage);
 render();request();
})();
