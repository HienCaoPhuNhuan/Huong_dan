(() => {
 const $=id=>document.getElementById(id);
 function text(){return 'Thông tin về tôi:\n'+$('custom-about').value+'\n\nCách tôi muốn được hỗ trợ:\n'+$('custom-response').value}
 function count(){const n=text().length;$('custom-count').textContent='Bản ghép: '+n+' / 1.500 ký tự (gồm nhãn và xuống dòng).';$('custom-copy').disabled=n>1500}
 ['custom-about','custom-response'].forEach(id=>$(id).addEventListener('input',count));
 $('custom-copy').onclick=async()=>{try{await navigator.clipboard.writeText(text());$('custom-status').textContent='Đã sao chép. Chưa lưu vào ChatGPT.'}catch{$('custom-about').focus();$('custom-about').select();$('custom-status').textContent='Chọn văn bản để sao chép từng đoạn.'}};
 count();
})();
