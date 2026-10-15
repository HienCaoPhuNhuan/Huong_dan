(() => {
 const board=document.getElementById('setup-progress');if(!board)return;
 const checks=[...board.querySelectorAll('input[type=checkbox]')],result=document.getElementById('setup-progress-status'),key='guide-repo-setup-v1';
 try{const saved=JSON.parse(sessionStorage.getItem(key)||'[]');checks.forEach((input,i)=>{input.checked=saved[i]===true})}catch{}
 const update=()=>{const next=checks.findIndex(input=>!input.checked),done=checks.filter(input=>input.checked).length;checks.forEach((input,i)=>{const row=input.closest('li'),link=row.querySelector('a');row.dataset.done=String(input.checked);row.dataset.current=String(i===next);if(i===next)link.setAttribute('aria-current','step');else link.removeAttribute('aria-current')});result.textContent=next<0?'6/6 bước đã đánh dấu xong. Đối chiếu repo và commit thật trước khi tiếp tục.':`${done}/6 bước đã xong · Tiếp theo: bước ${next+1}.`;try{sessionStorage.setItem(key,JSON.stringify(checks.map(input=>input.checked)))}catch{}};
 checks.forEach(input=>input.addEventListener('change',update));document.getElementById('reset-setup-progress').addEventListener('click',()=>{checks.forEach(input=>{input.checked=false});update()});update();
})();
