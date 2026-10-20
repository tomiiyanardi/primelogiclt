# Re-cuts a mascot sprite: removes leftover sheet background (e.g. between the legs),
# drops bits of neighbouring sprites and exports a 2x, soft-edged WebP.
# Usage: python scripts/refine_mascots.py public/mascots/mascot-x.png public/mascots/mascot-x.webp
import sys, numpy as np, cv2
from PIL import Image
src, dst = sys.argv[1], sys.argv[2]
a = np.asarray(Image.open(src).convert('RGBA')).astype(np.int32)
rgb = a[..., :3]; alpha0 = a[..., 3]
R, G, B = rgb[..., 0], rgb[..., 1], rgb[..., 2]
lum = (R + G + B) / 3
# background of the source sheet: very dark navy, R low and blue-shifted
bgish = (R < 10) & (G < 26) & (B < 36) & (B - R > 12)
bgish = cv2.medianBlur(bgish.astype(np.uint8) * 255, 3) > 0
base = alpha0 > 127
# only carve out solid pockets of background (e.g. between the legs), not thin edge bands
pocket = cv2.morphologyEx((bgish & base).astype(np.uint8), cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5)))
pocket = cv2.dilate(pocket, np.ones((2, 2), np.uint8)) > 0
fg = base & ~pocket
fg = fg.astype(np.uint8)
fg = cv2.morphologyEx(fg, cv2.MORPH_OPEN, np.ones((2, 2), np.uint8))
fg = cv2.morphologyEx(fg, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3)))
# keep the main body (largest component) plus big detached parts near it (music notes etc.)
n, lab, stats, _ = cv2.connectedComponentsWithStats(fg, 8)
if n > 1:
    big = 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA])
    keep = np.zeros_like(fg)
    for i in range(1, n):
        if i == big or stats[i, cv2.CC_STAT_AREA] > max(40, stats[big, cv2.CC_STAT_AREA] * 0.01):
            # drop components touching the bottom/top border (bits of neighbouring sprites)
            y, h = stats[i, cv2.CC_STAT_TOP], stats[i, cv2.CC_STAT_HEIGHT]
            if i != big and (y + h >= fg.shape[0] - 1 or y <= 0):
                continue
            keep[lab == i] = 1
    fg = keep
# fill tiny holes inside the body (noise on the black hoodie)
inv = (1 - fg).astype(np.uint8)
n, lab, stats, _ = cv2.connectedComponentsWithStats(inv, 4)
for i in range(1, n):
    x, y, w, h, area = stats[i]
    touches = x == 0 or y == 0 or x + w >= fg.shape[1] or y + h >= fg.shape[0]
    if not touches and (area < 25 or lum[lab == i].mean() > 60):
        fg[lab == i] = 1
# soft edge: upsample 2x, smooth, keep crisp
scale = 2
H, W = fg.shape
m = cv2.resize(fg.astype(np.float32), (W * scale, H * scale), interpolation=cv2.INTER_LINEAR)
m = cv2.GaussianBlur(m, (0, 0), 0.9)
m = np.clip((m - 0.5) * 2.2 + 0.5, 0, 1)
img = cv2.resize(rgb.astype(np.uint8), (W * scale, H * scale), interpolation=cv2.INTER_LANCZOS4)
# decontaminate edge colour: pull semi-transparent pixels away from the navy bg
out = np.dstack([img, (m * 255).astype(np.uint8)])
ys, xs = np.where(m > 0.02)
pad = 4
y1, y2 = max(ys.min() - pad, 0), min(ys.max() + pad, m.shape[0])
x1, x2 = max(xs.min() - pad, 0), min(xs.max() + pad, m.shape[1])
Image.fromarray(out[y1:y2, x1:x2]).save(dst, quality=90, method=6)
