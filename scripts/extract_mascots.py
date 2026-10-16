import cv2
import numpy as np
import os

sheet = cv2.imread(r'C:\Users\lucia\.gemini\antigravity-ide\brain\0dc96b0b-5ebb-4d0f-b74a-44978d219dda\.user_uploaded\media_1792123801304.jpg')
os.makedirs('public/mascots', exist_ok=True)

# 1. Hero Thumbs Up
hero_img = cv2.imread('public/mascot-hero-thumbsup.png', cv2.IMREAD_UNCHANGED)
cv2.imwrite('public/mascots/mascot-hero-thumbsup.png', hero_img)
cv2.imwrite('public/mascot-apoyada.webp', hero_img)

targets = [
    ('mascot-point-forward', (55, 320, 435, 590)),
    ('mascot-sitting-laptop', (55, 320, 740, 975)),
    ('mascot-arms-crossed', (320, 560, 420, 560)),
    ('mascot-walking-backpack', (290, 545, 595, 765)),
    ('mascot-music-dj', (315, 555, 785, 965)),
    ('mascot-phone', (575, 790, 420, 570)),
    ('mascot-celebrate', (565, 785, 585, 780)),
    ('mascot-tablet', (575, 795, 805, 970)),
]

bg_color = np.array([25.4, 16.3, 5.3])

for name, (y1, y2, x1, x2) in targets:
    crop = sheet[y1:y2, x1:x2].copy()
    h, w = crop.shape[:2]
    
    mask = np.zeros((h, w), np.uint8)
    rect = (2, 2, w - 4, h - 4)
    bgdModel = np.zeros((1, 65), np.float64)
    fgdModel = np.zeros((1, 65), np.float64)
    
    cv2.grabCut(crop, mask, rect, bgdModel, fgdModel, 6, cv2.GC_INIT_WITH_RECT)
    
    # Bottom margin check for shadow
    if h > 15:
        dist_bottom = np.linalg.norm(crop[h-10:h, :].astype(float) - bg_color, axis=2)
        mask[h-10:h, :][dist_bottom < 15] = cv2.GC_BGD
        
    cv2.grabCut(crop, mask, rect, bgdModel, fgdModel, 2, cv2.GC_INIT_WITH_MASK)
    
    mask2 = np.where((mask == 2) | (mask == 0), 0, 255).astype('uint8')
    alpha_aa = cv2.GaussianBlur(mask2, (3, 3), 0)
    
    rgba = cv2.cvtColor(crop, cv2.COLOR_BGR2BGRA)
    rgba[:, :, 3] = alpha_aa
    
    cv2.imwrite(f'public/mascots/{name}.png', rgba)
    cv2.imwrite(f'public/mascots/{name}.webp', rgba)
    print(f'Done: {name}')

# Save sitting laptop for AboutSection
sit = cv2.imread('public/mascots/mascot-sitting-laptop.png', cv2.IMREAD_UNCHANGED)
cv2.imwrite('public/mascot-laptop.webp', sit)

# Avatars
avatars = [
    ('avatar-normal', (845, 930, 40, 135)),
    ('avatar-wink', (845, 930, 155, 250)),
    ('avatar-happy', (845, 930, 275, 370)),
    ('avatar-cool', (845, 930, 405, 500)),
    ('avatar-surprised', (845, 930, 525, 620)),
]

for name, (ay1, ay2, ax1, ax2) in avatars:
    crop = sheet[ay1:ay2, ax1:ax2].copy()
    h, w = crop.shape[:2]
    mask = np.zeros((h, w), np.uint8)
    rect = (1, 1, w - 2, h - 2)
    bgdModel = np.zeros((1, 65), np.float64)
    fgdModel = np.zeros((1, 65), np.float64)
    cv2.grabCut(crop, mask, rect, bgdModel, fgdModel, 4, cv2.GC_INIT_WITH_RECT)
    mask2 = np.where((mask == 2) | (mask == 0), 0, 255).astype('uint8')
    alpha_aa = cv2.GaussianBlur(mask2, (3, 3), 0)
    rgba = cv2.cvtColor(crop, cv2.COLOR_BGR2BGRA)
    rgba[:, :, 3] = alpha_aa
    cv2.imwrite(f'public/mascots/{name}.png', rgba)
    cv2.imwrite(f'public/mascots/{name}.webp', rgba)
    print(f'Done avatar: {name}')

print('All 9 mascots and 5 avatars successfully exported!')
