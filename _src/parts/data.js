/* ---------- content (verbatim from artbyseemasethi.com) ---------- */
const COLL=[
  {id:'viraasat',name:'Viraasat',deva:'विरासत',img:'mumtaaz',line:'An Ode to our rich cultural heritage, crafted through the Glow of Tanjore.'},
  {id:'bhakti',name:'Bhakti',deva:'भक्ति',img:'kadambari',line:'Where inspiration becomes creation'},
  {id:'prakriti',name:'Prakriti',deva:'प्रकृति',img:'the-reminiscient-tiger',line:'A tribute to the wonders crafted by the greatest artist of all — Mother Nature herself.'},
  {id:'videshi',name:'Videshi',deva:'विदेशी',img:'nefrititi',line:'A Tribute to Majesty, Myth & Eternal Artistry of Egyptian Dynasty'}
];
const NAV=[['home','Home'],['viraasat','Viraasat','विरासत'],['prakriti','Prakriti','प्रकृति'],['videshi','Videshi','विदेशी'],['bhakti','Bhakti','भक्ति'],['about','About the Artist']];

const QUOTES=[
  ['It’s wonderful to see the beauty of our heritage in all its hues, encapsulated in the amazing Tanjore style of art, reflecting the myriad hued culture of our country of \'Bahuda\'.','Shovana Narayan'],
  ['Exquisite and extremely aesthetic work. Very impressive. Would love to see more whenever possible.','Devaki Sengupta'],
  ['I have never seen a contemporary artist use gold in such a beautiful way. Truly mesmerizing.','Gitanjali'],
  ['Your artwork reflects your dedication and the immense hard work behind every creation. Mesmerizing, and explained with such passion.','Amritansha'],
  ['Excellent paintings of monuments, deities, and nature, all brought to life using gold. Very fascinating, superb to watch.','Dr. Premchand'],
  ['Overwhelmed by the beauty and fine detailing. The thought behind each piece is superb. Many congratulations.','Mona Gupta'],
  ['Impossible to imagine the hard work and meditation behind each piece, each more glorious than the last. Mesmerizing again and again.','Dr. Abha Mangal'],
  ['Absolutely stunned by her imagination and the sheer breadth of her work across styles, cities, milieus, and themes.','Aseem Bhargava'],
  ['Very impressed with the use of the Tanjore medium to create such a wide variety of astonishing artworks. Each piece is a labour of love—truly unique.','M. Swaminathan']
];

/* [top%, left%, name, place, collection, artwork image, chapter id] */
const MAP_PTS=[
  [29,32,'The Qutb','New Delhi','viraasat','qutub','qutub'],
  [33,20,'Royal Coronation','Bikaner','viraasat','the-royal-coronation','anup-mahal'],
  [35,27,'Hawa Mahal','Jaipur','viraasat','wa-2025-12-07-17-24-20','hawa-mahal'],
  [42,23,'Royal Shield','Mewar','viraasat','untitled-design-13','royal-shield'],
  [48,16,'Tree of Life','Ahmedabad','viraasat','tree-of-life','siddi'],
  [57,27,'Ajanta Ellora','Bodhisattva Padmapani','viraasat','bodhisattva-padmapani','ajanta'],
  [34,35,'Taj Ensemble','Agra','viraasat','taj-ensemble','taj'],
  [24,42,'Great Himalayas','','prakriti','the-great-mountains','great-mountains'],
  [40,52,'Golden Buddha','Sarnath','bhakti','buddha','buddhist-grace'],
  [50,69,'Royal Bengal Tiger','Sunderbans','prakriti','royal-bengal-tiger','bengal-tiger'],
  [89,40,'Natraja','Tamil Nadu','bhakti','divine-dancer','shiva'],
  [97,43,'Moonstone','Anuradhapura','viraasat','untitled-design-12','ajanta'],
  [20,26,'Guru Gobind Singh','Amritsar','bhakti','img-20251102-wa0019','guru-gobind-singh'],
  [57,62,'Konark Wheel','Orissa','viraasat','untitled-design-14','konark']
];
const ROUND=new Set(['untitled-design-12','untitled-design-13','untitled-design-14']);

/* the hero's gallery wall; x = hidden on phones, z = zoom past the photographed frame */
const HERO_WALL=[
  {img:'nefrititi',size:'s',x:1},
  {img:'untitled-design-13',disc:1},
  {img:'mumtaaz',size:'m'},
  {img:'wa-2025-12-07-17-24-20',size:'l',z:1.48},
  {img:'kadambari',size:'m'},
  {img:'untitled-design-14',disc:1},
  {img:'the-reminiscient-tiger',size:'s',x:1}
];
/* original oval collection buttons */
const COLL_BTN={viraasat:'seema-sethi-taaj-collection',bhakti:'seema-sethi-raja-ravi-verma',prakriti:'seema-sethi-mother-nature-collection',videshi:'seema-sethi-egyptian-collection'};
const INDIA='227.822,63.335 215.884,64.816 195.815,80.809 197.159,87.984 179.343,90.9 171.988,87.529 170.643,79.845 163.422,80.02 165.128,93.27 146.79,93.703 121.821,86.002 100.271,74.179 106.398,62.15 90.884,51.603 89.61,41.434 93.782,43.975 98.261,41.155 93.118,31.532 102.741,22.739 104.772,15.626 97.113,12.953 82.998,15.439 68.397,2 52.291,3.126 47.145,9.69 58.727,18.336 55.858,21.297 52.997,21.914 52.814,35.434 63.024,41.67 34.41,80.535 22.268,79.373 14.591,89.807 26.46,109.512 17.324,113.75 7.186,112.018 2.289,116.552 10.581,125.209 9.784,132.863 23.954,145.028 24.25,144.8 37.85,140.7 39.582,147.898 39.855,169.221 58.216,223.805 62.682,232.394 68.741,252.441 73.594,258 82.205,257.339 83.845,251.986 98.311,235.424 98.311,233.897 98.015,226.243 98.357,225.15 102.366,211.822 100.157,197.766 101.957,191.866 134.397,168.287 140.16,160.633 143.737,154.984 153.578,152.455 162.076,137.579 167.497,134.252 175.448,136.394 168.5,105.412 168.181,93.908 177.999,95.798 179.594,102.428 184.265,104.774 200.826,105.002 199.186,109.284 200.621,116.712 204.198,130.198 210.167,121.153 208.959,113.112 214.745,113.727 218.96,99.625 222.879,88.44 234.451,81.128 238.711,74.794';

const HOME={
  museum:{title:'International Museum Day',date:"18th May, '26",paras:[
    'It\'s been a "Top of the World" feeling curating my maiden walk at National Museum on 18th May, \'26 celebrating International Museum Day.',
    '"Treasures of Tanjavur: Past, Present & Future" compared the favourite "Ram Darbar " in the two styles of Tanjavur techniques and the Mysore paintings and charming cuddly Navneet Krishna while detailing the layers of process involved in their creation.',
    'The high point was showing to the group the original shield of Maharana Sangram Singh II, with 8 paintings in gold in Mewar Miniature style..and the canvas in gold, it inspired me to create.'],
    close:'A once in a lifetime experience indeed!',
    photos:['wa-2026-05-26-10-58-25-1','wa-2026-05-26-10-58-24','wa-2026-05-26-10-58-25','wa-2026-05-26-10-58-24-2','wa-2026-05-26-10-58-26','wa-2026-05-26-10-58-27','wa-2026-05-26-10-58-24-1','wa-2026-05-26-10-58-26-1','wa-2026-05-26-10-58-26-2']},
  expo:{title:'Art India Expo Highlights',date:'2-8th Jan, AIFACS, New Delhi',photos:['img-20260103-wa0008','img-20260103-wa0007','img-20260104-wa0006','img-20260104-wa0002','img-20260104-wa0004','img-20260104-wa0003','img-20260104-wa0000','img-20260103-wa0009','img-20260103-wa0010','img-20260104-wa0005','img-20260110-wa0003','img-20260108-wa0018','img-20260108-wa0003','img-20260108-wa0007','img-20260108-wa0004']},
  shows:[['img-20251104-wa0001','India Art Fest 2023'],['img-20251116-wa0005','Ishatvam, Ghitorni'],['img-20251101-wa0011','Visual Art Gallery']],
  collectors:['img-20251102-wa0033','img-20251102-wa0035-1','img-20251102-wa0036','img-20251102-wa0029','img-20251102-wa0032','img-20251102-wa0034','img-20251116-wa0009','img-20251116-wa0019','wa-2025-12-07-19-59-17','wa-2025-12-07-19-59-16','wa-2025-12-07-19-59-15','wa-2025-12-07-19-59-15-1','wa-2025-12-07-19-59-16-1','wa-2025-12-07-19-59-16-2','wa-2025-12-17-19-18-31','wa-2026-04-27-15-55-17','wa-2026-04-27-15-55-16']
};

const PAGES={
viraasat:{name:'Viraasat',deva:'विरासत',kicker:'An Ode to our rich cultural heritage, crafted through the Glow of Tanjore.',title:'Viraasat',
  intro:['"Viraasat" is my tribute to the rich cultural heritage that we all have inherited over centuries - and a little piece of my own legacy.',
    'My fascination with the beauteous monuments began when I was a little girl touring the country with my parents during the annual school breaks. I marvelled at the frescos, the jaalis, the inlay work and was inspired to someday capture their essence in my own creations. As I began experimenting with mixed media, and dared to innovate using Tanjore techniques, I felt that if stones can speak, then so can my canvases.',
    'Recreating the pillars of the Qutb Minar, the Coronation Room at Anup Mahal, the jaalis at the Taj Mahal and the Siddi Saiyyad Mosque on my canvases in gold, I hope to reconnect the viewers with the forgotten skilled craftsmanship of numerous nameless artisans.'],
  chapters:[
    {id:'anup-mahal',title:'Anup Mahal, Bikaner',paras:['Having been born in Jaipur, I have a special connection with Rajasthan. I was awed by the princely states of Jodhpur, Udaipur and Bikaner, be it their majestic impressive forts or the starkness of their deserts.','The beautifully decorated throne room in Anup Mahal Palace in Junagadh fort enamoured me so much, that I simply had to capture it on my canvas! "The Royal Coronation" depicts the room at Anup Mahal, where the kings of Bikaner were coronated, amidst gilded arches and opulent walls. Little did I know in 2010, that my solo debut would be held at Bikaner House some day!'],
      works:[
        {img:'the-royal-coronation',head:'The Royal Coronation',desc:['Inspired by the intricate walls at the throne room, the vibrancy of colours and the romance of the royalty - this piece of art is an embellishment on canvas with gold foil used in Tanjore art form. It is my adaptation of royalty in a frame.'],title:'The Royal Coronation',size:'18 x 25 inches (without frame)',medium:'Gold foil work with semi precious stones',year:'2010'},
        {img:'the-durbar-hall',head:'The Durbar Hall',desc:['The canvas captures the durbar hall with enamelled walls, mirrors and semi-precious stones.'],title:'The Durbar Hall',size:'18 x 12 inches (without frame)',medium:'Gold foil work and water colour',year:'2010'}]},
    {id:'taj',band:'ub-taj',title:'The Taj Collection',paras:['Shahjahan was the fifth emperor of Mughal empire (1628–1658) and it is under him that the Mughals reached the peak of their architectural achievements and cultural glory. Mumtaaz, his favourite queen was bestowed the title by him… Mallika-i-jahan (queen of the world), highest honour of the land for her trustworthiness and heart of gold. Taj mahal was built as a tomb for Mumtaaz by Shahjahan as a mark of his undying love.','The self-made canvases in Tanjore style, with blended water colours, oils and mixed media are my attempt to capture the essence of this exquisite mausoleum.'],
      works:[
        {img:'taj-ensemble',head:'The Taj Ensemble',desc:['A grand composition that brings together the Taj’s most iconic elements—its domes, arches, jaalis, and reflective symmetry. This piece captures the monument the way the world first remembers it: majestic, serene, and impossibly perfect. A centerpiece for collectors who want the full presence of the Taj in a single frame.'],title:'The Taj Ensemble',size:'20 x 22 inches (without frame)',medium:'Gold foil work and water colours',year:'2009'},
        {img:'shahjahan',tag:'The visionary behind the world’s greatest ode to love.',head:'Shah Jahan',desc:['This portrait honors Shah Jahan as both emperor and artist—an aesthete who imagined beauty so enduring that it outlived centuries. The artwork offers a regal portrayal in rich textures and gilded accents, capturing his legacy, ambition, and profound devotion.'],title:'Shah Jahan',size:'11 x 14 inches (without frame)',medium:'Oil paints and Tanjore style work with semi-precious stones and gold foil work.',year:'2009'},
        {img:'mumtaaz',tag:'Grace immortalized in gold and marble tones.',head:'Mumtaz Mahal',desc:['A tribute to Mumtaz—the muse, the heartbeat, the inspiration. This piece reflects her elegance, softness, and the quiet strength that inspired the Taj Mahal’s creation. A luminous blend of femininity and heritage, crafted to evoke emotion with every glance.'],title:'Mumtaz Mahal',size:'11 x 14 inches (without frame)',medium:'Oil paints and Tanjore style work with semi-precious stones and gold foil work.',year:'2009'}]},
    {id:'jaalis',band:'ub-textile',title:'The Jaalis of Taj',grid:true,
      works:[
        {img:'taj-jaali-sitara',title:'Taj Jaali – Sitara',size:'10 x 12 inches (without frame)',medium:'Gold foil work and water colours',year:'2008'},
        {img:'taj-jaali-noor',title:'Taj Jaali – Noor',size:'10 x 12 inches (without frame)',medium:'Gold foil work and water colours',year:'2008'},
        {img:'screenshot-from-2025-11-24-12-58-02',title:'Taj Jaali – Guldasta',size:'10 x 12 inches (without frame)',medium:'Gold foil work and water colours',year:'2023'},
        {img:'screenshot-from-2025-11-24-18-19-18',title:'Taj Jaali – Madhuban',size:'10 x 12 inches (without frame)',medium:'Gold foil work and water colours',year:'2023'}]},
    {id:'siddi',tag:'When Architecture Breathes Art',title:'Siddi Sayyad Mosque',paras:['Inspired by the jaali from Siddi Sayyed Mosque in Ahmedabad, built in 16th century, the design incorporates icons of both Hinduism and Islam. The tree is unique to Hinduism and the date palm is symbolic of the Islamic religion – testimony to the times of peaceful coexistence and harmony of the religions.','Personally, during COVID times, it was a symbol of abundance in our lives – to treasure with deep gratitude all that we have, with love and respect for one and all.'],
      works:[
        {img:'tree-of-life',title:'The Tree of Life',size:'24 x 18 inches (without frame)',medium:'Tanjore foil work and water colours',year:'2020'},
        {img:'wa-2025-12-09-23-32-55',title:'Confluence',size:'17 x 11 inches (without frame)',medium:'Mixed media and Tanjore foil work'},
        {img:'wa-2025-12-07-17-18-58',title:'Mosaic Maze Jaali',size:'17 x 11 inches (without frame)',medium:'Mixed media and Tanjore foil work'}]},
    {id:'ajanta',tag:'Art that reflects the quiet strength and boundless compassion of the Enlightened One.',title:'Ajanta Ellora Caves',paras:['I remember visiting the Ajanta caves as a little girl, and I was completely mesmerised with the intricacy and detailing inside the caves. After many decades, I revisited the caves in my mind, and decided to recreate them using my skill set. I used oil paints on a hand-made canvas with a knife technique to texturize the background. All the jewels were brought to life using the Tanjore technique of using gem stones and covering them with gold foil. It is indeed a pity that the frescoes at Ajanta are now almost cordoned off to protect what is left in the caves from any further denudation.'],
      works:[
        {img:'bodhisattva-padmapani',head:'Bodhisattva Padmapani',desc:['This art work is inspired by the Bodhisattva Padmapani panel at the Ajanta caves (Cave No 1) which was created in the 6th Century in the heart of the Deccan Plateau.'],title:'The Crown Prince',size:'18 x 24 inches (without frame)',medium:'Knife with Oil Painting',year:'2003'},
        {img:'bathing-beauties',head:'Bathing Beauties',desc:['Inspired by the art in the Ajanta Cave No. 17, this canvas portrays the age-old practice of beautifying the royalty. After the royal bath, the maids are pampering the Princess with a fan in their hands and sheer admiration in their eyes. The women were dressed in sheer, a translucent material which was in vogue then.'],title:'Bathing Beauties',size:'18 x 24 inches (without frame)',medium:'Gold foil and oil painting',year:'2003'},
        {img:'untitled-design-12',round:true,head:'The Moonstone',desc:['Inspired by the beautiful stone art at Anandpuram, Sri Lanka, which is a UNESCO site with a Buddha Temple. The stone engravings of horses, elephants, geese, lotus petals, and peacock fascinated me, symbolising speed, wisdom, openness and beauty in our lives.'],title:'Moonstone',size:'36 inches diameter',medium:'Oils and paste work with powdered clay',year:'2022'}]},
    {id:'qutub',title:'The Qutub',
      works:[{img:'qutub',title:'The Qutub',desc:['The Qutb Minar, the tallest stone tower in the world (72.5 mtrs) beckoned me with its commanding architecture, its expanse within its compound showcasing the might of the many Delhi Sultanate rulers. For the first time in the 14th century, red and white stones were used in the South gateway of the Qutb complex by Allauddin and this beautiful combination inspired me to create this canvas. The lotus roundels on the marble arches and kalash in the pillars are noteworthy Hindu contributions by the artisans to Islamic architecture. The lowest storey of Qutb Minar, has angular flanges and rounded flutes alternating with one another. Also the jaalis forming atop each floor with beautiful carvings near the balconies inspired the side panels on the canvas. Personally, the compound area in the Qutb complex is my favourite area, as Razia sultan – the first female Muslim ruler of the subcontinent, had presented herself here, donning in red, as the rightful heir to the throne.'],noPlacard:true}]},
    {id:'jharokha',title:'The Jharokha Collection',grid:true,
      works:[
        {img:'untitled-design-4',title:'Qutb Minar',size:'8 x 12 inches (without frame)',medium:'Tanjore foil work and water colour',year:'2024'},
        {img:'wa-2025-12-07-18-44-12',title:'Bibi ka Makbara',size:'8 x 12 inches (without frame)',medium:'Tanjore foil work and water colour',year:'2024'},
        {img:'wa-2025-12-07-18-44-13',title:'Jaisalmer Fort',size:'8 x 12 inches (without frame)',medium:'Tanjore foil work and water colour',year:'2024'}]},
    {id:'ahmedabad',tag:'Where Craft Meets Cosmos',title:'Ahmedabad',grid:true,cols2:true,
      works:[
        {img:'jaali-champaner',title:'Jaali Champaner',size:'8x12 inches (without frame)',medium:'Mixed Media',year:'2024'},
        {img:'mosque-jaali',title:'Mosque Jaali',size:'8x12 inches (without frame)',medium:'Mixed Media',year:'2024'}]},
    {id:'hawa-mahal',tag:'The Crowning Glory',title:'Hawa Mahal',
      works:[{img:'wa-2025-12-07-17-24-20',desc:['The crowning glory captures the shimmering facade of Hawa Mahal, Jaipur. This palace of winds not only brought in the coolest winds but also presented a peep into the outside world for the women folk, for whom it was built in 1799 by Maharaja Sawai Pratap Singh. The facade also resembles the Mohan Mukut as the ramps would lead up to the shrine of Lord Krishna on the 5th floor of the palace.'],title:'Hawa Mahal',size:'43 x 45 inches inches (without frame)',medium:'Mixed Media and Tanjore style work with gold foil',year:'2023'}]},
    {id:'konark',title:'The Konark Wheel',
      works:[{img:'untitled-design-14',round:true,desc:['Inspired by the majestic Konark Sun Temple, this 36-inch Konark Wheel is a homage to one of India’s most iconic symbols of time, celestial rhythm, and architectural brilliance. The wheel, historically representing the cycle of life and the precision of ancient Indian science, is reimagined here through the opulence of Tanjore gold-foil work and richly layered oil paints. Every spoke, motif, and carving is meticulously highlighted to echo the depth and grandeur of the original stone sculpture. The interplay of gold and colour brings a luminous, almost divine radiance, transforming the wheel into a living mandala of movement and light. This piece stands as a celebration of heritage—timeless, resplendent, and reborn through contemporary hands.'],title:'The Konark Wheel',size:'36 inches diameter (without frame)',medium:'Multilayered canvas with gold foils and oils',year:'2025'}],
      making:{title:'The Making of the Konark Wheel',imgs:['untitled-design-15'],wide:true}},
    {id:'royal-shield',title:'The Royal Shield',
      works:[{img:'untitled-design-13',round:true,desc:['Maharana Sangram Singh II of Mewar wore an ornate shield made of gold and rhinoceros skin, a shield truly befitting the grandeur of his persona. When I saw the original shield at the National Museum, I was fascinated to delve deeper into the story depicted on the shield. Through nine scenarios beautifully embossed on the shield, the artisans depict the laurels of the king as he goes on a hunting expedition with his entourage. The journey takes them through forests and villages, crossing dams and winning fierce fights, with the soldiers taking refuge in trees and even sitting inside the cage to hunt the tiger. The company is rewarded by the royal family, awaiting to receive them at the doorstep with aarti thalis.'],title:'The Royal Shield',size:'36 inches diameter (without frame)',medium:'Gold foil work and oils',year:'2022'}]},
    {id:'stepwell',tag:'Inspired by the Panna Meena Kund',title:'Stepwell',
      works:[{img:'stepwell',desc:['Inspired by the Panna Meena Kund, Amer, Jaipur, so named because of the contrast of the yellow walls and emerald green water, present all around the year. Built by an eunuch in the court of Raja of Amer in the 16th century for the convenience of the public, this painting is a tribute to their thoughtfulness and attitude. Here I have used a three-layered canvas to bring out depth, dimension, and symmetry of architectural beauty and oil paints to enhance the effects.'],title:'Stepwell',size:'24 x 33 inches inches (without frame)',medium:'Oil painting with three-tier canvas',year:'2021'}]},
    {id:'solo-debut',title:'Solo Debut',sub:'Bikaner House | 27th March 2023',
      gallery:['wa-2025-12-18-19-12-49','wa-2025-12-18-19-12-49-2','wa-2025-12-18-19-12-49-1','wa-2025-12-18-19-12-49-3','wa-2025-12-18-19-12-50-1','wa-2025-12-18-19-12-50-2','wa-2025-12-18-19-12-50','wa-2025-12-18-19-12-50-3','wa-2025-12-18-19-12-51','wa-2025-12-18-19-12-51-1','wa-2025-12-18-19-12-59','wa-2025-12-18-19-12-51-2','wa-2025-12-27-11-53-27','wa-2025-12-27-11-53-26']}
  ],
  cta:{title:'A Collection Beyond Time',text:['Each artwork in the Viraasat Collection carries a piece of history and the unmistakable glow of Tanjore. If you wish to collect these timeless pieces of heritage, connect with me.']}},

prakriti:{name:'Prakriti',deva:'प्रकृति',banner:'ub-tiger',kicker:'A tribute to the wonders crafted by the greatest artist of all — Mother Nature herself.',title:'Prakriti se Prerit',
  intro:['Going beyond the conventional Tanjore painting themes of adorning gods and goddesses, and even the architectural spectacles that inspired me, I challenged myself to capture in gold the beauty of nature as well. None of the wonders of the world can match the marvels made by Mother Nature, and beauty of the creatures that roam the planet amongst us.'],
  chapters:[
    {id:'bengal-tiger',title:'The Royal Bengal Tiger',
      works:[{img:'royal-bengal-tiger',desc:['This artwork captures the regal stance of the Royal Bengal Tiger — fierce, dignified, and deeply rooted in India’s wilderness heritage. Layered textures and metallic highlights bring alive the tiger’s commanding aura, making it a striking centrepiece for any collection.'],title:'The Royal Bengal Tiger',size:'30 x 23 inches (without frame)',medium:'Mixed Media',year:'2009'}]},
    {id:'reminiscent-tiger',title:'The Reminiscent Tiger',
      works:[{img:'the-reminiscient-tiger',verse:['The fiercest too have a story to tell','Gazing at my own reflection','I lay to rest, I wonder','The glory days I reminisce','‘afore the days of plunder','When a tail’s brush would startle','Creatures big and small','But now the tides have turned','And I fear my own fall','I fear the fate of my fellows','I tremble at his sight','For his greed, steel and foolishness','Belittle my majesty and might','I yearn the freedom to roar','And parade my lands with pride','I fail to fathom his supremacy','When all he created was divide'],title:'The Reminiscent Tiger',size:'36 x 43 inches (without frame)',medium:'Mixed Media',year:'2018'}],
      making:{title:'The Making of the Tiger',imgs:['untitled-design-3'],wide:true}},
    {id:'great-mountains',tag:'The stillness and grandeur of Earth’s towering sculptures',title:'The Great Mountains',
      works:[{img:'the-great-mountains',desc:['It is a canvas in oils with the rugged terrain highlighted using knife technique and the gleaming rays of the sun on the tip of the peaks welcoming the fresh start of a new day. The mountains standing serene and imperturbable presents a diversity as the shadows subtly shift in the hue during the day. Those who can enjoy the diversity that is present in our life and discover its greatest value, are the Masters of life.'],title:'The Great Mountains',size:'31 x 43 inches (without frame)',medium:'Mixed Media',year:'2019'}]},
    {id:'galloping',tag:'A celebration of speed, freedom, and raw energy',title:'The Galloping Horses (Magnificent Seven)',
      works:[{img:'magnificient-seven',desc:['The beautiful beasts gracefully traverse the tides, the wind rustling through their manes, as the sun breaks through and brings a new dawn. This oil on canvas, with a touch of gold on the majestic seven stallions captures the glimmer of a new day. Must keep forging ahead!'],title:'The Galloping Seven',size:'44 x 25 inches (without frame)',medium:'Mixed Media',year:'2019'}]}
  ],
  cta:{title:'A Collection That Celebrates Earth’s Greatest Masterpieces',text:['“Prakriti se Prerit” is a reminder that every creature, every mountain, and every wild spirit is a marvel beyond human creation. Through mixed media and a Tanjore-inspired glow, these artworks honor that wonder — preserving it in strokes of gold and texture.']}},

videshi:{name:'Videshi',deva:'विदेशी',banner:'ub-egypt',kicker:'A Tribute to Majesty, Myth & Eternal Artistry of',title:'Egyptian Dynasty',
  intro:['The Egyptian dynasty, the world\'s earliest civilization, boasts of resplendent art, artifacts, and architecture with a mysticism rarely matched by any other. From the gods they worshipped, to the power of the pharaoh, from the gigantic pyramids, to the rituals of mummification. I\'ve always been captivated by the Egyptian artisan skill and portrayals of their rich civilization. It was almost as if the mysticism of their art urged to capture their elements on my canvases as a tribute to them.'],
  chapters:[
    {id:'chair',title:'Tutankhamun\'s Chair',
      works:[{img:'untitled-design',desc:['This artwork reimagines the legendary throne of Tutankhamun through exquisite Tanjore craftsmanship, rich gold leaf, and ornate detailing. Every motif—etched, layered, and illuminated—captures the opulence and divine authority of the boy king’s royal seat.'],title:'Tutankhamun\'s Chair',size:'10 x 12 inches (without frame)',medium:'Mixed Media',year:'2014'}]},
    {id:'royal-couple',title:'The Royal Couple',
      works:[{img:'the-royal-couple',desc:['A celebration of timeless love and regal harmony, this piece brings the Egyptian royal couple to life with intricate Tanjore gold work and luminous textures. Their graceful forms, adorned with symbolic motifs, radiate beauty, power, and the eternal elegance of ancient royalty.'],title:'The Royal Couple',size:'10 x 12 inches (without frame)',medium:'Mixed Media',year:'2014'}]},
    {id:'figurines',title:'Art preserves what time longs to forget; craftsmanship gives it a soul.',italic:true,paras:['With the art of metal casting at all time high, the figurines in gold were made using lost wax method. Here I have used the traditional style of Tanjore art form with gold foil on canvas to embellish the royal art forms.','The Statuette of Amun (The hidden one) is shown in his traditional pose with left leg forward, identified by his characteristic flat-topped crown, gods braided beard and sickle sword in his right hand. ( 740-725 BC).','The local God harsaphes, Ram Diety, appears in the form of ram-headed man with cork screw horns and simply clad in wrap around kilt.'],grid:true,
      works:[
        {img:'tutankhamun',title:'Tutankhamun',size:'6.5 x 12 inches (without frame)',medium:'Mixed Media',year:'2012'},
        {img:'sarcophagus',title:'Sacrophagus',size:'6.5 x 12 inches (without frame)',medium:'Mixed Media',year:'2012'},
        {img:'amun',title:'Amun',size:'4 x 7.5 inches (without frame)',medium:'Mixed Media',year:'2013'},
        {img:'ram-deity',title:'Ram headed diety',size:'4 x 7.5 inches (without frame)',medium:'Mixed Media',year:'2013'}]},
    {id:'nefertiti',title:'Nefertiti',
      works:[{img:'nefrititi',desc:['This canvas is inspired by a painted stucco- coated limestone bust of Nefertiti, the great royal wife of Egyptian pharaoh Akhenaten.','The oil painting is embellished in gold foil jewellery to enhance the crown and neckline.','Her name in English means “The beautiful (or perfect) woman has come.” She had the rare skill of reading and writing hieroglyphs and is said to have reigned besides the pharaoh towards eighteenth dynasty.'],title:'Nefertiti',size:'8 x 12 inches (without frame)',medium:'Mixed Media',year:'2012'}]},
    {id:'sandals',title:'Tutankhamun\'s Sandals',
      works:[{img:'untitled-design-1',desc:['Inspired by the opulence of ancient Egypt, this Tanjore rendition of Tutankhamun’s ceremonial slippers transforms a royal artifact into a richly textured artwork. The intricate gold detailing and stylized motifs echo the young pharaoh’s grandeur, celebrating the mastery and symbolism embedded in every regal possession he once wore.'],title:'Tutankhamun\'s Sandals',size:'8 x 12 inches',medium:'Mixed media',year:'2023'}]},
    {id:'bracelet',title:'The Queen\'s Bracelet',
      works:[{img:'untitled-design-2',desc:['This Tanjore interpretation of the Queen’s bracelet revives the splendour of ancient Egyptian adornment, where jewellery was both ornament and sacred symbol. With its vivid colours, raised detailing, and the regal winged motif at its heart, the piece captures the power, grace, and divine protection embodied by the queens of the Nile.'],title:'The Queen\'s Bracelet',size:'8 x 8 inches (semicircular canvas)',medium:'Mixed media',year:'2023'}],
      making:{title:'The Making of the Queen\'s Bracelet',imgs:['bracelet-making-3','bracelet-making-4','bracelet-making-5']}},
    {id:'necklace',title:'Queen\'s Necklace',
      works:[
        {img:'queens-necklace',desc:['This Tanjore painting depicts a regal bird-shaped necklace, its wings spread wide in a gesture of power and protection. Crafted in luminous gold, it mirrors the grandeur of the elites of the world’s earliest civilization, designed to grace and flatter their commanding necklines.'],title:'The Necklace',size:'9.5 x 11 inches (without frame)',medium:'Mixed Media',year:'2023'},
        {img:'egyptian-hawk',head:'Egyptian Hawk',title:'Egyptian Hawk',size:'6 x 8 inches (without frame)',medium:'Mixed Media',year:'2023'}]}
  ],
  cta:{title:'A Collection That Celebrates the Royalty of the World\'s Oldest Civilisation',text:['In every stroke of gold, echoes of an ancient world rise again. May these artworks carry forward the magnificence of a civilization that still leaves us in awe']}},

bhakti:{name:'Bhakti',deva:'भक्ति',kicker:'Where inspiration becomes creation',title:'Bhakti',
  intro:['Art is never born in isolation. It grows from echoes—of masters, of cultures, of civilizations, of stories that have lived far before us. Bhakti Collection is my tribute to those divine echoes. It is a collection shaped by the brilliance of the cosmic and enlightened ones.'],
  chapters:[
    {id:'buddhist-grace',tag:'Art that reflects the quiet strength and boundless compassion of the Enlightened One.',title:'Buddhist Grace',
      works:[{img:'buddha',head:'Buddha',desc:['Inspired by the peaceful meditative posture of Gautama Buddha, this artwork captures the first sermon delivered by the Buddha at the Deer Park in Sarnath, near Varanasi. The Buddha is seated in the Padmasana posture with his hands in the Dharmachakra Pravartana Mudra, literally the mudra of "turning the wheel of Dharma" by means of teaching. He is delivering the first sermon to the five disciples seated below with the Dharmachakra in the centre. The wheel is flanked by a couchant deer, symbolizing the Deer Park (Mrigadavv) at Sarnath, where the event took place.'],title:'Buddha',size:'10 x 16 inches (without frame)',medium:'Mixed media',year:'2010'}]},
    {id:'guru-gobind-singh',title:'Guru Gobind Singh Ji',
      works:[{img:'img-20251102-wa0019',desc:['This Tanjore painting of Guru Gobind Singh ji captures the Warrior Saint in a moment of majestic valour, mounted upon his steed with regal authority. His sword, raised in righteous courage, reflects the indomitable spirit with which he protected Dharma and humanity. Embellished with intricate gold work and traditional detailing, the artwork honours his grace, strength, and divine leadership. It stands as a tribute to the eternal ideals of bravery, sacrifice, and spiritual wisdom he embodied.'],title:'Guru Gobind Singh Ji',size:'10 x 16 inches (without frame)',medium:'Mixed Media',year:'2024'}]},
    {id:'krishna-leela',tag:'Visual hymns inspired by ISKCON’s spiritual legacy.',title:'Krishna Leela',
      works:[{img:'hero-banners',desc:['A very early work of mine that was inspired by the beauteous ISKCON paintings of Lord Krishna. The Canvas depicts in oils Krishna with Radha and Gopis engaged in loving pastime of his eternal companions, enjoying the lilting music as they traverse the gentle current of Yamuna river. The decorated boat and jewels in gold foils and gemstones adds to the glitter of the scenic journey. May we all sail through always, with joy and love in the core of our hearts, making each moment special.'],title:'Krishna Leela',size:'29 x 20 inches (without frame)',medium:'Mixed Media',year:'2008'}]},
    {id:'shiva',tag:'Inspired by the cosmic dance of Natraja',pre:'The Divine Dancer',title:'Shiva',
      works:[{img:'divine-dancer',desc:['Inspired by a 10th century Chola dynasty bronze sculpture of Nataraja, the Lord of the Dance, this art work has been created with oil paints on a handmade canvas, where elements have been embossed with gold foil.','Nataraja is depicted encircled in a ring of fire, with his left foot raised and hair streaming out from either side of his head. A small image of Ganga is placed symbolising the legend that when the great river was brought to earth the God received the shock on his own head. The dwarf, a representation of evil or ignorance is under the right foot.','Made by the traditional lost wax method, do admire the original in the Bronze gallery of National Museum, New Delhi.'],title:'The Divine Dancer',size:'15 x 19 inches (without frame)',medium:'Gold Foil and Oil Painting',year:'2008'}]},
    {id:'ravi-varma',title:'The Charismatic Raja Ravi Varma',
      works:[
        {img:'kadambari',head:'Kadambari',desc:['The Canvas in oil, inspired by Kadambari, is a tribute to the grand Maestro Raja Ravi Verma. With gold foils highlighting her rich silk drapes and finery, Kadambari is submersed in the moment, her soulful renditions reminiscent of the simplicity of life. Art, Music and Culture transcend all boundaries and unify hearts. Humanity today needs a gentle reminder that war and destruction need to be shunned, while peace and harmony must prevail. May Kadambari\'s melody invoke compassion, wisdom and the very best in each one of us.'],title:'Kadambari',size:'20 x 29 inches (without frame)',medium:'Mixed Media',year:'2022'},
        {img:'sounds-of-silence',head:'Sounds of Silence',desc:['An adoring gaze of a handsome youth, a shy blush of an angelic face, racing hearts, falling petals and the sublime glimmer of gold at twilight. The damsel’s drape and jewels have been enhanced using gold foil.'],title:'Sounds of Silence',size:'20 x 29 inches (without frame)',medium:'Mixed Media',year:'2021'}]},
    {id:'radha-krishna',title:'Radha Krishna',
      works:[{img:'screenshot-from-2025-12-03-18-37-09',desc:['This watercolour painting of Radha and Krishna captures their divine harmony in soft, ethereal hues. Each pearl in the artwork has been meticulously highlighted seven times, creating a delicate embossed effect that brings a gentle luminosity to the composition. The tenderness in their expressions and the shimmering details evoke a sense of serenity, devotion, and timeless love. It is a celebration of the divine bond that continues to inspire hearts across generations.'],title:'Radha Krishna',size:'12 x 14 inches (without frame)',medium:'Water Colours',year:'1987'}]}
  ],
  cta:{title:'Inspired by the Divine Grace',text:['If a piece in Prerna Kala has spoken to your heart or sparked a vision of your own, I would be honoured to bring that inspiration to life for you. Each commissioned artwork is crafted with the same devotion, detail, and reverence for heritage that defines this collection. Share your idea with me, and together we can create a bespoke masterpiece that is uniquely and beautifully yours.']}}
};

const ABOUT={
  intro:'Seema Sethi’s artistic odyssey is shaped by a lifelong fascination with history, heritage, and the quiet stories objects carry across time. Her diverse career—spanning education, leadership, industry, and museum research—reflects the same layered depth found in her artworks. Every chapter of her life has added a distinct texture to her creative voice.',
  timeline:[
    ['1987','Seema began her professional journey as a lecturer at Jai Hind College, Mumbai in 1987, nurturing young minds and cultivating a disciplined, intellectual lens that continues to inform her artistry. After moving to New Delhi in 1989, she taught as a PGT Economics educator and went on to become the Vice Principal of The Banyan Tree School in 1995. These formative academic years instilled in her a love for scholarship, structure, and reflection—elements that quietly anchor her creative process today.'],
    ['1999','In 1999, Seema transitioned into the chemical manufacturing industry, overseeing production units in Gurgaon and Bhiwadi, Rajasthan. This phase sharpened her operational clarity, precision, and instinct for design thinking. The discipline of industry and the imagination of art found a rare harmony within her practice, visible today in the meticulous detailing and technical finesse of her Tanjore and mixed-media work.'],
    ['2013','Since 2013, Seema has served as a volunteer guide at the National Museum, Janpath, New Delhi—an experience that profoundly deepened her engagement with cultural history. Guiding visitors through India’s artistic legacy broadened her understanding of iconography, symbolism, materials, and craftsmanship. This immersion in heritage continues to shape her artistic philosophy, fueling her desire to preserve and reinterpret the world’s most compelling stories through her canvases.']
  ],
  venues:[
    ['Amaltas Gallery, Gurugram',['img-20250520-wa0002']],
    ['Ishatvam, Ghitorni',['img-20251116-wa0005']],
    ['India Art Fest 2022',['img-20251104-wa0003-1']],
    ['Awadh Art Festival 2024',['img-20251116-wa0000']],
    ['Imagine Art Fest 2024',['img-20251101-wa0000','img-20251101-wa0002']],
    ['India Art Fest 2023',['img-20251104-wa0004-1','img-20251104-wa0001','img-20251104-wa0000']],
    ['Kolkata Int Art Fest\'22',['img-20251102-wa0026','img-20251102-wa0027']],
    ['Her Vision, Her Voice (TVG Mall)',['img-20251116-wa0006']],
    ['October Sonata, Russian House',['img-20251102-wa0005','img-20251102-wa0008','img-20251101-wa0008-1','img-20251101-wa0009-2','img-20250520-wa0000','img-20251101-wa0007']],
    ['Rukis Art Gallery, Haus Khas',['img-20251101-wa0005-1','wa-2025-12-01-10-40-16-1','wa-2025-12-01-10-40-16-2','wa-2025-12-01-10-40-16','wa-2025-12-01-10-40-15','wa-2025-12-01-10-40-15-1']],
    ['Visual Art Gallery',['img-20251101-wa0011','img-20251101-wa0012-1']]
  ]
};

