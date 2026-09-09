from collections import deque
from pathlib import Path

from PIL import Image

def process_image(input_path, output_path):
    try:
        image = Image.open(input_path).convert("RGBA")
        pixels = image.load()
        width, height = image.size

        def is_checkerboard_pixel(x, y):
            red, green, blue, _ = pixels[x, y]
            return max(red, green, blue) - min(red, green, blue) <= 18 and min(red, green, blue) >= 145

        # Flood-fill only neutral, bright pixels connected to the image border.
        # This preserves light details enclosed by the character's outlines.
        background = bytearray(width * height)
        queue = deque()

        for x in range(width):
            queue.extend(((x, 0), (x, height - 1)))
        for y in range(height):
            queue.extend(((0, y), (width - 1, y)))

        while queue:
            x, y = queue.popleft()
            index = y * width + x
            if background[index] or not is_checkerboard_pixel(x, y):
                continue
            background[index] = 1
            for next_x, next_y in (
                (x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1),
                (x - 1, y - 1), (x + 1, y - 1), (x - 1, y + 1), (x + 1, y + 1),
            ):
                if 0 <= next_x < width and 0 <= next_y < height:
                    queue.append((next_x, next_y))

        for y in range(height):
            for x in range(width):
                if background[y * width + x]:
                    red, green, blue, _ = pixels[x, y]
                    pixels[x, y] = (red, green, blue, 0)

        image.save(output_path, "PNG")
        print(f"Processed {output_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

if __name__ == '__main__':
    images = [
        (f'public/Personaje{number}.jpg', f'public/Personaje{number}.png')
        for number in range(1, 4)
    ]
    for src, dst in images:
        if Path(src).exists():
            process_image(src, dst)
