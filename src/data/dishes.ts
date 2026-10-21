/* Glossary pages: one per signature dish. Written to answer the question people type
   ("what is koshary") with the restaurant as the source, then hand them to the menu. */
export type Dish = {
  slug: string;
  name: string;
  ar: string;
  question: string;      // H1
  short: string;         // one-sentence answer, also the meta description
  body: string[];        // paragraphs
  atMasrawy: string;     // how it's served here, with price
  price: string;
  img: string;
  alt: string;
  faq: { q: string; a: string }[];
};

export const dishes: Dish[] = [
  {
    slug: "koshary", name: "Koshary", ar: "كشري", price: "$13", img: "koshary", alt: "A bowl of koshary topped with fried onions, with tomato sauce and dakka on the side",
    question: "What is koshary?",
    short: "Koshary is Egypt's national dish: rice, lentils, pasta and chickpeas layered under spiced tomato sauce, crispy fried onions and garlicky vinegar.",
    body: [
      "Koshary (also spelled koshari or kushari) is street food that became a national dish. It started in 19th-century Cairo, borrowing lentils and rice from India and pasta from Italy, and it is still the lunch most Egyptians can picture by smell alone.",
      "The layers are the point. Rice and brown lentils at the bottom, short pasta on top, chickpeas, then a thick cumin-and-garlic tomato sauce. Over that, a handful of crispy fried onions. On the side, two sauces you add yourself: dakka, a sharp garlic vinegar, and shatta, a hot sauce.",
      "It is naturally vegan, filling, and cheap in Cairo. Outside Egypt it is rare to find it made properly, because every layer is cooked separately and the onions have to be fried to order.",
    ],
    atMasrawy: "Masrawy's koshary is the dish TikTok keeps coming back for. Rice, lentils, pasta and chickpeas, fried onions, spiced tomato sauce, dakka and hot sauce on the side.",
    faq: [
      { q: "Is koshary vegan?", a: "Yes. Masrawy's koshary contains no meat, dairy or egg. Ask about the hot sauce if you have allergies." },
      { q: "Is koshary spicy?", a: "Not by default. The heat is in the shatta you add yourself; the dakka is sour and garlicky rather than hot." },
      { q: "Can I order koshary for pick-up?", a: "Yes. Koshary travels well. Order online for pick-up from Britannia Road, or add the vegan koshari bowl to a corporate catering order." },
    ],
  },
  {
    slug: "hawawshi", name: "Hawawshi", ar: "حواوشي", price: "$24", img: "hawawshi", alt: "Hawawshi, spiced beef baked inside crisp balady bread, cut and stacked",
    question: "What is hawawshi?",
    short: "Hawawshi is Egyptian spiced ground beef baked inside balady bread until the outside is crisp and the inside is juicy.",
    body: [
      "Hawawshi (sometimes hawaoshi) is Cairo's answer to the burger, and older than you'd think: it was invented by a butcher in the Sayeda Zeinab district in the early 1970s. Minced beef is mixed with onion, peppers and Egyptian spices, stuffed into a round of balady bread, brushed with fat and baked until the bread shatters.",
      "The Alexandria version uses a fino roll instead of balady. Either way it is eaten hot, with tahina and pickles, and it is the dish Egyptians abroad miss most because the bread is hard to find.",
    ],
    atMasrawy: "Masrawy bakes its hawawshi in crispy balady bread with tahina, fries and salata for $24, or the hawawshi on its own for $18. It is on the beef section of the dine-in menu and travels well for pick-up.",
    faq: [
      { q: "Is hawawshi halal?", a: "Yes. Everything at Masrawy is 100% halal, and the beef is grass-fed and locally sourced." },
      { q: "Is hawawshi spicy?", a: "Mildly. The beef is seasoned with peppers and Egyptian spices; ask for it spicier if you like." },
      { q: "What comes with it?", a: "The plate comes with tahina, fries and salata. The sandwich-only option is $18." },
    ],
  },
  {
    slug: "molokhia", name: "Molokhia", ar: "ملوخية", price: "$16", img: "lentil-soup", alt: "A bowl of soup on a wooden table at Masrawy",
    question: "What is molokhia?",
    short: "Molokhia (molekheya) is a green Egyptian soup of finely chopped jute mallow leaves cooked in broth and finished with garlic fried in coriander.",
    body: [
      "Molokhia is the dish that divides first-timers and converts them. The leaf is jute mallow, chopped almost to a paste, simmered in chicken or rabbit broth, and finished at the last second with ta'leya: garlic and ground coriander fried in ghee and poured in with a hiss. That sizzle is the sound of an Egyptian kitchen.",
      "It is eaten over white rice with vermicelli (sha3reya), or with bread, usually alongside chicken. The texture is silky, which is either the best or the strangest thing about it depending on who you ask.",
    ],
    atMasrawy: "Masrawy's molekheya comes with mallow leaf, house broth, roasted garlic and coriander over white rice with sha3reya for $16. Add grilled boneless chicken for $9 or chicken tikka for $17, or have the molekheya on its own for $10. It is also Lulu's Special on the kids' menu.",
    faq: [
      { q: "Is molokhia vegan?", a: "The molekheya itself is made with house broth; ask the team about the broth before ordering if you are strictly vegan." },
      { q: "What does molokhia taste like?", a: "Green, garlicky and savoury, close to spinach cooked in a good stock, with a silky texture from the leaf." },
      { q: "Can you cater molokhia?", a: "Yes. Molekheya is on the private catering soups list and travels well in trays." },
    ],
  },
  {
    slug: "feteer", name: "Feteer meshaltet", ar: "فطير مشلتت", price: "$17.25", img: "feteer-honey", alt: "Feteer, layered Egyptian pastry, served with honey and molasses",
    question: "What is feteer?",
    short: "Feteer meshaltet is a flaky, many-layered Egyptian pastry, stretched paper-thin, folded with ghee and baked, served sweet with honey or molasses or savoury with cheese.",
    body: [
      "Feteer is older than pizza and the comparison annoys Egyptians for good reason. The dough is stretched by hand until it is translucent, brushed with ghee, folded over itself again and again, and baked in a very hot oven until the layers puff and crisp. The name means 'cushioned pastry'.",
      "In the countryside it is a guest's dish, brought out with honey, molasses (black honey) and a fresh white cheese. In Cairo it is a late-night order. At brunch, it is breakfast.",
    ],
    atMasrawy: "On Masrawy's brunch menu it is called Sweet Cleopatra: feteer served with feta mix and your choice of molasses and tahina, or natural honey, for $17.25. Brunch runs every day from 10am to 2pm.",
    faq: [
      { q: "Is feteer sweet or savoury?", a: "Either. Masrawy serves it sweet, with molasses and tahina or honey, alongside a feta mix so you can have both in one bite." },
      { q: "When can I get feteer?", a: "During brunch hours, 10am to 2pm every day." },
      { q: "Is feteer vegetarian?", a: "Yes. It is made with flour, ghee and butter; it is not vegan." },
    ],
  },
  {
    slug: "macarona-bechamel", name: "Macarona bechamel", ar: "مكرونة بشاميل", price: "$18", img: "macarona-bechamel", alt: "Macarona bechamel baked in a clay pot with a golden cheese top",
    question: "What is macarona bechamel?",
    short: "Macarona bechamel is Egypt's baked pasta: penne layered with spiced minced beef and a thick béchamel, baked until the top is golden.",
    body: [
      "Every Egyptian family has a macarona bechamel, and every one is the best. Penne (or ziti) is layered with minced beef cooked with onion and spice, then covered in a béchamel so thick it sets when it cools, and baked until the top browns. It is the dish for Friday lunch, for guests, for the first day back home.",
      "It is close to a Greek pastitsio, but the spicing is Egyptian (cumin, cinnamon, a little nutmeg in the sauce) and the béchamel is unapologetically generous.",
    ],
    atMasrawy: "Masrawy's version uses penne, seasoned ground beef, béchamel and Canadian cheddar, baked and served in a handmade clay pot for $18. Add a chicken panne cutlet for $7. It has been on the menu since the restaurant opened in 2018, and it is on the corporate catering menu too.",
    faq: [
      { q: "Is macarona bechamel spicy?", a: "No. It is rich and mild, a family dish; the kids' menu has a petite version of the chicken panne that pairs with it." },
      { q: "Can I order it for a group?", a: "Yes. It is on the corporate catering menu at $22 per person with grilled eggplant and Masrawy salad, and on the private catering list by the tray." },
      { q: "Is there a vegetarian version?", a: "The private catering list has zucchini bechamel; ask the team about availability." },
    ],
  },
  {
    slug: "kebda-eskandarani", name: "Kebda Eskandarani", ar: "كبدة إسكندراني", price: "$20", img: "kebda", alt: "Kebda Eskandarani, seared beef liver with peppers, on a plate at Masrawy",
    question: "What is kebda Eskandarani?",
    short: "Kebda Eskandarani is Alexandria-style beef liver: thin slices seared fast with garlic, chilli, cumin and lime, eaten with bread.",
    body: [
      "Alexandria's street carts made this dish famous. Liver is sliced thin, seared on a flat top for under a minute with garlic, green chilli, cumin and a squeeze of lime, and stuffed into a fino roll or piled on balady bread. Done right it is tender and bright, nothing like the liver most people grew up avoiding.",
      "The 'Eskandarani' means from Alexandria (Eskandareya), and the chilli is not optional there.",
    ],
    atMasrawy: "Masrawy sears its kebda with chilli peppers and garlic, served with balady bread, tahina and lemon for $20 on the beef menu, or as a two-baguette sandwich for $20. Order it spicy for the full Alexandria experience.",
    faq: [
      { q: "Is kebda Eskandarani spicy?", a: "Yes, it is cooked with chilli peppers. Ask for mild if you prefer." },
      { q: "What is it served with?", a: "Balady bread, tahina and lemon on the plate; the sandwich version comes in two soft baguettes with Egyptian pickles and fries." },
      { q: "Is the liver halal?", a: "Yes. All beef at Masrawy is halal, grass-fed and locally sourced." },
    ],
  },
  {
    slug: "mahshi", name: "Mahshi", ar: "محشي", price: "$18", img: "mahshi", alt: "Stuffed grape leaves with lemon on a plate at Masrawy",
    question: "What is mahshi?",
    short: "Mahshi is the Egyptian family of stuffed vegetables: grape leaves, cabbage, zucchini, eggplant and peppers filled with herbed rice and simmered in tomato broth.",
    body: [
      "Mahshi means 'stuffed', and in Egypt it is a whole category rather than one dish. The filling is rice with dill, parsley, coriander and tomato, sometimes with minced meat, and it goes into whatever the season offers: grape leaves (wara' enab), cabbage leaves, zucchini, eggplant, peppers, even onions.",
      "It is slow food. Rolling takes a family an afternoon, which is why it is a feast-day dish and a Ramadan staple, and why it is so hard to find in restaurants.",
    ],
    atMasrawy: "Masrawy's mixed mahashy plate brings zucchini, eggplant, bell pepper, cabbage and grape leaves stuffed with seasoned rice, in herbed tomato sauce with yogurt dip, for $18. Just grape leaves or just cabbage is $16. Stuffed grape leaves and cabbage rolls are also on the private catering list by the 4 lb or 7 lb tray.",
    faq: [
      { q: "Is mahshi vegan?", a: "The rice filling is vegetarian; the plate comes with a yogurt dip you can leave off. Ask the team for the vegan version." },
      { q: "Can I order mahshi for an event?", a: "Yes. Stuffed grape leaves and cabbage rolls come in 4 lb or 7 lb trays, vegetarian or beef, with 48 hours' notice." },
      { q: "Is it gluten free?", a: "The filling is rice-based; confirm with the team about the broth and sides for allergies." },
    ],
  },
  {
    slug: "tamaaya", name: "Tamaaya", ar: "طعمية", price: "$12", img: "tamaaya", alt: "Tamaaya, Egyptian fava falafel, green inside with a crisp crust",
    question: "What is tamaaya?",
    short: "Tamaaya is Egyptian falafel, made from fava beans instead of chickpeas, which is why it is green inside and lighter than the Levantine kind.",
    body: [
      "Egypt makes falafel from split fava beans, not chickpeas, and calls it ta'meya. The beans are soaked, ground with a lot of fresh herbs (parsley, coriander, dill, leek), shaped into flat discs, rolled in sesame and fried. Cut one open and it is bright green.",
      "It is a breakfast food in Cairo, eaten in balady bread with tahina, salad and pickles, next to a bowl of ful. It is naturally vegan.",
    ],
    atMasrawy: "Masrawy's tamaaya comes as a starter with tahina and balady bread for $12, as a half or full balady sandwich with salata and tahina, as a fusion bowl over golden basmati rice, and in three-piece add-ons at brunch. It is also the shell of the weekend-only On the Nile breakfast.",
    faq: [
      { q: "Is tamaaya vegan?", a: "Yes. Fava beans, herbs and spices, fried. The tahina on the side is vegan too." },
      { q: "How is tamaaya different from falafel?", a: "Fava beans instead of chickpeas, more fresh herbs, and a flatter shape. The inside is green and the texture is lighter." },
      { q: "Is it gluten free?", a: "The patties are bean and herb; ask the team about the fryer and the bread if you are coeliac." },
    ],
  },
];
