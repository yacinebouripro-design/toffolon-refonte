"""Recopie les blocs communs (partials/) dans toutes les pages du site.

Chaque page contient des marqueurs <!-- @nom --> ... <!-- /@nom -->.
Usage : python3 tools/sync.py
"""
import pathlib, re

root = pathlib.Path(__file__).resolve().parent.parent
parts = {p.stem: p.read_text().strip() for p in (root / 'partials').glob('*.html')}
for page in sorted([*root.glob('**/index.html'), root / '404.html']):
    if 'partials' in page.parts:
        continue
    html = page.read_text()
    for name, block in parts.items():
        html = re.sub(rf'<!-- @{name} -->.*?<!-- /@{name} -->', lambda m: f'<!-- @{name} -->\n{block}\n<!-- /@{name} -->', html, flags=re.S)
    page.write_text(html)
    print('ok', page.relative_to(root))
