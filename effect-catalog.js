(() => {
 const samples=[
 ['fade','entry','Fade in / out','Ảnh, chữ','Tăng hoặc giảm độ rõ, không đổi vị trí.','Ảnh hiện dần 0,6 giây khi vào vùng nhìn thấy; một lần, giữ kết quả.','Không để chữ ẩn mãi khi ảnh lỗi.'],
 ['slide','entry','Slide / fly in','Ảnh, chữ, nhóm','Di chuyển từ một hướng vào vị trí cuối.','Nhóm ảnh trượt từ dưới 24px trong 0,5 giây sau tiêu đề; không đẩy bố cục.','Nêu hướng và quãng đường; không bay xuyên toàn màn hình.'],
 ['zoom','entry','Zoom / scale','Ảnh, nhãn','Thay đổi kích thước thị giác quanh điểm neo.','Ảnh từ 95% lên 100% khi tải xong và vào vùng xem.','Scale không nên làm section thay đổi chiều cao.'],
 ['wipe','entry','Wipe / clip reveal','Ảnh, video, nhóm','Mở mặt nạ từ một cạnh, đối tượng không trượt.','Mở ảnh từ trái sang phải 0,7 giây; sau đó hiện chú thích.','Khác slide: khung mở, ảnh đứng tại chỗ.'],
 ['iris','entry','Iris / circle reveal','Ảnh, nền','Mở mặt nạ dạng tròn từ tâm.','Mở ảnh bằng vòng tròn từ tâm trong 0,8 giây, kết thúc hiện toàn ảnh.','Không cắt mất chủ thể ở trạng thái cuối.'],
 ['blur','entry','Blur reveal','Ảnh, nền','Chuyển từ mờ sang nét.','Ảnh từ blur 6px về 0 trong 0,6 giây; chữ luôn rõ.','Blur diện tích lớn có thể làm máy yếu giật.'],
 ['flip','entry','Flip 3D','Ảnh, thẻ','Xoay theo trục với phối cảnh.','Thẻ lật quanh trục Y để hiện mặt sau; mặt đang ẩn không được nhận focus.','Mẫu chỉ minh họa góc xoay, không phải thẻ hai mặt đầy đủ.'],
 ['bounce','emphasis','Bounce / spring','Nhãn, biểu tượng','Nảy và ổn định; spring phức tạp cần mô hình phù hợp.','Sau khi người dùng chọn đúng, nhãn nảy nhẹ một lần rồi đứng yên.','Không áp dụng vào toàn đoạn văn.'],
 ['pulse','emphasis','Pulse','Button, nhãn','Phóng nhẹ rồi trở lại theo nhịp.','Nút quan trọng pulse 2 lần sau khi hiện; sau đó dừng.','Không dùng nhiều nút cùng nhấp nháy.'],
 ['tilt','emphasis','Tilt / rotate','Ảnh, thẻ','Nghiêng nhẹ quanh điểm neo.','Ảnh nghiêng tối đa 4 độ khi hover; focus đổi viền, rời chuột trở về.','Tilt theo chuột là interaction; mẫu tự xoay để thấy biên độ.'],
 ['float','continuous','Float / bob','Ảnh, biểu tượng','Nổi nhẹ lên xuống trong vòng lặp.','Ảnh nổi ±6px, chu kỳ 4 giây, chỉ chạy khi section còn thấy.','Không làm nội dung dài trôi theo.'],
 ['pan','continuous','Ken Burns / pan & zoom','Ảnh nền','Phóng và dịch rất chậm trên ảnh tĩnh.','Ảnh nền phóng 100% → 108% trong 8 giây; giữ tên trường trong khung.','Kiểm tra vùng cắt và điểm neo.'],
 ['orbit','continuous','Orbit / motion path','Ảnh nhỏ, biểu tượng','Đi theo quỹ đạo, có thể giữ hướng đối tượng.','Biểu tượng đi một vòng tròn trong 5 giây, giữ đứng thẳng, dừng khi tab ẩn.','Đường đi tùy ý cần khai báo đường và tốc độ.'],
 ['gray','surface','Grayscale → color','Ảnh','Bỏ màu rồi trở về ảnh màu.','Ảnh đen trắng khi chưa chọn; chọn hoặc focus thì trở về màu trong 0,3 giây.','Không dùng màu làm dấu hiệu lựa chọn duy nhất.'],
 ['duotone','surface','Duotone / tone màu','Ảnh, nền','Tạo sắc thái hai tông; mẫu là gần đúng bằng bộ lọc CSS.','Tạo bản ảnh hai tông xanh–trắng, giữ ảnh gốc để đối chiếu.','Duotone chính xác nên xử lý ảnh hoặc dùng bộ lọc thích hợp.'],
 ['glass','surface','Glass / backdrop blur','Navigation, nhãn','Làm mờ nền phía sau lớp bán trong suốt.','Thanh điều hướng kính mờ 8px, chữ đậm; nếu không hỗ trợ dùng nền đặc.','Khác blur ảnh: chỉ nền phía sau bị mờ.'],
 ['shadow','surface','Shadow / elevation','Thẻ, ảnh','Bóng tạo cảm giác tầng lớp.','Hover hoặc focus thẻ thì nâng 4px và tăng bóng; khung không thay kích thước.','Bóng không thay thế viền hay tương phản chữ.'],
 ['marquee','text','Marquee / chữ trôi','Chữ nền, dải nhãn','Chữ chạy qua vùng nhìn thấy.','Dải chữ trang trí chạy đều; tiêu đề chính đứng yên và không bị che.','Không dùng cho thông tin học sinh phải đọc đầy đủ.'],
 ['type','text','Typewriter','Tiêu đề ngắn','Hiện từng ký tự theo bước.','Tiêu đề ngắn gõ một lần trong 2 giây; giảm chuyển động hiện toàn bộ.','Dùng toàn văn bản cho công cụ đọc màn hình, không đọc lại từng ký tự.'],
 ['highlight','text','Highlight sweep','Chữ, từ khóa','Vệt đánh dấu mở dưới chữ.','Khi vào section, gạch nền vàng chạy dưới từ khóa một lần 0,6 giây.','Màu nền vẫn phải cho chữ đủ tương phản.'],
 ['stagger','text','Stagger / lệch nhịp','Danh sách, ảnh, nhóm','Các đối tượng bắt đầu cách nhau một khoảng.','Ba ý hiện cách nhau 0,25 giây, mỗi ý mất 0,5 giây; giữ tất cả sau khi hiện.','Stagger là cách phối thời điểm, không phải tên một hiệu ứng riêng.'],
 ['bars','text','Chart growth','Chart, data','Thanh tăng từ mốc đầu đến chiều cao cuối.','Ba cột tăng đến số liệu thật trong 0,8 giây; nhãn và nguồn luôn có sẵn.','Mẫu dùng dữ liệu minh họa 40, 70, 100, không phải số liệu nhà trường.']
 ];
 const root=document.getElementById('effect-cards');if(!root)return;
 const groups={entry:'Xuất hiện / rời đi',emphasis:'Nhấn mạnh',continuous:'Liên tục',surface:'Bề mặt',text:'Chữ / dữ liệu'};
 samples.forEach(([id,group,title,object,description,prompt,note])=>{
  const card=document.createElement('article');card.className='effect-card';card.dataset.group=group;card.id='fx-'+id;
  const stage=document.createElement('div');stage.className='effect-stage fx-'+id;stage.setAttribute('aria-hidden','true');
  const image=new Image();image.src='assets/media-effects/phu-nhuan.webp';image.alt='';image.loading='lazy';stage.append(image);
  const sample=document.createElement('div');sample.className='sample-text';sample.textContent=id==='type'?'Thiet ke web...':'Thiết kế web';
  if(group==='text'||id==='glass')stage.dataset.text='true';
  if(id==='stagger'||id==='bars'){sample.textContent='';(id==='stagger'?['Ý 1','Ý 2','Ý 3']:['40','70','100']).forEach(text=>{const span=document.createElement('span');span.textContent=text;if(id==='bars')span.style.setProperty('--bar',text+'px');sample.append(span)})}
  stage.append(sample);card.append(stage);
  const body=document.createElement('div');body.className='effect-card-body';
  const tag=document.createElement('p');tag.className='effect-tag';tag.textContent=groups[group]+' · '+object;
  const h=document.createElement('h3');h.textContent=title;const p=document.createElement('p');p.textContent=description;
  const details=document.createElement('details'),summary=document.createElement('summary');summary.textContent='Yêu cầu mẫu và điều cần kiểm tra';
  const request=document.createElement('p');request.textContent='“'+prompt+'”';const caution=document.createElement('p');caution.textContent='Kiểm tra: '+note;details.append(summary,request,caution);body.append(tag,h,p,details);card.append(body);root.append(card);
 });
 const cards=[...root.children],reduced=matchMedia('(prefers-reduced-motion: reduce)'),visible=new Set();
 const sync=()=>cards.forEach(c=>c.classList.toggle('in-view',visible.has(c)&&!document.hidden&&!reduced.matches&&!c.hidden));
 const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)visible.add(e.target);else visible.delete(e.target)});sync()},{threshold:.1});cards.forEach(c=>observer.observe(c));
 document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);
 window.addEventListener('pagehide',()=>{observer.disconnect();cards.forEach(c=>c.classList.remove('in-view'))});
 window.addEventListener('pageshow',e=>{if(e.persisted){visible.clear();cards.forEach(c=>observer.observe(c));sync()}});
 const search=document.getElementById('effect-search'),select=document.getElementById('effect-group');
 const norm=t=>t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d');
 const filter=()=>{const q=norm(search.value.trim());let count=0;cards.forEach(c=>{c.hidden=!(select.value==='all'||select.value===c.dataset.group)||!norm(c.textContent).includes(q);if(!c.hidden)count++});document.getElementById('effect-count').textContent=count+' / '+cards.length+' mẫu';document.getElementById('effect-empty').hidden=count!==0;sync()};
 search.addEventListener('input',filter);select.addEventListener('change',filter);filter();
})();
