(() => {
 const host=document.getElementById('rive-demo');if(!host)return;
 const canvas=document.getElementById('rive-canvas'),fallback=document.getElementById('rive-fallback'),status=document.getElementById('rive-status'),inputStatus=document.getElementById('rive-input-status'),stateStatus=document.getElementById('rive-state-status'),auto=document.getElementById('rive-auto'),button=document.getElementById('rive-switch');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let visible=false,focused=false,hover=false,instance=null,clickInput=null,timer=null,timeout=null,ready=false,loading=false,failed=false,disposed=false;
 const clear=()=>{clearTimeout(timer);timer=null};
 function failure(){if(disposed)return;failed=true;ready=false;clear();clearTimeout(timeout);instance?.cleanup();instance=null;fallback.hidden=false;canvas.hidden=true;button.disabled=true;host.dataset.ready='false';host.dataset.running='false';status.textContent='Không tải được Rive. Hình tĩnh và phần giải thích bên dưới vẫn dùng được.';}
 function fire(){if(!ready||!clickInput||reduced.matches)return;clickInput.fire();inputStatus.textContent='Input Click: vừa gửi một trigger chuyển cảnh.';}
 function sync(){clear();const running=ready&&visible&&!document.hidden&&!reduced.matches;host.dataset.running=String(running);button.disabled=!running;if(running){instance.play('Main State Machine');if(auto.checked&&!hover&&!focused)timer=setTimeout(()=>{fire();sync()},4500)}else instance?.pause();if(ready)status.textContent=reduced.matches?'Đang giữ hình tĩnh theo lựa chọn giảm chuyển động.':running?'Rive đang chạy thật; trigger Click đổi ngày / đêm.':'Rive tạm nghỉ ngoài vùng xem hoặc khi tab ẩn.';}
 function initialize(){if(loading||ready||failed||disposed)return;loading=true;timeout=setTimeout(failure,15000);
  const script=document.createElement('script');script.src='assets/vendor/rive-canvas-2.44.2.js';script.onload=()=>{if(failed||disposed)return;try{
   window.rive.RuntimeLoader.setWasmUrl('assets/vendor/rive-canvas-2.44.2.wasm');
   window.rive.RuntimeLoader.setWasmFallbackUrl(null);
   instance=new window.rive.Rive({src:'assets/rive/switch-example.riv',canvas,autoplay:false,stateMachines:'Main State Machine',shouldDisableRiveListeners:false,enableRiveAssetCDN:false,layout:new window.rive.Layout({fit:window.rive.Fit.Contain,alignment:window.rive.Alignment.Center}),
    onLoad:()=>{if(failed||disposed)return;clickInput=instance.stateMachineInputs('Main State Machine').find(input=>input.name==='Click'&&input.type===window.rive.StateMachineInputType.Trigger);if(!clickInput){failure();return}clearTimeout(timeout);ready=true;host.dataset.ready='true';fallback.hidden=true;canvas.hidden=false;instance.resizeDrawingSurfaceToCanvas(Math.min(window.devicePixelRatio||1,2));instance.drawFrame();inputStatus.textContent='Input Click: Trigger, sẵn sàng nhận sự kiện.';sync();},
    onStateChange:event=>{stateStatus.textContent='Trạng thái từ Rive: '+[].concat(event.data||[]).join(' → ');},onLoadError:failure});
  }catch{failure()}};script.onerror=failure;document.head.append(script);
 }
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)initialize();sync()},{threshold:.2});observer.observe(host);
 host.addEventListener('mouseenter',()=>{hover=true;sync()});host.addEventListener('mouseleave',()=>{hover=false;sync()});host.addEventListener('focusin',()=>{focused=true;sync()});host.addEventListener('focusout',()=>{focused=host.contains(document.activeElement);sync()});
 canvas.addEventListener('pointerdown',()=>{auto.checked=false;inputStatus.textContent='Thao tác trong hình: Rive nhận sự kiện con trỏ.';sync()});button.addEventListener('click',()=>{auto.checked=false;fire();sync()});auto.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);
 const resize=new ResizeObserver(()=>{if(ready){instance.resizeDrawingSurfaceToCanvas(Math.min(window.devicePixelRatio||1,2));if(reduced.matches)instance.drawFrame()}});resize.observe(canvas);
 window.addEventListener('pagehide',()=>{disposed=true;clear();clearTimeout(timeout);observer.disconnect();resize.disconnect();instance?.cleanup();document.removeEventListener('visibilitychange',sync);reduced.removeEventListener('change',sync)});
 window.addEventListener('pageshow',event=>{if(event.persisted)location.reload()});
})();
