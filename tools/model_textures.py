"""Turn the tree pictures copied by tools/convert_models.mjs into small WebP files (D-048)."""

import os

from PIL import Image

D = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "models", "tex")
for name, size in [("leafA.png", 512), ("leafB.png", 512), ("barkA.jpg", 256), ("barkB.png", 256)]:
    src = os.path.join(D, name)
    if not os.path.exists(src):
        continue
    im = Image.open(src).resize((size, size), Image.LANCZOS)
    im.save(os.path.join(D, name.split(".")[0] + ".webp"), "WEBP", quality=82, method=6)
    os.remove(src)
