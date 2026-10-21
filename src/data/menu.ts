/* Menus transcribed from the client's own PDFs (MEK-Menu-v4F.pdf, MEK-Menu-Breakfast.pdf,
   MEK-Catering-Corporate.pdf) and the catering page, October 2026. Prices are the client's;
   anything the PDF layout left ambiguous carries a `confirm` note and should be checked
   against the printed menu before launch. Arabic names are the common Egyptian spellings. */

export type Item = {
  name: string;
  ar?: string;
  desc?: string;
  price?: string;            // "$19", "$8 | $14"
  tags?: string[];           // "Vegan", "Spicy", "Weekends", "Serves 4–5"
  addons?: string;           // "Add chicken +$4"
  confirm?: string;          // build note, never rendered
  slug?: string;             // glossary page in /dishes/
};
export type Section = { id: string; title: string; ar?: string; note?: string; price?: string; items: Item[] };

export const dineIn: Section[] = [
  {
    id: "starters", title: "Starters", ar: "مقبلات",
    items: [
      { name: "Tamaaya", ar: "طعمية", desc: "Egyptian fava bean falafel, tahina, balady bread.", price: "$12", tags: ["Vegan"], slug: "tamaaya" },
      { name: "Kobebah", ar: "كبيبة", desc: "Seasoned ground beef, nuts, bulgur wheat, balady bread.", price: "$10" },
      { name: "Samboosa", ar: "سمبوسة", desc: "Savoury phyllo pastry: one chicken, one beef, one cheese.", price: "$10" },
      { name: "Mombar", ar: "ممبار", desc: "Spicy, seasoned rice sausage, yogurt sauce.", price: "$16", tags: ["Spicy"], addons: "Add mombar +$4" },
      { name: "Calamari", desc: "Crispy fried squid, chilli flakes, garlic aioli.", price: "$19" },
      { name: "Breaded Shrimp", desc: "Crispy fried jumbo shrimp, garlic aioli.", price: "$17" },
      { name: "Pickled Eggplant", ar: "مخلل باذنجان", desc: "Fried eggplant, lemon, vinegar, garlic, chillis, olive oil, balady bread.", price: "$8", tags: ["Vegan"] },
      { name: "Mixed Mahashy", ar: "محشي", desc: "Zucchini, eggplant, bell pepper, cabbage and grape leaves stuffed with seasoned rice, herbed tomato sauce, yogurt dip.", price: "$18", addons: "Just grape leaves $16 · Just cabbage $16", slug: "mahshi" },
      { name: "Mussaka Masri", ar: "مسقعة", desc: "Baked eggplant, spiced garlic-tomato sauce, balady bread.", price: "$14", tags: ["Vegan"] },
    ],
  },
  {
    id: "dips", title: "Dips", ar: "مزّة", note: "All dips are served with fresh balady bread and crispy pita.",
    items: [
      { name: "Besara", ar: "بصارة", desc: "Fava bean dip with parsley, coriander and onion. Egypt's answer to hummus.", price: "$11", tags: ["Vegan"] },
      { name: "Hummus", ar: "حمص", price: "$11", tags: ["Vegan"] },
      { name: "Baba Ghanouj", ar: "بابا غنوج", price: "$11", tags: ["Vegan"] },
      { name: "Mini Dip Trio", price: "$19" },
      { name: "Large Dip Trio", price: "$29" },
    ],
  },
  {
    id: "soups", title: "Soups", ar: "شوربة",
    items: [
      { name: "3ats", ar: "عدس", desc: "Lentil soup, crispy pita chips, fried onions.", price: "$8", tags: ["Vegan"] },
      { name: "Kaware3", ar: "كوارع", desc: "Cow foot soup in bone broth. Packed with collagen, this traditional Egyptian soup is known as a 'miracle meal' for wellness.", price: "$18" },
      { name: "Lesan Asfour", ar: "لسان عصفور", desc: "Toasted orzo, tomato herb broth.", price: "$9", addons: "Add chicken +$4" },
    ],
  },
  {
    id: "salads", title: "Salads", ar: "سلطات", price: "Starter | Entrée", note: "Add chicken +$9 or steak +$10.",
    items: [
      { name: "Fattoush", ar: "فتوش", desc: "Romaine, cucumber, bell pepper, tomato, onion, pita chips, olive oil, lemon, pomegranate molasses, sumac.", price: "$8 | $14", tags: ["Vegan"] },
      { name: "Masrawy Salata", ar: "سلطة", desc: "Cucumber, tomato, bell pepper, parsley, olive oil, lemon.", price: "$9 | $15", tags: ["Vegan"] },
      { name: "Tabbouleh", ar: "تبولة", desc: "Parsley, tomato, bulgur wheat, olive oil, lemon.", price: "$9 | $15", tags: ["Vegan"] },
      { name: "Arugula", desc: "Baby arugula, cherry tomato, onion, walnuts, cranberry, olive oil, lemon, pomegranate molasses.", price: "$10 | $16", tags: ["Vegan"] },
    ],
  },
  {
    id: "sandwiches", title: "Sandwiches", ar: "ساندويتشات", note: "Served with Egyptian pickles and fries. Baguette sandwiches come as two soft baguettes; balady sandwiches come half or full.",
    items: [
      { name: "Beef Kofta", ar: "كفتة", desc: "Two soft baguettes, grass-fed beef, Egyptian spices, onions, parsley, tahina.", price: "$20" },
      { name: "Kebda", ar: "كبدة", desc: "Two soft baguettes, seared beef liver, chilli peppers, garlic, tahina, lemon.", price: "$20", tags: ["Spicy"] },
      { name: "Masrawy Fusion", desc: "Two soft baguettes, grilled chicken, sautéed peppers and onions, garlic aioli.", price: "$18", addons: "Substitute beef striploin or mixed +$2" },
      { name: "Ful", ar: "فول", desc: "Balady bread, braised smashed fava bean, salata, tahina.", price: "$7 | $12", tags: ["Vegan"], confirm: "half/full price pairing read from the PDF column order" },
      { name: "Pickled Eggplant", ar: "مخلل باذنجان", desc: "Balady bread, fried pickled eggplant, garlic vinaigrette.", price: "$8 | $13", tags: ["Vegan"], confirm: "half/full price pairing read from the PDF column order" },
      { name: "Tamaaya", ar: "طعمية", desc: "Balady bread, Egyptian fava bean falafel, salata, tahina.", price: "$9 | $14", tags: ["Vegan"], confirm: "half/full price pairing read from the PDF column order" },
    ],
  },
  {
    id: "beef", title: "Beef", ar: "لحمة", note: "All our beef is grass-fed, grass-finished, premium quality and locally sourced.",
    items: [
      { name: "Hawaoshi", ar: "حواوشي", desc: "Spiced ground beef stuffed in crispy balady bread, tahina. Served with fries and salata.", price: "$24", addons: "Just hawaoshi $18", slug: "hawawshi", confirm: "'Just Hawaoshi +$18' in the PDF read as the sandwich-only price" },
      { name: "Macarona Bechamel", ar: "مكرونة بشاميل", desc: "Penne, seasoned ground beef, béchamel, Canadian cheddar cheese.", price: "$18", addons: "Add chicken panne +$7", slug: "macarona-bechamel" },
      { name: "Kofta", ar: "كفتة", desc: "Ground beef skewers, Egyptian spices, rice or fries, salata, tahina.", price: "$20" },
      { name: "Kebda Eskandarani", ar: "كبدة إسكندراني", desc: "Seared beef liver, chilli peppers, garlic, balady bread, tahina, lemon.", price: "$20", tags: ["Spicy"], slug: "kebda-eskandarani" },
      { name: "Tarb", ar: "طرب", desc: "Ground beef skewers wrapped in caul fat, Egyptian spices, rice or fries, tahina, salata.", price: "$22" },
      { name: "Okra with Beef", ar: "بامية", desc: "Tomato garlic broth, white rice with sha3reya, salata.", price: "$24" },
      { name: "Beef Kabab", ar: "كباب", desc: "Grilled AAA grass-fed striploin, rice or fries, tahina, salata.", price: "$27" },
      { name: "Cow Foot Fatta", ar: "فتة كوارع", desc: "Fried balady bread, fried garlic vinegar, tomato sauce, white rice with sha3reya.", price: "$22", addons: "Add grape leaves or cabbage +$5" },
      { name: "Masrawy Mixed Grill", ar: "مشويات", desc: "Chicken tikka, beef kofta, lamb kabab and beef kabab with golden basmati rice or seasoned fries.", price: "$100", tags: ["Serves 4–5"], addons: "Add lamb chops +$20 · tarb +$10 · shish tawouk +$9" },
    ],
  },
  {
    id: "lamb", title: "Lamb", ar: "ضاني",
    items: [
      { name: "Lamb Shank Fatta", ar: "فتة موزة", desc: "Six-hour braise, spiced tomato sauce, fried balady bread, fried garlic vinegar, white rice with sha3reya.", price: "$26", addons: "Add lamb shank +$18 · grape leaves or cabbage +$5" },
      { name: "Lamb Kabab", ar: "كباب ضاني", desc: "Grilled boneless lamb leg, rice or fries, tahina, salata.", price: "$28" },
      { name: "Lamb Chops", ar: "ريش", desc: "Bone-in and char-grilled, rice or fries, tahina, salata.", price: "$32" },
    ],
  },
  {
    id: "chicken", title: "Chicken", ar: "فراخ", note: "Our locally sourced chicken is fed a special diet of non-GMO corn, giving it a distinct yellow, nutrient-rich skin and flavourful meat.",
    items: [
      { name: "Chicken Tikka", desc: "Grilled half chicken, Egyptian citrus marinade, rice or fries, garlic sauce, salata.", price: "$25" },
      { name: "Shish Tawouk", ar: "شيش طاووق", desc: "Skewered chicken breast, tangy Egyptian marinade, rice or fries, garlic sauce, salata.", price: "$24" },
      { name: "Chicken Panne", ar: "بانيه", desc: "Crispy fried chicken cutlet, rice or fries, garlic sauce, salata.", price: "$22" },
      { name: "Hamam Mahashy", ar: "حمام محشي", desc: "Whole braised pigeon, cracked wheat or rice filling, seasoned fries, tahina.", price: "$45", addons: "Two hamam for $80" },
      { name: "Masrawy Fusion", desc: "Grilled chicken thighs, golden basmati rice or fries, garlic sauce, hot sauce, candied carrots and cranberries.", price: "$18", addons: "Substitute beef striploin or mixed +$2" },
    ],
  },
  {
    id: "vegan", title: "Vegan and vegetarian", ar: "نباتي",
    items: [
      { name: "Koshary", ar: "كشري", desc: "Rice, lentils, pasta, chickpeas, fried onions, spiced tomato sauce, dakka (garlic vinegar), hot sauce.", price: "$13", tags: ["Vegan"], slug: "koshary" },
      { name: "Molekheya", ar: "ملوخية", desc: "Mallow leaf, house broth, roasted garlic, coriander, white rice with sha3reya.", price: "$16", addons: "Add grilled boneless chicken +$9 · chicken tikka +$17 · just molekheya $10", slug: "molokhia", confirm: "$16 read from the PDF column order; 'Just Molekheya +$10' read as the soup-only price" },
      { name: "Tamaaya Fusion", ar: "طعمية", desc: "Egyptian fava bean falafel, golden basmati rice, garlic sauce, hot sauce, candied carrots and cranberries.", price: "$16", tags: ["Vegan"], confirm: "$16 read from the PDF column order" },
      { name: "Ful Madames", ar: "فول مدمس", desc: "Braised and smashed fava beans, tahina, salata, balady bread.", price: "$10", tags: ["Vegan"] },
    ],
  },
  {
    id: "fish", title: "Fish", ar: "سمك", note: "Wild caught, flavourful and nutrient dense seafood, free from antibiotics, hormones and artificial feed.",
    items: [
      { name: "Whole Seabass", desc: "Oven grilled, wheat bran, Masrawy rice, salata, lemon.", price: "$34" },
      { name: "Haddock & Chips", desc: "Two crispy fried haddock, seasoned fries, tahina, lemon, salata.", price: "$22", addons: "Add haddock +$9" },
      { name: "Seafood Family Platter", desc: "Two whole seabass, crispy fried calamari and jumbo shrimp, golden basmati rice, mixed vegetables, tahina.", price: "$140", tags: ["Serves 3–4"] },
    ],
  },
  {
    id: "kids", title: "Kids", ar: "أطفال", note: "Served with a juice box.",
    items: [
      { name: "Lulu's Special", desc: "Molekheya, white rice with sha3reya.", price: "$12", addons: "Add chicken panne or grilled chicken +$7" },
      { name: "Kimo's Kofta", desc: "One beef kofta, seasoned fries.", price: "$14" },
      { name: "Petite Panne", desc: "Crispy fried chicken cutlet, seasoned fries.", price: "$13" },
    ],
  },
  {
    id: "sides", title: "Sides and sweets", ar: "إضافات وحلويات",
    items: [
      { name: "Seasoned Fries", price: "$6" },
      { name: "White Rice with Sha3reya", ar: "رز بالشعرية", price: "$6" },
      { name: "Golden Basmati Rice", price: "$5" },
      { name: "Balady Bread", ar: "عيش بلدي", price: "$3" },
      { name: "Kunafa", ar: "كنافة", desc: "Crisp kataifi pastry filled with cream, pistachio, syrup.", confirm: "dessert prices are not in the dine-in PDF" },
      { name: "Basbusa", ar: "بسبوسة", desc: "Sweet coconut semolina cake, pistachios.", confirm: "dessert prices are not in the dine-in PDF" },
      { name: "Om Ali", ar: "أم علي", desc: "Egyptian bread pudding, baked with milk, nuts and cream.", confirm: "dessert prices are not in the dine-in PDF" },
      { name: "Roz Bel Laban", ar: "رز باللبن", desc: "Egyptian rice pudding.", confirm: "dessert prices are not in the dine-in PDF" },
    ],
  },
];

export const brunch: Section[] = [
  {
    id: "plates", title: "Breakfast plates", ar: "فطار", note: "Served every day, 10am to 2pm.",
    items: [
      { name: "Basterma Balady", ar: "بيض بالبسطرمة", desc: "Three eggs scrambled with basterma (cured beef). Served with balady bread, home fries and feta mix.", price: "$17.25" },
      { name: "Sweet Cleopatra", ar: "فطير مشلتت", desc: "Feteer, the Egyptian layered pastry, served with feta mix and your choice of molasses and tahina, or natural honey.", price: "$17.25", slug: "feteer" },
      { name: "On the Nile", desc: "Ful and two hard-boiled eggs inside Egyptian tamaaya fried with sesame seeds. Served with balady bread, home fries and feta mix.", price: "$19.50", tags: ["Weekends only"] },
      { name: "Saba7 El-Kher", ar: "صباح الخير", desc: "Ful, two tamaaya and two eggs. Served with balady bread, home fries and feta mix.", price: "$18.50" },
      { name: "Masrawy Grand Breakfast", desc: "Ful, four tamaaya, four eggs of your choice, fries, pickled eggplant, arugula, pickles and balady bread.", price: "$40", tags: ["Serves 3–4"] },
      { name: "Eggs & Basterma Sandwich", desc: "Two eggs scrambled with basterma, in fresh fino bread.", price: "$13" },
      { name: "Spiced Beef Sausage", ar: "سجق", desc: "Served with tahina, torshy and balady bread.", price: "$13.50", addons: "Abu-Waleed style, served on fries $16" },
      { name: "Ful Madames", ar: "فول مدمس", desc: "Fava bean, salata, tahina, cumin. Served with balady bread.", price: "$10.50", tags: ["Vegan"] },
      { name: "Tajin Ful with Eggs", ar: "طاجن فول", price: "$15" },
      { name: "Tajin Ful with Sausage", ar: "طاجن فول بالسجق", price: "$17" },
      { name: "Shakshuka", ar: "شكشوكة", price: "$12" },
    ],
  },
  {
    id: "addons", title: "Add-ons", ar: "إضافات",
    items: [
      { name: "Tamaaya (3 pcs)", ar: "طعمية", price: "$8", tags: ["Vegan"] },
      { name: "Single Egg", price: "$2.25" },
      { name: "Two Eggs with Cheddar", price: "$5.75" },
      { name: "Two Scrambled Eggs with Basterma", price: "$10.50" },
      { name: "Two Scrambled Eggs with Sausage", price: "$12.50" },
      { name: "Two On the Nile Eggs", price: "$8" },
      { name: "Two Boiled Eggs Fried in Butter", ar: "بيض مدحرج", price: "$8" },
      { name: "Pickled Eggplant", price: "$7", tags: ["Vegan"] },
      { name: "Egyptian Feta Mix", price: "$5" },
    ],
  },
];

/* Corporate catering, priced per person (PP). */
export const corporate: Section[] = [
  {
    id: "wraps", title: "Wraps", price: "$18 per person", note: "Served in pita with sautéed peppers and onions and shredded lettuce, with your choice of salad.",
    items: [
      { name: "Chicken Shawarma Fusion", desc: "Chopped chicken thighs topped with garlic sauce." },
      { name: "Beef Shawarma Fusion", desc: "Chopped AAA top sirloin topped with tahina sauce." },
      { name: "Vegetarian", desc: "Fried Egyptian falafel topped with tahina.", tags: ["Vegan"] },
    ],
  },
  {
    id: "sandwiches", title: "Sandwiches", price: "$20 per person", note: "Served in soft fino baguette with onion and parsley, with your choice of salad.",
    items: [
      { name: "Grilled Chicken", desc: "Grilled chicken breast topped with garlic sauce." },
      { name: "Beef Kofta", desc: "Grilled ground beef skewers topped with tahina." },
      { name: "Vegetarian", desc: "Fried Egyptian falafel topped with tahina.", tags: ["Vegan"] },
    ],
  },
  {
    id: "bowls", title: "Bowls",
    items: [
      { name: "Shawarma Fusion Bowl", desc: "Golden basmati rice with your choice of protein, tahina, garlic sauce, hot sauce, sweet carrots and candied cranberry.", price: "Chicken $18 · Beef $20 · Falafel $16" },
      { name: "Vegan Koshari Bowl", desc: "Pasta, rice, lentils and chickpeas topped with savoury tomato sauce, caramelized onions, garlicky vinegar, hot sauce.", price: "$16", tags: ["Vegan"] },
    ],
  },
  {
    id: "entrees", title: "Entrées", note: "Per person.",
    items: [
      { name: "Chicken Skewers", desc: "Marinated chicken breast skewers with golden basmati rice, arugula salad, pita and tzatziki.", price: "$24" },
      { name: "Chicken Quarters", desc: "Grilled chicken leg and thigh with roasted mini potatoes and Masrawy salad.", price: "$22" },
      { name: "Chicken Shawarma Fusion", desc: "Golden basmati rice with chopped seasoned chicken thighs, tahina, garlic sauce, hot sauce, sweet carrots and candied cranberry, pita and hummus, fattoush.", price: "$22" },
      { name: "Chicken Panne", desc: "Breaded and fried chicken breast with buttery mashed potatoes, house gravy, arugula salad.", price: "$24" },
      { name: "Braised Lamb Shank (Fatta)", desc: "Fall-off-the-bone lamb shank braised in savoury tomato sauce, with small-grain sticky rice and kale salad.", price: "$26" },
      { name: "Beef Kofta", desc: "House-made ground beef skewers with roasted potato wedges, tahina and chickpea tabbouleh.", price: "$22" },
      { name: "Macarona Bechamel", desc: "Penne layered with house-made béchamel and ground beef, with grilled eggplant and Masrawy salad.", price: "$22" },
    ],
  },
  {
    id: "salads", title: "Salads", note: "Included with wraps and sandwiches.",
    items: [
      { name: "Masrawy Salad", desc: "Chopped cucumber, tomato, parsley, mint, sumac, oil and lemon vinaigrette." },
      { name: "Fattoush", desc: "Mixed greens, tomato, cucumber, green peppers, red onion, pita chips, olive oil and lemon, pomegranate molasses." },
      { name: "Chickpea Tabbouleh", desc: "Spiced chickpeas, parsley, tomato, cucumber, lemon and oregano vinaigrette." },
      { name: "Arugula Salad", desc: "Baby arugula, feta, tomato, olive, lemon and oregano vinaigrette." },
      { name: "Kale Salad", desc: "Baby kale, sliced apples, feta, honey mustard and lemon vinaigrette." },
    ],
  },
  {
    id: "desserts", title: "Desserts and drinks", note: "Per person.",
    items: [
      { name: "Basbusa", ar: "بسبوسة", desc: "Sweet coconut semolina cake topped with pistachios.", price: "$5" },
      { name: "Kunafa", ar: "كنافة", desc: "Sweet and crunchy kataifi pastry filled with cream, topped with pistachio.", price: "$5" },
      { name: "Zalabia", ar: "زلابية", desc: "Crispy, sweet fried dough puffs soaked in syrup.", price: "$3" },
      { name: "Baklava", ar: "بقلاوة", desc: "Flaky pastry stuffed with nuts, honey and syrup.", price: "$3" },
      { name: "Cookies and brownies", desc: "Chocolate chip, white chocolate macadamia, double chocolate; fudge brownie.", price: "$2–3" },
      { name: "Canned pop, still water", price: "$2" },
      { name: "Sparkling water (Perrier)", price: "$4" },
    ],
  },
];

/* Private and family catering: the dishes the client lists on the catering page, priced by tray on request. */
export const privateCatering: { title: string; ar?: string; items: string[] }[] = [
  { title: "Homestyle soups", ar: "شوربة", items: ["Lentil soup (3ats)", "Cream of chicken", "Lesan el asfour (chicken or beef add-on)", "Egyptian taro (coulas) soup", "Molekheya"] },
  { title: "Dips and salads", ar: "مزّة وسلطات", items: ["Appetizer platter", "Hummus", "Baba ghanoush", "Fattoush", "Potato salad", "Coleslaw", "Kale and apple salad", "Green salad", "Arugula salad (seasonal)"] },
  { title: "Egyptian classics", ar: "أكلات مصرية", items: ["Alexandria kebdah", "Daoud basha kofta", "Macarona bechamel", "Zucchini bechamel", "Mussaka masri", "Fatta Masrawy", "Masrawy fusion", "Chicken or veal panne", "Koshary Masrawy", "Masrawy okra"] },
  { title: "Roast, grill and BBQ", ar: "مشويات", items: ["Roast turkey (14 lb or 18 lb)", "Roast duck", "Masrawy grill (kofta or chicken tawook)", "Roast leg of lamb", "BBQ chicken", "Roast stuffed hamam", "Roast beef (about 5 lb)"] },
  { title: "Seafood", ar: "سمك", items: ["Alexandrian fish", "Grilled shrimp (0.5 kg or 1 kg)", "Shrimp and rice"] },
  { title: "Stuffed delights", ar: "محاشي", items: ["Goulash masri", "Stuffed cabbage rolls (4 lb or 7 lb)", "Kobeba", "Stuffed grape leaves (4 lb or 7 lb, vegetarian or beef)", "Mombar", "Stuffed mahashy"] },
  { title: "Desserts", ar: "حلويات", items: ["Atayef", "Kunafa", "Om Ali", "Baklava Masrawy", "Basbusa Masrawy", "Roz bel laban"] },
];

export const cateringTerms = [
  "Minimum 48 hours' notice; 24 hours' notice for cancellations, reductions or additions.",
  "Minimum order of 10 per menu item on the corporate menu.",
  "$300 minimum order for delivery. Delivery fees vary by location, from $10.",
  "Allow a 15-minute window before or after the requested delivery time.",
  "Catered items can be picked up free of charge from the restaurant.",
  "Corporate orders include disposable plates, cutlery, napkins and serving utensils. Set-up fees may apply.",
  "We accept credit cards, cash, cheque and Interac e-transfer.",
  "Prices are subject to applicable taxes and may change without notice.",
];

/* Signature dishes on the home page, in sofra order. Layers are placeholders cut from the
   client's photos until the generated master still is sliced (see work/beats.md). */
export const signature = [
  { slug: "macarona-bechamel", name: "Macarona bechamel", ar: "مكرونة بشاميل", desc: "Penne, seasoned beef and béchamel under Canadian cheddar, brought to the table in a clay pot.", price: "$18", layer: "layer-bechamel", img: "macarona-bechamel", x: "36%", y: "34%", w: "30%" },
  { slug: "koshary", name: "Koshary", ar: "كشري", desc: "Rice, lentils, pasta and chickpeas under spiced tomato sauce, fried onions and a splash of dakka.", price: "$13", layer: "layer-koshary", img: "koshary", x: "66%", y: "30%", w: "34%" },
  { slug: "lentil", name: "3ats, lentil soup", ar: "شوربة عدس", desc: "Red lentils, Egyptian spices, crispy pita chips and fried onions.", price: "$8", layer: "layer-lentil", img: "lentil-soup", x: "22%", y: "68%", w: "24%" },
  { slug: "tamaaya", name: "Kobebah", ar: "كبيبة", desc: "Seasoned beef and nuts in a bulgur shell, with balady bread.", price: "$10", layer: "layer-kobebah", img: "kobebah", x: "50%", y: "62%", w: "28%" },
  { slug: "feteer", name: "Sweet Cleopatra feteer", ar: "فطير مشلتت", desc: "Layered Egyptian pastry with molasses and tahina, or honey. Brunch, every day until two.", price: "$17.25", layer: "layer-feteer", img: "feteer-honey", x: "80%", y: "66%", w: "30%" },
  { slug: "brunch", name: "Basterma balady", ar: "بيض بالبسطرمة", desc: "Three eggs scrambled with cured beef, home fries, feta mix and balady bread.", price: "$17.25", layer: "layer-brunch", img: "brunch-plate", x: "88%", y: "22%", w: "20%" },
];
