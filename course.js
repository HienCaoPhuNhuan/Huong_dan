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
  const toggle=document.createElement('button'),restart=document.createElement('button'),status=document.createElement('p');
  toggle.type=restart.type='button';restart.textContent='↻';restart.title='Chạy lại từ bước đầu';restart.setAttribute('aria-label',restart.title);
  status.className='flow-status';status.setAttribute('role','status');
  controls.append(toggle,restart,status);flow.after(controls);
  let index=0,timer=null,running=false,started=false,visible=false;
  const render=()=>{
   steps.forEach((step,i)=>{step.classList.toggle('flow-current',i===index);step.classList.toggle('flow-done',i<index);if(i===index)step.setAttribute('aria-current','step');else step.removeAttribute('aria-current')});
   flow.dataset.step=String(index+1);
   toggle.textContent=running?'Ⅱ':'▶';toggle.title=running?'Dừng minh họa':'Tiếp tục minh họa';toggle.setAttribute('aria-label',toggle.title);toggle.disabled=reduced.matches;
   status.textContent='Bước '+(index+1)+' / '+steps.length+': '+steps[index].querySelector('h3').textContent+(reduced.matches?' · Giảm chuyển động':running?' · Đang chạy':index===steps.length-1?' · Đã hoàn tất':' · Đã dừng');
  };
  const pause=()=>{clearTimeout(timer);timer=null;running=false;render()};
  const advance=()=>{
   clearTimeout(timer);if(!running)return;
   timer=setTimeout(()=>{if(document.hidden||!visible){pause();return}if(index<steps.length-1){index++;render();advance()}else pause()},1800);
  };
  const start=()=>{if(reduced.matches||!visible||document.hidden)return;started=true;running=true;render();advance()};
  toggle.onclick=()=>{if(running)pause();else{if(index===steps.length-1)index=0;start()}};
  restart.onclick=()=>{pause();index=0;render();start()};
  render();
  const observer='IntersectionObserver' in window?new IntersectionObserver(entries=>{
   visible=entries.some(entry=>entry.isIntersecting);if(!visible)pause();else if(!started)start();
  },{threshold:.15}):null;
  if(observer)observer.observe(flow);else visible=true;
  const visibility=()=>{if(document.hidden)pause()};
  const preference=()=>{if(reduced.matches)pause();else render()};
  document.addEventListener('visibilitychange',visibility);reduced.addEventListener?.('change',preference);
  window.addEventListener('pagehide',()=>{pause();observer?.disconnect();document.removeEventListener('visibilitychange',visibility);reduced.removeEventListener?.('change',preference)},{once:true});
 });
})();
