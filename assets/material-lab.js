(function initMaterialLab(){
  'use strict';
  const stationary=document.querySelector('.stationery-stage');
  const facade=document.getElementById('signageStage');
  if(!stationary||!facade)return;
  const printSection=stationary.closest('.brand-scene');
  const signageSection=facade.closest('.brand-scene');
  const motionKey='chroma.material-lab.motion.v4', finishKey='chroma.material-lab.finish.v4', angleKey='chroma.material-lab.angle.v4';
  function saved(key,fallback){try{return localStorage.getItem(key)||fallback}catch(e){return fallback}}
  function remember(key,value){try{localStorage.setItem(key,value)}catch(e){}}
  let motion=(saved(motionKey,'on')==='on')&&!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  let finish=saved(finishKey,'matte');
  if(!['matte','metal','glass'].includes(finish))finish='matte';
  let angle=saved(angleKey,'a')==='b'?'b':'a';
  stationary.classList.add('studio-3d');
  facade.classList.add('studio-architectural','material-'+finish);
  stationary.insertAdjacentHTML('afterbegin','<div class="studio-desk-glow" aria-hidden="true"></div><div class="studio-shadow" aria-hidden="true"></div>');
  stationary.querySelector('.paper-stack')?.insertAdjacentHTML('beforeend','<div class="letter-stamp">Nataliia.</div><div class="letter-detail"><span>БУХГАЛТЕРСЬКИЙ СУПРОВІД</span><span>KYIV · ONLINE</span></div>');
  stationary.querySelector('.biz-card-scene')?.insertAdjacentHTML('beforeend','<span class="card-foil" aria-hidden="true">№ 01 / BRAND</span>');
  stationary.querySelector('.envelope-scene')?.insertAdjacentHTML('beforeend','<span class="envelope-wordmark" aria-hidden="true">НАТАЛІЯ</span>');
  stationary.insertAdjacentHTML('beforeend','<div class="studio-pen" aria-hidden="true"></div><div class="studio-clip" aria-hidden="true"></div>');
  facade.insertAdjacentHTML('afterbegin','<div class="arch-cloud" aria-hidden="true"></div><div class="arch-cloud two" aria-hidden="true"></div>');
  facade.querySelector('.signage-glass')?.insertAdjacentHTML('beforeend','<div class="glass-handle" aria-hidden="true"></div><div class="glass-reflection" aria-hidden="true"></div>');
  facade.insertAdjacentHTML('beforeend','<div class="arch-stoop" aria-hidden="true"></div><div class="arch-planter left" aria-hidden="true"></div><div class="arch-planter right" aria-hidden="true"></div>');
  facade.querySelector('.signage-facade')?.insertAdjacentHTML('beforeend','<div class="arch-light left" aria-hidden="true"></div><div class="arch-light right" aria-hidden="true"></div>');
  const printTools=document.createElement('div');
  printTools.className='material-lab-tools';
  printTools.setAttribute('aria-label','Керування макетом канцелярії');
  printTools.innerHTML=`<span class="material-label">Ракурс</span><div class="material-segment" role="group" aria-label="Кут огляду канцелярії">
    <button type="button" data-print-angle="a">01 · Зверху</button>
    <button type="button" data-print-angle="b">02 · Під кутом</button>
    </div><div class="material-segment" role="group" aria-label="Анімація об’єктів"><button type="button" data-motion-toggle="print">Рух увімкнено</button></div><span class="material-hint">Веди курсором — предмети рухатимуться у просторі</span>`;
  stationary.before(printTools);
  const printNote=document.createElement('p');
  printNote.className='material-lab-note';
  printNote.innerHTML='<strong>Папір · тиснення · поліграфія.</strong> Усе формується з інтерфейсних елементів і реагує на вибрану палітру. Це тривимірна імітація, не готові до друку макети.';
  stationary.after(printNote);
  const facadeTools=document.createElement('div');
  facadeTools.className='material-lab-tools';
  facadeTools.setAttribute('aria-label','Матеріал вивіски');
  facadeTools.innerHTML=`<span class="material-label">Матеріал конструкції</span><div class="material-segment" role="group" aria-label="Тип матеріалу вивіски">
    <button type="button" data-finish="matte">Матова</button>
    <button type="button" data-finish="metal">Метал</button>
    <button type="button" data-finish="glass">Скло</button>
    </div><div class="material-segment" role="group" aria-label="Анімація вивіски"><button type="button" data-motion-toggle="sign">Рух увімкнено</button></div><span class="material-hint">Освітлення — через «День / Ніч»</span>`;
  facade.before(facadeTools);
  const facadeNote=document.createElement('p');
  facadeNote.className='material-lab-note';
  facadeNote.innerHTML='<strong>Фактура фасаду · відбиття у склі · світло.</strong> Сцена є візуальним концептом, а не проєктною документацією для виготовлення вивіски.';
  facade.after(facadeNote);
  const printAngles=Array.from(printTools.querySelectorAll('[data-print-angle]'));
  const finishes=Array.from(facadeTools.querySelectorAll('[data-finish]'));
  const motionButtons=Array.from(document.querySelectorAll('[data-motion-toggle]'));
  function applyFinish(){
    facade.classList.remove('material-matte','material-metal','material-glass');
    facade.classList.add('material-'+finish);
    finishes.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.finish===finish)));
  }
  function applyAngle(){
    stationary.classList.toggle('angle-b',angle==='b');
    printAngles.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.printAngle===angle)));
  }
  function applyMotion(){
    stationary.classList.toggle('motion',motion);
    facade.classList.toggle('motion',motion);
    motionButtons.forEach(b=>{
      b.setAttribute('aria-pressed',String(motion));
      b.textContent=motion?'✦ Рух увімкнено':'⏸ Рух вимкнено';
    });
    if(!motion)resetPerspective();
  }
  function resetPerspective(){
    for(const key of ['--paper-x','--paper-y','--card-x','--card-y','--envelope-x','--envelope-y'])stationary.style.removeProperty(key);
    facade.style.removeProperty('--facade-tilt');
    facade.style.removeProperty('--facade-shift');
  }
  printAngles.forEach(b=>b.addEventListener('click',()=>{
    angle=b.dataset.printAngle;remember(angleKey,angle);applyAngle();
  }));
  finishes.forEach(b=>b.addEventListener('click',()=>{
    finish=b.dataset.finish;remember(finishKey,finish);applyFinish();
  }));
  motionButtons.forEach(b=>b.addEventListener('click',()=>{
    motion=!motion;remember(motionKey,motion?'on':'off');applyMotion();
  }));
  function smoothPerspective(el,type){
    let raf=0,last=null;
    function move(e){
      if(!motion||e.pointerType==='touch')return;
      const box=el.getBoundingClientRect();
      if(box.width<1||box.height<1)return;
      const x=Math.max(-1,Math.min(1,(e.clientX-box.left-box.width/2)/(box.width/2)));
      const y=Math.max(-1,Math.min(1,(e.clientY-box.top-box.height/2)/(box.height/2)));
      last={x,y};
      if(raf)return;
      raf=requestAnimationFrame(()=>{
        raf=0;if(!last)return;
        if(type==='print'){
          stationary.style.setProperty('--paper-x',(last.x*-9).toFixed(1)+'px');
          stationary.style.setProperty('--paper-y',(last.y*-6).toFixed(1)+'px');
          stationary.style.setProperty('--card-x',(last.x*15).toFixed(1)+'px');
          stationary.style.setProperty('--card-y',(last.y*9).toFixed(1)+'px');
          stationary.style.setProperty('--envelope-x',(last.x*9).toFixed(1)+'px');
          stationary.style.setProperty('--envelope-y',(last.y*6).toFixed(1)+'px');
        }else{
          facade.style.setProperty('--facade-tilt',(last.x*3).toFixed(1)+'deg');
          facade.style.setProperty('--facade-shift',(last.x*4).toFixed(1)+'px');
        }
      });
    }
    el.addEventListener('pointermove',move,{passive:true});
    el.addEventListener('pointerleave',()=>{last=null;if(raf)cancelAnimationFrame(raf);raf=0;resetPerspective();});
  }
  smoothPerspective(stationary,'print');
  smoothPerspective(facade,'facade');
  applyAngle();applyFinish();applyMotion();
})();