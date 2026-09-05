import sys
from PIL import Image, ImageEnhance, ImageFilter

def process_image(input_path, output_path):
    try:
        img = Image.open(input_path).convert("RGBA")
        
        # Increase quality (Sharpening & Contrast)
        enhancer = ImageEnhance.Contrast(img)
        img = enhancer.enhance(1.1)
        img = img.filter(ImageFilter.UnsharpMask(radius=2, percent=150, threshold=3))
        
        # Remove white background
        data = img.getdata()
        new_data = []
        for item in data:
            # item is (R, G, B, A)
            # If the pixel is close to white, make it transparent
            if item[0] > 230 and item[1] > 230 and item[2] > 230:
                new_data.append((255, 255, 255, 0)) # Transparent
            else:
                new_data.append(item)
                
        img.putdata(new_data)
        
        # We can also resize (upscale) slightly using Lanczos for better quality
        width, height = img.size
        img = img.resize((int(width*1.5), int(height*1.5)), Image.LANCZOS)
        
        img.save(output_path, "PNG")
        print(f"Processed {output_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

if __name__ == '__main__':
    images = [
        ('public/hero-char.png', 'public/hero-char.png'),
        ('public/offerings-char.png', 'public/offerings-char.png'),
        ('public/about-char.png', 'public/about-char.png')
    ]
    for src, dst in images:
        process_image(src, dst)
