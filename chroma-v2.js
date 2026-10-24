
/* CHROMA v2: interaction layer. Existing palette engine remains the source of truth. */
(function () {
  'use strict';
  var keys = ['bg','surface','text','muted','primary','accent','border'];
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var drawer = document.querySelector('.right-panel');
  var backdrop = document.getElementById('editorBackdrop');
  var openButtons = document.querySelectorAll('[data-open-editor]');
  var closeButton = document.getElementById('drawerClose');
  var returnFocus = null;

  function openEditor() {
    returnFocus = document.activeElement;
    document.body.classList.add('drawer-open');
    if (drawer) {
      drawer.setAttribute('aria-hidden','false');
      drawer.removeAttribute('inert');
    }
    if (closeButton) closeButton.focus();
  }
  function closeEditor() {
    document.body.classList.remove('drawer-open');
    if (drawer) {
      drawer.setAttribute('aria-hidden','true');
      drawer.setAttribute('inert','');
    }
    if (returnFocus && typeof returnFocus.focus === 'function') returnFocus.focus();
  }
  openButtons.forEach(function (b) { b.addEventListener('click',openEditor); });
  if (closeButton) closeButton.addEventListener('click',closeEditor);
  if (backdrop) backdrop.addEventListener('click',closeEditor);
  document.addEventListener('keydown', function(e) {
    if(e.key==='Escape' && document.body.classList.contains('drawer-open')) closeEditor();
    if (e.key==='Tab' && document.body.classList.contains('drawer-open')) {
      var all=drawer.querySelectorAll('button:not([disabled]),input:not([disabled]),a[href]');
      if(!all.length)return;
      var first=all[0], last=all[all.length-1];
      if(e.shiftKey && document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey && document.activeElement===last){e.preventDefault();first.focus();}
    }
  });
  function paintSwatches(container,tag) {
    if(!container) return;
    container.replaceChildren();
    ['bg','surface','text','primary','accent'].forEach(function(k) {
      var x = document.createElement(tag);
      x.style.background = colors[k];
      x.title = k + ': ' + colors[k];
      if(tag==='button'){
        x.type='button';
        x.setAttribute('aria-label','Налаштувати '+k);
        x.addEventListener('click', openEditor);
      }
      container.append(x);
    });
  }
  function updateCreative() {
    var root=document.documentElement;
    keys.forEach(function (k) { root.style.setProperty('--m-'+k,colors[k]); });
    var p = getPreset();
    var n=document.getElementById('heroPaletteName');
    if(n)n.textContent=p.name+(isCustom()?' · Custom':'');
    var d=document.getElementById('dockTitle');
    if(d)d.textContent=p.name+(isCustom()?' · Custom':'');
    var a=document.getElementById('heroAccentHex');
    if(a)a.textContent=colors.primary.toUpperCase();
    var b=document.getElementById('heroSecondHex');
    if(b)b.textContent=colors.accent.toUpperCase();
    paintSwatches(document.getElementById('heroSwatches'),'i');
    paintSwatches(document.getElementById('dockSwatches'),'span');
    var m=document.querySelector('meta[name="theme-color"]');
    if(m)m.content='#09090b';
  }
  var previousApply=applyColors;
  applyColors=function(){previousApply();updateCreative();};
  updateCreative();

  var visual=document.getElementById('heroVisual');
  var hero=document.getElementById('home');
  if(visual && hero && !reduced) {
    hero.addEventListener('pointermove', function(event) {
      if(event.pointerType==='touch') return;
      var r=hero.getBoundingClientRect();
      var x=(event.clientX-r.left)/r.width-.5;
      var y=(event.clientY-r.top)/r.height-.5;
      hero.style.setProperty('--mx',(x*26).toFixed(1)+'px');
      hero.style.setProperty('--my',(y*22).toFixed(1)+'px');
    },{passive:true});
    hero.addEventListener('pointerleave',function(){
      hero.style.setProperty('--mx','0px');
      hero.style.setProperty('--my','0px');
    });
  }
  var revealItems=document.querySelectorAll('.section-heading,.left-panel .side-head,.preset,.workspace-top');
  if('IntersectionObserver' in window && !reduced){
    var obs=new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if(entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },{threshold:.04,rootMargin:'0px 0px 45px 0px'});
    revealItems.forEach(function(item){ item.classList.add('reveal'); obs.observe(item); });
  }
  document.querySelectorAll('[data-scroll-preview]').forEach(function(btn){
    btn.addEventListener('click',function(){
      document.getElementById('liveSection').scrollIntoView({behavior:reduced?'auto':'smooth'});
    });
  });
  if (drawer){ drawer.setAttribute('aria-hidden','true'); drawer.setAttribute('inert',''); }
  if (!new URLSearchParams(window.location.search).has('scene') && typeof switchView === 'function') { switchView('overview'); }
  var logo=document.querySelector('.brand');
  if(logo)logo.addEventListener('click',function(){window.scrollTo({top:0,behavior:reduced?'auto':'smooth'});});
})();
