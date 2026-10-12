(() => {
 const $=id=>document.getElementById(id);
 const fonts={be:{family:'GuideBeVietnam,system-ui,sans-serif',name:'Be Vietnam Pro',css:'GuideBeVietnam'},lora:{family:'GuideLora,Georgia,serif',name:'Lora',css:'GuideLora'},system:{family:'system-ui,sans-serif',name:'font hệ thống',css:null}};
 const palettes={light:['#172521','#ffffff'],dark:['#ffffff','#172521'],low:['#9aa6a0','#ffffff']};
 const defaults={font:'be',titleFont:'same',weight:'400',size:'22',line:'1.65',align:'left',palette:'light',width:'desktop',title:'Sắc màu học đường',text:$('type-text').value};
 let loadId=0;
 const luminance=hex=>{const v=hex.slice(1).match(/../g).map(s=>parseInt(s,16)/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4);return .2126*v[0]+.7152*v[1]+.0722*v[2]};
 function measure(){const body=$('type-preview-body'),height=body.getBoundingClientRect().height,line=parseFloat(getComputedStyle(body).lineHeight);$('type-measure').textContent='Khung chữ: '+Math.round(body.getBoundingClientRect().width)+'px · khoảng '+Math.round(height/line)+' dòng (gồm các dòng trống).'}
 async function load(){
  const current=++loadId,main=fonts[$('type-font').value],head=fonts[$('type-title-font').value==='same'?$('type-font').value:$('type-title-font').value];
  if(!document.fonts){$('type-font-status').textContent='Trình duyệt không cung cấp kiểm tra tải font; hãy xem dấu và bố cục.';return}
  $('type-font-status').textContent='Đang kiểm tra font được chọn...';
  try{
   const requests=[];if(main.css)requests.push(document.fonts.load($('type-weight').value+' 22px '+main.css,$('type-text').value||'Tiếng Việt'));if(head.css)requests.push(document.fonts.load('700 32px '+head.css,$('type-title').value||'Tiêu đề'));
   const results=await Promise.all(requests);
   if(current!==loadId)return;
   $('type-font-status').textContent=results.some(r=>!r.length)?'Chưa xác nhận được font; có thể đang dùng dự phòng.':requests.length?'Font tự lưu đã tải: nội dung '+main.name+', tiêu đề '+head.name+'.':'Đang dùng font hệ thống; không tải font riêng.';
   measure();
  }catch{if(current===loadId)$('type-font-status').textContent='Không tải được font được chọn; chữ dùng font dự phòng. Kiểm tra đường dẫn và mạng.'}
 }
 function update(){
  const family=fonts[$('type-font').value],titleFamily=$('type-title-font').value==='same'?family:fonts[$('type-title-font').value],size=Number($('type-size').value),weight=Number($('type-weight').value),line=$('type-line').value,colors=palettes[$('type-palette').value],preview=$('type-preview');
  preview.classList.toggle('phone',$('type-width').value==='phone');preview.style.fontFamily=family.family;preview.style.color=colors[0];preview.style.background=colors[1];preview.style.textAlign=$('type-align').value;
  const body=$('type-preview-body');body.textContent=$('type-text').value;body.style.fontSize=size+'px';body.style.fontWeight=weight;body.style.lineHeight=line;
  const title=$('type-preview-title');title.textContent=$('type-title').value;title.style.fontFamily=titleFamily.family;title.style.fontSize=Math.min(40,Math.round(size*1.5))+'px';title.style.fontWeight='700';title.style.textAlign=$('type-align').value==='justify'?'left':$('type-align').value;
  $('type-size-value').textContent=size;$('type-line-value').textContent=line;
  for(const id of ['compare-be','compare-lora']){$(id).textContent=$('type-text').value;$(id).style.fontSize=size+'px';$(id).style.fontWeight=weight;$(id).style.lineHeight=line}
  const a=luminance(colors[0]),b=luminance(colors[1]),ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05),large=size>=24||(weight===700&&size>=18.6667),threshold=large?3:4.5;
  $('type-contrast').textContent='Tương phản: '+ratio.toFixed(2)+':1 · '+(ratio>=threshold?'Đạt':'Chưa đạt')+' ngưỡng '+threshold+':1 cho cỡ/độ đậm nội dung đang chọn.';
  $('type-warning').textContent=ratio<threshold?'Ví dụ này khó đọc: đổi màu chữ/nền.':$('type-align').value==='justify'?'Kiểm tra khoảng trắng giữa từ, đặc biệt khi khung hẹp.':'Tỷ lệ tương phản không thay thế thử đọc trên máy chiếu.';
  $('type-request').value='Dùng '+family.name+' cho nội dung, '+titleFamily.name+' cho tiêu đề. Nội dung '+size+'px, weight '+weight+', line-height '+line+', căn '+$('type-align').selectedOptions[0].text.toLowerCase()+'. Tiêu đề weight 700, khoảng '+Math.min(40,Math.round(size*1.5))+'px; H1/H2/H3 theo đúng cấu trúc. Màu chữ '+colors[0]+', nền '+colors[1]+'. Kiểm tra tương phản và góp ý nếu khó đọc. Lưu các tệp font được phép dùng trong assets/fonts, khai báo đúng weight/style và font-display; giữ giấy phép. Có font dự phòng, đủ dấu tiếng Việt; không cố định chiều cao làm cắt chữ khi đổi font. Trên điện thoại xếp nội dung phù hợp, không thu chữ quá nhỏ để nhồi bài.';
  requestAnimationFrame(measure);load();
 }
 for(const id of ['type-font','type-title-font','type-weight','type-size','type-line','type-align','type-palette','type-width','type-title','type-text'])$(id).addEventListener('input',update);
 $('type-reset').onclick=()=>{for(const [key,value] of Object.entries(defaults))$('type-'+({titleFont:'title-font'}[key]||key)).value=value;update()};
 window.addEventListener('resize',measure);update();
})();
