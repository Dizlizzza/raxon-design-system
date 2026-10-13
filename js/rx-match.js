/* Raxon — Match (connections between blocks). Behaviour for css/rx/match.css.
   Pairs are made by click/tap (item → item), by drag and drop with a mouse or pen, or with Enter/Space;
   Delete removes a pair, Esc cancels a pick. On screens ≤ 700px the definitions open in a sheet under the term.
   Each term keeps a hidden <select class="rx-match__native"> (values = definition letters): it is the source of truth,
   so forms and checks read it like a normal select. A check sets .is-correct / .is-wrong on that select. */
(function(){
  const NS='http://www.w3.org/2000/svg';
  const narrow=()=>window.matchMedia('(max-width:700px)').matches;
  document.querySelectorAll('.rx-match').forEach(box=>{
    const terms=[...box.querySelectorAll('.rx-match__terms .q, .rx-match__terms [data-rx-match-term]')];
    const defs=[...box.querySelectorAll('.rx-match__defs li')];
    if(!terms.length||!defs.length)return;
    
    const svg=document.createElementNS(NS,'svg');svg.classList.add('rx-match__lines');svg.setAttribute('aria-hidden','true');box.prepend(svg);
    const L=li=>li.dataset.letter;
    defs.forEach(li=>{
      const b=li.querySelector('b');const letter=b.textContent.replace(/[^a-z]/gi,'').toLowerCase();
      li.dataset.letter=letter;li.dataset.text=li.textContent.replace(/^\s*[a-z]\)\s*/i,'').trim();li.tabIndex=0;li.setAttribute('role','button');
      li.classList.add('rx-match__def');
      const n=document.createElement('span');n.className='rx-match__num';li.appendChild(n);
    });
    terms.forEach(q=>{
      const sel=q.querySelector('select');sel.tabIndex=-1;sel.classList.add('rx-match__native');
      q.tabIndex=0;q.setAttribute('role','button');q.classList.add('rx-match__term');
      const slot=document.createElement('span');slot.className='rx-match__slot';
      slot.innerHTML='<span class="rx-match__letter"></span><button type="button" class="rx-match__remove" aria-label="Убрать пару">×</button>';
      sel.after(slot);const tx=document.createElement('span');tx.className='rx-match__text';slot.after(tx);
      slot.querySelector('.rx-match__remove').addEventListener('click',e=>{e.stopPropagation();e.preventDefault();set(q,'');q.focus();});
    });
    let picked=null; // {side:'t'|'d', el}
    let last=null,hover=null; // last made pair (blue), hovered item
    const name=q=>q.querySelector('span').textContent;
    const num=q=>name(q).split('.')[0];
    const termOf=letter=>terms.find(q=>q.querySelector('select').value===letter);
    function set(q,letter){
      const sel=q.querySelector('select');
      if(letter){const other=termOf(letter);if(other&&other!==q){other.querySelector('select').value='';fire(other.querySelector('select'));}}
      sel.value=letter;fire(sel);last=letter?q:(last===q?null:last);
      q.classList.remove('ok','no','is-correct','is-wrong');const fb=q.querySelector('.fb');if(fb)fb.textContent='';
      q.querySelectorAll('.is-correct,.is-wrong').forEach(c=>c.classList.remove('is-correct','is-wrong'));
      render();
    }
    function fire(sel){sel.dispatchEvent(new Event('change',{bubbles:true}));}
    function pick(side,el){
      if(picked&&picked.el===el){picked=null;render();return;}
      if(picked&&picked.side!==side){
        const q=side==='t'?el:picked.el,li=side==='d'?el:picked.el;
        const same=q.querySelector('select').value===L(li);
        picked=null;set(q,same?'':L(li));
        if(narrow()&&side==='d')q.scrollIntoView({block:'center',behavior:'smooth'});
        return;
      }
      picked={side,el};render();
      if(narrow()&&side==='t')openSheet(el);
    }
    const res=q=>q.classList.contains('is-correct')?' is-correct':q.classList.contains('is-wrong')?' is-wrong':'';
    function render(){
      const used={};
      terms.forEach(q=>{
        const v=q.querySelector('select').value,li=defs.find(d=>L(d)===v);
        q.classList.toggle('is-paired',!!v);const sl=q.querySelector('select');q.classList.toggle('is-correct',sl.classList.contains('is-correct'));q.classList.toggle('is-wrong',sl.classList.contains('is-wrong'));
        q.querySelector('.rx-match__letter').textContent=v||'';
        q.querySelector('.rx-match__text').textContent=li?li.dataset.text:'';
        if(v)used[v]=num(q);
      });
      defs.forEach(li=>{li.classList.toggle('is-used',!!used[L(li)]);li.querySelector('.rx-match__num').textContent=used[L(li)]||'';});
      [...terms,...defs].forEach(el=>el.classList.toggle('is-picked',!!picked&&picked.el===el));
      box.classList.toggle('has-pick',!!picked);
      box.dataset.pick=picked?picked.side:'';
      draw();
    }
    function anchor(el,side){const r=el.getBoundingClientRect(),b=box.getBoundingClientRect();
      return side==='t'?[r.right-b.left,r.top+r.height/2-b.top]:[r.left-b.left,r.top+r.height/2-b.top];}
    function curve(a,c){const dx=Math.max(24,(c[0]-a[0])/2);return `M${a[0]},${a[1]} C${a[0]+dx},${a[1]} ${c[0]-dx},${c[1]} ${c[0]},${c[1]}`;}
    let temp=null;
    function draw(){
      svg.innerHTML='';
      const b=box.getBoundingClientRect();svg.setAttribute('width',b.width);svg.setAttribute('height',b.height);
      if(narrow())return;
      const isAct=q=>q===last||(hover&&(hover===q||hover.dataset.letter===q.querySelector('select').value));
      [...terms].sort((x,y)=>isAct(x)-isAct(y)).forEach(q=>{const v=q.querySelector('select').value,li=defs.find(d=>L(d)===v);if(!li)return;
        const a=anchor(q,'t'),c=anchor(li,'d');
        const p=document.createElementNS(NS,'path');p.setAttribute('d',curve(a,c));
        const hov=!!hover&&(hover===q||hover===li);
        const act=((q===last||hov)&&!res(q)?' is-active':'')+(hov?' is-hover':'');
        p.setAttribute('class','rx-match__line'+res(q)+act);svg.appendChild(p);
        const hit=document.createElementNS(NS,'path');hit.setAttribute('d',p.getAttribute('d'));hit.setAttribute('class','rx-match__hit');hit._term=q;svg.appendChild(hit);
        [a,c].forEach(pt=>{const d=document.createElementNS(NS,'circle');d.setAttribute('cx',pt[0]);d.setAttribute('cy',pt[1]);d.setAttribute('r',3.5);d.setAttribute('class','rx-match__dot'+res(q)+act);svg.appendChild(d);});
      });
      const hp=hover&&(terms.includes(hover)?hover:termOf(L(hover)));
      [...terms,...defs].forEach(el=>el.classList.toggle('is-linked',!!hp&&(el===hp||L(el)===hp.querySelector('select').value)&&!!hp.querySelector('select').value));
      if(temp){const p=document.createElementNS(NS,'path');p.setAttribute('d',curve(temp[0],temp[1]));p.setAttribute('class','rx-match__line rx-match__line--temp');svg.appendChild(p);}
    }
    /* hover: highlight that pair's link */
    /* any hover (a card or the link itself) drops the highlight of the last pair */
    const hoverOn=el=>{if(hover===el)return;hover=el;last=null;draw();};
    const hoverOff=el=>{if(hover===el){hover=null;draw();}};
    [...terms,...defs].forEach(el=>{el.addEventListener('mouseenter',()=>hoverOn(el));el.addEventListener('mouseleave',()=>hoverOff(el));});
    svg.addEventListener('pointerover',e=>{if(e.target._term&&!drag)hoverOn(e.target._term);});
    svg.addEventListener('pointerout',e=>{const t=e.target._term;if(!t)return;const to=e.relatedTarget;if(to&&(to._term===t||to===t))return;hoverOff(t);});
    /* click / keyboard */
    terms.forEach(q=>{
      q.addEventListener('click',e=>{if(e.target.closest('.rx-match__remove'))return;e.preventDefault();if(dragJustEnded)return;pick('t',q);});
      q.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick('t',q);}
        if((e.key==='Delete'||e.key==='Backspace')&&q.querySelector('select').value){e.preventDefault();set(q,'');}});
    });
    defs.forEach(li=>{
      li.addEventListener('click',()=>{if(dragJustEnded)return;pick('d',li);});
      li.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick('d',li);}});
    });
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&picked){picked=null;render();closeSheet();}});
    /* drag with a mouse or pen (touch uses taps, so the page still scrolls) */
    let drag=null,dragJustEnded=false;
    const startDrag=(side,el)=>e=>{
      if(e.pointerType==='touch'||e.button!==0||narrow()||e.target.closest('.rx-match__remove'))return;
      drag={side,el,x:e.clientX,y:e.clientY,on:false};
    };
    terms.forEach(q=>q.addEventListener('pointerdown',startDrag('t',q)));
    defs.forEach(li=>li.addEventListener('pointerdown',startDrag('d',li)));
    window.addEventListener('pointermove',e=>{
      if(!drag)return;
      if(!drag.on){if(Math.hypot(e.clientX-drag.x,e.clientY-drag.y)<6)return;drag.on=true;picked={side:drag.side,el:drag.el};box.classList.add('is-dragging');render();}
      e.preventDefault();
      const b=box.getBoundingClientRect(),pt=[e.clientX-b.left,e.clientY-b.top];
      temp=drag.side==='t'?[anchor(drag.el,'t'),pt]:[pt,anchor(drag.el,'d')];
      const over=document.elementFromPoint(e.clientX,e.clientY);
      const tgt=over&&(drag.side==='t'?over.closest('.rx-match__def'):over.closest('.rx-match__term'));
      [...terms,...defs].forEach(x=>x.classList.toggle('is-over',x===tgt&&box.contains(tgt)));
      draw();
    });
    window.addEventListener('pointerup',e=>{
      if(!drag)return;const d=drag;drag=null;temp=null;box.classList.remove('is-dragging');
      [...terms,...defs].forEach(x=>x.classList.remove('is-over'));
      if(!d.on)return;
      dragJustEnded=true;setTimeout(()=>dragJustEnded=false,0);
      const over=document.elementFromPoint(e.clientX,e.clientY);
      const tgt=over&&(d.side==='t'?over.closest('.rx-match__def'):over.closest('.rx-match__term'));
      picked=null;
      if(tgt&&box.contains(tgt)){const q=d.side==='t'?d.el:tgt,li=d.side==='d'?d.el:tgt;set(q,L(li));}
      else render();
    });
    /* phone: a sheet with the definitions under the picked term */
    let sheet=null;
    function openSheet(q){
      closeSheet();
      sheet=document.createElement('div');sheet.className='rx-match__sheet';sheet.setAttribute('role','listbox');
      sheet.setAttribute('aria-label',name(q));
      const cur=q.querySelector('select').value;
      defs.forEach(li=>{const o=document.createElement('button');o.type='button';o.className='rx-match__option'+(L(li)===cur?' is-cur':'')+(li.classList.contains('is-used')&&L(li)!==cur?' is-used':'');
        o.innerHTML=`<b>${L(li)})</b> <span>${li.dataset.text}</span>`+(li.classList.contains('is-used')&&L(li)!==cur?`<i>${li.querySelector('.rx-match__num').textContent}</i>`:'');
        o.addEventListener('click',e=>{e.stopPropagation();picked=null;set(q,L(li)===cur?'':L(li));closeSheet();});sheet.appendChild(o);});
      q.after(sheet);
    }
    function closeSheet(){if(sheet){sheet.remove();sheet=null;}}
    document.addEventListener('click',e=>{if(sheet&&!e.target.closest('.rx-match__sheet')&&!e.target.closest('.rx-match__term')){closeSheet();if(picked){picked=null;render();}}});
    /* keep in sync with “Очистить”, “Начать заново” and the check buttons */
    document.addEventListener('change',e=>{if(e.target.matches&&!e.target.matches('.rx-match__native'))return;setTimeout(render);});
    document.addEventListener('click',()=>setTimeout(()=>{if(!sheet)render();}),true);
    window.addEventListener('resize',()=>{if(!narrow())closeSheet();draw();});
    const det=box.closest('details');if(det)det.addEventListener('toggle',()=>{closeSheet();draw();});
    if(document.fonts&&document.fonts.ready)document.fonts.ready.then(draw);
    window.addEventListener('load',draw);
    render();
  });
})();
