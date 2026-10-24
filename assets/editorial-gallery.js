(function initEditorialGallery(){
 'use strict';
 if(typeof PALETTES==='undefined'||!document.getElementById('livePreview'))return;
 const PHOTO_BASE='https://images.pexels.com/photos/';
 const collections=[
 {id:'peony',name:'Півонія',tag:'Ніжна',description:'Ніжна та вишукана палітра для чуттєвих брендів.',photographer:'Valeria Boltneva',source:'https://www.pexels.com/photo/blooming-peony-with-pink-petals-7876490/',photo:'7876490',shade:['#2E1A22','#724253','#B77D8F','#D9B7C1','#F1E4E8'],position:'center 50%'},
 {id:'eucalyptus',name:'Евкаліпт',tag:'Природна',description:'Природна гармонія та баланс у кожній деталі.',photographer:'Eva Bronzini',source:'https://www.pexels.com/photo/eucalyptus-plant-in-close-up-photography-6065449/',photo:'6065449',shade:['#0F1F17','#2E4D3F','#5F8F72','#A7C4A9','#E7EFE6'],position:'center 50%'},
 {id:'sandstone',name:'Теракота',tag:'Тепла',description:'Тепла й автентична палітра для сміливих ідей.',photographer:'TXTR',source:'https://www.pexels.com/photo/close-up-o-sandstone-17375882/',photo:'17375882',shade:['#3B2A1F','#8B6F56','#C9A98B','#E0D1C0','#F6EFE7'],position:'center 50%'},
 {id:'iris',name:'Ірис',tag:'Елегантна',description:'Сучасна елегантність і творчий характер.',photographer:'Adonyi Gábor',source:'https://www.pexels.com/photo/close-up-shot-of-an-iris-flower-8023729/',photo:'8023729',shade:['#1A1B3D','#4F5AA6','#818BCF','#C7CBEA','#EEF0FF'],position:'center 50%'},
 {id:'garnet',name:'Гранат',tag:'Глибока',description:'Глибока палітра для яскравих особистостей.',photographer:'Juan Pablo Daniel',source:'https://www.pexels.com/photo/dramatic-red-anthurium-blossom-on-black-background-35441280/',photo:'35441280',shade:['#2A0D14','#6A1F2D','#A8485A','#D28A94','#F2D7DB'],position:'center 50%'}
 ];
 const imageUrl=p=>PHOTO_BASE+p.photo+'/pexels-photo-'+p.photo+'.jpeg?auto=compress&cs=tinysrgb&w=800';
 // Map a five-shade editorial ramp to the seven canonical CHROMA roles.
 function roles(p){const s=p.shade;return{bg:s[4],surface:s[3],text:s[0],muted:s[1],primary:s[1],accent:s[2],border:s[3]};}
 for(const p of collections){
   if(!PALETTES.some(x=>x.id===p.id)){
     PALETTES.push({id:p.id,name:p.name,description:p.description,tag:p.tag,mode:'light',colors:roles(p)});
   }
 }
 // Preexisting restore ran before these additional presets were registered.
 restore();
 const grid=document.getElementById('presetGrid');
 function decoratePresets(){
   if(!grid)return;
   const choices=[...grid.querySelectorAll('.preset-choose')];
   for(const p of collections){
     const button=choices.find(x=>x.getAttribute('aria-label')==='Обрати '+p.name);
     if(!button)continue;
     const visual=button.querySelector('.preset-preview');
     if(!visual)continue;
     visual.classList.add('editorial-mini');
     visual.style.backgroundImage='linear-gradient(#0003,#0004),url("'+imageUrl(p)+'")';
     visual.style.backgroundSize='cover';
     visual.style.backgroundPosition=p.position;
     visual.querySelector('.preview-sun')?.remove();
     const shades=customById[p.id]||roles(p);
     const ramp=[shades.text,shades.primary,shades.accent,shades.border,shades.bg];
     const stack=document.createElement('div');stack.className='mini-ramp';stack.setAttribute('aria-hidden','true');
     for(const color of ramp){const s=document.createElement('span');s.style.background=color;stack.append(s);}
     visual.append(stack);
   }
 }
 const oldRender=renderPresets;
 renderPresets=function(){oldRender();decoratePresets();};
 renderPresets();renderEditor();applyColors();
 const gallery=document.createElement('section');
 gallery.className='site-view chroma-gallery';
 gallery.dataset.site='gallery';
 gallery.setAttribute('aria-label','Галерея кольорових палітр');
 gallery.innerHTML=`
 <div class="gallery-overline">PALETTE STUDIO</div>
 <h1 class="gallery-title">Оберіть палітру</h1>
 <p class="gallery-intro">Гармонійні поєднання кольорів, натхненні природою та мистецтвом. Кожна картка — жива палітра: обирай і дивись на канцелярії, сайті та вивісці.</p>
 <div class="gallery-grid" id="editorialPaletteGrid"></div>
 <div class="gallery-note"><b>Як це працює:</b> натисни на картку, щоб застосувати палітру й одразу перейти до перегляду на носіях. HEX-коди можна додатково відредагувати справа.</div>
 <div class="gallery-bottom"><span>CHROMA / BRAND PALETTES</span><strong>05 ВІЗУАЛЬНИХ КОЛЕКЦІЙ</strong><span>КОЛЬОРИ, ЩО РОЗПОВІДАЮТЬ ІСТОРІЇ</span></div>`;
 document.getElementById('livePreview').append(gallery);
 const holder=document.getElementById('editorialPaletteGrid');
 for(const [i,p] of collections.entries()){
   const card=document.createElement('article');
   card.className='gallery-card';card.dataset.paletteId=p.id;
   const b=document.createElement('button');b.type='button';b.className='gallery-choice';
   b.setAttribute('aria-label','Обрати палітру '+p.name+' і переглянути на носіях');
   b.setAttribute('aria-pressed','false');
   const visual=document.createElement('div');visual.className='gallery-visual';
   visual.style.setProperty('--gallery-fallback','linear-gradient(145deg,'+p.shade[1]+','+p.shade[0]+')');
   visual.style.setProperty('--gallery-image','url("'+imageUrl(p)+'")');
   visual.style.setProperty('--gallery-position',p.position);
   visual.innerHTML='<div class="gallery-photo" aria-hidden="true"></div>';
   const swatches=document.createElement('div');swatches.className='gallery-swatches';
   for(const color of p.shade){
     const strip=document.createElement('span');strip.className='gallery-swatch';strip.textContent=color;
     strip.style.setProperty('--swatch',color);strip.style.setProperty('--on-swatch',buttonText(color));
     swatches.append(strip);
   }
   visual.append(swatches);b.append(visual);
   const title=document.createElement('h2');title.className='gallery-card-name';title.textContent=p.name;
   const desc=document.createElement('p');desc.className='gallery-card-description';desc.textContent=p.description;
   const arrow=document.createElement('span');arrow.className='gallery-arrow';arrow.setAttribute('aria-hidden','true');arrow.textContent='→';
   const state=document.createElement('span');state.className='gallery-selected';state.setAttribute('aria-hidden','true');
   b.append(title,desc,arrow,state);
   b.addEventListener('click',()=>{selectPalette(p.id);updateSelection();switchView('overview');announce('Палітра «'+p.name+'» застосована. Переглянь її на носіях.');});
   const photoLink=document.createElement('a');photoLink.className='gallery-credit';photoLink.href=p.source;photoLink.target='_blank';photoLink.rel='noopener noreferrer';photoLink.textContent='Фото: '+p.photographer+' / Pexels';
   card.append(b,photoLink);holder.append(card);
 }
 function updateSelection(){
   holder.querySelectorAll('.gallery-card').forEach(card=>{
     const active=card.dataset.paletteId===activeId;
     card.classList.toggle('is-active',active);
     card.querySelector('.gallery-choice').setAttribute('aria-pressed',String(active));
     card.querySelector('.gallery-selected').textContent=active?'✓ АКТИВНА ПАЛІТРА':'';
   });
 }
 const tabs=document.querySelector('.view-tabs');
 const galleryTab=document.createElement('button');
 galleryTab.type='button';galleryTab.dataset.view='gallery';galleryTab.textContent='✦ Палітри';
 galleryTab.setAttribute('aria-pressed','false');tabs.prepend(galleryTab);
 galleryTab.addEventListener('click',()=>switchView('gallery'));
 const oldSwitch=switchView;
 switchView=function(view){
   oldSwitch(view);
   const isGallery=view==='gallery';
   document.querySelector('.app').classList.toggle('gallery-mode',isGallery);
   if(isGallery){
     document.getElementById('browserUrl').textContent='chroma / palette gallery';
     updateSelection();
   }
 };
 const oldSelect=selectPalette;
 selectPalette=function(id){oldSelect(id);updateSelection();};
 updateSelection();
 switchView('gallery');
})();