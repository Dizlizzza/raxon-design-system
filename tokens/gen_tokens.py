"""Generate css/tokens.css from the Raxon Figma variables export (fig/tokens.json).
Names mirror Figma: color/bg/surface -> --color-bg-surface, spacing/m -> --spacing-m, radius/2xl -> --radius-2xl,
text style Heading/M -> --text-heading-m (font shorthand) + .rx-text-heading-m, effect Elevation/Card -> --elevation-card."""
import json,sys
d=json.load(open(sys.argv[1]))
C=d['collections']
def cssname(n):return '--'+n.replace('/','-')
prim=C['Primitives']['vars']
def resolve(val,mode):
    while isinstance(val,dict):
        val=prim[val['alias']]['Value']
    return val
def unit(n,v):return v if isinstance(v,str) else (f'{v}px' if not n.startswith('color') else v)
out=['/* Raxon Design System tokens — generated from Figma (Raxon Design System, Variables). Do not edit by hand:',' * run tools/gen_tokens.py after changing variables in Figma. */',':root{']
out.append('  /* Primitives */')
for n,v in prim.items():out.append(f'  {cssname("p/"+n)}:{unit(n,v["Value"])};')
def alias_or(val,n):
    if isinstance(val,dict):return f'var({cssname("p/"+val["alias"])})'
    return unit(n,val)
out.append('  /* Spacing */')
for n,v in C['Spacing']['vars'].items():out.append(f'  {cssname(n)}:{alias_or(v["Value"],n)};')
out.append('  /* Radius */')
for n,v in C['Radius']['vars'].items():out.append(f'  {cssname(n)}:{alias_or(v["Value"],n)};')
out.append('  /* Color — Light */')
for n,v in C['Color']['vars'].items():out.append(f'  {cssname(n)}:{alias_or(v["Light"],n)};')
out.append('  /* Typography */')
out.append('  --font-display:"Unbounded","Onest",system-ui,sans-serif;')
out.append('  --font-body:"Onest",system-ui,-apple-system,"Segoe UI",sans-serif;')
out.append('  --font-mono:"JetBrains Mono",ui-monospace,Menlo,monospace;')
for name,fam,size,lh,ls,w,case in d['text']:
    k=name.lower().replace('/','-')
    out.append(f'  --text-{k}:{w} {size}px/{lh} var(--font-{fam});')
    if ls:out.append(f'  --text-{k}-tracking:{ls}em;')
out.append('  /* Effects */')
for name,val in d['effects']:out.append(f'  --{name.lower().replace("/","-")}:{val};')
out.append('  color-scheme:light;')
out.append('}')
dark=[f'  {cssname(n)}:{alias_or(v["Dark"],n)};' for n,v in C['Color']['vars'].items()]
dark.append('  color-scheme:dark;')
out.append('/* Color — Dark (system preference, unless the page forces light) */')
out.append('@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){'); out+=dark; out.append('}}')
out.append(':root[data-theme="dark"]{'); out+=dark; out.append('}')
out.append('/* Text style utilities (Figma text styles) */')
for name,fam,size,lh,ls,w,case in d['text']:
    k=name.lower().replace('/','-')
    extra=(f'letter-spacing:{ls}em;' if ls else '')+(f'text-transform:{case};' if case else '')
    out.append(f'.rx-text-{k}{{font:var(--text-{k});{extra}}}')
open(sys.argv[2],'w').write('\n'.join(out)+'\n')
print(len(out),'lines')
