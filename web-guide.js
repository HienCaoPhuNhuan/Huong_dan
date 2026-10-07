const $=id=>document.getElementById(id);
const tabs=[...document.querySelectorAll('[role=tab]')];
function show(id){document.querySelectorAll('[role=tabpanel] audio,[role=tabpanel] video').forEach(m=>{if(m.closest('[role=tabpanel]').id!==id)m.pause()});if(id!=='media')youtubePlayer?.pauseVideo?.();if(id!=='layout')stopCarousel();if(id!=='motion')stopMotion();tabs.forEach(t=>{const active=t.getAttribute('aria-controls')===id;t.setAttribute('aria-selected',active);t.tabIndex=active?0:-1;$(t.getAttribute('aria-controls')).hidden=!active});if(id==='motion')resetMotion();history.replaceState(null,'','#'+id)}
tabs.forEach((t,i)=>{t.addEventListener('click',()=>show(t.getAttribute('aria-controls')));t.addEventListener('keydown',e=>{let n=i;if(e.key==='ArrowRight')n=(i+1)%tabs.length;else if(e.key==='ArrowLeft')n=(i+tabs.length-1)%tabs.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=tabs.length-1;else return;e.preventDefault();tabs[n].focus();show(tabs[n].getAttribute('aria-controls'))})});
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>{show(b.dataset.go);$('tab-'+b.dataset.go).focus()}));
const photo='https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?w=800&auto=format&fit=crop&q=80';
const layouts={};
function preset(id,kind,title,use,request){layouts[id]={kind,title,use,request}}
preset('columns','text','Ba cột nội dung','Các ý ngang hàng.','Đặt ba ý thành ba cột; mỗi ý có tiêu đề và giải thích; điện thoại xếp dọc.');
preset('stack','text','Một cột tuần tự','Đọc từ trên xuống.','Xếp nội dung một cột, mỗi đoạn một ý, có khoảng cách giữa các đoạn.');
preset('timeline','text','Dòng thời gian','Các bước có thứ tự.','Đánh số ba bước, nối bằng đường dọc; không dùng khi các ý không có thứ tự.');
preset('compare','text','So sánh hai cột','Đối chiếu cùng tiêu chí.','So sánh hai phương án với cùng tiêu chí; điện thoại xếp dọc và giữ tên tiêu chí.');
preset('single','photos','Một ảnh toàn khung','Quan sát toàn bộ đối tượng.','Dùng một ảnh lớn, giữ toàn bộ ảnh bằng contain, có chú thích và nguồn.');
preset('gallery','photos','Lưới hình ảnh','Quan sát nhiều ảnh cùng lúc.','Xếp ba ảnh thành lưới, khung cùng tỷ lệ; có chú thích, điện thoại xếp dọc.');
preset('before','photos','Trước và sau','So sánh hai trạng thái.','Đặt hai ảnh trước/sau cạnh nhau, cùng tỷ lệ và góc quan sát, nhãn rõ.');
preset('image','mixed','Ảnh trái, chữ phải','Ảnh minh chứng cho giải thích.','Đặt ảnh trái, nội dung phải; điện thoại ảnh trên; không cắt đối tượng chính.');
preset('right','mixed','Chữ trái, ảnh phải','Đọc luận điểm trước.','Đặt nội dung trái và ảnh phải; điện thoại chữ trước ảnh; thêm nguồn ảnh.');
preset('caption','mixed','Ảnh và chú thích dưới','Giải thích chi tiết ảnh.','Ảnh lớn phía trên, chú thích và nguồn ngay dưới, giữ toàn bộ ảnh.');
preset('overlay','mixed','Chữ trên ảnh','Ảnh làm nền cho tiêu đề ngắn.','Đặt tiêu đề ngắn trên ảnh, lớp nền tối để đủ tương phản; không che đối tượng chính.');
preset('video','av','Video và ghi chú','Xem minh chứng rồi thảo luận.','Đặt video có điều khiển cạnh ghi chú; bấm mới phát, dừng khi rời section; có phụ đề và link dự phòng.');
preset('audio','av','Âm thanh và bản lời','Nghe và theo dõi nội dung.','Đặt trình phát âm thanh trên bản lời, bấm mới phát, dừng khi rời section.');
preset('chart','data','Biểu đồ','So sánh số liệu.','Dùng biểu đồ cột, có nhãn, đơn vị, giá trị và nguồn; kèm bảng dữ liệu; không bịa số liệu.');
preset('table','data','Bảng dữ liệu','Tra cứu giá trị chính xác.','Bảng có tiêu đề cột và đơn vị; điện thoại cuộn ngang trong bảng, không cuộn toàn trang.');
preset('document','data','Tài liệu PDF / Word','Đọc hoặc tải tài liệu.','Dùng assets/documents/tai-lieu.pdf; có tên tài liệu và link mở/tải. PDF có thể nhúng; Word nên có link tải hoặc bản PDF. Nếu nhúng lỗi vẫn có link.');
preset('links','ui','Đường liên kết','Chuyển tới nguồn hoặc section.','Link nội bộ tới section, link ngoài có tên rõ và mở tab mới; ghi nguồn, kiểm tra quyền truy cập.');
preset('form','ui','Biểu mẫu','Thu ý kiến hoặc trả lời.','Dùng biểu mẫu có nhãn và kiểm tra trường bắt buộc. Muốn nhận câu trả lời dùng Google Forms hoặc dịch vụ xử lý; GitHub Pages không tự lưu dữ liệu.');
preset('carousel','ui','Băng chuyền ảnh','Xem từng ảnh trong cùng vùng.','Băng chuyền có trước/sau, chỉ báo vị trí và chú thích; mặc định không tự chạy. Nếu tự chạy mỗi 5 giây, có dừng/tiếp tục, dừng khi focus/rê chuột và rời section.');
preset('toc','ui','Mục lục','Đi nhanh đến phần cần đọc.','Mục lục liên kết từng section bằng ID duy nhất; tên khớp tiêu đề, đánh dấu phần hiện tại; không để thanh cố định che tiêu đề.');
preset('accordion','ui','Nhóm thu gọn','Ẩn chi tiết phụ khi chưa cần.','Nhóm thu gọn có tiêu đề rõ, bấm/Enter để mở hoặc đóng; không ẩn luận điểm chính; nêu có cho mở nhiều nhóm cùng lúc không.');
preset('chrome','ui','Tiêu đề và chân trang','Tạo thứ bậc và nhận diện.','Một H1 tên bài; mỗi section có H2, mục nhỏ H3. Đầu trang có tên bài/điều hướng; chân trang ghi nhóm, nguồn và ngày cập nhật; không che nội dung.');
preset('divider','ui','Bộ chia và khoảng cách','Phân biệt nhóm ý.','Dùng khoảng trắng để tách ý gần nhau, đường mảnh để tách chủ đề; chỉ kẻ dọc giữa cột trên máy tính, bỏ khi xếp dọc; không dùng đường chia như biểu đồ.');
preset('buttons','ui','Nút thao tác','Thực hiện hành động.','Nút chính cho hành động quan trọng, nút phụ cho đặt lại; icon có nhãn/tooltip. Nút dùng cho thao tác, link cho chuyển trang; có trạng thái vô hiệu hóa và phản hồi.');
function image(caption='Dòng suối và đá'){return '<figure><img class="sample-photo" src="'+photo+'" alt="Dòng suối chảy qua đá và cây xanh"><figcaption>'+caption+'</figcaption></figure>'}
function chooseKind(){const s=$('layout-choice');s.replaceChildren();Object.entries(layouts).filter(([,v])=>v.kind===$('layout-kind').value).forEach(([id,v])=>{const o=document.createElement('option');o.value=id;o.textContent=v.title;s.append(o)});updateLayout()}
let carouselTimer=null;
function stopCarousel(){clearTimeout(carouselTimer);if($('carousel-auto'))$('carousel-auto').checked=false;if($('carousel-toggle')){$('carousel-toggle').disabled=true;$('carousel-toggle').textContent='Dừng'}}
function updateLayout(){
 stopCarousel();
 const v=$('layout-choice').value,p=$('layout-preview'),item=layouts[v];p.classList.toggle('phone',$('device').value==='phone');p.dataset.layout=v;
 const words='<div><h3>Bảo vệ nguồn nước</h3><p>Quan sát hiện trạng, giải thích nguyên nhân và đề xuất hành động.</p><p>Minh chứng cần có nguồn và thời điểm ghi nhận.</p></div>';
 let html='';
 if(['columns','stack','timeline','compare'].includes(v)){const list=v==='compare'?['Sửa vòi rò','Tắt vòi khi không dùng']:['Quan sát','Hành động','Theo dõi'];html='<h3>Bảo vệ nguồn nước</h3><div class="sample-grid '+v+'">'+list.map((t,i)=>'<article class="sample-item"><strong>'+ (v==='timeline'?(i+1)+'. ':'')+t+'</strong><p>'+['Ghi nhận hiện trạng và nguồn minh chứng.','Thay đổi thói quen sử dụng nước.','Kiểm tra kết quả sau hành động.'][i]+'</p></article>').join('')+'</div>'}
 else if(['single','gallery','before'].includes(v))html='<div class="photo-grid '+v+'">'+(v==='single'?image():v==='before'?image('Trước · ảnh minh họa')+image('Sau · cần thay bằng ảnh thật'):image('Quan sát')+image('Chi tiết')+image('Toàn cảnh'))+'</div>';
 else if(['image','right'].includes(v))html='<div class="mixed-grid">'+(v==='image'?image()+words:words+image())+'</div>';
 else if(v==='caption')html=image('Dòng suối · Ảnh minh họa từ Unsplash')+words;
 else if(v==='overlay')html='<div class="overlay-sample">'+image('')+'<h3>Bảo vệ nguồn nước</h3></div>';
 else if(v==='video')html='<div class="mixed-grid"><div><div class="av-placeholder">Video của nhóm</div><button data-go="media">Chọn video YouTube để thử</button></div>'+words+'</div>';
 else if(v==='audio')html='<h3>Âm thanh và bản lời</h3><p>Chọn tệp âm thanh của nhóm ở mục 1 để nghe thử.</p><button data-go="media">Chọn âm thanh</button><blockquote>Bản lời: Hãy bắt đầu từ những hành động nhỏ để bảo vệ nguồn nước...</blockquote>';
 else if(v==='chart')html='<h3>Số chai dùng lại / tuần</h3><p class="muted">Dữ liệu giả định, không phải kết quả khảo sát.</p>'+[12,20,28].map((n,i)=>'<div class="bar-row"><span>Tuần '+(i+1)+'</span><div class="bar" style="width:'+n/28*65+'%">'+n+'</div></div>').join('')+'<details><summary>Bảng dữ liệu</summary><p>Tuần 1: 12; tuần 2: 20; tuần 3: 28 chai.</p></details>';
 else if(v==='table')html='<h3>Khảo sát giả định</h3><div class="table-wrap"><table><tr><th>Tuần</th><th>Số chai dùng lại</th><th>Đơn vị</th></tr><tr><td>1</td><td>12</td><td>chai</td></tr><tr><td>2</td><td>20</td><td>chai</td></tr></table></div>';
 else if(v==='document')html='<h3>Tài liệu tham khảo</h3><p>assets/documents/tai-lieu.pdf</p><p>Chỉ tạo nút mở/tải khi đã có tệp thật. Tệp Word không hiển thị trực tiếp như PDF trên nhiều trình duyệt.</p><a href="https://docs.github.com/en/pages" target="_blank" rel="noopener">Ví dụ link tài liệu: GitHub Pages</a>';
 else if(v==='links')html='<h3>Nguồn và điều hướng</h3><a href="https://docs.github.com/en/pages" target="_blank" rel="noopener">Đọc tài liệu GitHub Pages (tab mới)</a><p><button data-go="media">Về mục nội dung và đa phương tiện</button></p>';
 else if(v==='form')html='<form id="sample-form"><h3>Cam kết của tôi</h3><label for="sample-answer">Một hành động tiết kiệm nước</label><input id="sample-answer" type="text" required maxlength="200"><button class="primary">Kiểm tra câu trả lời</button><p id="sample-form-result" aria-live="polite"></p><p class="muted">Mẫu này chỉ kiểm tra trên máy; không gửi, không lưu câu trả lời.</p></form>';
 else if(v==='carousel')html=image('Ảnh 1 / 3 · Toàn cảnh')+'<div class="pill-row"><button id="photo-prev" aria-label="Ảnh trước">←</button><span id="photo-count" aria-live="polite">1 / 3</span><button id="photo-next" aria-label="Ảnh sau">→</button></div><label class="checkbox"><input id="carousel-auto" type="checkbox">Tự đổi ảnh mỗi 5 giây</label><button id="carousel-toggle" disabled>Dừng</button><p class="muted">Rê chuột hoặc focus vào ảnh để tạm dừng; rời mục thì tắt tự chạy.</p>';
 else if(v==='toc')html='<h3>Mục lục mẫu</h3><ol><li><a href="#sample-intro">Vấn đề</a></li><li><a href="#sample-action">Hành động</a></li></ol><div class="toc-sample"><h3 id="sample-intro">Vấn đề</h3><p>Nguồn nước cần được bảo vệ.</p><h3 id="sample-action">Hành động</h3><p>Tiết kiệm nước và thu gom rác.</p></div>';
 else if(v==='accordion')html='<h3>Thông tin bổ sung</h3><details><summary>Vì sao sửa vòi bị rò?</summary><p>Giảm thất thoát liên tục.</p></details><details><summary>Làm sao theo dõi kết quả?</summary><p>Ghi lượng sử dụng trước và sau thay đổi.</p></details>';
 else if(v==='chrome')html='<div class="sample-header">NHÓM NGUỒN NƯỚC · Nguồn tham khảo</div><h3>Tên bài thuyết trình</h3><h4>Tiêu đề section</h4><p>Luận điểm chính và minh chứng.</p><div class="sample-footer">Nhóm thực hiện · Nguồn ảnh · Ngày cập nhật</div>';
 else if(v==='divider')html='<h3>Nhóm ý thứ nhất</h3><p>Ý gần nhau dùng khoảng trắng.</p><hr><h3>Chủ đề tiếp theo</h3><p>Đường mảnh đánh dấu đổi chủ đề.</p>';
 else html='<h3>Nút và trạng thái</h3><div class="pill-row"><button class="primary" id="sample-button" aria-expanded="false">Xem kết luận</button><button disabled>Chưa có dữ liệu</button></div><p id="sample-button-result" hidden>Tiết kiệm nước bắt đầu từ thói quen hằng ngày.</p>';
 p.innerHTML=html;
 p.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>show(b.dataset.go));
 if(v==='form')$('sample-form').onsubmit=e=>{e.preventDefault();$('sample-form-result').textContent=$('sample-answer').value.trim()?'Đã có câu trả lời. Mẫu không gửi dữ liệu.':'Hãy nhập nội dung, không chỉ khoảng trắng.'};
 if(v==='buttons')$('sample-button').onclick=()=>{const a=$('sample-button-result');a.hidden=!a.hidden;$('sample-button').setAttribute('aria-expanded',!a.hidden)};
 if(v==='carousel'){
  let n=0,paused=false,over=false,focused=false;const frame=p.querySelector('figure');frame.tabIndex=0;frame.setAttribute('aria-label','Ảnh trong băng chuyền');
  const render=()=>{p.querySelector('img').style.objectPosition=['center','left','right'][n];p.querySelector('figcaption').textContent=['Toàn cảnh','Cắt bên trái','Cắt bên phải'][n];$('photo-count').textContent=(n+1)+' / 3';$('photo-prev').disabled=n===0;$('photo-next').disabled=n===2};
  const schedule=()=>{clearTimeout(carouselTimer);if($('carousel-auto').checked&&!paused&&!over&&!focused&&!document.hidden&&!$('layout').hidden)carouselTimer=setTimeout(()=>{n=(n+1)%3;render();schedule()},5000)};
  $('photo-prev').onclick=()=>{n=Math.max(0,n-1);render();schedule()};$('photo-next').onclick=()=>{n=Math.min(2,n+1);render();schedule()};
  $('carousel-auto').onchange=()=>{paused=false;$('carousel-toggle').disabled=!$('carousel-auto').checked;$('carousel-toggle').textContent='Dừng';schedule()};
  $('carousel-toggle').onclick=()=>{paused=!paused;$('carousel-toggle').textContent=paused?'Tiếp tục':'Dừng';schedule()};
  frame.onmouseenter=()=>{over=true;schedule()};frame.onmouseleave=()=>{over=false;schedule()};frame.onfocus=()=>{focused=true;schedule()};frame.onblur=()=>{focused=false;schedule()};render()
 }
 $('layout-use').textContent=item.use;$('layout-request').textContent=item.request;updatePrompt();
}
$('layout-kind').onchange=chooseKind;['layout-choice','device'].forEach(id=>$(id).addEventListener('change',updateLayout));
let motionIndex=0,motionTimer,animations=[],motionObserver;
function stopMotion(){clearTimeout(motionTimer);motionObserver?.disconnect();animations.forEach(a=>a.cancel());animations=[]}
function resetMotion(arm=true){
 stopMotion();motionIndex=0;const kind=$('motion-kind').value;
 $('motion-stage').innerHTML=kind==='text'?['Quan sát','Hành động','Theo dõi'].map((t,i)=>'<div class="motion-box"><b>0'+(i+1)+'</b>'+t+'</div>').join(''):kind==='photos'?[1,2,3].map(i=>'<div class="motion-box">'+image('Ảnh '+i)+'</div>').join(''):'<div class="motion-box"><strong>Bảo vệ nước</strong></div><div class="motion-box">'+image('Minh chứng')+'</div><div class="motion-box">Giải thích hình ảnh</div>';
 [...$('motion-stage').children].forEach(b=>b.style.visibility='hidden');$('motion-scroll').scrollTop=0;$('scroll-spacer').hidden=$('trigger').value!=='scroll';$('motion-status').textContent='Sẵn sàng: '+$('trigger').selectedOptions[0].text+'.';updateMotionText();
 if(!arm||$('motion').hidden)return;
 const trigger=$('trigger').value;
 if(trigger==='auto'||trigger==='timer')motionTimer=setTimeout(play,trigger==='auto'?0:Number($('motion-wait').value)*1000);
 if(trigger==='scroll'){motionObserver=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)&&!$('motion').hidden){motionObserver.disconnect();play()}},{root:$('motion-scroll'),threshold:.4});motionObserver.observe($('motion-stage'))}
}
function updateMotionText(){
 ['duration','motion-wait','motion-gap'].forEach((id,i)=>$(['duration-value','wait-value','gap-value'][i]).textContent=$(id).value);
 $('play').textContent=$('trigger').value==='step'?'▶ Hiện đối tượng tiếp theo':'▶ Chạy thử';
 $('motion-request').textContent=$('motion-kind').selectedOptions[0].text+': '+$('effect').selectedOptions[0].text.toLowerCase()+', thời lượng '+$('duration').value+' giây; các đối tượng bắt đầu cách nhau '+$('motion-gap').value+' giây. Trigger: '+$('trigger').selectedOptions[0].text+'. '+($('trigger').value==='timer'?'Chờ '+$('motion-wait').value+' giây. ':'')+'Chạy một lần, giữ kết quả; có nút đặt lại. Khi rời section, hủy tác vụ đang chờ. Hỗ trợ giảm chuyển động.';updatePrompt()
}
function reveal(b,delay=0){
 b.style.visibility='visible';if(matchMedia('(prefers-reduced-motion: reduce)').matches||$('effect').value==='none')return;
 const frames={fade:[{opacity:0},{opacity:1}],slide:[{opacity:0,transform:'translateY(22px)'},{opacity:1,transform:'translateY(0)'}],left:[{opacity:0,transform:'translateX(-25px)'},{opacity:1,transform:'translateX(0)'}],zoom:[{opacity:0,transform:'scale(.85)'},{opacity:1,transform:'scale(1)'}],wipe:[{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0 0 0)'}]};
 animations.push(b.animate(frames[$('effect').value],{duration:Number($('duration').value)*1000,delay,fill:'both',easing:'ease-out'}))
}
function play(){
 if($('trigger').value==='step'){if(motionIndex>=3)resetMotion(false);reveal($('motion-stage').children[motionIndex++]);$('motion-status').textContent='Đã hiện '+motionIndex+'/3 đối tượng.'}
 else{const scroll=$('motion-scroll').scrollTop;resetMotion(false);$('motion-scroll').scrollTop=scroll;[...$('motion-stage').children].forEach((b,i)=>reveal(b,i*Number($('motion-gap').value)*1000));motionIndex=3;$('motion-status').textContent='Đã kích hoạt cả tổ hợp, chạy một lần.'}
}
$('play').onclick=play;$('reset-motion').onclick=()=>resetMotion();
['motion-kind','effect','trigger','duration','motion-wait','motion-gap'].forEach(id=>$(id).addEventListener('input',()=>resetMotion()));
['mouseenter','focusin'].forEach(event=>$('motion-scroll').addEventListener(event,()=>{if($('trigger').value==='hover'&&motionIndex===0)play()}));
const interactionRequests={reveal:'Ban đầu ẩn đáp án. Bấm nút Xem đáp án để mở; nút đổi thành Ẩn đáp án và bấm lại để đóng.',tabs:'Có hai tab Nguyên nhân và Giải pháp. Chỉ hiện nội dung của tab đang chọn, đánh dấu rõ tab đó.',quiz:'Tạo câu hỏi trắc nghiệm có ba phương án. Khi chọn, báo đúng/sai kèm giải thích; cho phép chọn lại.',slides:'Tạo ba màn hình; mỗi lần chỉ hiện một màn hình. Có nút trước/sau, phím trái/phải và chỉ báo vị trí; vô hiệu hóa nút ở đầu/cuối.'};
function updateInteraction(){const v=$('interaction-choice').value,p=$('interaction-preview');if(v==='reveal'){p.innerHTML='<h3>Vì sao cần sửa vòi nước bị rò?</h3><button class="primary" id="answer-toggle" aria-expanded="false">Xem đáp án</button><p id="answer" class="rule" hidden>Vòi rò gây thất thoát nước liên tục, kể cả khi không sử dụng.</p>';$('answer-toggle').onclick=()=>{const open=$('answer').hidden;$('answer').hidden=!open;$('answer-toggle').textContent=open?'Ẩn đáp án':'Xem đáp án';$('answer-toggle').setAttribute('aria-expanded',open)}}else if(v==='tabs'){p.innerHTML='<h3>Bảo vệ nguồn nước</h3><div class="pill-row"><button id="cause" class="primary" aria-pressed="true">Nguyên nhân</button><button id="solution" aria-pressed="false">Giải pháp</button></div><p id="subcontent">Nước thải chưa xử lý, rác và sử dụng lãng phí.</p>';['cause','solution'].forEach(id=>$(id).onclick=()=>{['cause','solution'].forEach(x=>{$(x).classList.toggle('primary',x===id);$(x).setAttribute('aria-pressed',x===id)});$('subcontent').textContent=id==='cause'?'Nước thải chưa xử lý, rác và sử dụng lãng phí.':'Xử lý nước thải, thu gom rác và thay đổi thói quen.'})}else if(v==='quiz'){p.innerHTML='<h3>Hành động nào giúp tiết kiệm nước?</h3><div class="quiz-options"><button data-answer="0">Để vòi mở khi đánh răng</button><button data-answer="1">Sửa vòi bị rò</button><button data-answer="0">Xả nước liên tục khi rửa đồ</button></div><p id="quiz-feedback" aria-live="polite"></p>';p.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{$('quiz-feedback').textContent=b.dataset.answer==='1'?'Đúng. Sửa vòi rò giúp giảm lượng nước thất thoát liên tục.':'Chưa đúng. Hãy chọn hành động giảm thất thoát hoặc thời gian mở vòi.'})}else{let index=0;const titles=['Vấn đề','Nguyên nhân','Giải pháp'],body=['Nguồn nước cần được bảo vệ.','Nước thải, rác và thói quen sử dụng.','Hành động từ gia đình và cộng đồng.'];p.innerHTML='<div tabindex="0" id="mini-slide"><h3 id="mini-title"></h3><p id="mini-body"></p><div class="pill-row"><button id="prev" aria-label="Màn hình trước">←</button><span id="slide-count"></span><button id="next" aria-label="Màn hình tiếp theo">→</button></div></div>';const render=()=>{$('mini-title').textContent=titles[index];$('mini-body').textContent=body[index];$('slide-count').textContent=`${index+1} / 3`;$('prev').disabled=index===0;$('next').disabled=index===2};$('prev').onclick=()=>{index=Math.max(0,index-1);render()};$('next').onclick=()=>{index=Math.min(2,index+1);render()};$('mini-slide').onkeydown=e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();index=Math.max(0,Math.min(2,index+(e.key==='ArrowRight'?1:-1)));render()}};render()}$('interaction-request').textContent=interactionRequests[v];updatePrompt()}
$('interaction-choice').addEventListener('change',updateInteraction);
let promptSignature='';
function updatePrompt(){
 const count=$('screens'),valid=count.validity.valid&&count.value!==''&&Number.isSafeInteger(Number(count.value))&&Number(count.value)>0;
 count.setAttribute('aria-invalid',String(!valid));
 const sections=valid?count.value:'[điền số nguyên dương]',topic=$('topic').value.trim()||'[chủ đề]',repo=$('repo-url').value.trim(),content=$('content').value.trim();
 const lines=[`Tôi cần bài thuyết trình web về “${topic}” cho ${$('audience').value.trim()||'[người xem]'}, dự kiến ${sections} section. Cách xem: ${$('format').value}.`,`Tôi thích ${$('palette').value.toLowerCase()}; chữ dễ đọc trên máy chiếu và điện thoại.`];
 lines.push(content?`Dàn ý và minh chứng của tôi:\n${content}`:'Hãy đề xuất dàn ý để tôi duyệt, đánh dấu những minh chứng hoặc nguồn cần tôi bổ sung.');
 if(repo)lines.push(`Repo bài thuyết trình của nhóm tôi: ${repo}. Hãy đọc phiên bản mới nhất nếu có quyền truy cập và sử dụng danh sách tài nguyên tôi cung cấp trong cuộc trò chuyện này. Sau khi tôi duyệt thiết kế, cập nhật bài trong repo của nhóm khi môi trường hỗ trợ và báo rõ trạng thái; nếu không truy cập hoặc ghi được, hãy nói rõ.`);
 else lines.push('Trước khi cập nhật, tôi sẽ cung cấp repo của bài.');
 const media=$('project-media').value.trim();if(media)lines.push(`Tài nguyên và cách dùng:\n${media}`);
 if($('prompt-detail').checked)lines.push(`Chi tiết tham khảo, dùng ở section có nội dung phù hợp:\n- ${layouts[$('layout-choice').value].request}\n- ${$('motion-request').textContent}\n- ${interactionRequests[$('interaction-choice').value]}`);
 lines.push($('offline').checked?'Bài cần chạy khi mất mạng sau khi tải đủ tệp: dùng tài nguyên trong assets và phông hệ thống; báo tài nguyên ngoài cần thay thế.':'Cho tôi biết tài nguyên nào cần kết nối Internet.');
 lines.push('Hãy đề xuất bố cục và chuyển động phù hợp, không bịa số liệu hoặc nguồn. Nếu còn thiếu thông tin thiết yếu, hỏi gộp trong một lượt; nêu rõ các giả định để tôi kiểm tra.');
 const signature=JSON.stringify([lines,valid]);
 if(signature!==promptSignature){$('prompt-output').value=lines.join('\n\n');promptSignature=signature}
 $('copy-status').textContent=valid?'':'Nhập số section là số nguyên dương trước khi dùng bản yêu cầu.';
}
['topic','audience','screens','format','palette','content','offline','repo-url','project-media','prompt-detail'].forEach(id=>$(id).addEventListener('input',updatePrompt));
async function copyText(text,status,fallback){try{await navigator.clipboard.writeText(text);$(status).textContent='Đã sao chép.'}catch{if(fallback){$(fallback).focus();$(fallback).select()}$(status).textContent='Không sao chép tự động được. Chọn văn bản để sao chép hoặc tải tệp.'}}
function downloadText(text,name){const a=document.createElement('a'),url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
$('copy-prompt').onclick=()=>copyText($('prompt-output').value,'copy-status','prompt-output');
$('download-prompt').onclick=()=>downloadText($('prompt-output').value,'yeu-cau-thiet-ke-web.txt');
$('copy-personal').onclick=()=>copyText(`Thông tin về tôi:\n${$('personal-about').value}\n\nCách tôi muốn được hỗ trợ:\n${$('personal-response').value}`,'personal-status','personal-about');
$('copy-assets').onclick=()=>copyText($('assets-map').value,'assets-status','assets-map');
$('download-assets').onclick=()=>downloadText($('assets-map').value,'danh-sach-tai-nguyen.txt');
let youtubePlayer=null,youtubeApiPromise=null,youtubeLoadToken=0;
function youtubeConfig(){
 const raw=$('youtube-url').value.trim();let id=raw;
 if(!/^[A-Za-z0-9_-]{11}$/.test(raw)){try{const u=new URL(raw);if(!['https:','http:'].includes(u.protocol))throw new Error();const host=u.hostname.replace(/^www\./,'');if(host==='youtu.be')id=u.pathname.split('/')[1];else if(['youtube.com','m.youtube.com','youtube-nocookie.com'].includes(host)){const parts=u.pathname.split('/');id=u.pathname==='/watch'?u.searchParams.get('v'):['embed','shorts','live'].includes(parts[1])?parts[2]:''}else id=''}catch{id=''}}
 const start=Number($('youtube-start').value),end=$('youtube-end').value===''?undefined:Number($('youtube-end').value);
 const validId=/^[A-Za-z0-9_-]{11}$/.test(id||''),validTime=$('youtube-start').value!==''&&Number.isSafeInteger(start)&&start>=0&&(end===undefined||(Number.isSafeInteger(end)&&end>start));
 $('youtube-url').setAttribute('aria-invalid',!validId);$('youtube-end').setAttribute('aria-invalid',!validTime);$('youtube-start').setAttribute('aria-invalid',!validTime);
 return validId&&validTime?{id,start,end,auto:$('youtube-auto').checked,muted:$('youtube-muted').checked,loop:$('youtube-loop').checked}:null
}
function youtubePrompt(){
 const c=youtubeConfig();$('youtube-output').value=c?'Nhúng https://www.youtube.com/watch?v='+c.id+' ở section [số], bắt đầu giây '+c.start+(c.end===undefined?', đến hết video':', kết thúc giây '+c.end)+'. '+(c.auto?'Thử tự phát khi vào section; nếu bị chặn, có nút phát thủ công.':'Bấm mới phát.')+' '+(c.muted?'Tắt tiếng lúc bắt đầu, cho phép bật tiếng.':'Có tiếng khi người xem cho phép; không bảo đảm tự phát có tiếng.')+' '+(c.loop?'Lặp đúng đoạn đã chọn bằng Player API; giữ mốc kết thúc mỗi lần lặp.':'Không lặp.')+' Dừng khi rời section; có điều khiển, phụ đề nếu video có, và link mở YouTube khi nhúng lỗi.':'Nhập link YouTube hợp lệ; mốc kết thúc phải lớn hơn mốc bắt đầu.';
}
function loadYoutubeApi(){
 if(window.YT?.Player)return Promise.resolve();
 if(youtubeApiPromise)return youtubeApiPromise;
 youtubeApiPromise=new Promise((resolve,reject)=>{const script=document.createElement('script');let timer;const fail=()=>{clearTimeout(timer);script.remove();youtubeApiPromise=null;reject(new Error('Không tải được YouTube. Kiểm tra mạng hoặc dùng link dự phòng.'))};window.onYouTubeIframeAPIReady=()=>{clearTimeout(timer);resolve()};script.src='https://www.youtube.com/iframe_api';script.onerror=fail;timer=setTimeout(fail,15000);document.head.append(script)});return youtubeApiPromise
}
function closeYoutube(){youtubeLoadToken++;youtubePlayer?.destroy?.();youtubePlayer=null;$('youtube-preview').textContent='Video đã đóng.'}
$('youtube-stop').onclick=()=>{closeYoutube();$('youtube-status').textContent='Đã dừng và đóng trình phát.'};
$('youtube-load').onclick=async()=>{
 const c=youtubeConfig();youtubePrompt();if(!c){$('youtube-status').textContent='Kiểm tra link và mốc thời gian trước khi xem thử.';return}
 closeYoutube();const token=youtubeLoadToken;$('youtube-status').textContent='Đang tải trình phát...';
 const holder=document.createElement('div');holder.id='youtube-player';const link=document.createElement('a');link.href='https://www.youtube.com/watch?v='+c.id+'&t='+c.start+'s';link.textContent='Mở video trên YouTube (dự phòng)';link.target='_blank';link.rel='noopener';$('youtube-preview').replaceChildren(holder,link);
 try{await loadYoutubeApi();if(token!==youtubeLoadToken)return;
 const segment={videoId:c.id,startSeconds:c.start,...(c.end===undefined?{}:{endSeconds:c.end})};
 youtubePlayer=new YT.Player(holder,{videoId:c.id,playerVars:{playsinline:1,controls:1,start:c.start,...(c.end===undefined?{}:{end:c.end}),origin:location.origin},events:{
 onReady:e=>{e.target.getIframe().setAttribute('title','Video YouTube xem thử');e.target.getIframe().setAttribute('referrerpolicy','strict-origin-when-cross-origin');c.muted?e.target.mute():e.target.unMute();$('youtube-status').textContent='Sẵn sàng. Nếu chưa phát, bấm nút phát trong video.';if(c.auto&&!$('media').hidden)e.target.playVideo()},
 onStateChange:e=>{if(e.data===1&&$('media').hidden)e.target.pauseVideo();if(e.data===0&&c.loop&&!$('media').hidden)e.target.loadVideoById(segment)},
 onAutoplayBlocked:()=>{$('youtube-status').textContent='Trình duyệt chặn tự phát. Bấm nút phát trong video.'},
 onError:e=>{$('youtube-status').textContent='Không phát được video (mã '+e.data+'). Video có thể không cho nhúng, bị giới hạn hoặc thiếu thông tin giới thiệu trang. Dùng link dự phòng.'}
 }})}catch(e){if(token===youtubeLoadToken)$('youtube-status').textContent=e.message}
};
['youtube-url','youtube-start','youtube-end','youtube-auto','youtube-muted','youtube-loop'].forEach(id=>$(id).addEventListener('input',youtubePrompt));
$('youtube-copy').onclick=()=>copyText($('youtube-output').value,'youtube-status','youtube-output');
youtubePrompt();
let mediaUrl=null;
function updateMedia(){
 const p=$('media-preview'),file=$('media-file').files[0];
 p.querySelectorAll('audio,video').forEach(m=>m.pause());
 if(mediaUrl){URL.revokeObjectURL(mediaUrl);mediaUrl=null}p.replaceChildren();
 if(!file){p.textContent='Vùng xem thử ảnh, âm thanh hoặc video.';$('media-file-info').textContent='Chưa chọn tệp.';return}
 const kind=file.type.split('/')[0];
 if(!['image','audio','video'].includes(kind)){p.textContent='Chọn tệp ảnh, âm thanh hoặc video được trình duyệt nhận diện.';return}
 mediaUrl=URL.createObjectURL(file);const el=document.createElement(kind==='image'?'img':kind);el.src=mediaUrl;
 if(kind==='image'){el.alt=`Ảnh xem thử: ${file.name}`;el.style.objectFit=$('image-fit').value}else{el.controls=true;el.preload='metadata';if(kind==='video')el.playsInline=true}
 el.addEventListener('error',()=>{$('media-file-info').textContent='Không đọc được tệp này; thử định dạng hoặc cách mã hóa khác.'});p.append(el);
 $('image-fit').disabled=kind!=='image';$('media-file-info').textContent=`${file.name} · ${(file.size/1048576).toFixed(2)} MiB · Chỉ xem thử trên máy, chưa lưu vào repo.`;
 const folder=kind==='image'?'images':kind==='audio'?'audio':'video';
 $('media-request').textContent=kind==='image'?`“Sau khi đưa tệp vào assets/${folder}/[ten-tep-khong-dau], dùng ảnh ở section [số]. ${$('image-fit').value==='contain'?'Giữ toàn bộ ảnh, không cắt chi tiết.':'Lấp đầy khung; cho phép cắt mép ảnh, giữ đối tượng chính.'} Thêm chú thích và nguồn.”`:`“Sau khi đưa tệp vào assets/${folder}/[ten-tep-khong-dau], dùng ở section [số], có nút phát/dừng, bấm mới phát và dừng khi rời section. Tôi sẽ cung cấp ${kind==='audio'?'bản lời':'tóm tắt và phụ đề nếu có'}.”`;
}
$('media-file').addEventListener('change',updateMedia);$('image-fit').addEventListener('change',updateMedia);
window.addEventListener('pagehide',()=>{if(mediaUrl)URL.revokeObjectURL(mediaUrl)});
document.addEventListener('visibilitychange',()=>{if(document.hidden){stopCarousel();stopMotion();youtubePlayer?.pauseVideo?.();document.querySelectorAll('audio,video').forEach(m=>m.pause())}});
document.querySelectorAll('section > .table-wrap table').forEach(table=>{table.classList.add('mobile-table');const labels=[...table.querySelectorAll('thead th')].map(th=>th.textContent);table.querySelectorAll('tbody tr').forEach(row=>[...row.cells].forEach((cell,i)=>cell.dataset.label=labels[i]||''))});
chooseKind();resetMotion(false);updateInteraction();show(tabs.some(t=>t.getAttribute('aria-controls')===location.hash.slice(1))?location.hash.slice(1):'media');
