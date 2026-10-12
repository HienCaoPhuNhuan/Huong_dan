(() => {
 document.querySelectorAll('table').forEach(table=>{const heads=[...table.querySelectorAll('thead th')].map(e=>e.textContent);if(!heads.length)return;table.classList.add('course-table');table.querySelectorAll('tbody tr').forEach(row=>[...row.cells].forEach((cell,i)=>cell.dataset.label=heads[i]||''))});
 document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{
  const target=document.getElementById(button.dataset.copy),status=document.getElementById(button.dataset.status),text=target.value??target.textContent;
  try{await navigator.clipboard.writeText(text);status.textContent='Đã sao chép.'}catch{target.focus();target.select?.();status.textContent='Chọn văn bản để sao chép.'}
 }));
 const button=document.getElementById('static-counter');
 if(button){let count=0;button.onclick=()=>{document.getElementById('static-result').textContent='Bạn đã bấm '+(++count)+' lần. JavaScript trong trình duyệt thay đổi phần này; không có máy chủ lưu số lượt.'}}
})();
