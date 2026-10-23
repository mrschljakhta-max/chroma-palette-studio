(function premiumInit() {
  'use strict';
  const viewTabs=document.querySelector('.view-tabs'),preview=document.getElementById('livePreview'),frame=document.getElementById('previewFrame'),url=document.getElementById('browserUrl'),workspace=document.querySelector('.workspace-top');
  if(!viewTabs||!preview||!frame||typeof PALETTES==='undefined')return;
  const views=[['overview','Усі носії'],['stationery','Канцелярія'],['brandSite','Сайт'],['signage','Вивіска'],['compare','Порівняти']];
  const head=(tag,title,desc,extra='')=>`<div class="scene-head"><div><div class="scene-eyebrow">${tag}</div><h2 class="scene-title">${title}</h2><p class="scene-description">${desc}</p></div>${extra||'<span class="scene-chip">BRAND PREVIEW</span>'}</div>`;
  const foot=(text,view='overview')=>`<div class="scene-footer"><span><i style="background:var(--site-primary)"></i>Основний акцент</span><span><i style="background:var(--site-accent)"></i>Додатковий акцент</span><span>${text}</span><button type="button" class="cta-link" data-open-scene="${view}">Перейти ↗</button></div>`;
  const overview=`<section class="site-view application-overview" data-site="overview" aria-label="Усі носії">${head('BRAND APPLICATION STUDIO / 01','Колір у <em>контексті.</em>','Одна палітра — три застосування: на друкованих матеріалах, на сайті та на фасаді. Обери носій, щоб розглянути всі деталі.','<span class="scene-chip">3 СЦЕНИ · LIVE</span>')}<div class="overview-grid">
  <button type="button" class="overview-tile" data-open-scene="stationery"><span class="tile-index">01 · PRINT</span><div class="tile-name">Канцелярія</div><div class="tile-description">Бланк, візитка та конверт у кольорах бренду.</div><div class="tile-paper-graphic" aria-hidden="true"></div><span class="tile-arrow">↗</span></button>
  <button type="button" class="overview-tile" data-open-scene="brandSite"><span class="tile-index">02 · DIGITAL</span><div class="tile-name">Сайт</div><div class="tile-description">Фон, кнопки, типографіка та картки.</div><div class="tile-site-graphic" aria-hidden="true"></div><span class="tile-arrow">↗</span></button>
  <button type="button" class="overview-tile" data-open-scene="signage"><span class="tile-index">03 · PHYSICAL</span><div class="tile-name">Вивіска</div><div class="tile-description">Фасад із денним і нічним освітленням.</div><div class="tile-sign-graphic" aria-hidden="true">НАТАЛІЯ</div><span class="tile-arrow">↗</span></button></div>${foot('Ті самі кольори для всіх носіїв.','compare')}</section>`;
  const stationery=`<section class="site-view brand-scene" data-site="stationery" aria-label="Канцелярія">
  ${head('01 / STATIONERY MOCKUP','Від палітри — до <em>паперу.</em>','Реалістична композиція фірмового бланка, візитки та конверта. Колір змінюється в реальному часі.','<span class="scene-chip">PRINT / 01</span>')}
  <div class="stationery-stage" role="img" aria-label="Композиція бланка, візитки і конверта з обраною палітрою">
    <div class="paper-stack"><div class="paper-crest">Н</div><div class="paper-heading">НАТАЛІЯ</div><div class="paper-sub">Бухгалтерський супровід ФОП</div><div class="paper-divider"></div><div class="paper-lines"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div>
    <div class="biz-card-scene"><span class="brand-symbol">Н</span><div><strong>Наталія</strong><small>ПЕРСОНАЛЬНИЙ БУХГАЛТЕР</small></div></div>
    <div class="envelope-scene"><div class="envelope-seal">Н</div></div>
    <div class="stationery-label">STATIONERY / BRAND CONCEPT</div>
  </div>${foot('Бланк · візитка · конверт','overview')}</section>`;
  const site=`<section class="site-view brand-scene" data-site="brandSite" aria-label="Макет сайту">
  ${head('02 / DIGITAL EXPERIENCE','Бренд у <em>браузері.</em>','Живий дизайн сторінки: типографіка, кнопки, картки та адаптація під екран телефона.','<span class="scene-chip">DESKTOP / MOBILE</span>')}
  <div class="brand-web-frame"><nav class="brand-web-nav" aria-label="Макет меню"><div class="brand-web-logo"><b>Н</b> Наталія.</div><div class="brand-web-links"><span>Послуги</span><span>IT-ФОП</span><span>Про мене</span></div></nav>
  <div class="brand-web-hero"><div><div class="brand-web-tag">ПЕРСОНАЛЬНИЙ БУХГАЛТЕР · КИЇВ / ONLINE</div><h2>Ясність у цифрах.<br><em>Впевненість у рішеннях.</em></h2><p>Бухгалтерський супровід українських ФОП 3-ї групи: податки, звітність, документи та валютні надходження.</p><button type="button" class="brand-web-btn" data-premium-demo>Запис на консультацію ↗</button></div><div class="brand-web-art" aria-hidden="true"></div></div>
  <div class="brand-web-cards"><div class="brand-web-card"><span class="number">01 /</span><strong>ФОП 3-ї групи</strong><small>Облік доходів і звітність.</small></div><div class="brand-web-card"><span class="number">02 /</span><strong>IT та інвойси</strong><small>Документи й валютні надходження.</small></div><div class="brand-web-card"><span class="number">03 /</span><strong>Прямий зв’язок</strong><small>Індивідуальний супровід.</small></div></div></div>
  ${foot('Макет показує вигляд, не працюючий запис.','compare')}</section>`;
  const signage=`<section class="site-view brand-scene" data-site="signage" aria-label="Вивіска">
  ${head('03 / SIGNAGE MOCKUP','У міському <em>просторі.</em>','Фасадна конструкція у фірмових кольорах. Перемикай освітлення, щоб оцінити контраст удень і вночі.','<div class="signage-toolbar" role="group" aria-label="Освітлення"><button id="signDay" class="signage-toggle" type="button" aria-pressed="true">День</button><button id="signNight" class="signage-toggle" type="button" aria-pressed="false">Ніч</button></div>')}
  <div class="signage-stage" id="signageStage" role="img" aria-label="Фасад із вивіскою у поточній палітрі"><div class="signage-facade"><div class="signage-awning"></div><div class="signage-main"><span class="brand-symbol">Н</span><div><strong>НАТАЛІЯ</strong><span>БУХГАЛТЕРСЬКИЙ СУПРОВІД</span></div></div><div class="signage-glass"></div><div class="signage-side"><span>Н</span></div></div></div>
  ${foot('Візуальний концепт, не фотографія готової вивіски.','overview')}</section>`;
  const comparison=`<section class="site-view brand-scene" data-site="compare" aria-label="Порівняння палітр">
  ${head('04 / SIDE BY SIDE','Два настрої. <em>Один бренд.</em>','Обери палітру B. Ліворуч — редагована палітра A; праворуч — обраний пресет B. На обох однакові носії.','<span class="scene-chip">A / B</span>')}
  <div class="comparison-controls"><label for="comparisonSelect">ПАЛІТРА B ДЛЯ ПОРІВНЯННЯ</label><select id="comparisonSelect"></select></div>
  <div class="comparison-stage">${['Left','Right'].map(side=>`<div class="comparison-card" id="compare${side}"><div class="comparison-card-head"><strong id="compare${side}Name"></strong><small>${side==='Left'?'Поточна палітра + зміни HEX':'Альтернативне оформлення'}</small><div class="compare-swatches" id="compare${side}Swatches"></div></div><div class="compare-web"><div class="compare-web-header">Наталія.</div><h3>Ясність у цифрах.<br><em>Впевненість.</em></h3><p>Бухгалтерський супровід ФОП, податки та звітність.</p><span class="compare-web-btn">Консультація ↗</span></div><div class="compare-materials"><div class="compare-letter">Н</div><div class="compare-sign"><span>НАТАЛІЯ</span></div></div></div>`).join('')}</div>
  <div class="scene-footer"><span>Зміни палітри B не замінюють A без підтвердження.</span><button type="button" class="cta-link" id="useComparison">Застосувати палітру B ↗</button></div></section>`;
  preview.insertAdjacentHTML('beforeend',overview+stationery+site+signage+comparison);
  viewTabs.innerHTML=views.map(([id,label],i)=>`<button type="button" data-view="${id}" class="${i===0?'active':''}" aria-pressed="${i===0}">${label}</button>`).join('');
  const legacy=document.createElement('select');
  legacy.id='legacyDemoSelect';legacy.setAttribute('aria-label','Попередні UI-макети');
  legacy.innerHTML='<option value="">Інші макети…</option><option value="landing">Лендінг</option><option value="dashboard">Дашборд</option><option value="shop">Магазин</option>';
  const devices=workspace.querySelector('.device-tabs');
  if(devices)devices.before(legacy);else workspace.querySelector('.workspace-controls').append(legacy);
  const actions=document.createElement('div');
  actions.id='premiumActions';
  actions.innerHTML='<span class="palette-trail">◈ <strong>BRAND PREVIEW STUDIO</strong></span><button id="approvePalette" type="button" class="btn btn-primary">✓ Обрати палітру</button><button id="goComparison" type="button" class="btn">⇄ Порівняти</button><span id="approvedPaletteStatus" role="status" aria-live="polite"></span>';
  workspace.querySelector('.stage').after(actions);
  let approved=null,compareId='sage';
  try{
    const a=JSON.parse(localStorage.getItem('chroma.palette.approved.v2'));
    if(a && typeof a.name==='string'&&a.colors)approved=a;
    const b=localStorage.getItem('chroma.palette.compare.v2');
    if(PALETTES.some(p=>p.id===b))compareId=b;
  }catch(e){}
  function approvalStatus(){
    document.getElementById('approvedPaletteStatus').textContent=approved?'✓ Зафіксовано: '+approved.name:'Палітру ще не зафіксовано';
  }
  approvalStatus();
  const sel=document.getElementById('comparisonSelect');
  for(const p of PALETTES){const option=document.createElement('option');option.value=p.id;option.textContent=p.name;sel.append(option);}
  sel.value=compareId;
  function colorVars(el,c){for(const k of ['bg','surface','text','muted','primary','accent','border'])el.style.setProperty('--site-'+k,c[k]);el.style.setProperty('--button-text',buttonText(c.primary));}
  function setSwatches(el,c){el.replaceChildren();for(const k of ['bg','surface','text','primary','accent']){const span=document.createElement('span');span.style.background=c[k];span.title=k+': '+c[k];el.append(span);}}
  function refreshComparison(){
    const p=PALETTES.find(x=>x.id===compareId)||PALETTES[0],other=customById[compareId]||p.colors;
    colorVars(document.getElementById('compareRight'),other);
    document.getElementById('compareLeftName').textContent='A · '+getPreset().name+(isCustom()?' (ред.)':'');
    document.getElementById('compareRightName').textContent='B · '+p.name;
    setSwatches(document.getElementById('compareLeftSwatches'),colors);
    setSwatches(document.getElementById('compareRightSwatches'),other);
  }
  const prevApply=applyColors;
  applyColors=function(){prevApply();refreshComparison();};
  const previousSwitch=switchView;
  switchView=function(view){
    previousSwitch(view);
    const display={overview:'brand / overview',stationery:'brand / stationery',brandSite:'natalia / website concept',signage:'brand / facade',compare:'brand / compare'};
    if(display[view])url.textContent=display[view];
    frame.dataset.scene=view;
    legacy.value=['landing','dashboard','shop'].includes(view)?view:'';
    if(view==='compare')refreshComparison();
  };
  viewTabs.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>switchView(b.dataset.view)));
  legacy.addEventListener('change',()=>{if(legacy.value)switchView(legacy.value)});
  document.querySelectorAll('[data-open-scene]').forEach(b=>b.addEventListener('click',()=>switchView(b.dataset.openScene)));
  document.querySelectorAll('[data-premium-demo]').forEach(b=>b.addEventListener('click',()=>announce('Це макет оформлення. Запис на консультацію доступний на робочому сайті бренду.')));
  sel.addEventListener('change',()=>{compareId=sel.value;try{localStorage.setItem('chroma.palette.compare.v2',compareId)}catch(e){}refreshComparison()});
  document.getElementById('useComparison').addEventListener('click',()=>{selectPalette(compareId);switchView('compare');announce('Палітра B тепер активна')});
  const stage=document.getElementById('signageStage'),day=document.getElementById('signDay'),night=document.getElementById('signNight');
  function light(isNight){stage.classList.toggle('night',isNight);day.setAttribute('aria-pressed',String(!isNight));night.setAttribute('aria-pressed',String(isNight));}
  day.addEventListener('click',()=>light(false));night.addEventListener('click',()=>light(true));light(false);
  document.getElementById('goComparison').addEventListener('click',()=>switchView('compare'));
  document.getElementById('approvePalette').addEventListener('click',()=>{
    approved={id:activeId,name:getPreset().name+(isCustom()?' · власна версія':''),colors:{...colors},savedAt:new Date().toISOString()};
    try{localStorage.setItem('chroma.palette.approved.v2',JSON.stringify(approved))}catch(e){}
    approvalStatus();announce('Палітру обрано та збережено в цьому браузері');
  });
  refreshComparison();switchView('overview');
})();