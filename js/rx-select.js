/* Raxon Select (Figma: Select M + Dropdown / M + Option M).
   Progressive enhancement: the native <select class="rx-select__native"> stays in the form (value, reset, no-JS fallback);
   a button + listbox are drawn on top. The listbox opens directly under the field with a 2px gap. */
(function(){
  function enhance(wrap){
    if(wrap.classList.contains('is-enhanced'))return;
    const sel=wrap.querySelector('select.rx-select__native');if(!sel)return;
    wrap.classList.add('is-enhanced');sel.tabIndex=-1;sel.setAttribute('aria-hidden','true');
    const label=document.querySelector(`label[for="${sel.id}"]`);if(label&&!label.id)label.id=sel.id+'Label';
    const btn=document.createElement('button');btn.type='button';btn.className='rx-select__button';btn.id=sel.id+'Btn';
    btn.setAttribute('aria-haspopup','listbox');btn.setAttribute('aria-expanded','false');
    const list=document.createElement('ul');list.className='rx-select__dropdown';list.setAttribute('role','listbox');list.id=sel.id+'List';list.tabIndex=-1;list.hidden=true;
    btn.setAttribute('aria-controls',list.id);
    if(label){btn.setAttribute('aria-labelledby',label.id+' '+btn.id);list.setAttribute('aria-labelledby',label.id);}
    const opts=[...sel.options].map((o,i)=>{const li=document.createElement('li');li.className='rx-option';li.setAttribute('role','option');li.id=sel.id+'Opt'+i;li.textContent=o.text;if(o.disabled)li.setAttribute('aria-disabled','true');list.appendChild(li);return li;});
    wrap.appendChild(btn);wrap.appendChild(list);
    let active=sel.selectedIndex;
    const sync=()=>{btn.textContent=sel.options[sel.selectedIndex]?.text||'';opts.forEach((li,i)=>li.setAttribute('aria-selected',i===sel.selectedIndex));};
    const setActive=i=>{active=Math.max(0,Math.min(opts.length-1,i));opts.forEach((li,j)=>li.classList.toggle('is-active',j===active));list.setAttribute('aria-activedescendant',opts[active].id);opts[active].scrollIntoView({block:'nearest'});};
    const open=()=>{list.hidden=false;wrap.classList.add('is-open');btn.setAttribute('aria-expanded','true');setActive(sel.selectedIndex);list.focus();};
    const close=(focusBtn=true)=>{list.hidden=true;wrap.classList.remove('is-open');btn.setAttribute('aria-expanded','false');if(focusBtn)btn.focus();};
    const choose=i=>{if(opts[i].getAttribute('aria-disabled')==='true')return;sel.selectedIndex=i;sel.dispatchEvent(new Event('change',{bubbles:true}));sync();close();};
    btn.addEventListener('click',()=>list.hidden?open():close());
    btn.addEventListener('keydown',e=>{if(['ArrowDown','ArrowUp','Enter',' '].includes(e.key)){e.preventDefault();open();}});
    list.addEventListener('keydown',e=>{
      if(e.key==='ArrowDown'){e.preventDefault();setActive(active+1);}
      else if(e.key==='ArrowUp'){e.preventDefault();setActive(active-1);}
      else if(e.key==='Home'){e.preventDefault();setActive(0);}
      else if(e.key==='End'){e.preventDefault();setActive(opts.length-1);}
      else if(e.key==='Enter'||e.key===' '){e.preventDefault();choose(active);}
      else if(e.key==='Escape'){e.preventDefault();close();}
      else if(e.key==='Tab'){close(false);}
    });
    opts.forEach((li,i)=>{li.addEventListener('mousemove',()=>{if(active!==i)setActive(i);});li.addEventListener('click',()=>choose(i));});
    document.addEventListener('click',e=>{if(!wrap.contains(e.target)&&!list.hidden)close(false);});
    if(label)label.addEventListener('click',e=>{e.preventDefault();btn.focus();});
    if(sel.form)sel.form.addEventListener('reset',()=>setTimeout(sync));
    sync();
  }
  window.RxSelect={enhance};
  document.querySelectorAll('.rx-select').forEach(enhance);
})();
