"""Draw the share images (1200x630) for the home page and each exam: original graphics, no images from anywhere else.
   python scripts/make-og.py   -> public/og/<name>.png
The text is evergreen on purpose (name of the exam and what the pages cover), so an image never goes out of date with a deadline."""
import os
from PIL import Image, ImageDraw, ImageFont

INK = (5, 7, 10)
GRID = (30, 34, 40)
CYAN = (34, 211, 238)
WHITE = (244, 244, 245)
MUTE = (161, 161, 170)
W, H = 1200, 630

FONT_DIR = "C:/Windows/Fonts"
def font(name, size):
    for f in (name, "arialbd.ttf" if "b" in name else "arial.ttf"):
        try:
            return ImageFont.truetype(os.path.join(FONT_DIR, f), size)
        except OSError:
            continue
    return ImageFont.load_default()

IMAGES = {
    "home": ("Exam dates, eligibility,\npattern and fees", "JEE Main · NEET UG · CUET UG · UPSC CSE"),
    "jee-main": ("JEE Main 2027", "Dates · how to apply · eligibility · pattern · fees"),
    "neet-ug": ("NEET (UG)", "Dates · how to apply · eligibility · pattern · fees"),
    "cuet-ug": ("CUET (UG)", "Dates · how to apply · eligibility · pattern · fees"),
    "upsc-cse": ("UPSC Civil Services 2027", "Calendar dates from UPSC's own programme"),
    "calendar": ("Exam calendar", "Every dated deadline we have a source for"),
}

def draw(title, sub):
    ss = 2
    img = Image.new("RGB", (W * ss, H * ss), INK)
    d = ImageDraw.Draw(img)
    for x in range(0, W * ss, 40 * ss):
        d.line([(x, 0), (x, H * ss)], fill=GRID, width=1)
    for y in range(0, H * ss, 40 * ss):
        d.line([(0, y), (W * ss, y)], fill=GRID, width=1)
    # a rising timeline in the corner: three nodes on a line (the site is about dates)
    pts = [(820, 520), (940, 450), (1060, 380), (1130, 300)]
    d.line([(x * ss, y * ss) for x, y in pts], fill=CYAN, width=6 * ss, joint="curve")
    for x, y in pts:
        r = 14 * ss
        d.ellipse((x * ss - r, y * ss - r, x * ss + r, y * ss + r), fill=INK, outline=CYAN, width=5 * ss)
    d.rectangle((70 * ss, 70 * ss, 82 * ss, 150 * ss), fill=CYAN)
    d.text((104 * ss, 78 * ss), "Exam Dates India", font=font("segoeuib.ttf", 40 * ss), fill=WHITE)
    lines = title.split("\n")
    y = 230
    for ln in lines:
        d.text((70 * ss, y * ss), ln, font=font("segoeuib.ttf", 78 * ss), fill=WHITE)
        y += 96
    d.text((70 * ss, (y + 20) * ss), sub, font=font("segoeui.ttf", 34 * ss), fill=MUTE)
    d.text((70 * ss, 550 * ss), "Every fact from the official document, with its source and checked date", font=font("segoeui.ttf", 26 * ss), fill=CYAN)
    return img.resize((W, H), Image.LANCZOS)

if __name__ == "__main__":
    os.makedirs("public/og", exist_ok=True)
    for name, (t, s) in IMAGES.items():
        draw(t, s).save(f"public/og/{name}.png", optimize=True)
        print("wrote", name)
