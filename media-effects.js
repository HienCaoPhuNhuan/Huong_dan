(() => {
 const $=id=>document.getElementById(id),video=$('effect-video'),audio=$('effect-audio'),image=$('effect-image'),stage=$('media-stage');
 const groups={
 image:[
 ['fade','Hiện dần / Fade in','Ảnh tăng độ hiện rõ; chữ vẫn đứng yên.','Ảnh từ opacity 0 lên 1, không làm chữ mờ theo.'],
 ['slide','Trượt nhẹ từ dưới','Đưa ảnh vào vùng xem theo hướng.','Ảnh trượt nhẹ từ dưới lên 24px và hiện dần.'],
 ['wipe','Mở từ trái / Wipe','Mặt nạ mở ảnh, không kéo chữ theo.','Mở ảnh từ mép trái đến toàn khung bằng clip-path.'],
 ['circle','Mở hình tròn / Circle reveal','Mặt nạ tròn nở ra để lộ ảnh.','Ảnh mở từ vòng tròn ở giữa tới hết khung.'],
 ['kenburns','Phóng chậm / Ken Burns','Phóng nhẹ để tạo cảm giác chuyển động trên ảnh tĩnh.','Ảnh phóng từ 1 lên 1,12, điểm neo theo điểm cần giữ; chữ đứng yên.'],
 ['pan','Pan ngang nhẹ','Ảnh phóng trước để trượt mà không lộ mép.','Ảnh phóng 1,12 rồi pan từ -4% sang 4% theo chiều ngang.'],
 ['focus','Từ mờ sang rõ','Nhấn vào lúc người xem cần quan sát.','Ảnh giảm blur từ 8px xuống 0; không áp blur cho chữ.'],
 ['color','Đen trắng sang màu','Chuyển sắc thái để nhấn một khoảnh khắc.','Ảnh từ grayscale 100% về màu gốc; không đổi màu chữ.'],
 ['exit','Mờ dần / Fade out','Kết thúc một minh chứng; nội dung chữ vẫn còn.','Ảnh mờ từ opacity 1 về 0, giữ lớp chữ.']
 ],
 video:[
 ['fade','Video hiện dần','Phát video và làm lớp hình hiện dần; không làm âm thanh nhỏ đi.','Video phát không tiếng và hiện dần; chữ giữ nguyên.'],
 ['wipe','Video mở bằng wipe','Hiệu ứng vùng hiển thị, không thay đổi tệp video.','Video không tiếng mở từ mép trái; tệp video không bị chỉnh sửa.'],
 ['slow','Phát chậm 0,5×','Video mẫu 8 giây sẽ mất khoảng 16 giây để phát. Không nội suy thêm khung hình.','Phát video ở playbackRate 0,5, không tiếng; không hứa tạo thêm khung hình.'],
 ['fast','Phát nhanh 1,5×','Rút ngắn thời gian xem; cần giữ người xem kịp hiểu.','Phát video không tiếng ở playbackRate 1,5.'],
 ['kenburns','Phóng hình video nhẹ','Video vẫn chạy; lớp hiển thị được phóng thêm.','Video phát không tiếng, lớp hình phóng 1 lên 1,12; chữ đứng yên.'],
 ['freeze','Dừng tại một mốc / Freeze','Phát tới mốc đã chọn rồi giữ khung hình hiện tại.','Video không tiếng phát đến mốc thời gian đã chọn rồi pause, giữ khung hình; không phải chụp ảnh mới.']
 ],
 audio:[
 ['fade','Tăng dần âm lượng / Fade in','Nghe nhạc từ nhỏ đến mức đã chọn.','Nhạc từ 0 tăng dần đến mức âm lượng đã chọn.'],
 ['exit','Giảm dần rồi dừng / Fade out','Bắt đầu ở mức đã chọn, hạ về 0 rồi dừng.','Nhạc từ mức đã chọn giảm về 0 rồi pause.'],
 ['duck','Hạ nhạc khi nói / Ducking','Từ mức đã chọn hạ còn 20% của mức đó, giữ mức thấp.','Khi người thuyết trình bắt đầu nói, hạ nhạc còn 20% mức nền ban đầu; không tự nhận diện giọng nói.'],
 ['mute','Tắt tiếng / Mute','Nhạc vẫn chạy nhưng không có âm thanh; khác với pause.','Nhạc muted nhưng vẫn chạy; nút Dừng phải thực sự pause.'],
 ['slow','Nhạc chậm 0,75×','Đổi tốc độ phát, giữ cao độ nếu trình duyệt hỗ trợ.','Nhạc playbackRate 0,75 và preservesPitch khi được hỗ trợ; không dùng làm lời nói dài nếu khó nghe.']
 ],
 combo:[
 ['photo-music','Ảnh phóng + nhạc fade in','Hai lớp độc lập: chuyển động ảnh và âm lượng nhạc.','Ảnh phóng chậm 1 lên 1,12; nhạc fade in tới mức đã chọn; hai lớp bắt đầu sau thao tác bấm.'],
 ['video-music','Video wipe + nhạc fade in','Video không tiếng, nhạc phát riêng để tránh chồng tiếng.','Video không tiếng mở bằng wipe; nhạc riêng fade in tới mức đã chọn; không tự đồng bộ theo từng nhịp nhạc.']
 ]};
 let animations=[],rampFrame=0,token=0,activated=false,observer,freezeAt=null;
 const baseVolume=()=>Number($('music-volume').value)/100;
 const kind=()=>$('media-kind').value;
 const effect=()=>groups[kind()].find(e=>e[0]===$('media-effect').value);
 const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
 function visual(){return kind()==='video'||(kind()==='combo'&&$('media-effect').value==='video-music')?video:image}
 function volumeDisplay(){$('live-volume-bar').style.width=audio.muted?'0%':audio.volume*100+'%';$('live-volume').textContent='Âm lượng phát: '+Math.round((audio.muted?0:audio.volume)*100)+'%'+(audio.muted?' (muted)':'')}
 function stop(message=true){
  token++;cancelAnimationFrame(rampFrame);rampFrame=0;animations.forEach(a=>a.cancel());animations=[];
  video.pause();audio.pause();video.playbackRate=1;audio.playbackRate=1;audio.muted=false;audio.volume=baseVolume();freezeAt=null;
  for(const target of [image,video])for(const prop of ['transform','opacity','filter','clipPath'])target.style[prop]='';
  volumeDisplay();if(message)$('effect-status').textContent='Đã dừng. Vị trí phát được giữ; nút về đầu đặt lại thời gian.';
 }
 function formatTime(t){return Number.isFinite(t)?Math.floor(t/60)+':'+String(Math.floor(t%60)).padStart(2,'0'):'--:--'}
 function clocks(){
  $('video-clock').textContent='Video: '+formatTime(video.currentTime)+' / '+formatTime(video.duration)+(video.paused?' · dừng':' · đang phát');
  $('audio-clock').textContent='Nhạc: '+formatTime(audio.currentTime)+' / '+formatTime(audio.duration)+(audio.paused?' · dừng':' · đang phát');
 }
 function prompt(){
  const spec=effect(),duration=$('effect-duration').value,fit=$('frame-fit').value,point=$('focus-position').selectedOptions[0].text;
  $('effect-use').textContent=spec[2];
  const noTiming=['slow','fast','mute'].includes(spec[0]);$('effect-duration').disabled=noTiming;
  $('effect-duration-value').textContent=duration;$('overlay-value').textContent=$('overlay-level').value;$('volume-value').textContent=$('music-volume').value;
  $('media-trigger').disabled=kind()==='audio';$('frame-fit').disabled=kind()==='audio';$('focus-position').disabled=kind()==='audio';$('overlay-level').disabled=kind()==='audio';$('show-caption').disabled=kind()==='audio';
  $('music-volume').disabled=kind()==='image'||kind()==='video';$('repeat-media').disabled=kind()==='image';
  const file=kind()==='image'?'assets/media-effects/phu-nhuan.webp':kind()==='video'?'assets/media-effects/phu-nhuan.mp4':kind()==='audio'?'assets/media-effects/infraction-action-30s.mp3':(spec[0]==='photo-music'?'assets/media-effects/phu-nhuan.webp':'assets/media-effects/phu-nhuan.mp4')+' và assets/media-effects/infraction-action-30s.mp3';
  $('effect-prompt').value='Dùng '+file+' ở section [số]. '+spec[3]+(noTiming?'':spec[0]==='freeze'?' Mốc dừng: giây '+duration+'.':' Thời lượng hiệu ứng '+duration+' giây.')+(kind()!=='audio'?' Khung '+fit+', điểm cần giữ: '+point.toLowerCase()+'. Lớp phủ tối '+$('overlay-level').value+'%; '+($('show-caption').checked?'chữ nằm trên lớp riêng, không chuyển động theo media.':'không đặt chữ lên media.'):'')+(kind()==='audio'||kind()==='combo'?' Âm lượng nền '+$('music-volume').value+'%; chỉ phát nhạc sau khi bấm, có nút dừng.':'')+' Kích hoạt lớp nhìn thấy: '+$('media-trigger').selectedOptions[0].text.toLowerCase()+'. '+(kind()==='image'?'Hiệu ứng một lần, không lặp.':$('repeat-media').checked?'Lặp tệp media; hiệu ứng nhìn thấy chỉ chạy một lần.':'Không lặp tệp media.')+' Rời section, vùng mẫu rời màn hình hoặc tab ở nền thì dừng; không tự phát lại. Giảm chuyển động dùng ảnh/khung tĩnh, giữ chữ. Báo rõ tài nguyên nào chưa đọc được, kiểm tra quyền sử dụng.';
  if(kind()==='audio')$('effect-prompt').value=$('effect-prompt').value.replace('Kích hoạt lớp nhìn thấy: '+$('media-trigger').selectedOptions[0].text.toLowerCase()+'. ','');
 }
 function apply(){
  const target=visual();image.hidden=kind()==='audio'||target!==image;video.hidden=kind()==='audio'||target!==video;$('visual-layer').hidden=kind()==='audio';$('audio-stage').hidden=kind()!=='audio';$('stage-copy').hidden=kind()==='audio'||!$('show-caption').checked;$('media-shade').hidden=kind()==='audio';
  for(const t of [image,video]){t.style.objectFit=$('frame-fit').value;t.style.objectPosition=$('focus-position').value;t.style.transformOrigin=$('focus-position').value+' center'}
  $('media-shade').style.background='rgba(0,0,0,'+Number($('overlay-level').value)/100+')';
  video.loop=$('repeat-media').checked;audio.loop=$('repeat-media').checked;audio.volume=baseVolume();
  $('motion-note').textContent=reduced()?'Đang bật giảm chuyển động: bỏ phóng/trượt/mặt nạ.':'';
  prompt();volumeDisplay();
 }
 function animate(target,id){
  if(reduced())return;
  const frames={
   fade:[{opacity:0},{opacity:1}],exit:[{opacity:1},{opacity:0}],
   slide:[{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'none'}],
   wipe:[{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0 0 0)'}],
   circle:[{clipPath:'circle(0% at 50% 50%)'},{clipPath:'circle(75% at 50% 50%)'}],
   kenburns:[{transform:'scale(1)'},{transform:'scale(1.12)'}],
   pan:[{transform:'translateX(-4%) scale(1.12)'},{transform:'translateX(4%) scale(1.12)'}],
   focus:[{filter:'blur(8px)'},{filter:'blur(0px)'}],
   color:[{filter:'grayscale(1)'},{filter:'grayscale(0)'}]
  };
  if(frames[id])animations.push(target.animate(frames[id],{duration:Number($('effect-duration').value)*1000,easing:id==='kenburns'||id==='pan'?'linear':'ease-out',fill:'forwards'}));
 }
 function ramp(from,to,pauseAtEnd=false){
  cancelAnimationFrame(rampFrame);audio.volume=from;const start=performance.now(),duration=Number($('effect-duration').value)*1000,current=token;
  const tick=now=>{if(current!==token)return;const p=Math.max(0,Math.min(1,(now-start)/duration));audio.volume=Math.max(0,Math.min(1,from+(to-from)*p));volumeDisplay();if(p<1)rampFrame=requestAnimationFrame(tick);else{rampFrame=0;if(pauseAtEnd)audio.pause();$('effect-status').textContent=pauseAtEnd?'Fade out hoàn tất: nhạc đã dừng.':'Chuyển âm lượng hoàn tất; nhạc tiếp tục ở mức mới.'}};
  rampFrame=requestAnimationFrame(tick);
 }
 async function play(manual=true){
  if(manual)stage.scrollIntoView({block:'center',behavior:'auto'});
  stop(false);apply();activated=true;const current=token,spec=effect(),mode=kind(),target=visual(),hasVideo=mode==='video'||(mode==='combo'&&target===video),hasAudio=(mode==='audio'||mode==='combo')&&manual;
  if(hasVideo){video.currentTime=0;video.muted=true;video.playbackRate=spec[0]==='slow'?.5:spec[0]==='fast'?1.5:1;if(spec[0]==='freeze')freezeAt=Number($('effect-duration').value)}
  if(hasAudio){audio.currentTime=0;audio.muted=spec[0]==='mute';audio.playbackRate=spec[0]==='slow'?.75:1;audio.preservesPitch=true;audio.volume=spec[0]==='fade'||mode==='combo'?0:baseVolume()}
  $('effect-status').textContent=manual?'Đang chạy mẫu.':'Đang chạy lớp nhìn thấy. Muốn nghe nhạc hãy bấm Chạy / nghe thử.';
  // Start both play promises in the user gesture before waiting, so audible playback retains consent.
  const jobs=[];if(hasVideo)jobs.push(video.play());if(hasAudio)jobs.push(audio.play());
  try{await Promise.all(jobs);if(current!==token)return;
   if(mode!=='audio')animate(target,mode==='combo'?(spec[0]==='photo-music'?'kenburns':'wipe'):spec[0]);
   if(mode==='image'){
    if(!animations.length)$('effect-status').textContent='Giảm chuyển động: giữ ảnh tĩnh và chữ.';
    else Promise.all(animations.map(a=>a.finished.catch(()=>{}))).then(()=>{if(current===token)$('effect-status').textContent='Hiệu ứng ảnh hoàn tất; giữ kết quả trong khung.'});
   }
   if(hasAudio){if(spec[0]==='fade'||mode==='combo')ramp(0,baseVolume());else if(spec[0]==='exit')ramp(baseVolume(),0,true);else if(spec[0]==='duck')ramp(baseVolume(),baseVolume()*.2)}
   if(mode==='audio'&&!manual)$('effect-status').textContent='Nhạc cần thao tác bấm để phát.';
  }catch{if(current===token){stop(false);$('effect-status').textContent='Không phát được media hoặc trình duyệt chưa cho phép. Bấm lại, kiểm tra mạng và định dạng.'}}
 }
 function arm(){
  observer?.disconnect();activated=false;
  observer=new IntersectionObserver(entries=>{for(const e of entries){if(e.intersectionRatio>=.3&&$('media-trigger').value==='scroll'&&!activated&&kind()!=='audio')play(false);else if(!e.isIntersecting&&(animations.length||!video.paused||!audio.paused))stop()}},{threshold:[0,.3]});observer.observe(stage);
 }
 function choose(){
  stop(false);const s=$('media-effect');s.replaceChildren();groups[kind()].forEach(([id,title])=>{const o=document.createElement('option');o.value=id;o.textContent=title;s.append(o)});apply();arm();$('effect-status').textContent='Sẵn sàng. Nhạc chỉ phát khi bấm.';
 }
 $('media-kind').onchange=choose;
 for(const id of ['media-effect','media-trigger','effect-duration','frame-fit','focus-position','overlay-level','show-caption','repeat-media'])$(id).addEventListener('input',()=>{stop(false);apply();arm();$('effect-status').textContent='Đã đổi lựa chọn; sẵn sàng chạy lại.'});
 $('music-volume').oninput=()=>{cancelAnimationFrame(rampFrame);audio.volume=baseVolume();prompt();volumeDisplay()};
 $('effect-play').onclick=()=>play(true);$('effect-stop').onclick=()=>stop();$('effect-reset').onclick=()=>{stop(false);video.currentTime=0;audio.currentTime=0;activated=false;clocks();$('effect-status').textContent='Đã đưa video/nhạc về đầu.'};
 ['mouseenter','focusin'].forEach(event=>stage.addEventListener(event,()=>{if($('media-trigger').value==='hover'&&!activated&&kind()!=='audio')play(false)}));
 $('effect-fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await stage.requestFullscreen()}catch{$('effect-status').textContent='Trình duyệt không hỗ trợ toàn màn hình ở đây.'}};
 $('effect-copy').onclick=async()=>{try{await navigator.clipboard.writeText($('effect-prompt').value);$('effect-copy-status').textContent='Đã sao chép.'}catch{$('effect-prompt').focus();$('effect-prompt').select();$('effect-copy-status').textContent='Chọn văn bản để sao chép.'}};
 for(const media of [video,audio]){
  for(const event of ['timeupdate','loadedmetadata','play','pause','ended'])media.addEventListener(event,clocks);
  media.addEventListener('error',()=>{stop(false);$('effect-status').textContent='Không đọc được tệp media. Kiểm tra mạng hoặc định dạng.'});
 }
 video.addEventListener('timeupdate',()=>{if(freezeAt!==null&&video.currentTime>=freezeAt){const at=freezeAt;video.pause();freezeAt=null;video.currentTime=at;$('effect-status').textContent='Đã dừng tại khung hình ở mốc chọn.'}});
 audio.addEventListener('volumechange',volumeDisplay);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});window.addEventListener('pagehide',()=>stop(false));
 document.querySelectorAll('table').forEach(t=>{t.classList.add('mobile-table');const labels=[...t.querySelectorAll('th')].map(x=>x.textContent);t.querySelectorAll('tbody tr').forEach(r=>[...r.cells].forEach((c,i)=>c.dataset.label=labels[i]))});
 choose();clocks();
})();
