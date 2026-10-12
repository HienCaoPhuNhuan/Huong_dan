(() => {
 const el=id=>document.getElementById(id);
 const photo='https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?w=800&auto=format&fit=crop&q=80';
 const effects=[
 ['cut','Cắt ngay / Cut','Hợp khi muốn chuyển nhanh, không gây chuyển động.','Cắt trực tiếp, không animation.'],
 ['fade','Mờ chồng / Fade','Nhẹ, hợp khi không cần thể hiện hướng di chuyển.','Section cũ mờ đi đồng thời section mới hiện dần.'],
 ['push','Đẩy ngang / Push','Cả section cũ và mới cùng di chuyển.','Đẩy ngang: section mới vào và đẩy section cũ ra.'],
 ['vertical','Đẩy dọc / Push vertical','Thể hiện bước tiếp theo theo chiều dọc.','Đẩy dọc: cả hai section di chuyển cùng chiều.'],
 ['cover','Phủ lên / Cover','Section cũ đứng yên bên dưới.','Section mới trượt ngang phủ lên section cũ đứng yên.'],
 ['uncover','Lộ bên dưới / Uncover','Section mới đứng yên bên dưới.','Section cũ trượt ngang đi, để lộ section mới bên dưới.'],
 ['wipe','Quét / Wipe','Thay đổi vùng nhìn thấy, không trượt nội dung.','Mở mặt nạ từ một mép, nội dung mới giữ nguyên vị trí.'],
 ['split','Mở từ giữa / Split','Vùng nhìn thấy mở từ giữa sang hai phía.','Mở section mới từ giữa ra hai mép bằng mặt nạ.'],
 ['zoom','Phóng nhẹ / Zoom','Chỉ nên dùng phóng nhẹ, tránh cảm giác lao tới.','Section mới phóng nhẹ từ 0,88 lên 1, đồng thời hiện dần.'],
 ['flip','Lật mặt / Flip','Hiệu ứng xoay 2D có phối cảnh; không cần mô hình 3D.','Lật quanh trục dọc; mặt cũ xoay đi rồi mặt mới xoay vào.'],
 ['pivot','Xoay cạnh / Pivot','Gợi cảm giác xoay hai mặt phẳng, không mô phỏng khối 3D đầy đủ.','Xoay hai mặt quanh cạnh với phối cảnh; không coi đây là khối lập phương đầy đủ.'],
 ['morph','Đối tượng chung / Morph','Cùng ảnh và tiêu đề đổi vị trí/kích thước; các phần khác đổi nhẹ.','Giữ nhận diện cùng ảnh và tiêu đề giữa hai section, chuyển vị trí/kích thước liên tục; không biến ảnh thành ảnh khác.']
 ];
 for(const [id,title] of effects){const o=document.createElement('option');o.value=id;o.textContent=title;el('transition-effect').append(o)}
 el('transition-effect').value='push';
 let index=0,busy=false,animations=[],timer=null,generation=0,lastFrom=0,lastTo=1,hover=false,focus=false;
 const slide=i=>{
  const p=document.createElement('article');p.className='transition-slide slide-'+i;
  p.innerHTML='<div class="transition-copy"><span class="eyebrow">SECTION '+(i+1)+' / 3</span><h3 data-shared="title">Bảo vệ nguồn nước</h3><h4>'+['Quan sát hiện trạng','Đề xuất hành động','Kiểm tra thay đổi'][i]+'</h4><p>'+['Ảnh là minh chứng cần giải thích, không chỉ trang trí.','Sửa vòi rò, thu gom rác và theo dõi lượng nước sử dụng.','Đối chiếu kết quả, ghi nguồn và nêu hạn chế.'][i]+'</p></div><figure data-shared="photo"><img src="'+photo+'" alt="Dòng suối và đá, ảnh minh họa"><figcaption>Cùng một ảnh qua ba bố cục</figcaption></figure>';
  return p;
 };
 const render=()=>{el('transition-stage').replaceChildren(slide(index));el('transition-stage').dataset.index=index;el('transition-prev').disabled=index===0;el('transition-next').disabled=index===2;el('transition-replay').disabled=false;el('transition-status').textContent='Section '+(index+1)+' / 3 · Đã sẵn sàng.'};
 function pause(){clearTimeout(timer);el('transition-auto').checked=false}
 function cancel(){generation++;animations.forEach(a=>a.cancel());animations=[];busy=false;render()}
 function schedule(){clearTimeout(timer);if(el('transition-auto').checked&&!busy&&!hover&&!focus&&!document.hidden&&!el('transitions').hidden){if(index===2&&!el('transition-loop').checked){pause();el('transition-status').textContent='Section 3 / 3 · Đã hết bài; tự chuyển đã dừng.';return}timer=setTimeout(()=>change(index===2?0:index+1),5000)}}
 function update(){
  const fx=effects.find(x=>x[0]===el('transition-effect').value);
  el('transition-use').textContent=fx[2];el('transition-duration').disabled=fx[0]==='cut';el('transition-easing').disabled=fx[0]==='cut';
  el('transition-direction').disabled=!['push','vertical','cover','uncover','wipe','flip','pivot'].includes(fx[0]);
  el('transition-request').textContent=fx[3]+(fx[0]==='cut'?'':' Thời lượng '+Number(el('transition-duration').value)/1000+' giây; nhịp '+el('transition-easing').selectedOptions[0].text.toLowerCase()+'.')+(!el('transition-direction').disabled?' Hướng đi tới: '+el('transition-direction').selectedOptions[0].text.toLowerCase()+'; quay lại đảo chiều.':'')+' '+(el('transition-auto').checked?'Tự chuyển sau 5 giây đọc, tính từ khi chuyển xong; có nút dừng.':'Chỉ chuyển khi bấm hoặc dùng phím trái/phải trong bài.')+' Cuối bài '+(el('transition-loop').checked?'quay về đầu.':'dừng, không quay vòng.')+' Chuyển xong mới chạy animation của nội dung; dừng media section cũ. Quay lại giữ trạng thái. Chỉ section hiện tại được tương tác; giảm chuyển động dùng cắt ngay.';
  if(typeof updatePrompt==='function')updatePrompt();
 }
 async function change(next){
  if(busy||next===index)return;clearTimeout(timer);const token=++generation;busy=true;lastFrom=index;lastTo=next;
  const old=el('transition-stage').firstElementChild,incoming=slide(next),sign=(next>index?1:-1)*(el('transition-direction').value==='forward'?1:-1),fx=el('transition-effect').value;
  old.setAttribute('aria-hidden','true');old.inert=true;incoming.setAttribute('aria-hidden','true');incoming.inert=true;
  el('transition-stage').append(incoming);el('transition-prev').disabled=true;el('transition-next').disabled=true;el('transition-replay').disabled=true;
  const opts={duration:Number(el('transition-duration').value),easing:el('transition-easing').value,fill:'both'};
  const animate=(target,frames,custom={})=>{const a=target.animate(frames,{...opts,...custom});animations.push(a);return a};
  const neutral={transform:'none',opacity:1},move=(x,y)=>({transform:'translate('+x+'%, '+y+'%)'});
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&fx!=='cut'){
   if(fx==='fade'){animate(old,[{opacity:1},{opacity:0}]);animate(incoming,[{opacity:0},{opacity:1}])}
   if(fx==='push'||fx==='vertical'){const vertical=fx==='vertical';animate(old,[neutral,move(vertical?0:-100*sign,vertical?-100*sign:0)]);animate(incoming,[move(vertical?0:100*sign,vertical?100*sign:0),neutral])}
   if(fx==='cover')animate(incoming,[move(100*sign,0),neutral]);
   if(fx==='uncover'){old.style.zIndex='2';animate(old,[neutral,move(-100*sign,0)])}
   if(fx==='wipe')animate(incoming,[{clipPath:sign===1?'inset(0 100% 0 0)':'inset(0 0 0 100%)'},{clipPath:'inset(0 0 0 0)'}]);
   if(fx==='split')animate(incoming,[{clipPath:'inset(0 50% 0 50%)'},{clipPath:'inset(0 0 0 0)'}]);
   if(fx==='zoom')animate(incoming,[{transform:'scale(.88)',opacity:0},neutral]);
   if(fx==='flip'){
    incoming.style.visibility='hidden';
    animate(old,[neutral,{transform:'rotateY('+(-90*sign)+'deg)'}],{duration:opts.duration/2});
    animate(incoming,[{transform:'rotateY('+(90*sign)+'deg)',visibility:'visible'}, {...neutral,visibility:'visible'}],{duration:opts.duration/2,delay:opts.duration/2,fill:'forwards'});
   }
   if(fx==='pivot'){old.style.transformOrigin=sign===1?'left center':'right center';incoming.style.transformOrigin=sign===1?'right center':'left center';animate(old,[neutral,{transform:'rotateY('+(-90*sign)+'deg)',opacity:0}]);animate(incoming,[{transform:'rotateY('+(90*sign)+'deg)',opacity:0},neutral])}
   if(fx==='morph'){
    const pairs=[...incoming.querySelectorAll('[data-shared]')].map(n=>[old.querySelector('[data-shared="'+n.dataset.shared+'"]'),n]);
    // Match shared elements before hiding the old scene; animate the new geometry from the old bounds.
    pairs.forEach(([a,b])=>{const from=a.getBoundingClientRect(),to=b.getBoundingClientRect();b.style.transformOrigin='top left';animate(b,[{transform:'translate('+(from.left-to.left)+'px,'+(from.top-to.top)+'px) scale('+(from.width/to.width)+','+(from.height/to.height)+')'},{transform:'none'}]);a.style.visibility='hidden'});
    animate(incoming.querySelector('h4'),[{opacity:0},{opacity:1}]);animate(incoming.querySelector('p'),[{opacity:0},{opacity:1}]);
   }
  }
  await Promise.all(animations.map(a=>a.finished.catch(()=>{})));
  if(token!==generation)return;index=next;animations.forEach(a=>a.cancel());animations=[];busy=false;render();el('transition-replay').disabled=false;schedule();
 }
 el('transition-prev').onclick=()=>{pause();update();change(Math.max(0,index-1))};
 el('transition-next').onclick=()=>{pause();update();change(Math.min(2,index+1))};
 el('transition-replay').onclick=()=>{if(busy)return;pause();index=lastFrom;render();update();change(lastTo)};
 for(const id of ['transition-effect','transition-direction','transition-duration','transition-easing'])el(id).onchange=()=>{pause();cancel();update()};
 for(const id of ['transition-auto','transition-loop'])el(id).onchange=()=>{update();schedule()};
 el('transition-stop').onclick=()=>{pause();update();el('transition-status').textContent='Đã dừng tự chuyển; vẫn có thể chuyển thủ công.'};
 const stage=el('transition-stage');stage.onkeydown=e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();pause();update();change(Math.min(2,Math.max(0,index+(e.key==='ArrowRight'?1:-1))))}};
 stage.onmouseenter=()=>{hover=true;clearTimeout(timer)};stage.onmouseleave=()=>{hover=false;schedule()};stage.onfocus=()=>{focus=true;clearTimeout(timer)};stage.onblur=()=>{focus=false;schedule()};
 el('transition-copy').onclick=()=>copyText(el('transition-request').textContent,'transition-copy-status');
 document.addEventListener('click',()=>{if(el('transitions').hidden){pause();if(busy)cancel();update()}});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){pause();if(busy)cancel();update()}});
 window.addEventListener('resize',()=>{if(busy)cancel()});
 render();update();
 const structures=[
 ['deck','Từng section như slide','Hợp thuyết trình có người điều khiển.','Mỗi lần chỉ một section; có trước/sau, chỉ báo và mục lục; phần dài cho cuộn bên trong, không cắt chữ.'],
 ['scroll','Trang cuộn dọc','Hợp người xem tự đọc theo thứ tự.','Các section nối tiếp trong trang cuộn dọc; mục lục dẫn tới ID; chiều cao theo nội dung.'],
 ['snap','Cuộn bắt dính / Scroll snap','Cuộn dừng gần mốc section; vẫn đọc được phần dài.','Cuộn dọc với scroll snap dạng proximity, không khóa cuộn; nội dung dài được đọc đủ.'],
 ['horizontal','Cuộn ngang / triển lãm','Hợp chuỗi ảnh; cần chỉ dẫn cách đi tiếp.','Dàn section theo chiều ngang, có điều hướng rõ; điện thoại đổi thành cuộn dọc.'],
 ['sticky','Ảnh ghim, lời kể cuộn','Một minh chứng liên hệ với nhiều đoạn.','Ảnh ghim cạnh chuỗi đoạn kể chuyện; điện thoại bỏ ghim và xếp ảnh trước chữ; không che nội dung.'],
 ['overview','Tổng quan rồi chọn chủ đề','Chọn bất kỳ chủ đề và quay lại bản đồ nội dung.','Màn hình tổng quan có các chủ đề bấm được; mở chi tiết, có quay lại tổng quan và đánh dấu đã đọc.'],
 ['branch','Phân nhánh theo lựa chọn','Chọn đường tìm hiểu; không áp đặt tuyến duy nhất.','Cho chọn Quan sát hoặc Hành động, mỗi nhánh có nội dung riêng; có nút về điểm chọn và gợi ý tuyến đọc.'],
 ['tabs','Theo chương / tab','Tra cứu một chương tại một thời điểm.','Các chương bằng tab; chỉ chương đang chọn hiển thị, đánh dấu rõ và dùng được bàn phím.'],
 ['poster','Poster / tổng quan một trang','Tóm tắt cô đọng; không chứa mọi đoạn văn của bài dài.','Poster gồm tiêu đề, ảnh, luận điểm và kết luận; thứ bậc rõ, điện thoại xếp dọc; bản in không cắt nội dung.'],
 ['dashboard','Bảng tổng hợp / dashboard','Đối chiếu nhiều kết quả cùng lúc.','Bảng tổng hợp có số liệu, biểu đồ, nguồn và kết luận; ghi đơn vị; dữ liệu thật, không bịa số.']
 ];
 structures.forEach(([id,title])=>{const o=document.createElement('option');o.value=id;o.textContent=title;el('structure-choice').append(o)});
 function structure(){
  const [id,,use,request]=structures.find(x=>x[0]===el('structure-choice').value),p=el('structure-stage');p.dataset.mode=id;p.replaceChildren();
  const titles=['Quan sát','Hành động','Theo dõi'];const text=['Ghi hiện trạng và nguồn ảnh.','Chọn việc làm và giải thích vì sao.','Đối chiếu kết quả và hạn chế.'];
  const content=i=>'<h4>'+titles[i]+'</h4><p>'+text[i]+'</p>';
  const nav=document.createElement('div');nav.className='pill-row';
  if(['deck','overview','branch','tabs'].includes(id)){
   const body=document.createElement('div');body.className='structure-body';const read=new Set();let current=0;
   const makeButton=(label,fn)=>{const b=document.createElement('button');b.textContent=label;b.onclick=fn;return b};
   const choose=i=>{current=i;read.add(i);body.innerHTML=content(i);if(id==='overview'||id==='branch')body.append(makeButton('Về tổng quan',overview));[...nav.children].forEach((b,j)=>b.setAttribute(id==='tabs'?'aria-selected':'aria-pressed',String(j===i)))};
   const overview=()=>{body.innerHTML='<h4>Chọn phần muốn tìm hiểu</h4>';titles.slice(0,id==='branch'?2:3).forEach((t,i)=>body.append(makeButton(t+(read.has(i)?' · đã đọc':''),()=>choose(i))))};
   if(id==='deck'){body.innerHTML=content(0);nav.append(makeButton('← Trước',()=>{choose(Math.max(0,current-1))}),makeButton('Sau →',()=>{choose(Math.min(2,current+1))}));const position=document.createElement('p');position.className='muted';const refresh=()=>{position.textContent='Section '+(current+1)+' / 3';nav.children[0].disabled=current===0;nav.children[1].disabled=current===2};nav.children[0].onclick=()=>{choose(Math.max(0,current-1));refresh()};nav.children[1].onclick=()=>{choose(Math.min(2,current+1));refresh()};p.append(nav,body,position);refresh()}
   else if(id==='tabs'){nav.setAttribute('role','tablist');nav.setAttribute('aria-label','Chương mẫu');titles.forEach((t,i)=>{const b=makeButton(t,()=>choose(i));b.setAttribute('role','tab');b.onkeydown=e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();const n=(i+(e.key==='ArrowRight'?1:2))%3;nav.children[n].focus();choose(n)}};nav.append(b)});p.append(nav,body);choose(0)}
   else{p.append(body);overview()}
  }else if(id==='sticky'){
   p.innerHTML='<figure><img src="'+photo+'" alt="Dòng suối làm minh chứng"><figcaption>Ảnh ghim khi đọc</figcaption></figure><div>'+titles.map((t,i)=>'<article>'+content(i)+'</article>').join('')+'</div>';
  }else if(id==='poster')p.innerHTML='<h3>Bảo vệ nguồn nước</h3><img src="'+photo+'" alt="Dòng suối"><div class="poster-items">'+titles.map((t,i)=>'<article>'+content(i)+'</article>').join('')+'</div><strong>Kết luận: bắt đầu từ thói quen hằng ngày.</strong>';
  else if(id==='dashboard')p.innerHTML='<h3>Khảo sát giả định</h3><div class="dashboard-stats"><p><strong>12</strong><br>chai / tuần 1</p><p><strong>28</strong><br>chai / tuần 3</p></div><p>Đơn vị: chai dùng lại. Số liệu minh họa, cần thay bằng dữ liệu thật.</p><p>Kết luận: lượng chai dùng lại tăng trong ví dụ.</p>';
  else p.innerHTML=titles.map((t,i)=>'<article>'+content(i)+'<img src="'+photo+'" alt="Dòng suối, ảnh minh họa"></article>').join('');
  el('structure-use').textContent=use;el('structure-request').textContent='Cấu trúc toàn bài: '+request;updatePrompt();
 }
 el('structure-choice').onchange=structure;structure();
})();
