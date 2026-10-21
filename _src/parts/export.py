# Export a standalone static site (index.html + img/ + vid/ + vercel.json) for hosting outside claude.ai.
# Usage: python3 export.py <out_dir>
import json,os,shutil,subprocess,sys
B=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT=os.path.abspath(os.path.expanduser(sys.argv[1]))
FF='/Users/ruchi/video-studio/node_modules/ffmpeg-static/ffmpeg'
P=lambda n:open(os.path.join(B,'parts',n),encoding='utf-8').read()

head=P('head.html').replace('<meta name="claude:viewport-fit-sides" content="cover">\n','')
desc='A Tribute to Our Cultural Heritage through the Glow of Tanjore'
# the artifact host adds these basics around the page; a standalone page needs them itself
reset=(':root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}'
       'body{margin:0}[hidden]{display:none!important}\n')
page=('<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
      '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
      +head+
      '<meta name="theme-color" content="#14060A">\n'
      '<link rel="icon" type="image/png" href="/favicon.png">\n'
      '<link rel="apple-touch-icon" href="/apple-touch-icon.png">\n'
      '<meta property="og:type" content="website">\n'
      '<meta property="og:title" content="Art by Seema Sethi">\n'
      f'<meta property="og:description" content="{desc}">\n'
      '<meta property="og:image" content="/og-hero.jpg">\n<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n'
      '<meta name="twitter:card" content="summary_large_image">\n'
      '<style>\n'+reset+P('style.css')+'</style>\n</head>\n<body>'
      +P('shell.html')+'<script>\n'+open(os.path.join(B,'imgmap.js')).read()+'\n\n'+P('data.js')+P('app.js')+'</script>\n</body>\n</html>\n')

os.makedirs(OUT,exist_ok=True)
open(os.path.join(OUT,'index.html'),'w',encoding='utf-8').write(page)
for d in ('img','vid'):
    shutil.copytree(os.path.join(B,d),os.path.join(OUT,d),dirs_exist_ok=True)

# old Zyro page URLs keep working by landing on the matching section
routes={'viraasat':'viraasat','prakriti':'prakriti','videshi':'videshi','bhakti':'bhakti','about-the-artist':'about','contact':'contact'}
vercel={'redirects':[{'source':f'/{a}','destination':f'/#{b}','permanent':True} for a,b in routes.items()],
        'headers':[{'source':'/(img|vid)/(.*)','headers':[{'key':'Cache-Control','value':'public, max-age=2592000'}]}]}
json.dump(vercel,open(os.path.join(OUT,'vercel.json'),'w'),indent=2)

seal=os.path.join(B,'img/w480/seema-sethi-viraasat-logo-1.webp')
run=lambda *a:subprocess.run([FF,'-hide_banner','-loglevel','error','-y',*a],check=True)
run('-i',seal,'-vf','scale=64:64','-frames:v','1',os.path.join(OUT,'favicon.png'))
run('-i',seal,'-vf','scale=180:180','-frames:v','1',os.path.join(OUT,'apple-touch-icon.png'))
# share image: a 1200x630 capture of the hero banner, kept beside the source
shutil.copy(os.path.join(B,'og-hero.jpg'),os.path.join(OUT,'og-hero.jpg'))
print('exported to',OUT)
