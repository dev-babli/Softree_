import urllib.request, json
try:
    req = urllib.request.Request("https://api.github.com/repos/astrzala/FabricToolset/contents/icons/Fabric.svg", headers={"User-Agent": "Mozilla/5.0"})
    res = urllib.request.urlopen(req).read().decode("utf-8")
    print(json.loads(res)["download_url"])
except Exception as e:
    print("Error:", e)
