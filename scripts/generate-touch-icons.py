"""Generate app icons: side-view realistic brain with knowledge flowing in."""

from PIL import Image, ImageDraw, ImageFilter

SIZE = 512
OUT = "/agent/genai-passport-prep/public"


def radial_bg(size):
    img = Image.new("RGBA", (size, size))
    px = img.load()
    cx, cy = size // 2, size // 2
    for y in range(size):
        for x in range(size):
            d = ((x - cx) ** 2 + (y - cy) ** 2) ** 0.5 / (size * 0.72)
            t = min(d, 1.0)
            r = int(18 + (45 - 18) * (1 - t))
            g = int(12 + (28 - 12) * (1 - t))
            b = int(42 + (72 - 42) * (1 - t))
            px[x, y] = (r, g, b, 255)
    return img


def glow(base, center, radius, color, blur=16):
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    ImageDraw.Draw(layer).ellipse(
        (center[0] - radius, center[1] - radius, center[0] + radius, center[1] + radius),
        fill=color,
    )
    base.alpha_composite(layer.filter(ImageFilter.GaussianBlur(blur)))


def draw_knowledge_streams(base):
    """Light/data streams flowing from left into the brain."""
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)

    streams = [
        [(28, 168), (88, 178), (148, 188), (198, 196)],
        [(20, 208), (90, 210), (155, 214), (205, 218)],
        [(32, 248), (95, 244), (158, 238), (210, 232)],
        [(48, 288), (108, 278), (168, 268), (218, 258)],
        [(64, 148), (120, 162), (175, 178), (215, 188)],
    ]
    colors = [
        (103, 232, 249, 180),
        (167, 139, 250, 170),
        (244, 114, 182, 160),
        (251, 191, 36, 140),
        (129, 140, 248, 150),
    ]

    for pts, col in zip(streams, colors):
        draw.line(pts, fill=col, width=5, joint="curve")
        for i, (x, y) in enumerate(pts):
            r = 5 + (i * 2)
            draw.ellipse((x - r, y - r, x + r, y + r), fill=(*col[:3], min(255, col[3] + 40)))

    # Floating knowledge particles
    particles = [
        (42, 132, 4), (58, 192, 3), (72, 228, 5), (38, 268, 3),
        (96, 156, 3), (110, 272, 4), (54, 312, 3),
    ]
    for x, y, r in particles:
        draw.ellipse((x - r, y - r, x + r, y + r), fill=(186, 230, 253, 200))

    # Symbol fragments (mini nodes)
    nodes = [(66, 178), (98, 218), (130, 252)]
    for x, y in nodes:
        draw.rectangle((x - 5, y - 5, x + 5, y + 5), outline=(224, 231, 255, 200), width=2)
        draw.line((x - 8, y, x + 8, y), fill=(147, 197, 253, 160), width=1)
        draw.line((x, y - 8, x, y + 8), fill=(147, 197, 253, 160), width=1)

    layer = layer.filter(ImageFilter.GaussianBlur(2))
    base.alpha_composite(layer)


def draw_brain_side(base):
    """Lateral (side) view realistic brain silhouette."""
    glow = Image.new("RGBA", base.size, (0, 0, 0, 0))
    ImageDraw.Draw(glow).ellipse((175, 95, 430, 340), fill=(192, 38, 211, 70))
    base.alpha_composite(glow.filter(ImageFilter.GaussianBlur(28)))

    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)

    # Main cerebrum — lateral profile facing right
    cerebrum = [
        (198, 210), (192, 178), (205, 148), (232, 122), (268, 108),
        (310, 104), (352, 112), (388, 132), (412, 162), (420, 198),
        (418, 234), (402, 268), (372, 292), (334, 304), (292, 308),
        (252, 302), (222, 282), (205, 252),
    ]
    draw.polygon(cerebrum, fill=(219, 39, 119, 255))

    # Inner highlight (knowledge absorbed)
    inner_glow_pts = [
        (248, 188), (278, 168), (318, 162), (356, 172), (378, 198),
        (382, 228), (364, 256), (328, 272), (286, 276), (252, 262), (238, 228),
    ]
    draw.polygon(inner_glow_pts, fill=(251, 207, 232, 120))

    # Cerebellum (back-bottom lump)
    cerebellum = [
        (188, 248), (178, 272), (182, 298), (202, 318), (228, 328),
        (252, 322), (262, 300), (254, 272), (238, 256),
    ]
    draw.polygon(cerebellum, fill=(190, 24, 93, 255))

    # Brain stem
    draw.polygon([(228, 318), (242, 328), (248, 358), (232, 362), (218, 348), (218, 328)], fill=(157, 23, 77, 255))

    # Sulci / gyri — realistic fold lines
    folds = [
        [(228, 128), (248, 148), (258, 178), (252, 210), (238, 238)],
        [(278, 118), (298, 142), (308, 172), (302, 208), (286, 238)],
        [(328, 124), (348, 148), (356, 182), (348, 218), (328, 248)],
        [(368, 148), (382, 178), (384, 212), (372, 242)],
        [(212, 178), (252, 172), (292, 168), (332, 172), (372, 182)],
        [(205, 212), (248, 206), (292, 202), (338, 208), (378, 218)],
        [(198, 248), (238, 242), (278, 238), (318, 244)],
        # Cerebellar stripes
        [(192, 278), (210, 288), (228, 296), (246, 300)],
        [(196, 292), (214, 302), (232, 308), (248, 310)],
    ]
    for fold in folds:
        draw.line(fold, fill=(253, 242, 248, 140), width=3, joint="curve")

    # Central sulcus / fissure (deeper groove)
    draw.line([(268, 112), (278, 160), (282, 210), (276, 258), (262, 292)], fill=(131, 24, 67, 180), width=4, joint="curve")

    # Entry point glow — where knowledge enters (frontal/temporal)
    draw.ellipse((196, 196, 228, 232), fill=(103, 232, 249, 90))
    draw.ellipse((204, 204, 220, 224), fill=(224, 242, 254, 160))

    layer = layer.filter(ImageFilter.GaussianBlur(0.6))
    base.alpha_composite(layer)


def draw_internal_network(base):
    """Neural network inside brain — knowledge being integrated."""
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)

    nodes = [
        (278, 178), (308, 168), (338, 182), (358, 210),
        (348, 242), (318, 258), (286, 252), (268, 228), (272, 198),
        (302, 198), (328, 218), (312, 238),
    ]
    edges = [
        (0, 1), (1, 2), (2, 3), (3, 4), (4, 5), (5, 6), (6, 7), (7, 8),
        (8, 0), (8, 9), (9, 10), (10, 11), (11, 5), (9, 1), (10, 2),
    ]
    for a, b in edges:
        x1, y1 = nodes[a]
        x2, y2 = nodes[b]
        draw.line((x1, y1, x2, y2), fill=(186, 230, 253, 100), width=2)
    for x, y in nodes:
        draw.ellipse((x - 4, y - 4, x + 4, y + 4), fill=(224, 242, 254, 200))

    base.alpha_composite(layer.filter(ImageFilter.GaussianBlur(1)))


def draw_accent_rim(base):
    draw = ImageDraw.Draw(base)
    draw.rounded_rectangle((8, 8, SIZE - 8, SIZE - 8), radius=90, outline=(139, 92, 246, 60), width=2)


def main():
    base = radial_bg(SIZE)
    draw_accent_rim(base)

    glow(base, (310, 210), 120, (168, 85, 247, 50), blur=32)
    glow(base, (120, 220), 60, (56, 189, 248, 40), blur=20)

    draw_knowledge_streams(base)
    draw_brain_side(base)
    draw_internal_network(base)

    base.save(f"{OUT}/apple-touch-icon.png")
    base.save(f"{OUT}/icon-512.png")
    base.resize((180, 180), Image.LANCZOS).save(f"{OUT}/icon-180.png")
    print("Generated side-view brain icons")


if __name__ == "__main__":
    main()
