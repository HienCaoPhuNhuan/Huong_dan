(() => {
 const triggers=[
 ['Mở trang / DOM sẵn sàng','Mở đầu','Chạy chuỗi mở đầu khi cấu trúc trang sẵn sàng; điều này không đảm bảo ảnh/video đã tải xong.'],
 ['Ảnh tải thành công / lỗi','Reveal, dự phòng','Tải thành công thì hiện ảnh; lỗi thì dùng ảnh thay thế và giữ chữ. Gắn xử lý trước khi bắt đầu tải.'],
 ['Font sẵn sàng','Chữ đo chiều rộng','Chờ font trước khi chia dòng hoạt hình; có font hệ thống dự phòng, không khóa toàn trang khi font lỗi.'],
 ['Media có metadata / có thể phát','Video, audio','Có metadata thì biết thời lượng; có thể phát không có nghĩa đã tải hết hoặc chắc chắn không bị chờ dữ liệu.'],
 ['Vào vùng nhìn thấy','Reveal theo cuộn','Ít nhất 40% phần tử vào vùng xem thì chạy một lần; chọn phần tử đủ nhỏ để đạt ngưỡng.'],
 ['Rời vùng nhìn thấy','Tiết kiệm tài nguyên','Dừng video nền và vòng lặp khi section rời vùng; quay lại tiếp tục hay chạy lại phải nói rõ.'],
 ['Tiến độ cuộn / scrub','Parallax, chart','Chuyển động tiến lùi theo 0–100% cuộn trong section; không dùng timer thay cho tiến độ cuộn.'],
 ['Dừng cuộn / vào mốc','Chốt nhãn','Khi dừng ở mốc 2 thì hiện nhãn. Kiểm tra hỗ trợ scrollend hoặc dùng phương án chờ cuộn ổn định.'],
 ['Chuột vào / ra','Hover','Chuột vào thẻ thì nâng 4px, ra thì trở về; focus có dấu nhấn tương đương.'],
 ['Di chuyển chuột','Parallax, tilt','Theo vị trí chuột với biên độ tối đa 6px, gom cập nhật theo khung hình; ra ngoài trở về tâm.'],
 ['Nhấn giữ / thả','Button','Trong lúc nhấn nút thì thu nhỏ nhẹ; thả hoặc hủy thao tác trở về. Không gọi đây là click hoàn tất.'],
 ['Click / nhấn nút','Mở bài, lightbox','Bấm nút mở ảnh lớn; Enter/Space hoạt động theo chuẩn nút; mở xong chuyển focus vào hộp thoại.'],
 ['Double click','Thao tác phụ trên PC','Chỉ dùng cho chức năng phụ, có nút thay thế; tránh xung đột hai click đơn.'],
 ['Focus / blur','Bàn phím, form','Focus trường nhập thì đổi viền; rời thì trở về. Không chỉ dựa vào màu hoặc hover.'],
 ['Phím Enter / Space / mũi tên / Escape','Điều hướng','Escape đóng hộp thoại, trả focus; không chiếm phím khi đang nhập văn bản hoặc khi hộp thoại chưa mở.'],
 ['Kéo / thả / hủy kéo','Sắp xếp, upload','Kéo ảnh vào vị trí; hủy thì trả lại. Có nút di chuyển và chọn tệp thay thế cho thao tác kéo.'],
 ['Nhập liên tục / input','Tìm kiếm trực tiếp','Sau khi nhập 3 ký tự thì lọc; không gọi dịch vụ cho từng phím nếu chưa cần. Xóa hết thì phục hồi danh sách.'],
 ['Đổi lựa chọn / change','Tab, chart, theme','Chọn năm cập nhật chart và nguồn; chọn sáng/tối đổi màu, không khởi động lại mọi media.'],
 ['Mở / đóng nhóm / toggle','Accordion','Mở nhóm mới tải minh họa; đóng thì nghỉ chuyển động. Không đặt lại các câu trả lời bên trong.'],
 ['Gửi form / lỗi xác thực','Form','Chỉ gửi khi dữ liệu hợp lệ, focus lỗi đầu tiên; thành công phải dựa trên phản hồi thật của dịch vụ.'],
 ['Sau khoảng chờ / delay','Chuỗi tự động','Vào section rồi chờ 2 giây; rời trước khi hết thì hủy lịch chờ. Delay khác duration.'],
 ['Lặp chu kỳ / interval','Băng chuyền','Mỗi 6 giây đổi ảnh; dừng khi tab ẩn hoặc người dùng đang đọc/điều khiển; không chạy bù sau khi quay lại.'],
 ['Animation bắt đầu / lặp / kết thúc / hủy','Chuỗi nhiều đối tượng','Ảnh kết thúc mới hiện chữ. Hiệu ứng bị hủy hoặc tắt chuyển động phải có đường hoàn tất khác, không chờ mãi.'],
 ['Transition kết thúc / hủy','Đổi trạng thái','Đợi thuộc tính cần thiết của đúng đối tượng; một phần tử có thể phát nhiều sự kiện cho nhiều thuộc tính.'],
 ['Media play / pause / ended / waiting / error','Video, audio','Phát thì hiện trạng thái; chờ tải thì báo đang chờ; lỗi có dự phòng. Kết thúc hiện câu hỏi, không tự chuyển trang.'],
 ['Mốc thời gian / tua media','Chú thích, đổi ảnh','Tại giây 10 hiện ảnh A; tua trước/sau phải tính lại trạng thái theo currentTime, không dựa vào số lần timer đã chạy.'],
 ['Đổi kích thước vùng / cửa sổ','Canvas, chart trên PC','Đo lại canvas khi vùng đổi kích thước, không mất dữ liệu hoặc reset bài. Tránh thay kích thước lặp vô hạn.'],
 ['Tab hiện / ẩn','Hiệu năng','Tab ẩn thì nghỉ vòng lặp; trở lại tiếp tục theo quy tắc đã chọn. Không đồng nghĩa với section đang trong vùng xem.'],
 ['Giảm chuyển động / đổi tùy chọn hệ thống','Khả năng tiếp cận','Nếu bật giảm chuyển động thì hiện trạng thái cuối, giữ thao tác và nội dung; nhận cả thay đổi khi trang đang mở.'],
 ['Phản hồi dịch vụ / lỗi mạng','Data, form','Chỉ báo thành công khi có phản hồi hợp lệ. online/offline chỉ là gợi ý kết nối, không chứng minh truy cập Internet hoặc dịch vụ thành công.'],
 ['Đổi URL / hash / lịch sử','Navigation','Đổi mục lục cập nhật section và focus đúng; Back trở về vị trí trước, không nhân đôi listeners.'],
 ['Vào / thoát toàn màn hình','Trình chiếu PC','Toàn màn hình thường cần thao tác người dùng; khi đổi trạng thái đo lại bố cục và giữ section đang xem.']
 ];
 const rows=document.getElementById('trigger-rows');
 triggers.forEach(values=>{const tr=document.createElement('tr');values.forEach(value=>{const td=document.createElement('td');td.textContent=value;tr.append(td)});rows.append(tr)});
 const norm=t=>t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d');
 const filter=()=>{let count=0;const q=norm(document.getElementById('trigger-search').value.trim());[...rows.children].forEach(r=>{r.hidden=!norm(r.textContent).includes(q);if(!r.hidden)count++});document.getElementById('trigger-count').textContent=count+' / '+triggers.length+' nhóm điều kiện';document.getElementById('trigger-empty').hidden=count!==0};document.getElementById('trigger-search').addEventListener('input',filter);filter();
 const mode=document.getElementById('trigger-mode'),stage=document.getElementById('trigger-stage'),target=document.getElementById('trigger-target'),photo=document.getElementById('trigger-photo'),caption=document.getElementById('trigger-caption'),status=document.getElementById('trigger-status'),input=document.getElementById('trigger-input'),detail=document.getElementById('trigger-detail'),video=document.getElementById('trigger-video'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const help={ready:'Chạy ngay khi vùng thử được thiết lập.',delay:'Chờ 2 giây khi trang đang hiện.',interval:'Tự kích hoạt sau mỗi 3 giây; nghỉ khi đổi tab.',hover:'Di chuyển chuột ra rồi vào vùng ảnh.',focus:'Nhấn Tab để đưa focus vào vùng thử.',click:'Bấm vùng ảnh.',key:'Đưa focus vào vùng thử, rồi nhấn Enter.',input:'Nhập ít nhất 3 ký tự vào ô bên dưới.',toggle:'Mở nhóm giải thích bên dưới.',scroll:'Cuộn bên trong vùng mẫu cho tới khi ít nhất một nửa ảnh hiện.',end:'Ảnh trượt trước; kết thúc chuyển động mới hiện chú thích.',image:'Tải ảnh trường; thành công thì hiện chú thích, lỗi thì vẫn giữ nội dung.',video:'Nhấn Phát video bên dưới. Qua giây thứ 2 sẽ hiện chú thích; tua ngược sẽ ẩn lại.'};
 let timer=null,observer=null,generation=0,hits=0,loader=null;
 const fire=message=>{if(document.hidden)return;target.classList.add('triggered');caption.hidden=false;status.textContent=message||'Điều kiện đã xảy ra.'};
 const stop=()=>{clearTimeout(timer);timer=null;observer?.disconnect();observer=null;generation++;if(loader){loader.onload=null;loader.onerror=null;loader=null}video.pause();target.classList.remove('predecessor')};
 const start=()=>{
  stop();hits=0;target.classList.remove('triggered');caption.hidden=true;stage.scrollTop=0;input.value='';detail.open=false;
  document.getElementById('trigger-spacer').hidden=mode.value!=='scroll';document.getElementById('trigger-input-wrap').hidden=mode.value!=='input';detail.hidden=mode.value!=='toggle';video.hidden=mode.value!=='video';status.textContent='Đang chờ điều kiện…';document.getElementById('trigger-help').textContent=help[mode.value];
  if(document.hidden)return;
  const current=generation;
  if(mode.value==='ready')fire('Vùng thử đã sẵn sàng.');
  if(mode.value==='delay')timer=setTimeout(()=>fire('Đã hết khoảng chờ 2 giây.'),2000);
  if(mode.value==='interval'){const tick=()=>{timer=setTimeout(()=>{if(current!==generation||document.hidden)return;fire('Chu kỳ 3 giây · lượt '+(++hits));tick()},3000)};tick()}
  if(mode.value==='scroll'){observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.intersectionRatio>=.5)){fire('Ít nhất 50% ảnh đã vào vùng cuộn.');observer.disconnect()}},{root:stage,threshold:.5});observer.observe(photo)}
  if(mode.value==='end'){if(reduced.matches)fire('Giảm chuyển động: hiện ngay trạng thái cuối, không chờ animationend.');else{void target.offsetWidth;target.classList.add('predecessor')}}
  if(mode.value==='image'){loader=new Image();loader.onload=()=>{if(current===generation)fire('Ảnh tải thành công.');loader=null};loader.onerror=()=>{if(current===generation)status.textContent='Ảnh lỗi: vẫn giữ nội dung, cần ảnh dự phòng.';loader=null};loader.src=photo.src}
  if(mode.value==='video'){try{video.currentTime=0}catch{ /* Metadata may not be available yet. */ }}
 };
 stage.addEventListener('pointerenter',()=>{if(mode.value==='hover')fire('Chuột đã vào vùng mẫu.')});stage.addEventListener('focus',()=>{if(mode.value==='focus')fire('Vùng mẫu đã có focus.')});stage.addEventListener('click',()=>{if(mode.value==='click')fire('Đã bấm vùng mẫu.')});stage.addEventListener('keydown',e=>{if((e.key==='Enter'&&['key','click'].includes(mode.value))||(e.key===' '&&mode.value==='click')){e.preventDefault();fire('Đã kích hoạt bằng bàn phím.')}});
 input.addEventListener('input',()=>{if(mode.value!=='input')return;if(input.value.trim().length>=3)fire('Đã nhập đủ 3 ký tự.');else{target.classList.remove('triggered');caption.hidden=true;status.textContent='Chưa đủ 3 ký tự.'}});
 detail.addEventListener('toggle',()=>{if(mode.value==='toggle'&&detail.open)fire('Nhóm đã mở.')});photo.addEventListener('animationend',e=>{if(mode.value==='end'&&e.animationName==='trigger-predecessor')fire('Animation trước kết thúc → chú thích xuất hiện.')});
 video.addEventListener('timeupdate',()=>{if(mode.value!=='video')return;if(video.currentTime>=2)fire('Video ở sau mốc 2 giây.');else{target.classList.remove('triggered');caption.hidden=true;status.textContent='Video ở trước mốc 2 giây.'}});video.addEventListener('error',()=>{if(mode.value==='video')status.textContent='Không tải được video; giữ ảnh và nội dung dự phòng.'});
 mode.addEventListener('change',start);document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else start()});reduced.addEventListener('change',()=>{if(mode.value==='end')start()});window.addEventListener('pagehide',stop);window.addEventListener('pageshow',e=>{if(e.persisted)start()});start();
})();
