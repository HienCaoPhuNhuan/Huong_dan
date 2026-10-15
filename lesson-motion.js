(() => {
 const main=document.querySelector('main'),heading=main?.querySelector(':scope>h1');if(!heading)return;
 const id=location.pathname.split('/').pop();
 const lessons={
 'tai-khoan-chatgpt.html':['user',['Bạn muốn gì?','Instructions định hướng'],['Điều gì cần nhớ?','Memory có kiểm soát'],['Kiểm chứng','Xem lại câu trả lời']],
 'web-la-gi.html':['code',['Tệp trong repo','HTML · CSS · JavaScript'],['Commit','Lưu phiên bản thay đổi'],['GitHub Pages','Xuất bản rồi mở link']],
 'thiet-lap-github.html':['git-branch',['Chuẩn bị','Tài khoản · repo Public'],['Kiểm chứng','Đọc tệp · commit thật'],['Bàn giao','README giữ đúng bài']],
 'thanh-phan-thiet-ke.html':['grid',['Chọn thành phần','Chữ · ảnh · chart'],['Kết hợp','Tạo một section'],['Quan sát','Đọc theo thứ tự']],
 'bo-cuc.html':['layout',['Nội dung','Chọn điều quan trọng'],['Bố cục','Đặt chữ và ảnh'],['Kết quả','Thứ tự đọc rõ ràng']],
 'chu-va-typography.html':['type',['Font','Dáng chữ có tiếng Việt'],['Nhịp đọc','Cỡ · độ đậm · giãn dòng'],['Kiểm tra','Đọc trên máy chiếu']],
 'nguyen-tac-trinh-bay.html':['pen-tool',['Thứ bậc','Chính và phụ'],['Tương phản','Chữ dễ đọc'],['Khoảng trống','Thông tin có nhịp']],
 'hieu-ung-media.html':['film',['Media gốc','Ảnh · video · audio'],['Effect','Xử lý hình và tiếng'],['Kết quả','Chủ thể vẫn rõ']],
 'animation.html':['move',['Đối tượng','Chữ · ảnh · nhóm'],['Nhịp','Thời lượng · stagger'],['Trigger','Khi nào bắt đầu?']],
 'hieu-ung-nhieu-lop.html':['layers',['Lớp nền','Media của trường'],['Lớp chuyển động','Hạt · parallax · vệt'],['Lớp nội dung','Đủ tương phản']],
 'transition.html':['shuffle',['Trạng thái cũ','Rời vùng trình bày'],['Chuyển cảnh','Mờ · trượt · mở'],['Trạng thái mới','Focus đúng nội dung']],
 'interaction.html':['mouse-pointer',['Hành động','Chuột hoặc bàn phím'],['Trạng thái','Đổi lựa chọn'],['Phản hồi','Kết quả có ý nghĩa']],
 'trigger.html':['repeat',['Điều kiện','Vào vùng hoặc thao tác'],['Bắt đầu','Chạy đúng một chuỗi'],['Dừng / quay lại','Quy tắc rõ ràng']],
 'danh-muc-hieu-ung.html':['aperture',['Quan sát','Mẫu đang chạy'],['Lựa chọn','Đúng mục tiêu'],['Mô tả','Đối tượng + nhịp']],
 'tai-nguyen-bai.html':['folder',['Chuẩn bị','Tệp và giấy phép'],['Lưu trong repo','Đường dẫn rõ ràng'],['Hiển thị','Có phương án dự phòng']],
 'yeu-cau-chatgpt.html':['edit',['Ý tưởng','Nội dung và mục tiêu'],['Yêu cầu','Bố cục · media · nhịp'],['Kiểm chứng','Mở web và đối chiếu']],
 'lam-chu-cong-nghe.html':['monitor',['Thiết bị','CPU · GPU · RAM'],['Thiết kế','Độ nặng phù hợp'],['Chạy thử','Mượt và dễ đọc']],
 'tham-khao-codepen.html':['command',['Xem mẫu','Quan sát hành vi'],['Nhận diện','Tệp · thư viện · nguồn'],['Điều chỉnh','Theo bài của bạn']],
 'cong-nghe-do-hoa-web.html':['file-text',['Tài nguyên','SVG · Lottie · model'],['Bộ phát / renderer','Chuyển dữ liệu thành hình'],['Hành vi','Trigger và vòng đời']],
 'cong-nghe-minh-hoa.html':['layers',['Thư viện thật','Vue · GSAP · Three.js'],['Tài nguyên','Online hoặc trong repo'],['Kết quả thật','Quan sát và kiểm chứng']],
 'ke-chuyen-thi-giac.html':['pen-tool',['Phong cách','Màu · chữ · hình'],['Câu chuyện','Dữ liệu · sơ đồ · nhịp'],['Lựa chọn','Công nghệ vừa đủ']]
 };
 const data=lessons[id];if(!data)return;document.body.classList.add('lesson-decorated');main.style.setProperty('--lesson-icon',`url('assets/icons/${data[0]}.svg')`);main.style.setProperty('--lesson-accent',/animation|transition|trigger|hieu-ung|bo-cuc|interaction|thanh-phan|typography|nguyen-tac|danh-muc/.test(id)?'#ba365c':'#087957');
 const band=document.createElement('div');band.className='lesson-banner';band.setAttribute('aria-label','Các ý chính của bài');
 const img=new Image();img.src='assets/icons/'+data[0]+'.svg';img.alt='';img.setAttribute('aria-hidden','true');band.append(img);const sequence=document.createElement('div');sequence.className='lesson-sequence';data.slice(1).forEach(([title,detail])=>{const step=document.createElement('div'),b=document.createElement('b'),span=document.createElement('span');b.textContent=title;span.textContent=detail;step.append(b,span);sequence.append(step)});band.append(sequence);const lead=heading.nextElementSibling;((lead?.tagName==='P')?lead:heading).after(band);
 const kind=/bo-cuc|thanh-phan/.test(id)?'layout':/typography|nguyen-tac/.test(id)?'type':/transition/.test(id)?'transition':/animation|trigger|danh-muc/.test(id)?'stagger':/hieu-ung-media|tai-nguyen/.test(id)?'media':null;
 if(kind){const visual=document.createElement('div');visual.className='lesson-mini mini-'+kind;visual.setAttribute('aria-hidden','true');if(kind==='media'){const photo=new Image();photo.src='assets/media-effects/phu-nhuan.webp';photo.alt='';visual.append(photo)}else{const labels=kind==='type'?['Aa','Tiêu đề','Nội dung']:kind==='transition'?['01','02']:['1','2','3'];labels.forEach(label=>{const span=document.createElement('span');span.textContent=label;visual.append(span)})}img.replaceWith(visual)}
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let visible=false,index=0,timer=null;const steps=[...sequence.children];
 const sync=()=>{clearTimeout(timer);timer=null;const running=visible&&!document.hidden&&!reduced.matches;band.dataset.paused=String(!running);steps.forEach((s,i)=>s.classList.toggle('sequence-active',reduced.matches||i===index));if(running)timer=setTimeout(()=>{index=(index+1)%steps.length;sync()},2600)};
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync()},{threshold:.2});observer.observe(band);document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);sync();window.addEventListener('pagehide',()=>{clearTimeout(timer);observer.disconnect()});window.addEventListener('pageshow',e=>{if(e.persisted)observer.observe(band)});
})();
