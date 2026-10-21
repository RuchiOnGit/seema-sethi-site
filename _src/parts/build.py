# Assemble the artifact page (and a local preview with a publish-like skeleton) from parts/.
import os
B=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P=lambda n:open(os.path.join(B,'parts',n),encoding='utf-8').read()
page=(P('head.html')+'<style>\n'+P('style.css')+'</style>'+P('shell.html')+'<script>\n'
      +open(os.path.join(B,'imgmap.js')).read()+'\n\n'+P('data.js')+P('app.js')+'</script>\n')
open(os.path.join(B,'seema-sethi.html'),'w',encoding='utf-8').write(page)
sk=('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">'
    '<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom)}body{margin:0;font:14px system-ui}img{max-width:100%}[hidden]{display:none!important}</style></head><body>\n')
open(os.path.join(B,'preview.html'),'w',encoding='utf-8').write(sk+page+'</body></html>')
print(len(page))
