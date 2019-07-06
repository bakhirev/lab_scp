@echo Square style

convert -resize 512x512 big.png Square\custom_icon_512.png
convert -resize 256x256 big.png Square\custom_icon_256.png
convert big.png -resize 310x310 -gravity center -crop 310x150+0+0 Square\custom_icon_310x150.png
convert -resize 310x310 big.png Square\custom_icon_310.png
convert -resize 160x160 big.png Square\custom_icon_160.png
convert -resize 152x152 big.png Square\custom_icon_152.png
convert -resize 150x150 big.png Square\custom_icon_150.png
convert -resize 144x144 big.png Square\custom_icon_144.png
convert -resize 128x128 big.png Square\custom_icon_128.png
convert -resize 120x120 big.png Square\custom_icon_120.png
convert -resize 114x114 big.png Square\custom_icon_114.png
convert -resize 100x100 big.png Square\custom_icon_100_96.png
convert -resize 96x96 big.png Square\custom_icon_96.png
convert big.png -resize 96x96 -bordercolor transparent -border 16x16 Square\custom_icon_96_128.png

convert -resize 80x80 middle.png Square\custom_icon_80.png
convert -resize 76x76 middle.png Square\custom_icon_76.png
convert -resize 72x72 middle.png Square\custom_icon_72.png
convert -resize 70x70 middle.png Square\custom_icon_70.png
convert -resize 64x64 middle.png Square\custom_icon_64.png
convert -resize 60x60 middle.png Square\custom_icon_60.png
convert -resize 57x57 middle.png Square\custom_icon_57.png
convert -resize 50x50 middle.png Square\custom_icon_50.png
convert -resize 48x48 middle.png Square\custom_icon_48.png
convert -resize 50x47 middle.png Square\custom_icon_50x47.png

convert -resize 42x42 small.png Square\custom_icon_42.png
convert -resize 36x36 small.png Square\custom_icon_36.png
convert -resize 32x32 small.png Square\custom_icon_32.png
convert -resize 18x18 small.png Square\custom_icon_18.png
convert -resize 16x16 small.png Square\custom_icon_16.png

convert -resize 16x16 small.png favicon.ico

@echo Rounded style

convert -resize 512x512 big_iPhone.png Rounded\custom_icon_512.png
convert -resize 256x256 big_iPhone.png Rounded\custom_icon_256.png
convert big_iPhone.png -resize 310x310 -gravity center -crop 310x150+0+0 Rounded\custom_icon_310x150.png
convert -resize 310x310 big_iPhone.png Rounded\custom_icon_310.png
convert -resize 160x160 big_iPhone.png Rounded\custom_icon_160.png
convert -resize 152x152 big_iPhone.png Rounded\custom_icon_152.png
convert -resize 150x150 big_iPhone.png Rounded\custom_icon_150.png
convert -resize 144x144 big_iPhone.png Rounded\custom_icon_144.png
convert -resize 128x128 big_iPhone.png Rounded\custom_icon_128.png
convert -resize 120x120 big_iPhone.png Rounded\custom_icon_120.png
convert -resize 114x114 big_iPhone.png Rounded\custom_icon_114.png
convert -resize 100x100 big_iPhone.png Rounded\custom_icon_100_96.png
convert -resize 96x96 big_iPhone.png Rounded\custom_icon_96.png
convert big_iPhone.png -resize 96x96 -bordercolor transparent -border 16x16 Rounded\custom_icon_96_128.png

convert -resize 80x80 middle_iPhone.png Rounded\custom_icon_80.png
convert -resize 76x76 middle_iPhone.png Rounded\custom_icon_76.png
convert -resize 72x72 middle_iPhone.png Rounded\custom_icon_72.png
convert -resize 70x70 middle_iPhone.png Rounded\custom_icon_70.png
convert -resize 64x64 middle_iPhone.png Rounded\custom_icon_64.png
convert -resize 60x60 middle_iPhone.png Rounded\custom_icon_60.png
convert -resize 57x57 middle_iPhone.png Rounded\custom_icon_57.png
convert -resize 50x50 middle_iPhone.png Rounded\custom_icon_50.png
convert -resize 48x48 middle_iPhone.png Rounded\custom_icon_48.png
convert -resize 50x47 middle_iPhone.png Rounded\custom_icon_50x47.png

convert -resize 42x42 small_iPhone.png Rounded\custom_icon_42.png
convert -resize 36x36 small_iPhone.png Rounded\custom_icon_36.png
convert -resize 32x32 small_iPhone.png Rounded\custom_icon_32.png
convert -resize 18x18 small_iPhone.png Rounded\custom_icon_18.png
convert -resize 16x16 small_iPhone.png Rounded\custom_icon_16.png


@echo Copy Rounded style for Android and iPhone

cd Rounded
copy custom_icon_310x150.png windows\custom_icon_310x150.png
copy custom_icon_310.png windows\custom_icon_310.png
copy custom_icon_150.png windows\custom_icon_150.png
copy custom_icon_144.png windows\custom_icon_144.png
copy custom_icon_70.png windows\custom_icon_70.png

copy custom_icon_152.png apple\touch-icon-ipad-retina.png
copy custom_icon_120.png apple\touch-icon-iphone-retina.png
copy custom_icon_76.png apple\touch-icon-ipad.png
copy custom_icon_60.png apple\touch-icon-iphone.png

copy custom_icon_256.png social\custom_icon_256.png

copy custom_icon_512.png Android\ic_launcher-web.png
copy custom_icon_72.png Android\drawable-hdpi\ic_launcher.png
copy custom_icon_36.png Android\drawable-ldpi\ic_launcher.png
copy custom_icon_48.png Android\drawable-mdpi\ic_launcher.png
copy custom_icon_96.png Android\drawable-xhdpi\ic_launcher.png
copy custom_icon_144.png Android\drawable-xxhdpi\ic_launcher.png

cd ..

@echo Copy Square style for Android and iPhone

cd Square
copy custom_icon_310x150.png windows\custom_icon_310x150.png
copy custom_icon_310.png windows\custom_icon_310.png
copy custom_icon_150.png windows\custom_icon_150.png
copy custom_icon_144.png windows\custom_icon_144.png
copy custom_icon_70.png windows\custom_icon_70.png

copy custom_icon_152.png apple\touch-icon-ipad-retina.png
copy custom_icon_120.png apple\touch-icon-iphone-retina.png
copy custom_icon_76.png apple\touch-icon-ipad.png
copy custom_icon_60.png apple\touch-icon-iphone.png

copy custom_icon_256.png social\custom_icon_256.png

copy custom_icon_512.png Android\ic_launcher-web.png
copy custom_icon_72.png Android\drawable-hdpi\ic_launcher.png
copy custom_icon_36.png Android\drawable-ldpi\ic_launcher.png
copy custom_icon_48.png Android\drawable-mdpi\ic_launcher.png
copy custom_icon_96.png Android\drawable-xhdpi\ic_launcher.png
copy custom_icon_144.png Android\drawable-xxhdpi\ic_launcher.png

cd ..

convert splashscreen_480x800.png -resize 800x800 -gravity center -crop 480x800+0+0 Splashscreens\splashscreen_480x800.png
convert splashscreen_480x800.png -resize 480x480 -gravity center -crop 320x480+0+0 Splashscreens\splashscreen_320x480.png
convert splashscreen_480x800.png -resize 400x400 -gravity center -crop 240x400+0+0 Splashscreens\splashscreen_240x400.png

copy Splashscreens\splashscreen_480x800.png Screenshots\screenshot_480x800_1.png
copy Splashscreens\splashscreen_480x800.png Screenshots\screenshot_480x800_2.png
copy Splashscreens\splashscreen_480x800.png Screenshots\screenshot_480x800_3.png
copy Splashscreens\splashscreen_480x800.png Screenshots\screenshot_480x800_4.png

copy Splashscreens\splashscreen_480x800.png Screenshots\screenshot_1280x800_1.png
copy Splashscreens\splashscreen_480x800.png Screenshots\screenshot_1280x800_2.png
copy Splashscreens\splashscreen_480x800.png Screenshots\screenshot_1280x800_3.png

convert promo_1400x560.png -resize 1400x1400 -gravity center -crop 1400x560+0+0 Banners\promo_1400x560.png
convert promo_1400x560.png -resize 1024x1024 -gravity center -crop 1024x500+0+0 Banners\promo_1024x500.png
convert promo_1400x560.png -resize 920x920 -gravity center -crop 920x680+0+0 Banners\promo_920x680.png
convert promo_1400x560.png -resize 440x440 -gravity center -crop 440x280+0+0 Banners\promo_440x280.png
convert promo_1400x560.png -resize 180x180 -gravity center -crop 180x120+0+0 Banners\promo_180x120.png
convert promo_1400x560.png -resize 540x540 -gravity center -crop 540x310+0+0 Banners\promo_540x310.png


