"""Typographie française dans le texte visible des pages : espace insécable avant ? ! : ; » et après «.

Ne touche ni aux balises, ni aux attributs, ni aux scripts et styles.
Usage : python3 tools/typo.py
"""
import pathlib, re

root = pathlib.Path(__file__).resolve().parent.parent
SKIP = re.compile(r'(<script\b.*?</script>|<style\b.*?</style>|<[^>]+>)', re.S)


def fix(text):
    text = re.sub(r'(?:[ \u00a0]|&nbsp;)+([?!:;»])', r'&nbsp;\1', text)
    return re.sub(r'«(?:[ \u00a0]|&nbsp;)*', '«&nbsp;', text)


for page in sorted([*root.glob('**/index.html'), root / '404.html', *root.glob('partials/*.html')]):
    html = page.read_text()
    parts = SKIP.split(html)
    out = ''.join(p if SKIP.fullmatch(p) else fix(p) for p in parts)
    if out != html:
        page.write_text(out)
        print('typo', page.relative_to(root))
