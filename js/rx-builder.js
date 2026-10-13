/* Raxon — Sentence Builder. Behaviour for css/rx/builder.css.
   Tiles are words or chunks. Tap (or press Enter on) a tile in the pool to add it to the answer line; tap a word in the answer to send it back.
   The hidden <input class="rx-builder__value"> keeps the sentence as text (words joined with spaces):
   it is the source of truth, so checks, “clear” and “reset” work with it like with a normal text field. */
(function(){
  document.querySelectorAll('.rx-builder').forEach(box=>{
    const pool=box.querySelector('.rx-builder__pool'),ans=box.querySelector('.rx-builder__answer'),val=box.querySelector('.rx-builder__value');
    const tiles=[...pool.querySelectorAll('.rx-builder__tile')];
    const txt=i=>tiles[i].textContent.trim();
    let order=[];
    /* tiles can be single words or chunks of several words: match the longest unused tile at each position */
    const parse=v=>{const used=new Set(),out=[];let rest=(v||'').trim().replace(/\s+/g,' ');
      while(rest){let best=-1;tiles.forEach((t,k)=>{const w=txt(k);if(used.has(k)||!rest.startsWith(w))return;if(rest.length>w.length&&rest[w.length]!==' ')return;if(best<0||w.length>txt(best).length)best=k;});
        if(best<0)break;used.add(best);out.push(best);rest=rest.slice(txt(best).length).trim();}
      return out;};
    if(!ans.dataset.placeholder)ans.dataset.placeholder='Tap the words in the right order';
    function render(){
      tiles.forEach((t,i)=>{const on=order.includes(i);t.classList.toggle('is-used',on);t.disabled=on;t.setAttribute('aria-hidden',on);});
      ans.replaceChildren(...order.map(i=>{const b=document.createElement('button');b.type='button';b.className='rx-builder__tile rx-builder__tile--placed';
        b.textContent=txt(i);b.setAttribute('aria-label',txt(i)+' — убрать');b.addEventListener('click',()=>{order=order.filter(x=>x!==i);commit();tiles[i].focus();});return b;}));
    }
    function commit(){
      val.value=order.map(txt).join(' ');
      const q=box.closest('.q');if(q){q.classList.remove('ok','no');const fb=q.querySelector('.fb');if(fb)fb.textContent='';}
      val.dispatchEvent(new Event('input',{bubbles:true}));val.dispatchEvent(new Event('change',{bubbles:true}));
      render();
    }
    tiles.forEach((t,i)=>t.addEventListener('click',()=>{if(order.includes(i))return;order.push(i);commit();}));
    const sync=()=>{const v=order.map(txt).join(' ');if(v!==val.value){order=parse(val.value);render();}};
    val.addEventListener('change',sync);val.addEventListener('input',sync);
    document.addEventListener('click',()=>setTimeout(sync),true);
    order=parse(val.value);render();
  });
})();
