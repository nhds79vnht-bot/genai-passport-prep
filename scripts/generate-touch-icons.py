"""App icon: photorealistic brain + surrounding knowledge capability badges."""

from math import cos, sin, pi
from PIL import Image, ImageDraw, ImageFilter

SIZE = 512
OUT = "/agent/genai-passport-prep/public"
CX, CY = 256, 248


def radial_bg(size):
    img = Image.new("RGBA", (size, size))
    px = img.load()
    for y in range(size):
        for x in range(size):
            d = ((x - CX) ** 2 + (y - CY) ** 2) ** 0.5 / (size * 0.55)
            t = min(d, 1.0)
            r = int(14 + (32 - 14) * (1 - t))
            g = int(10 + (22 - 10) * (1 - t))
            b = int(36 + (58 - 36) * (1 - t))
            px[x, y] = (r, g, b, 255)
    return img


def glow(base, center, radius, color, blur=14):
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    ImageDraw.Draw(layer).ellipse(
        (center[0] - radius, center[1] - radius, center[0] + radius, center[1] + radius),
        fill=color,
    )
    base.alpha_composite(layer.filter(ImageFilter.GaussianBlur(blur)))


def draw_realistic_brain(base):
    """Side-view anatomical brain with realistic pink tones and sulci."""
    glow_layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    ImageDraw.Draw(glow_layer).ellipse((148, 88, 400, 340), fill=(200, 100, 110, 55))
    base.alpha_composite(glow_layer.filter(ImageFilter.GaussianBlur(22)))

    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)

    # Cerebrum silhouette — lateral view facing right
    cerebrum = [
        (168, 228), (158, 198), (162, 162), (178, 132), (204, 110), (238, 98),
        (276, 94), (314, 100), (348, 118), (374, 146), (386, 178), (388, 210),
        (382, 242), (364, 270), (332, 290), (296, 300), (258, 298), (224, 284),
        (198, 262), (178, 244),
    ]
    d.polygon(cerebrum, fill=(210, 130, 125, 255))

    # Shadow side (depth)
    shadow = [
        (168, 228), (178, 244), (198, 262), (224, 284), (258, 298),
        (296, 300), (332, 290), (364, 270), (382, 242), (388, 210),
        (374, 220), (348, 232), (310, 242), (268, 248), (228, 246), (198, 238),
    ]
    d.polygon(shadow, fill=(168, 88, 86, 120))

    # Highlight on upper surface
    highlight = [
        (204, 110), (238, 98), (276, 94), (314, 100), (348, 118), (374, 146),
        (360, 138), (324, 124), (286, 116), (248, 114), (218, 122), (198, 138),
    ]
    d.polygon(highlight, fill=(235, 170, 165, 90))

    # Cerebellum
    cerebellum = [
        (152, 252), (138, 278), (142, 306), (162, 328), (188, 338), (214, 334),
        (232, 316), (228, 288), (212, 268), (188, 256),
    ]
    d.polygon(cerebellum, fill=(195, 115, 112, 255))
    for i, y in enumerate(range(268, 326, 10)):
        x1 = 148 + i * 2
        x2 = 220 - i
        d.line((x1, y, x2, y + 4), fill=(140, 70, 68, 180), width=2)

    # Brain stem + medulla
    d.polygon([(188, 328), (204, 338), (210, 368), (194, 374), (178, 360), (176, 336)], fill=(175, 95, 92, 255))

    # Major sulci (grooves) — dark curved lines
    sulci = [
        [(198, 138), (218, 168), (228, 200), (232, 234), (228, 266)],          # central
        [(248, 108), (262, 140), (270, 174), (272, 210), (266, 244)],          # upper
        [(298, 112), (312, 148), (318, 186), (314, 224), (300, 256)],          # parietal
        [(338, 132), (352, 168), (356, 206), (348, 240)],                      # occipital
        [(178, 178), (218, 168), (258, 164), (298, 170), (338, 182)],          # lateral fissure area
        [(172, 210), (212, 202), (252, 198), (292, 204), (328, 214)],
        [(168, 238), (208, 230), (248, 226), (286, 232)],
    ]
    for s in sulci:
        d.line(s, fill=(110, 50, 50, 200), width=4, joint="curve")

    # Gyri ridges — lighter thin lines
    gyri = [
        [(210, 122), (240, 128), (270, 132), (300, 142), (328, 158)],
        [(218, 152), (252, 148), (286, 150), (320, 162)],
        [(208, 188), (248, 182), (288, 180), (326, 188)],
        [(206, 218), (246, 212), (286, 210), (318, 218)],
    ]
    for g in gyri:
        d.line(g, fill=(240, 190, 186, 130), width=2, joint="curve")

    base.alpha_composite(layer)


def badge_circle(draw, x, y, r, fill, stroke):
    draw.ellipse((x - r, y - r, x + r, y + r), fill=fill, outline=stroke, width=3)


def draw_ai_chip(draw, x, y, s=1.0):
    w = int(14 * s)
    draw.rounded_rectangle((x - w, y - w, x + w, y + w), radius=4, outline=(186, 230, 253, 255), width=2)
    for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
        draw.line((x + dx * w, y + dy * int(6 * s), x + dx * int(18 * s), y + dy * int(6 * s)), fill=(147, 197, 253, 255), width=2)
    draw.ellipse((x - 4, y - 4, x + 4, y + 4), fill=(56, 189, 248, 255))


def draw_gear(draw, x, y, s=1.0):
    r = int(10 * s)
    draw.ellipse((x - r, y - r, x + r, y + r), outline=(251, 191, 36, 255), width=2)
    draw.ellipse((x - 5, y - 5, x + 5, y + 5), outline=(251, 191, 36, 255), width=2)
    for angle in range(0, 360, 45):
        rad = angle * pi / 180
        draw.line((x + cos(rad) * 8, y + sin(rad) * 8, x + cos(rad) * 14, y + sin(rad) * 14), fill=(251, 191, 36, 255), width=2)


def draw_chart(draw, x, y, s=1.0):
    draw.line((x - 12, y + 10, x + 12, y + 10), fill=(167, 139, 250, 255), width=2)
    draw.rectangle((x - 10, y - 2, x - 5, y + 10), fill=(196, 181, 253, 255))
    draw.rectangle((x - 2, y - 8, x + 3, y + 10), fill=(167, 139, 250, 255))
    draw.rectangle((x + 5, y - 14, x + 10, y + 10), fill=(196, 181, 253, 255))


def draw_scale(draw, x, y, s=1.0):
    draw.line((x, y - 12, x, y + 10), fill=(244, 114, 182, 255), width=2)
    draw.line((x - 12, y - 8, x + 12, y - 8), fill=(244, 114, 182, 255), width=2)
    draw.polygon([(x - 12, y - 8), (x - 18, y + 2), (x - 6, y + 2)], outline=(251, 207, 232, 255))
    draw.polygon([(x + 12, y - 8), (x + 18, y + 2), (x + 6, y + 2)], outline=(251, 207, 232, 255))


def draw_network(draw, x, y, s=1.0):
    pts = [(x - 10, y), (x, y - 10), (x + 10, y), (x, y + 10), (x, y)]
    draw.line(pts[:2], fill=(103, 232, 249, 255), width=2)
    draw.line(pts[1:3], fill=(103, 232, 249, 255), width=2)
    draw.line(pts[2:4], fill=(103, 232, 249, 255), width=2)
    draw.line(pts[3:5], fill=(103, 232, 249, 255), width=2)
    for px, py in [(x - 10, y), (x, y - 10), (x + 10, y), (x, y + 10), (x, y)]:
        draw.ellipse((px - 4, py - 4, px + 4, py + 4), fill=(186, 230, 253, 255))


def draw_code(draw, x, y, s=1.0):
    draw.polygon([(x - 12, y), (x - 4, y - 10), (x - 4, y + 10)], fill=(74, 222, 128, 255))
    draw.polygon([(x + 12, y), (x + 4, y - 10), (x + 4, y + 10)], fill=(74, 222, 128, 255))


def draw_shield(draw, x, y, s=1.0):
    draw.polygon([(x, y - 12), (x + 12, y - 4), (x + 8, y + 10), (x, y + 14), (x - 8, y + 10), (x - 12, y - 4)], outline=(252, 165, 165, 255), width=2)
    draw.line((x, y - 4, x, y + 8), fill=(252, 165, 165, 255), width=2)


def draw_bot(draw, x, y, s=1.0):
    draw.rounded_rectangle((x - 10, y - 8, x + 10, y + 8), radius=4, outline=(129, 140, 248, 255), width=2)
    draw.ellipse((x - 5, y - 3, x - 1, y + 1), fill=(165, 180, 252, 255))
    draw.ellipse((x + 1, y - 3, x + 5, y + 1), fill=(165, 180, 252, 255))
    draw.line((x, y - 8, x, y - 14), fill=(129, 140, 248, 255), width=2)
    draw.ellipse((x - 2, y - 16, x + 2, y - 12), fill=(165, 180, 252, 255))


def draw_ai_text(draw, x, y, s=1.0):
    # A
    draw.line((x - 10, y + 8, x - 2, y - 10), fill=(224, 242, 254, 255), width=3)
    draw.line((x - 2, y - 10, x + 6, y + 8), fill=(224, 242, 254, 255), width=3)
    draw.line((x - 8, y + 2, x + 4, y + 2), fill=(224, 242, 254, 255), width=2)
    # I
    draw.line((x + 12, y - 10, x + 12, y + 8), fill=(224, 242, 254, 255), width=3)


def draw_surrounding_knowledge(base):
    """Knowledge/capability badges orbiting the brain."""
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)

    badges = [
        (256, 58, draw_ai_text, "AI"),
        (370, 98, draw_chart, "分析"),
        (408, 188, draw_bot, "エージェント"),
        (384, 288, draw_network, "RAG"),
        (256, 338, draw_code, "生成"),
        (128, 288, draw_shield, "倫理"),
        (104, 188, draw_scale, "法律"),
        (142, 98, draw_gear, "技術"),
    ]

    brain_edge = (290, 200)

    for bx, by, drawer, _label in badges:
        glow(base, (bx, by), 22, (139, 92, 246, 35), blur=10)
        d.line((bx, by, brain_edge[0], brain_edge[1]), fill=(147, 197, 253, 50), width=2)
        badge_circle(d, bx, by, 30, (22, 16, 48, 230), (167, 139, 250, 220))
        drawer(d, bx, by)

    base.alpha_composite(layer.filter(ImageFilter.GaussianBlur(0.4)))


def draw_accent_rim(base):
    ImageDraw.Draw(base).rounded_rectangle((6, 6, SIZE - 6, SIZE - 6), radius=92, outline=(120, 80, 180, 50), width=2)


def main():
    base = radial_bg(SIZE)
    draw_accent_rim(base)
    glow(base, (280, 210), 100, (200, 100, 110, 45), blur=28)
    draw_realistic_brain(base)
    draw_surrounding_knowledge(base)

    base.save(f"{OUT}/apple-touch-icon.png")
    base.save(f"{OUT}/icon-512.png")
    base.resize((180, 180), Image.LANCZOS).save(f"{OUT}/icon-180.png")
    print("Generated photorealistic brain with knowledge badges")


if __name__ == "__main__":
    main()
