from pathlib import Path
from io import BytesIO
from PIL import Image
import base64, json

root=Path('dist/web')
root.mkdir(parents=True,exist_ok=True)
source=Path('assets/branding/pwa-logo.webp.base64')
logo=Image.open(BytesIO(base64.b64decode(source.read_text().strip()))).convert('RGB')
# The full black square is part of the supplied logo; do not crop or recolour.
for size,filename in ((32,'favicon.png'),(180,'apple-touch-icon.png'),(192,'icon-192.png'),(512,'icon-512.png')):
    logo.resize((size,size),Image.Resampling.LANCZOS).save(root/filename,optimize=True)
manifest={
    'id':'/ya-spartanets/',
    'name':'Я Спартанец — Московские Спартанцы',
    'short_name':'Я Спартанец',
    'description':'Приложение команды Московские Спартанцы',
    'start_url':'/ya-spartanets/',
    'scope':'/ya-spartanets/',
    'display':'standalone',
    'background_color':'#000000',
    'theme_color':'#000000',
    'icons':[
        {'src':'./icon-192.png','sizes':'192x192','type':'image/png','purpose':'any'},
        {'src':'./icon-512.png','sizes':'512x512','type':'image/png','purpose':'any'}
    ]
}
(root/'manifest.webmanifest').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
index=root/'index.html'
html=index.read_text(encoding='utf-8')
head='''<link rel="manifest" href="/ya-spartanets/manifest.webmanifest?v=20261029">
<link rel="icon" type="image/png" sizes="32x32" href="/ya-spartanets/favicon.png?v=20261029">
<link rel="apple-touch-icon" sizes="180x180" href="/ya-spartanets/apple-touch-icon.png?v=20261029">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-title" content="Я Спартанец">
<meta name="theme-color" content="#000000">'''
if '</head>' not in html:
    raise RuntimeError('Expo HTML has no head element')
html=html.replace('</head>',head+'\n</head>')
index.write_text(html,encoding='utf-8')
print('PWA icons and manifest published using the supplied Spartans logo')
