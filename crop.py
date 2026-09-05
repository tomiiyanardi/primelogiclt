import sys
from PIL import Image

def crop_image(input_path):
    img = Image.open(input_path)
    width, height = img.size
    
    # Calculate dimensions for 2x2 grid
    mid_w = width // 2
    mid_h = height // 2
    
    # Poses based on visual inspection of a 2x2 grid:
    # 1 (top-left), 2 (top-right)
    # 3 (bottom-left), 4 (bottom-right)
    
    # We crop with some margin to avoid the numbers/text if any, but since we don't know exactly,
    # we'll just split it evenly.
    
    pose1 = img.crop((0, 0, mid_w, mid_h))
    pose2 = img.crop((mid_w, 0, width, mid_h))
    pose4 = img.crop((mid_w, mid_h, width, height))
    
    # The user wanted:
    # About: Pose 1 (top-left) -> about-char.png
    # Offerings: Pose 2 (top-right) -> offerings-char.png
    # Hero: Pose 4 (bottom-right) -> hero-char.png
    
    pose1.save('public/about-char.png')
    pose2.save('public/offerings-char.png')
    pose4.save('public/hero-char.png')
    
    print("Images cropped successfully.")

if __name__ == '__main__':
    crop_image('public/image.png')
