import urllib.request, urllib.parse
req = urllib.request.Request(f'https://html.duckduckgo.com/html/?q={urllib.parse.quote("microsoft fabric logo svg")}', headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    with open('duck_results.txt', 'w', encoding='utf-8') as f:
        f.write(html)
except Exception as e:
    print('Failed', e)
