/* ---------- helpers ---------- */
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const src=n=>IMG[n]?`img/${n}.${IMG[n][0]}`:'';
/* smaller copies live in img/w480 and img/w960 whenever the original is meaningfully wider */
const VARIANTS=[480,960];
function srcset(n){const w=IMG[n][1],v=VARIANTS.filter(x=>w>x*1.15);return v.length?v.map(x=>`img/w${x}/${n}.webp ${x}w`).concat(`${src(n)} ${w}w`).join(', '):''}
/* o: {eager, hi (fetch first), cls, sizes, h (shown at this pixel height)} */
function pic(n,alt,o={}){const m=IMG[n];if(!m){console.warn('missing image',n);return ''}
  const ss=srcset(n),sizes=o.h?`${Math.round(o.h*m[1]/m[2])}px`:(o.sizes||'100vw');
  return `<img src="${src(n)}"${ss?` srcset="${ss}" sizes="${sizes}"`:''} width="${m[1]}" height="${m[2]}" alt="${esc(alt)}"${o.eager?'':' loading="lazy"'}${o.hi?' fetchpriority="high"':''} decoding="async"${o.cls?` class="${o.cls}"`:''}>`}
const artSizes=w=>{const m=IMG[w.img];return `(max-width:860px) 90vw, min(46vw, ${Math.round(660*m[1]/m[2])}px)`};
const arch=inner=>`<div class="arch"><div class="arch-img">${inner}</div></div>`;
const orn=`<div class="orn" aria-hidden="true"><i></i><svg><use href="#i-orn"/></svg><i></i></div>`;
const arrow=`<svg aria-hidden="true"><use href="#i-arrow"/></svg>`;
const ico=n=>`<svg aria-hidden="true"><use href="#i-${n}"/></svg>`;
const paras=a=>(a||[]).map(p=>`<p>${esc(p)}</p>`).join('');
let GROUPS={};
function reg(g,n,t,m){(GROUPS[g]=GROUPS[g]||[]).push({n,t,m:m||''});return GROUPS[g].length-1}
const metaOf=w=>[w.size,w.medium,w.year].filter(Boolean).join(' · ');
const WORKS={};
Object.values(PAGES).forEach(p=>p.chapters.forEach(c=>(c.works||[]).forEach(w=>{WORKS[w.img]=w})));
const collName=id=>COLL.find(c=>c.id===id)?.name||'';

function caption(w){
  if(w.noPlacard) return '';
  const l=(k,v)=>v?`<span class="cap-l"><b>${k}</b>${esc(v)}</span>`:'';
  return `<figcaption class="cap"><span class="cap-t">${esc(w.title)}</span>${l('Size',w.size)}${l('Medium',w.medium)}${l('Year',w.year)}</figcaption>`;
}
function framed(w,g,sizes){
  const i=reg(g,w.img,w.title,metaOf(w));
  return `<figure class="art${w.round?' art-round':''}"><button class="zoom" data-g="${g}" data-i="${i}" aria-label="View ${esc(w.title)} larger"><span class="frame">${pic(w.img,w.title,{sizes:sizes||artSizes(w)})}</span></button>${caption(w)}</figure>`;
}
function exhibit(w,g,flip){
  const text=[
    w.tag?`<p class="tagline">${esc(w.tag)}</p>`:'',
    w.head?`<h3 class="h3">${esc(w.head)}</h3>`:'',
    w.desc?`<div class="prose">${paras(w.desc)}</div>`:'',
    w.verse?`<p class="verse">${w.verse.map((l,i)=>i===0?`<span class="lead">${esc(l)}</span>`:`<span>${esc(l)}</span>`).join('')}</p>`:''].join('');
  if(!text) return `<article class="exhibit solo">${framed(w,g)}</article>`;
  return `<article class="exhibit${flip?' flip':''}">${framed(w,g)}<div class="ex-text">${text}</div></article>`;
}
const worksGrid=(ws,g,cols2)=>`<div class="works-grid${cols2?' cols-2':''}">${ws.map(w=>framed(w,g,`${Math.round(340*IMG[w.img][1]/IMG[w.img][2])}px`)).join('')}</div>`;
function strip(list,g,cap){
  return `<div class="strip-wrap"><div class="strip">${list.map((n,k)=>{const i=reg(g,n,cap,`Photograph ${k+1} of ${list.length}`);return `<button class="zoom" data-g="${g}" data-i="${i}" aria-label="View photograph ${k+1} of ${list.length}">${pic(n,`${cap}, photograph ${k+1}`,{h:250})}</button>`}).join('')}</div>
    <div class="strip-ctl"><span class="strip-n">${list.length} photographs</span><button class="icon-btn" data-strip="-1" aria-label="Scroll back">${ico('prev')}</button><button class="icon-btn" data-strip="1" aria-label="Scroll forward">${ico('next')}</button></div></div>`;
}
/* even square tiles; the first photo is a 2x2 feature so 17 photos fill whole rows (5 across, 4 on phones) */
function tiles(list,g,cap){
  return `<div class="tiles">${list.map((n,k)=>{const i=reg(g,n,cap,`Photograph ${k+1} of ${list.length}`);return `<button class="zoom" data-g="${g}" data-i="${i}" aria-label="View photograph ${k+1} of ${list.length}">${pic(n,`${cap}, photograph ${k+1}`,{sizes:k?'(max-width:600px) 25vw, 190px':'(max-width:600px) 50vw, 380px'})}</button>`}).join('')}</div>`;
}
function testimonials(id){
  return `<div class="testi" data-testi="${id}">
    <div class="q-mark" aria-hidden="true">“</div>
    <div class="q-stage">${QUOTES.map((q,i)=>`<figure class="q-slide${i===0?' on':''}"><blockquote class="q-text">${esc(q[0])}</blockquote><figcaption class="q-by">— ${esc(q[1])}</figcaption></figure>`).join('')}</div>
    <div class="q-ctl"><button class="icon-btn" data-q="-1" aria-label="Previous testimonial">${ico('prev')}</button><div class="dots">${QUOTES.map((q,i)=>`<button data-qi="${i}" aria-label="Testimonial ${i+1} of ${QUOTES.length}" aria-current="${i===0}"></button>`).join('')}</div><button class="icon-btn" data-q="1" aria-label="Next testimonial">${ico('next')}</button></div>
  </div>`;
}
function ctaBlock(c,room){
  const light=room.includes('light');
  return `<section class="sec ${room}"><div class="wrap narrow cta">${orn}<h2 class="h2${light?'':' foil'}">${esc(c.title)}</h2><div class="prose center">${paras(c.text)}</div><a class="btn" href="#contact">Commission Art ${arrow}</a></div></section>`;
}

/* ---------- pages ---------- */
const HERO_SIZES={s:'9vw',m:'(max-width:600px) 23vw, (max-width:900px) 26vw, 13vw',l:'(max-width:600px) 32vw, (max-width:900px) 36vw, 20vw'};
function heroWall(){
  let discs=0;
  return `<div class="gw">${HERO_WALL.map((h,k)=>{
    const w=WORKS[h.img]||{title:''};const i=reg('hero',h.img,w.title,metaOf(w));
    const btn=inner=>`<button class="zoom" data-g="hero" data-i="${i}" aria-label="View ${esc(w.title)} larger">${inner}</button>`;
    const cls=h.x?' x':'';
    if(h.disc) return `<div class="gw-disc${cls}${discs++?' rev':''}" style="--i:${k}">${btn(pic(h.img,w.title,{eager:1,sizes:'(max-width:900px) 27vw, 17.5vw'}))}</div>`;
    const sizes=h.z?`calc(${HERO_SIZES[h.size].split(', ').pop()} * ${h.z})`:HERO_SIZES[h.size];
    return `<div class="gw-it ${h.size}${cls}" style="--i:${k}${h.z?`;--z:${h.z}`:''}">${btn(arch(pic(h.img,w.title,{eager:1,hi:h.size==='l',sizes:h.z?`(max-width:900px) 54vw, ${sizes}`:sizes})))}</div>`;
  }).join('')}</div>`;
}

function homePage(){
  const m=HOME.museum,e=HOME.expo;
  return `
  <section class="hg">
    <div class="wrap hg-head">
      ${pic('seema-sethi-viraasat-logo-1','Viraasat seal',{eager:1,cls:'hg-seal',sizes:'96px'})}
      <p class="eyebrow">Art by Seema Sethi</p>
      <h1 class="h1 foil shimmer">A Tribute to Our Cultural Heritage <span class="l2">through the Glow of Tanjore</span></h1>
      <div class="btns center"><a class="btn" href="#viraasat">Explore Collection ${arrow}</a><a class="btn btn-ghost" href="#about">Know the Artist</a></div>
    </div>
    ${heroWall()}
  </section>

  <section class="sec light marble" id="collections">
    <div class="wrap">
      <div class="sec-head"><p class="eyebrow">Collections</p>${orn}</div>
      <div class="colls">${COLL.map(c=>`<a class="coll" href="#${c.id}">${pic(COLL_BTN[c.id],c.name)}<span class="deva">${c.deva}</span><h3>${c.name}</h3><p>${esc(c.line)}</p><span class="more">Explore</span></a>`).join('')}</div>
    </div>
  </section>

  <section class="sec light sand">
    <div class="wrap split">
      ${arch(pic('artist-seema-sethi-art-by-seema-sethi','Artist Seema Sethi',{sizes:'400px'}))}
      <div class="copy">
        <p class="tagline">Reimagining history into timeless collectibles:</p>
        <h2 class="h2">Artist Seema Sethi</h2>
        <div class="prose"><p>Through Tanjore art and mixed media, Seema Sethi documents and reimagines the rich cultural heritage on her canvases which is loved by collectors around the globe.</p></div>
        <a class="btn btn-ghost" href="#about">Know the Artist ${arrow}</a>
      </div>
    </div>
  </section>

  <div class="band jaali-band">${pic('jaali-banner','Tanjore jaali panels in gold',{sizes:'100vw'})}</div>

  <section class="sec wall">
    <div class="wrap">
      <div class="event">
        <div class="copy">
          <p class="date">${esc(m.date)}</p>
          <h2 class="h2 foil">${esc(m.title)}</h2>
          <div class="prose">${paras(m.paras)}</div>
          <blockquote>${esc(m.close)}</blockquote>
        </div>
        ${framed({img:'untitled-design-13',round:true,title:'The Royal Shield',size:'36 inches diameter (without frame)',medium:'Gold foil work and oils',year:'2022'},'museum-shield','(max-width:860px) 80vw, 420px')}
      </div>
      <div style="margin-top:clamp(48px,6vw,80px)">${strip(m.photos,'museum',`${m.title}, ${m.date}`)}</div>
    </div>
  </section>

  <section class="sec light marble">
    <div class="wrap">
      <div class="sec-head left"><p class="eyebrow left">${esc(e.date)}</p><h2 class="h2">${esc(e.title)}</h2></div>
      ${strip(e.photos,'expo',e.title)}
    </div>
  </section>

  <section class="sec deep">
    <div class="wrap">
      <div class="sec-head"><p class="eyebrow">@canvases_in_gold</p><h2 class="h2 foil">Connect with us on Instagram</h2></div>
      <div class="reels">${['reel-stepwell','reel-2','reel-3','reel-4'].map((v,k)=>`<div class="reel"><video data-src="vid/${v}.mp4" poster="vid/${v}.webp" muted loop playsinline preload="none" aria-label="Instagram reel ${k+1}"></video></div>`).join('')}</div>
      <div class="btns center" style="margin-top:48px"><a class="btn" href="https://www.instagram.com/canvases_in_gold/" target="_blank" rel="noopener">Follow Us ${arrow}</a></div>
    </div>
  </section>

  <section class="sec light sand">
    <div class="wrap">
      <div class="sec-head"><h2 class="h2">Art Shows at a Glance</h2>${orn}</div>
      <div class="shows3">${HOME.shows.map(([n,c])=>{const i=reg('shows3',n,c);return `<button class="zoom show-card" data-g="shows3" data-i="${i}"><span class="ph">${pic(n,c,{sizes:'(max-width:760px) 92vw, 30vw'})}</span><span class="nm">${esc(c)}</span></button>`}).join('')}</div>
      <div class="btns center" style="margin-top:44px"><a class="btn btn-ghost" href="#shows">View More ${arrow}</a></div>
    </div>
  </section>

  <section class="sec light marble">
    <div class="wrap">
      <div class="sec-head"><h2 class="h2">Loved by Collectors Around the World</h2><p class="sub">From bespoke commissions to cherished gifts, each piece finds a special place in the hearts and homes of our clients.</p></div>
      ${tiles(HOME.collectors,'collectors','Loved by Collectors Around the World')}
    </div>
  </section>

  <section class="sec wall">
    <div class="wrap">
      <div class="sec-head"><p class="eyebrow">Testimonials</p><h2 class="h2 foil">What Collectors Say</h2></div>
      ${testimonials('home')}
      <div class="btns center" style="margin-top:44px"><a class="btn btn-ghost" href="#contact">Contact ${arrow}</a></div>
    </div>
  </section>

  ${atlas()}`;
}

function atlas(){
  return `<section class="sec light sand">
    <div class="wrap atlas">
      <div class="map" id="map">
        <svg viewBox="0 0 241 260" aria-hidden="true"><defs><linearGradient id="mg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E2C47D"/><stop offset=".5" stop-color="#C29A4C"/><stop offset="1" stop-color="#94712F"/></linearGradient><pattern id="mj" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="6" cy="6" r="3.4" fill="none" stroke="#6E4F1C" stroke-opacity=".18" stroke-width=".4"/></pattern></defs>
          <polygon points="${INDIA}" fill="url(#mg)" stroke="#FCF8F1" stroke-width="1" stroke-linejoin="round"/><polygon points="${INDIA}" fill="url(#mj)"/></svg>
        ${MAP_PTS.map(([t,l,n,p,c,img,ch],k)=>`<a class="pin${l<30?' tl':l>62?' tr':''}${t<40?' below':''}" href="#${c}" data-ch="${ch}" data-m="${k}" style="top:${t}%;left:${l}%;--d:${(k*.37%3).toFixed(2)}s" aria-label="${esc(n+(p?', '+p:''))}, in ${collName(c)}"><i></i><span class="tip" aria-hidden="true">${pic(img,n,{cls:ROUND.has(img)?'rnd':'',sizes:'196px'})}<span class="tt">${esc(n)}</span><span class="tp">${esc(p?p+' · ':'')}${collName(c)}</span></span></a>`).join('')}
      </div>
      <div style="display:grid;gap:26px;justify-items:start">
        <p class="eyebrow left">An atlas in gold</p>
        <h2 class="h2">A Tribute to the Rich Cultural Heritage of India</h2>
        <ul class="legend">${MAP_PTS.map(([t,l,n,p,c,img,ch],k)=>`<li><a href="#${c}" data-ch="${ch}" data-m="${k}"><b></b><span class="n">${esc(n)}</span>${p?`<span class="p">${esc(p)}</span>`:''}</a></li>`).join('')}</ul>
        <a class="btn" href="#viraasat">Explore Collection ${arrow}</a>
      </div>
    </div>
  </section>`;
}

function collectionPage(key){
  const P=PAGES[key];
  const heroBg=P.banner?`<div class="c-hero-bg">${pic(P.banner,'',{eager:1,hi:1})}</div>`:'';
  const chip=t=>{t=t.split(' (')[0].split(';')[0];if(t.length<=30)return t;let o='';for(const x of t.split(' ')){if((o+' '+x).trim().length>24)break;o=(o+' '+x).trim()}return o+'…'};
  const chips=P.chapters.map(c=>`<button data-to="ch-${c.id}">${esc(chip(c.title))}</button>`).join('');
  let out=`<section class="c-hero wall">${heroBg}<span class="wm" aria-hidden="true">${P.deva}</span>
    <div class="wrap c-hero-in"><p class="deva-name">${P.deva} · ${esc(P.name)}</p><p class="kicker">${esc(P.kicker)}</p><h1 class="h1 foil shimmer">${esc(P.title)}</h1>${orn}<nav class="idx" aria-label="In this collection">${chips}</nav></div></section>
    <section class="sec light marble"><div class="wrap narrow"><div class="prose dropcap">${paras(P.intro)}</div></div></section>`;
  let flip=false;
  P.chapters.forEach((c,ci)=>{
    if(c.band) out+=`<div class="band">${pic(c.band,'',{sizes:'100vw'})}</div>`;
    const room=ci%2?'light sand':'wall';
    const g='c-'+c.id;
    let body;
    if(c.gallery) body=strip(c.gallery,g,`${c.title}, ${c.sub}`);
    else if(c.grid) body=worksGrid(c.works,g,c.cols2);
    else body=c.works.map(w=>{const h=exhibit(w,g,flip);flip=!flip;return h}).join('');
    const foil=room==='wall'?' foil':'';
    const head=`<header class="ch-head">${c.tag?`<p class="tagline">${esc(c.tag)}</p>`:''}${c.pre?`<p class="pre">${esc(c.pre)}</p>`:''}<h2 class="h2${foil}"${c.italic?' style="font-style:italic;font-weight:400;max-width:22ch"':''}>${esc(c.title)}</h2>${c.sub?`<p class="eyebrow">${esc(c.sub)}</p>`:''}${orn}</header>`;
    const lead=c.paras?`<div class="prose center ch-lead">${paras(c.paras)}</div>`:'';
    let making='';
    if(c.making){
      const mg=g+'-making';
      making=`<div class="making"><h3>${esc(c.making.title)}</h3><div class="making-row${c.making.wide?' making-wide':''}">${c.making.imgs.map((n,k)=>{const i=reg(mg,n,c.making.title,'');return `<button class="zoom" data-g="${mg}" data-i="${i}" aria-label="View ${esc(c.making.title)} image ${k+1}"><span class="frame">${pic(n,c.making.title,{sizes:c.making.wide?'(max-width:1100px) 92vw, 1040px':'(max-width:600px) 92vw, 420px'})}</span></button>`}).join('')}</div></div>`;
    }
    out+=`<section class="chapter ${room}" id="ch-${c.id}"><div class="wrap">${head}${lead}${body}${making}</div></section>`;
  });
  out+=ctaBlock(P.cta,P.chapters.length%2?'light marble':'wall');
  return out;
}

function aboutPage(){
  return `
  <section class="hero wall">
    <div class="wrap hero-grid">
      <div class="hero-copy">
        <p class="eyebrow">Seema Sethi</p>
        <h1 class="h1 foil shimmer">About the Artist</h1>
        <div class="prose"><p style="font-size:1.28rem">${esc(ABOUT.intro)}</p></div>
      </div>
      <div class="hero-art">${arch(pic('artist-seema-sethi-art-by-seema-sethi','Artist Seema Sethi',{eager:1,hi:1,sizes:'440px'}))}</div>
    </div>
  </section>
  <section class="sec light marble">
    <div class="wrap narrow">
      <div class="sec-head left"><h2 class="h2">Seema Sethi</h2></div>
      <div class="tl">${ABOUT.timeline.map(([y,t])=>`<div class="tl-row"><span class="tl-yr">${y}</span><div class="prose"><p>${esc(t)}</p></div></div>`).join('')}</div>
    </div>
  </section>
  <div class="band">${pic('national-museum','National Museum, Janpath, New Delhi',{sizes:'100vw'})}<div class="band-cap"><p class="eyebrow" style="justify-content:center">National Museum · Janpath, New Delhi</p></div></div>
  <section class="sec light sand" id="shows">
    <div class="wrap">
      <div class="sec-head"><p class="eyebrow">Exhibition Gallery</p><h2 class="h2">Recent Art Shows at a Glance</h2>${orn}</div>
      <div class="venues">${ABOUT.venues.map(([v,ph],k)=>{const g='venue-'+k;ph.forEach((n,j)=>reg(g,n,v,`Photograph ${j+1} of ${ph.length}`));return `<button class="zoom show-card" data-g="${g}" data-i="0"><span class="ph">${pic(ph[0],v,{sizes:'(max-width:600px) 92vw, 300px'})}</span><span class="nm">${esc(v)}</span><span class="ct">${ph.length} ${ph.length>1?'photographs':'photograph'}</span></button>`}).join('')}</div>
    </div>
  </section>
  <section class="sec wall">
    <div class="wrap">
      <div class="sec-head"><p class="eyebrow">Testimonials</p><h2 class="h2 foil">What Collectors Say</h2></div>
      ${testimonials('about')}
    </div>
  </section>
  <section class="sec light marble"><div class="wrap narrow cta">${orn}<h2 class="h2">Bring a Piece of Rich Heritage to Your Home</h2><div class="prose center"><p>If you would like to bring home a piece of history crafted uniquely for you—</p><p>Seema welcomes personalised commissions inspired by any era, monument, or story close to your heart.</p><p>Enquire now to begin your custom artwork.</p></div><a class="btn" href="#contact">Commission Art ${arrow}</a></div></section>`;
}

function contactPage(){
  return `
  <section class="sec wall" style="padding-block:clamp(64px,8vw,120px)">
    <div class="wrap contact">
      <div style="display:grid;gap:26px;justify-items:start">
        <p class="eyebrow left">Contact</p>
        <h1 class="h1 foil shimmer">Get in touch</h1>
        <p class="tagline" style="font-size:1.4rem;max-width:26ch">Connect with the artist for suggestions, art requests or commissions.</p>
        ${orn.replace('class="orn"','class="orn" style="justify-content:flex-start"')}
        <div style="display:grid;gap:8px"><p class="eyebrow left">Connect with us on Instagram</p><a href="https://www.instagram.com/canvases_in_gold/" target="_blank" rel="noopener" style="font:500 1.5rem var(--f-display);color:var(--gold-hi);text-decoration:none">@canvases_in_gold</a></div>
      </div>
      <form class="form" id="contact-form" novalidate>
        <div class="two">
          <div class="field"><label for="cf-name">Name*</label><input id="cf-name" name="name" required autocomplete="name"></div>
          <div class="field"><label for="cf-mobile">Mobile</label><input id="cf-mobile" name="mobile" type="tel" autocomplete="tel"></div>
        </div>
        <div class="field"><label for="cf-email">Your email*</label><input id="cf-email" name="email" type="email" required autocomplete="email"></div>
        <div class="field"><label for="cf-message">Message*</label><textarea id="cf-message" name="message" required></textarea></div>
        <button class="btn" type="submit">Submit ${arrow}</button>
        <p class="note" id="cf-note" aria-live="polite" hidden></p>
      </form>
    </div>
  </section>`;
}

/* ---------- router ---------- */
const ROUTES=['home','viraasat','prakriti','videshi','bhakti','about','contact'];
let reelObs=null,qTimers=[],pendingJump=null;
function navHTML(cur,drawer){
  return NAV.map(([id,label,dv])=>`<a href="#${id}"${cur===id?' aria-current="page"':''}>${label}${drawer&&dv?`<span>${dv}</span>`:''}</a>`).join('')+`<a href="#contact" class="nav-cta"${cur==='contact'?' aria-current="page"':''}>Contact</a>`;
}
function route(){
  let h=(location.hash||'').slice(1);
  let jump=pendingJump;pendingJump=null;
  if(h==='shows'){h='about';jump='shows'}
  if(!ROUTES.includes(h)) h='home';
  GROUPS={};
  qTimers.forEach(clearInterval);qTimers=[];
  if(reelObs){reelObs.disconnect();reelObs=null}
  document.body.dataset.jewel=h;
  document.getElementById('main').innerHTML=h==='home'?homePage():h==='about'?aboutPage():h==='contact'?contactPage():collectionPage(h);
  document.getElementById('nav').innerHTML=navHTML(h);
  document.getElementById('drawer-nav').innerHTML=navHTML(h,true);
  document.title=h==='home'?'Art by Seema Sethi':`${h==='about'?'About the Artist':h==='contact'?'Contact':PAGES[h].name} · Art by Seema Sethi`;
  closeDrawer();
  initTesti();initReels();
  if(jump) requestAnimationFrame(()=>document.getElementById(jump)?.scrollIntoView());
  else window.scrollTo(0,0);
}

/* testimonials */
function initTesti(){
  document.querySelectorAll('[data-testi]').forEach(box=>{
    const slides=[...box.querySelectorAll('.q-slide')],dots=[...box.querySelectorAll('.dots button')];
    let i=0;
    const show=n=>{i=(n+slides.length)%slides.length;slides.forEach((s,k)=>s.classList.toggle('on',k===i));dots.forEach((d,k)=>d.setAttribute('aria-current',k===i))};
    box.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.q)show(i+ +b.dataset.q);if(b.dataset.qi)show(+b.dataset.qi)});
    if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
      let paused=false;box.addEventListener('mouseenter',()=>paused=true);box.addEventListener('mouseleave',()=>paused=false);
      box.addEventListener('focusin',()=>paused=true);box.addEventListener('focusout',()=>paused=false);
      qTimers.push(setInterval(()=>{if(!paused&&!document.hidden)show(i+1)},7000));
    }
  });
}
/* reels: load and play only near the viewport */
function initReels(){
  const vids=[...document.querySelectorAll('video[data-src]')];
  if(!vids.length)return;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  reelObs=new IntersectionObserver(es=>es.forEach(en=>{
    const v=en.target;
    if(en.isIntersecting){if(!v.src){v.src=v.dataset.src;v.preload='auto'} if(!reduce)v.play().catch(()=>{})}
    else v.pause();
  }),{rootMargin:'200px 0px'});
  vids.forEach(v=>{v.controls=reduce;reelObs.observe(v)});
}

/* drawer */
const drawer=document.getElementById('drawer'),menuOpen=document.getElementById('menu-open');
function closeDrawer(){drawer.hidden=true;menuOpen.setAttribute('aria-expanded','false');document.documentElement.style.overflow=''}
menuOpen.addEventListener('click',()=>{drawer.hidden=false;menuOpen.setAttribute('aria-expanded','true');document.documentElement.style.overflow='hidden';document.getElementById('menu-close').focus()});
document.getElementById('menu-close').addEventListener('click',closeDrawer);

/* lightbox */
const lb=document.getElementById('lb'),lbImg=document.getElementById('lb-img');
let lbG=null,lbI=0,lbReturn=null;
function lbShow(){const it=GROUPS[lbG][lbI];const m=IMG[it.n];lbImg.src=src(it.n);lbImg.width=m[1];lbImg.height=m[2];lbImg.alt=it.t;
  document.getElementById('lb-t').textContent=it.t;document.getElementById('lb-m').textContent=it.m;
  const many=GROUPS[lbG].length>1;document.getElementById('lb-n').textContent=many?`${lbI+1} / ${GROUPS[lbG].length}`:'';
  document.getElementById('lb-prev').hidden=!many;document.getElementById('lb-next').hidden=!many}
function lbOpen(g,i,from){lbG=g;lbI=i;lbReturn=from;lbShow();lb.hidden=false;document.documentElement.style.overflow='hidden';document.getElementById('lb-x').focus()}
function lbClose(){lb.hidden=true;document.documentElement.style.overflow='';lbImg.removeAttribute('src');lbReturn?.focus()}
const lbStep=d=>{const n=GROUPS[lbG].length;lbI=(lbI+d+n)%n;lbShow()};
document.getElementById('lb-x').addEventListener('click',lbClose);
document.getElementById('lb-prev').addEventListener('click',()=>lbStep(-1));
document.getElementById('lb-next').addEventListener('click',()=>lbStep(1));
lb.addEventListener('click',e=>{if(e.target===lb||e.target.tagName==='FIGURE')lbClose()});
let tx=null;lb.addEventListener('touchstart',e=>{tx=e.touches[0].clientX},{passive:true});
lb.addEventListener('touchend',e=>{if(tx==null)return;const dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>50&&GROUPS[lbG].length>1)lbStep(dx<0?1:-1);tx=null});
document.addEventListener('keydown',e=>{
  if(!lb.hidden){if(e.key==='Escape')lbClose();if(e.key==='ArrowRight')lbStep(1);if(e.key==='ArrowLeft')lbStep(-1);return}
  if(!drawer.hidden&&e.key==='Escape')closeDrawer();
});

/* delegated page interactions */
const main=document.getElementById('main');
const noHover=matchMedia('(hover: none)');
const syncPin=(k,on)=>main.querySelectorAll(`[data-m="${k}"]`).forEach(el=>el.classList.toggle('on',on));
main.addEventListener('click',e=>{
  const z=e.target.closest('.zoom[data-g]');if(z){lbOpen(z.dataset.g,+z.dataset.i,z);return}
  const to=e.target.closest('[data-to]');if(to){document.getElementById(to.dataset.to)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});return}
  const st=e.target.closest('[data-strip]');if(st){const s=st.closest('.strip-wrap').querySelector('.strip');s.scrollBy({left:+st.dataset.strip*s.clientWidth*.8,behavior:'smooth'});return}
  const pin=e.target.closest('a[data-ch]');
  if(pin){
    /* on touch screens the first tap on a pin shows its artwork; the second opens it */
    if(noHover.matches&&pin.classList.contains('pin')&&!pin.classList.contains('on')){
      e.preventDefault();main.querySelectorAll('.on[data-m]').forEach(x=>x.classList.remove('on'));syncPin(pin.dataset.m,true);return}
    pendingJump='ch-'+pin.dataset.ch;
  }
});
['mouseover','focusin'].forEach(t=>main.addEventListener(t,e=>{if(noHover.matches)return;const a=e.target.closest('[data-m]');if(a)syncPin(a.dataset.m,true)}));
['mouseout','focusout'].forEach(t=>main.addEventListener(t,e=>{const a=e.target.closest('[data-m]');if(a&&!noHover.matches)syncPin(a.dataset.m,false)}));
main.addEventListener('submit',e=>{
  if(e.target.id!=='contact-form')return;
  e.preventDefault();
  const f=e.target,note=document.getElementById('cf-note');
  const bad=[...f.querySelectorAll('[required]')].find(x=>!x.value.trim()||(x.type==='email'&&!/^\S+@\S+\.\S+$/.test(x.value)));
  note.hidden=false;
  if(bad){note.textContent=bad.id==='cf-email'&&bad.value.trim()?'Please enter a complete email address, like name@example.com.':`Please fill in ${bad.previousElementSibling.textContent.replace('*','')}.`;bad.focus();return}
  note.textContent='Thank you. This design preview does not send messages yet.';
});

window.addEventListener('hashchange',route);
route();
