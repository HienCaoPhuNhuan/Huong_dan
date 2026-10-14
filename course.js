(() => {
 document.querySelectorAll('table').forEach(table=>{const heads=[...table.querySelectorAll('thead th')].map(e=>e.textContent);if(!heads.length)return;table.classList.add('course-table');table.querySelectorAll('tbody tr').forEach(row=>[...row.cells].forEach((cell,i)=>cell.dataset.label=heads[i]||''))});
 document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{
  const target=document.getElementById(button.dataset.copy),status=document.getElementById(button.dataset.status),text=target.value??target.textContent;
  try{await navigator.clipboard.writeText(text);status.textContent='Đã sao chép.'}catch{target.focus();target.select?.();status.textContent='Chọn văn bản để sao chép.'}
 }));
 const button=document.getElementById('static-counter');
 if(button){let count=0;button.onclick=()=>{document.getElementById('static-result').textContent='Bạn đã bấm '+(++count)+' lần. JavaScript trong trình duyệt thay đổi phần này; không có máy chủ lưu số lượt.'}}
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 if('IntersectionObserver' in window){
  const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(!entry.isIntersecting)return;
   if(!reduced.matches)entry.target.classList.add('section-arrived');
   reveal.unobserve(entry.target);
  }),{threshold:.12});
  document.querySelectorAll('.topic-band').forEach(section=>{
   section.querySelectorAll('.topic-links>a').forEach((link,i)=>link.style.setProperty('--arrival-delay',Math.min(i*45,270)+'ms'));
   reveal.observe(section);
  });
  window.addEventListener('pagehide',()=>reveal.disconnect(),{once:true});
 }
 document.querySelectorAll('[data-flow]').forEach(flow=>{
  const steps=[...flow.querySelectorAll(':scope > article')];if(!steps.length)return;
  const controls=document.createElement('div');controls.className='flow-controls';
  const status=document.createElement('p');status.className='flow-status';controls.append(status);flow.after(controls);
  let index=0,timer=null;
  const render=()=>{
   steps.forEach((step,i)=>{step.classList.toggle('flow-current',!reduced.matches&&i===index);step.classList.toggle('flow-done',!reduced.matches&&i<index);if(!reduced.matches&&i===index)step.setAttribute('aria-current','step');else step.removeAttribute('aria-current')});
   flow.dataset.step=String(index+1);
   status.textContent=reduced.matches?'Repo → Commit → Xuất bản → Kiểm chứng':'Bước '+(index+1)+' / '+steps.length+': '+steps[index].querySelector('h3').textContent;
  };
  const pause=()=>{clearTimeout(timer);timer=null};
  const advance=()=>{
   clearTimeout(timer);if(reduced.matches||document.hidden)return;
   timer=setTimeout(()=>{index=(index+1)%steps.length;render();advance()},2000);
  };
  const start=()=>{render();advance()};start();
  const visibility=()=>{if(document.hidden)pause();else start()};
  const preference=()=>{pause();start()};
  document.addEventListener('visibilitychange',visibility);reduced.addEventListener?.('change',preference);
  window.addEventListener('pagehide',()=>{pause();document.removeEventListener('visibilitychange',visibility);reduced.removeEventListener?.('change',preference)});
  window.addEventListener('pageshow',event=>{if(event.persisted){document.addEventListener('visibilitychange',visibility);reduced.addEventListener?.('change',preference);start()}});
 });
})();
