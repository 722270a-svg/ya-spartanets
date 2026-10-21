"""Compare the course data to the source PDF. Requires Poppler's pdftotext."""
import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sessions = json.loads((ROOT / 'src/data/sessions.json').read_text())
text = subprocess.check_output(
    ['pdftotext', '-layout', str(ROOT / 'assets/American_Football_8_Weeks.pdf'), '-'],
    text=True,
)
pages = text.split('\f')
assert [session['id'] for session in sessions] == list(range(1, 17))
for session in sessions:
    # The 16 lesson plans occupy pages 4–19 of the original PDF.
    page = pages[session['id'] + 2]
    assert f"Занятие {session['id']} {session['title']}\n" in page
    assert f"Неделя {session['week']} • 90 минут" in page
    assert session['week'] == (session['id'] + 1) // 2
    assert f"Задача. {session['objective']}\n" in page
    codes = list(dict.fromkeys(re.findall(r'\[([A-Z]\d+)\]', page)))
    assert session['exerciseCodes'] == codes, f"Exercise mismatch: lesson {session['id']}"
print('PASS: all 16 sessions match source PDF pages 4–19 (titles, weeks, objectives, exercise codes).')
