"""Check the Pages artifact's resource prefix and public-file boundary."""
from pathlib import Path
import re

root = Path(__file__).resolve().parents[1] / 'dist/web'
files = [p for p in root.rglob('*') if p.is_file()]
assert files, 'Web export is missing'
for path in files:
    relative = path.relative_to(root)
    allowed = (
        str(relative) in {'index.html', 'metadata.json', '.nojekyll'}
        or (str(relative).startswith('_expo/static/') and path.suffix in {'.js', '.css'})
        or (str(relative).startswith('assets/') and path.suffix == '.pdf')
    )
    assert allowed, f'Unexpected public file: {relative}'
    if path.suffix in {'.js', '.html', '.json'}:
        text = path.read_text()
        assert not re.search(r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|gh[pousr]_[A-Za-z0-9]{30,}|AKIA[A-Z0-9]{16}', text), f'Possible credential in {relative}'
html = (root / 'index.html').read_text()
urls = re.findall(r'(?:src|href)="([^"]+)"', html)
assert urls, 'No resources referenced by HTML'
for url in urls:
    assert url.startswith('/ya-spartanets/'), f'Wrong resource base: {url}'
    assert (root / url.removeprefix('/ya-spartanets/')).is_file(), f'Missing resource: {url}'
print('PASS: Pages resource prefix, referenced files and public artifact allowlist; no scanned credential signatures.')
