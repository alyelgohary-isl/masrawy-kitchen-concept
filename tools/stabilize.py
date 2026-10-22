# Usage: python3 tools/stabilize.py public/frames/<clip> [webp quality]  (needs numpy + pillow)
# Remove high-frequency camera shake from a frame sequence: measure the global translation path
# (phase correlation on a band of the frame), smooth it, shift every frame onto the smooth path
# with a slight zoom so no edge shows. Writes in place (originals are in git).
import sys, glob, os, numpy as np
from PIL import Image
sys.path.insert(0, os.path.dirname(__file__))
d, q = sys.argv[1], int(sys.argv[2]) if len(sys.argv) > 2 else 62
fs = sorted(glob.glob(d + "/*.webp"))
def load(f, w=480):
    im = Image.open(f).convert("L"); h = int(im.height * w / im.width)
    a = np.asarray(im.resize((w, h)), dtype=np.float32); a = a[int(h*0.55):]; a -= a.mean()
    return a * np.outer(np.hanning(a.shape[0]), np.hanning(a.shape[1])), im.width / w
def shift(a, b):
    F = np.fft.fft2(a) * np.conj(np.fft.fft2(b)); F /= np.abs(F) + 1e-9
    r = np.fft.ifft2(F).real; y, x = np.unravel_index(np.argmax(r), r.shape); H, W = r.shape
    def sub(c, n, g):
        l, m, h = g((c-1) % n), g(c), g((c+1) % n); dd = l - 2*m + h
        return c + (0.5*(l-h)/dd if dd else 0)
    xs, ys = sub(x, W, lambda i: r[y, i]), sub(y, H, lambda i: r[i, x])
    return (xs - W if xs > W/2 else xs), (ys - H if ys > H/2 else ys)
prev, sc = load(fs[0]); path = [(0.0, 0.0)]
for f in fs[1:]:
    cur, _ = load(f); dx, dy = shift(prev, cur); path.append((path[-1][0]+dx, path[-1][1]+dy)); prev = cur
p = np.array(path) * sc; k = 15
pad = np.pad(p, ((k//2, k//2), (0, 0)), mode="edge")
sm = np.stack([np.convolve(pad[:, i], np.ones(k)/k, mode="valid") for i in range(2)], 1)
corr = p - sm   # p tracks the negative of content motion, so this moves content onto the smooth path
m = np.abs(corr).max(); print("max correction px", round(float(m), 2))
for f, (cx, cy) in zip(fs, corr):
    im = Image.open(f).convert("RGB"); W, H = im.size
    z = 1 + 2 * (m + 1) / min(W, H)   # zoom just enough to cover the largest shift
    # output pixel (u,v) samples input at ((u - W/2)/z + W/2 - cx, (v - H/2)/z + H/2 - cy)
    a, e = 1/z, 1/z
    c = W/2 - W/2/z - cx; ff = H/2 - H/2/z - cy
    im.transform((W, H), Image.AFFINE, (a, 0, c, 0, e, ff), resample=Image.BICUBIC).save(f, "WEBP", quality=q, method=6)
