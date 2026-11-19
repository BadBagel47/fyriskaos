"""Fetch free (CC0) models and OpenStreetMap data into the repo.

Runs in GitHub Actions (see .github/workflows/fetch-assets.yml), because the
cloud agent environment cannot reach Google Drive, Kenney or Overpass.
Only glTF/GLB files (and licence texts) whose names match the filters are
kept, so the repo stays small. A listing of every pack is written too, so
the next step can choose models without fetching again.
"""

import io
import json
import os
import re
import sys
import time
import urllib.request
import zipfile
from datetime import date

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets", "cc0")
OSM_DIR = os.path.join(ROOT, "data", "osm")
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36"
MODEL_EXT = (".gltf", ".glb", ".bin", ".png", ".jpg", ".jpeg")
LICENCE = re.compile(r"licen[cs]e|readme", re.I)

# Quaternius packs (CC0, https://quaternius.com). Folder links are taken from
# each pack's page; "include" picks the models we want by name.
QUATERNIUS = {
    "stylizedtree": ("1GlrFUFcNj6KIuc4-QpVEiRcXVUzSClP2", r"."),
    "ultimatenature": ("1-Kl0L_Jg8awbh0S5T-z3zxh4mVlnxTpa", r"tree|birch|bush|willow|maple|plant|grass|flower"),
    "simplenature": ("18hb-5HGCLL9BS8jmxkE4h31wmHGeqfts", r"tree|bush"),
    "backgroundposedhumans": ("18dWyZlA53euzsc1WobITqFYLcT5sFULz", r"."),
    "animatedmen": ("17LibivOaUidsQhSkcxP3YYvDr0n7wIwu", r"."),
    "animatedwomen": ("1c13R--fMqdR6r2MRlcKKsbPky0__T-yJ", r"."),
    "cars": ("1fKlbDry77iY8KlEoxzUxIAZQL_XhzWlA", r"."),
}

# Kenney packs (CC0, https://kenney.nl). The zip link is read from the pack page.
KENNEY = {
    "nature-kit": r"tree|bush|plant|grass|flower|hedge",
    "car-kit": r".",
    "mini-characters": r".",
    "city-kit-suburban": r"tree|fence|planter|hedge",
}

# Central Uppsala and Luthagen (south, west, north, east).
OSM_BBOX = (59.845, 17.605, 59.875, 17.665)
OVERPASS = ["https://overpass-api.de/api/interpreter", "https://overpass.kumi.systems/api/interpreter", "https://maps.mail.ru/osm/tools/overpass/api/interpreter"]

report = []


def log(msg):
    print(msg, flush=True)
    report.append(msg)


def get(url, data=None, tries=3):
    for k in range(tries):
        try:
            req = urllib.request.Request(url, data=data, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=300) as r:
                return r.read()
        except Exception as e:  # noqa: BLE001 - report and retry
            log(f"  try {k + 1} failed for {url}: {e}")
            time.sleep(10 * (k + 1))
    return None


def fetch_quaternius():
    try:
        import gdown
    except ImportError:
        log("gdown missing")
        return
    for pack, (folder, include) in QUATERNIUS.items():
        url = f"https://drive.google.com/drive/folders/{folder}"
        dest = os.path.join(OUT, "quaternius", pack)
        log(f"Quaternius {pack}: {url}")
        try:
            files = gdown.download_folder(url, output=dest, skip_download=True, quiet=True, remaining_ok=True)
        except Exception as e:  # noqa: BLE001
            log(f"  listing failed: {e}")
            continue
        if not files:
            log("  empty listing")
            continue
        os.makedirs(os.path.join(OUT, "quaternius"), exist_ok=True)
        with open(os.path.join(OUT, "quaternius", f"{pack}.listing.txt"), "w") as f:
            for it in files:
                f.write(it.path + "\n")
        rx = re.compile(include, re.I)
        picked = []
        for it in files:
            low = it.path.lower()
            base = os.path.basename(low)
            if LICENCE.search(base) and base.endswith((".txt", ".md")):
                picked.append(it)
            elif ("gltf" in low or low.endswith(".glb")) and low.endswith(MODEL_EXT) and rx.search(base.replace(".", " ")):
                picked.append(it)
        log(f"  {len(files)} files listed, {len(picked)} picked")
        ok = 0
        for it in picked:
            try:
                os.makedirs(os.path.dirname(it.local_path), exist_ok=True)
                if gdown.download(id=it.id, output=it.local_path, quiet=True):
                    ok += 1
            except Exception as e:  # noqa: BLE001
                log(f"  download failed {it.path}: {e}")
        log(f"  {ok} downloaded")


def fetch_kenney():
    for pack, include in KENNEY.items():
        page_url = f"https://kenney.nl/assets/{pack}"
        log(f"Kenney {pack}: {page_url}")
        page = get(page_url)
        if not page:
            continue
        m = re.search(rb'https://kenney\.nl/media/pages/assets/[^"\']+?\.zip', page)
        if not m:
            log("  no zip link on the page")
            continue
        blob = get(m.group(0).decode())
        if not blob:
            continue
        dest = os.path.join(OUT, "kenney", pack)
        rx = re.compile(include, re.I)
        z = zipfile.ZipFile(io.BytesIO(blob))
        names = z.namelist()
        os.makedirs(os.path.join(OUT, "kenney"), exist_ok=True)
        with open(os.path.join(OUT, "kenney", f"{pack}.listing.txt"), "w") as f:
            f.write("\n".join(names) + "\n")
        ok = 0
        for n in names:
            low = n.lower()
            base = os.path.basename(low)
            keep = (LICENCE.search(base) and base.endswith(".txt")) or ("glb" in low and low.endswith((".glb", ".png")) and rx.search(base.replace(".", " ").replace("_", " ").replace("-", " ")))
            if not keep or n.endswith("/"):
                continue
            path = os.path.join(dest, base if base.endswith(".txt") else n)
            os.makedirs(os.path.dirname(path), exist_ok=True)
            with open(path, "wb") as f:
                f.write(z.read(n))
            ok += 1
        log(f"  {len(names)} files in zip, {ok} kept")


def fetch_osm():
    s, w, n, e = OSM_BBOX
    q = f"""[out:json][timeout:240];
(
  way["highway"]({s},{w},{n},{e});
  way["building"]({s},{w},{n},{e});
  way["waterway"]({s},{w},{n},{e});
  way["natural"]({s},{w},{n},{e});
  way["landuse"]({s},{w},{n},{e});
  way["leisure"]({s},{w},{n},{e});
  relation["natural"="water"]({s},{w},{n},{e});
  relation["building"]({s},{w},{n},{e});
  node["natural"="tree"]({s},{w},{n},{e});
  node["highway"="street_lamp"]({s},{w},{n},{e});
  node["amenity"]({s},{w},{n},{e});
);
out geom;"""
    for url in OVERPASS:
        log(f"OSM: {url}")
        blob = get(url, data=("data=" + urllib.parse.quote(q)).encode())
        if not blob:
            continue
        try:
            data = json.loads(blob)
        except ValueError:
            log("  not JSON")
            continue
        os.makedirs(OSM_DIR, exist_ok=True)
        with open(os.path.join(OSM_DIR, "uppsala-centrum.json"), "w") as f:
            json.dump(data, f, separators=(",", ":"))
        log(f"  {len(data.get('elements', []))} elements, {len(blob) // 1024} kB")
        return
    log("OSM: all servers failed")


if __name__ == "__main__":
    import urllib.parse  # noqa: F401  (used in fetch_osm)

    what = sys.argv[1:] or ["quaternius", "kenney", "osm"]
    os.makedirs(OUT, exist_ok=True)
    for name, fn in (("quaternius", fetch_quaternius), ("kenney", fetch_kenney), ("osm", fetch_osm)):
        if name in what:
            try:
                fn()
            except Exception as e:  # noqa: BLE001 - keep going with the other sources
                log(f"{name} failed: {e!r}")
    with open(os.path.join(OUT, "FETCH-REPORT.txt"), "w") as f:
        f.write(f"Fetched {date.today().isoformat()}\n" + "\n".join(report) + "\n")
