(() => {
 const links=[...document.querySelectorAll('.topic-links>a')];
 const shell=document.querySelector('.library-shell'),theme=document.getElementById('library-theme');
 if(shell&&theme){
  try{const saved=localStorage.getItem('guide-library-theme');if(saved==='light'||saved==='dark')shell.dataset.theme=saved}catch{}
  theme.checked=shell.dataset.theme==='dark';
  theme.addEventListener('change',()=>{shell.dataset.theme=theme.checked?'dark':'light';try{localStorage.setItem('guide-library-theme',shell.dataset.theme)}catch{}});
 }
 const input=document.getElementById('library-search'),count=document.getElementById('library-count'),empty=document.getElementById('library-empty');
 const normalize=text=>text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').toLowerCase();
 input?.addEventListener('input',()=>{
  const query=normalize(input.value.trim());let total=0;
  links.forEach(link=>{link.hidden=!normalize(link.textContent).includes(query);if(!link.hidden)total++});
  document.querySelectorAll('.topic-band').forEach(band=>band.hidden=![...band.querySelectorAll('.topic-links>a')].some(link=>!link.hidden));
  count.textContent=total+' / '+links.length+' bài hướng dẫn';empty.hidden=total!==0;
 });
 if(count)count.textContent=links.length+' bài hướng dẫn';
})();
