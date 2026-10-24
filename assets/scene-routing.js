(function sceneRouting(){
 'use strict';
 if(typeof switchView!=='function')return;
 const allowed=new Set(['gallery','overview','stationery','brandSite','signage','compare','landing','dashboard','shop']);
 const initial=new URL(window.location.href);
 const scene=initial.searchParams.get('scene');
 const previous=switchView;
 switchView=function(view){
   previous(view);
   if(!allowed.has(view))return;
   const updated=new URL(window.location.href);
   updated.searchParams.set('scene',view);
   if(updated.href!==window.location.href)window.history.replaceState(null,'',updated.pathname+updated.search+updated.hash);
 };
 if(scene&&allowed.has(scene))switchView(scene);
 const quick=document.createElement('div');
 quick.className='chroma-scene-shortcuts';
 quick.setAttribute('aria-label','Швидкий перегляд носіїв');
 quick.innerHTML='<span>Швидкий перегляд:</span><a data-route-scene="stationery" href="?scene=stationery">Канцелярія ↗</a><a data-route-scene="signage" href="?scene=signage">Вивіска ↗</a>';
 const workspace=document.querySelector('.workspace-top');
 if(workspace)workspace.after(quick);
 quick.querySelectorAll('[data-route-scene]').forEach(a=>a.addEventListener('click',event=>{
   if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
   event.preventDefault();switchView(a.dataset.routeScene);
 }));
})();