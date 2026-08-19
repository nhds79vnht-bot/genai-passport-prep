from PIL import Image, ImageDraw, ImageFilter


SIZE = 512


def vertical_gradient(size, top_color, bottom_color):
    img = Image.new("RGBA", (size, size))
    pixels = img.load()
    for y in range(size):
      t = y / (size - 1)
      color = tuple(int(top_color[i] * (1 - t) + bottom_color[i] * t) for i in range(3)) + (255,)
      for x in range(size):
          pixels[x, y] = color
    return img


def glow_circle(base, center, radius, color, blur):
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    x, y = center
    draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=color)
    layer = layer.filter(ImageFilter.GaussianBlur(blur))
    base.alpha_composite(layer)


def draw_book(draw):
    left_page = [(90, 384), (180, 364), (256, 370), (256, 432), (170, 424), (90, 440)]
    right_page = [(256, 370), (332, 364), (422, 384), (422, 440), (342, 424), (256, 432)]
    draw.polygon(left_page, fill=(31, 18, 66, 255), outline=(175, 74, 236, 255))
    draw.polygon(right_page, fill=(31, 18, 66, 255), outline=(175, 74, 236, 255))
    draw.line((256, 370, 256, 432), fill=(231, 84, 255, 255), width=5)
    draw.line((132, 392, 236, 384), fill=(131, 67, 189, 180), width=2)
    draw.line((128, 406, 236, 398), fill=(131, 67, 189, 110), width=2)
    draw.line((276, 384, 382, 392), fill=(131, 67, 189, 180), width=2)
    draw.line((276, 398, 386, 406), fill=(131, 67, 189, 110), width=2)


def draw_smoke(base):
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    smoke_colors = [
        (230, 120, 255, 110),
        (216, 70, 240, 100),
        (168, 85, 247, 70),
    ]
    paths = [
        [(220, 382), (240, 320), (246, 270), (256, 220), (266, 270), (272, 320), (292, 382)],
        [(232, 382), (244, 332), (250, 284), (256, 244), (262, 284), (268, 332), (280, 382)],
    ]
    for pts, color in zip(paths, smoke_colors[:2]):
        draw.polygon(pts, fill=color)
    draw.polygon([(240, 382), (246, 340), (252, 286), (256, 250), (260, 286), (266, 340), (272, 382)], fill=smoke_colors[2])
    layer = layer.filter(ImageFilter.GaussianBlur(18))
    base.alpha_composite(layer)


def draw_brain(base):
    glow = Image.new("RGBA", base.size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse((118, 88, 394, 320), fill=(231, 84, 255, 90))
    glow = glow.filter(ImageFilter.GaussianBlur(24))
    base.alpha_composite(glow)

    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    brain = [
        (256, 108), (228, 108), (198, 122), (182, 150), (162, 148), (144, 168),
        (144, 194), (136, 210), (136, 242), (154, 270), (180, 286), (204, 292),
        (220, 304), (256, 304), (292, 304), (308, 292), (332, 286), (358, 270),
        (376, 242), (376, 210), (368, 194), (368, 168), (350, 148), (330, 150),
        (314, 122), (284, 108),
    ]
    draw.polygon(brain, fill=(235, 154, 255, 255))
    draw.line((256, 118, 256, 304), fill=(252, 234, 251, 170), width=5)
    lines = [
        (198, 154, 220, 190, 212, 252, 198, 286),
        (314, 154, 292, 190, 300, 252, 314, 286),
        (174, 208, 220, 198, 256, 198, 338, 208),
        (166, 242, 220, 234, 256, 234, 346, 242),
    ]
    for line in lines:
        draw.line(line, fill=(252, 234, 251, 130), width=4, joint="curve")
    layer = layer.filter(ImageFilter.GaussianBlur(1))
    base.alpha_composite(layer)


def draw_badges(base):
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    badges = [(82, 104), (430, 104), (74, 256), (438, 256), (256, 72)]
    for x, y in badges:
        draw.ellipse((x - 24, y - 24, x + 24, y + 24), outline=(231, 84, 255, 220), width=3, fill=(27, 9, 48, 140))
    # gear
    draw.ellipse((76, 98, 88, 110), outline=(247, 168, 252, 220), width=3)
    for dx, dy in [(0, -14), (0, 14), (-14, 0), (14, 0), (-10, -10), (10, 10), (-10, 10), (10, -10)]:
        draw.line((82 + dx * 0.7, 104 + dy * 0.7, 82 + dx, 104 + dy), fill=(231, 84, 255, 220), width=3)
    # chart
    draw.rectangle((420, 110, 428, 124), fill=(240, 171, 252, 240))
    draw.rectangle((432, 98, 440, 124), fill=(217, 70, 239, 240))
    draw.rectangle((444, 90, 452, 124), fill=(240, 171, 252, 240))
    draw.line((418, 124, 454, 124), fill=(231, 84, 255, 220), width=3)
    # chip
    draw.rounded_rectangle((64, 246, 84, 266), radius=4, outline=(240, 171, 252, 220), width=3)
    draw.ellipse((71, 253, 77, 259), fill=(217, 70, 239, 240))
    # hex
    draw.polygon([(438, 242), (450, 249), (450, 263), (438, 270), (426, 263), (426, 249)], outline=(240, 171, 252, 220), width=3)
    draw.ellipse((434, 252, 442, 260), fill=(217, 70, 239, 240))
    # AI badge
    draw.rounded_rectangle((228, 56, 284, 88), radius=10, fill=(26, 5, 48, 180), outline=(231, 84, 255, 220), width=3)
    draw.line((241, 80, 249, 60, 257, 80), fill=(240, 171, 252, 255), width=4)
    draw.line((245, 72, 253, 72), fill=(240, 171, 252, 255), width=3)
    draw.line((269, 60, 269, 80), fill=(240, 171, 252, 255), width=4)
    draw.line((269, 60, 281, 60), fill=(240, 171, 252, 255), width=4)
    draw.line((269, 70, 279, 70), fill=(240, 171, 252, 255), width=4)
    draw.line((269, 80, 281, 80), fill=(240, 171, 252, 255), width=4)
    base.alpha_composite(layer.filter(ImageFilter.GaussianBlur(1)))


def main():
    base = vertical_gradient(SIZE, (41, 24, 76), (13, 10, 26))
    base = base.convert("RGBA")

    border = ImageDraw.Draw(base)
    border.rounded_rectangle((10, 10, SIZE - 10, SIZE - 10), radius=92, outline=(120, 80, 180, 70), width=2)

    glow_circle(base, (256, 400), 40, (217, 70, 239, 100), 12)
    draw_smoke(base)
    draw_book(ImageDraw.Draw(base))
    draw_brain(base)
    draw_badges(base)

    base.save("/agent/genai-passport-prep/public/apple-touch-icon.png")
    base.save("/agent/genai-passport-prep/public/icon-512.png")
    base.resize((180, 180), Image.LANCZOS).save("/agent/genai-passport-prep/public/icon-180.png")


if __name__ == "__main__":
    main()
