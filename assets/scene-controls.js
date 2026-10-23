(function visibleControls(){
 'use strict';
 const bar=document.createElement('div');bar.id='premiumUtilityBar';bar.hidden=true;
 bar.innerHTML='<div class="premium-utility-inner" data-tool="signage" hidden><span class="premium-tools-label">ОСВІТЛЕННЯ ВИВІСКИ</span><div class="premium-switch"><button id="signDayTop" type="button" aria-pressed="true">☀ День</button><button id="signNightTop" type="button" aria-pressed="false">☾ Ніч</button></div><span class="premium-tools-note">Сцена змінюється миттєво</span></div><div class="premium-utility-inner" data-tool="compare" hidden><label class="premium-tools-label" for="compareTopSelect">ПАЛІТРА B ДЛЯ ПОРІВНЯННЯ</label><select id="compareTopSelect" aria-label="Палітра B для порівняння"></select><button type="button" class="btn btn-primary" id="applyTopComparison">Застосувати палітру B ↗</button></div>';
 const stage=document.getElementById('stage');stage.before(bar);
 const topA=document.getElementById('signDayTop'),topB=document.getElementById('signNightTop');
 const day=document.getElementById('signDay'),night=document.getElementById('signNight');
 const targetSelect=document.getElementById('comparisonSelect');
 const topSelect=document.getElementById('compareTopSelect');
 for(const option of targetSelect.options){topSelect.add(new Option(option.text,option.value));}
 topSelect.value=targetSelect.value;
 const tools={signage:bar.querySelector('[data-tool="signage"]'),compare:bar.querySelector('[data-tool="compare"]')};
 function refreshLights(){
   topA.setAttribute('aria-pressed',day.getAttribute('aria-pressed')||'true');
   topB.setAttribute('aria-pressed',night.getAttribute('aria-pressed')||'false');
 }
 topA.addEventListener('click',()=>{day.click();refreshLights()});
 topB.addEventListener('click',()=>{night.click();refreshLights()});
 day.addEventListener('click',refreshLights);night.addEventListener('click',refreshLights);
 topSelect.addEventListener('change',()=>{targetSelect.value=topSelect.value;targetSelect.dispatchEvent(new Event('change',{bubbles:true}));});
 targetSelect.addEventListener('change',()=>{topSelect.value=targetSelect.value;});
 document.getElementById('applyTopComparison').addEventListener('click',()=>document.getElementById('useComparison').click());
 const original=switchView;
 switchView=function(view){
   original(view);
   const special=view==='signage'||view==='compare';
   bar.hidden=!special;
   tools.signage.hidden=view!=='signage';
   tools.compare.hidden=view!=='compare';
   if(view==='signage')refreshLights();
   if(view==='compare')topSelect.value=targetSelect.value;
 };
 const active=[...document.querySelectorAll('.view-tabs [data-view]')].find(x=>x.classList.contains('active'));
 if(active)switchView(active.dataset.view);
})();