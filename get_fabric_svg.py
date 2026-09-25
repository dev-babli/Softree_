import urllib.request, urllib.parse, re
req = urllib.request.Request(f'https://html.duckduckgo.com/html/?q={urllib.parse.quote("microsoft fabric svg github raw")}', headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    for match in re.findall(r'href="([^"]+raw\.githubusercontent[^"]+\.svg)"', html):
        print("FOUND URL:", match)
except Exception as e:
    print('Failed', e)
