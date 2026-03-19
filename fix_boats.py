f = open('d:/JR technology/Royalwavejourney/index.html', 'r', encoding='utf-8')
c = f.read()
f.close()

new_grid = '''<div class="water-sports-grid">
            <div class="water-sport-card">
                <div class="ws-img-wrap">
                    <img src="andaman1.jpg" alt="Luxury Cruise Ships">
                    <div class="ws-badge"><i class="fas fa-ship"></i></div>
                </div>
                <div class="ws-content">
                    <h3>Luxury Cruise Ships</h3>
                    <p>Sail through the Andaman Sea in style aboard our premium luxury cruise ships with world-class amenities.</p>
                    <a href="luxury-cruise.html" class="ws-btn">Book Now</a>
                </div>
            </div>
            <div class="water-sport-card">
                <div class="ws-img-wrap">
                    <img src="andaman2.jpg" alt="High-Speed Boats">
                    <div class="ws-badge"><i class="fas fa-tachometer-alt"></i></div>
                </div>
                <div class="ws-content">
                    <h3>High-Speed Boats</h3>
                    <p>Reach your island destination quickly and comfortably on our modern high-speed boats across the Andaman waters.</p>
                    <a href="high-speed-boats.html" class="ws-btn">Book Now</a>
                </div>
            </div>
            <div class="water-sport-card">
                <div class="ws-img-wrap">
                    <img src="andaman3.jpg" alt="Inter-Island Ferries">
                    <div class="ws-badge"><i class="fas fa-anchor"></i></div>
                </div>
                <div class="ws-content">
                    <h3>Inter-Island Ferries</h3>
                    <p>Affordable and reliable ferry services connecting Port Blair, Havelock, Neil Island and other Andaman destinations.</p>
                    <a href="inter-island-ferries.html" class="ws-btn">Book Now</a>
                </div>
            </div>
            <div class="water-sport-card">
                <div class="ws-img-wrap">
                    <img src="andaman4.jpeg" alt="Private Yachts">
                    <div class="ws-badge"><i class="fas fa-anchor"></i></div>
                </div>
                <div class="ws-content">
                    <h3>Private Yachts</h3>
                    <p>Charter a private yacht for an exclusive and luxurious sea experience around the stunning Andaman Islands.</p>
                    <a href="private-yachts.html" class="ws-btn">Book Now</a>
                </div>
            </div>
            <div class="water-sport-card">
                <div class="ws-img-wrap">
                    <img src="andaman5.jpeg" alt="Glass Bottom Boats">
                    <div class="ws-badge"><i class="fas fa-eye"></i></div>
                </div>
                <div class="ws-content">
                    <h3>Glass Bottom Boats</h3>
                    <p>View the stunning underwater coral reefs and marine life without getting wet on our glass bottom boats.</p>
                    <a href="glass-bottom-boats.html" class="ws-btn">Book Now</a>
                </div>
            </div>
        </div>'''

start = c.find('<div class="water-sports-grid">')
end = c.find('</section>', start)

if start != -1 and end != -1:
    c = c[:start] + new_grid + '\n    ' + c[end:]
    f = open('d:/JR technology/Royalwavejourney/index.html', 'w', encoding='utf-8')
    f.write(c)
    f.close()
    print('SUCCESS')
else:
    print('NOT FOUND', start, end)
