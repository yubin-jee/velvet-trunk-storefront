export type Category = "jewelry" | "accessories" | "clothing";

export type Product = {
  id: string;
  name: string;
  koreanName?: string;
  price: number;
  category: Category;
  image: string;
  images?: string[];
  shortDescription: string;
  description: string;
  details: string[];
  tags?: string[];
  bestseller?: boolean;
  newArrival?: boolean;
  sold?: boolean;
};

// Default / fallback placeholder catalogue. The site also supports loading
// products from a published Google Sheet — see SHEET_SETUP.md.
//
// Unsplash images (free to use) — curated for a soft, romantic feel.
const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const placeholderProducts: Product[] = [
  {
    id: "pearl-drop-earrings",
    name: "Hanbit Pearl Drop Earrings",
    koreanName: "한빛 진주 귀걸이",
    price: 48,
    category: "jewelry",
    image: u("photo-1535632066927-ab7c9ab60908"),
    images: [u("photo-1535632066927-ab7c9ab60908"), u("photo-1611085583191-a3b181a88401")],
    shortDescription: "Freshwater pearls suspended on delicate 14k gold-filled threads.",
    description:
      "A love letter to quiet evenings in Seoul. Each Hanbit earring pairs a single lustrous freshwater pearl with a whisper-thin 14k gold-filled thread, catching the light the way a pressed flower catches memory.",
    details: [
      "Freshwater cultured pearls, 7–8mm",
      "14k gold-filled hooks",
      "Length: 3.2cm",
      "Presented in a Velvet Trunk linen pouch",
    ],
    tags: ["pearl", "gold", "dainty"],
    bestseller: true,
  },
  {
    id: "dahlia-silk-scrunchie",
    name: "Dahlia Silk Scrunchie",
    koreanName: "달리아 실크 곱창",
    price: 22,
    category: "accessories",
    image: u("photo-1522338242992-e1a54906a8da"),
    shortDescription: "Hand-rolled mulberry silk in a soft, powder rose.",
    description:
      "Kind to fine hair and gentler still on bedhead mornings, this hand-rolled mulberry silk scrunchie is dyed in the palest shade of dahlia — a color somewhere between a blush and a breath.",
    details: [
      "100% grade 6A mulberry silk",
      "Hand-rolled edges",
      "Nickel-free inner elastic",
      "Machine-washable in a mesh bag",
    ],
    tags: ["silk", "pink", "hair"],
    newArrival: true,
  },
  {
    id: "moonlit-pearl-necklace",
    name: "Moonlit Pearl Strand",
    koreanName: "달빛 진주 목걸이",
    price: 128,
    category: "jewelry",
    image: u("photo-1599643477877-530eb83abc8e"),
    shortDescription: "A single strand of graduated freshwater pearls with gold clasp.",
    description:
      "The piece your future daughter will ask to borrow. A single graduated strand of luminous freshwater pearls, finished with a hand-polished 14k gold-filled clasp.",
    details: [
      "Graduated 6–9mm freshwater pearls",
      "14k gold-filled clasp",
      "Length: 42cm with 3cm extender",
      "Comes in a signature ribboned box",
    ],
    tags: ["pearl", "statement"],
    bestseller: true,
  },
  {
    id: "hanbok-wrap-blouse",
    name: "Yuna Hanbok-Inspired Wrap Blouse",
    koreanName: "유나 저고리 블라우스",
    price: 142,
    category: "clothing",
    image: u("photo-1485968579580-b6d095142e6e"),
    shortDescription: "A modern jeogori silhouette in ivory crepe with ribbon tie.",
    description:
      "A gentle nod to the traditional jeogori, reimagined for Sunday brunches and summer weddings alike. Cut from ivory crepe with a hand-finished grosgrain ribbon tie at the bust.",
    details: [
      "Japanese crepe, 72% viscose / 28% acetate",
      "Hand-finished grosgrain tie",
      "Relaxed fit — model wears size S",
      "Dry clean only",
    ],
    tags: ["blouse", "ivory", "hanbok"],
    newArrival: true,
  },
  {
    id: "gold-signet-ring",
    name: "Seorae Signet Ring",
    koreanName: "서래 반지",
    price: 86,
    category: "jewelry",
    image: u("photo-1603561591411-07134e71a2a9"),
    shortDescription: "An architectural gold vermeil signet with a brushed finish.",
    description:
      "Named after a quiet lane in Seoul, the Seorae signet is weighty, warm and wears like a small heirloom. Brushed 18k gold vermeil over sterling silver.",
    details: [
      "18k gold vermeil over sterling silver",
      "Brushed matte finish",
      "Face: 10 x 12mm oval",
      "Available in sizes 5–9",
    ],
    tags: ["ring", "gold", "minimal"],
  },
  {
    id: "ribbon-barrette",
    name: "Sora Velvet Ribbon Barrette",
    koreanName: "소라 벨벳 리본",
    price: 28,
    category: "accessories",
    image: u("photo-1591348122449-02525d70379b"),
    shortDescription: "Hand-tied Italian velvet ribbon on a gold-plated clip.",
    description:
      "The kind of bow that makes a plain slip dress suddenly feel like an event. Hand-tied from plush Italian velvet and mounted on a gold-plated French clip.",
    details: [
      "Italian rayon velvet",
      "Gold-plated French clip, 8cm",
      "Available in ink, bordeaux and oyster",
      "Spot clean only",
    ],
    tags: ["bow", "velvet", "hair"],
    newArrival: true,
  },
  {
    id: "quilted-mini-bag",
    name: "Jina Quilted Mini Bag",
    koreanName: "지나 퀼팅 미니백",
    price: 168,
    category: "accessories",
    image: u("photo-1591561954557-26941169b49e"),
    shortDescription: "A palm-sized quilted shoulder bag in butter-soft leather.",
    description:
      "Just enough room for a lipstick, a metro card and a folded love note. Hand-quilted nappa leather with a burnished gold chain strap that tucks inside to convert to a clutch.",
    details: [
      "Italian nappa leather",
      "Hand-quilted diamond pattern",
      "Removable gold chain strap",
      "Dimensions: 18 x 12 x 6cm",
    ],
    tags: ["bag", "leather"],
    bestseller: true,
  },
  {
    id: "pleated-slip-skirt",
    name: "Nari Pleated Slip Skirt",
    koreanName: "나리 플리츠 스커트",
    price: 158,
    category: "clothing",
    image: u("photo-1583496661160-fb5886a0aaaa"),
    shortDescription: "A bias-cut midi in liquid champagne satin.",
    description:
      "A wardrobe workhorse in the most unlikely of disguises. Bias-cut from heavyweight champagne satin with the softest knife pleats, finished with a covered elastic waist.",
    details: [
      "100% recycled polyester satin",
      "Covered elastic waistband",
      "Length: 82cm (midi)",
      "Lined in cupro",
    ],
    tags: ["skirt", "satin"],
  },
  {
    id: "camellia-brooch",
    name: "Camellia Enamel Brooch",
    koreanName: "동백꽃 브로치",
    price: 54,
    category: "jewelry",
    image: u("photo-1617038260897-41a1f14a8ca0"),
    shortDescription: "A hand-painted camellia in blush and gold enamel.",
    description:
      "Our love letter to the dongbaek — the flower that blooms in Busan's coldest month. Hand-painted blush and ivory enamel on a gold-plated pin back.",
    details: [
      "Gold-plated brass",
      "Hand-painted enamel",
      "Diameter: 3.5cm",
      "Secure locking pin back",
    ],
    tags: ["flower", "brooch"],
  },
  {
    id: "mohair-cardigan",
    name: "Eun Mohair Cropped Cardigan",
    koreanName: "은 모헤어 가디건",
    price: 184,
    category: "clothing",
    image: u("photo-1434389677669-e08b4cac3105"),
    shortDescription: "A cloud-soft cropped cardigan in pale rose mohair.",
    description:
      "Perhaps the softest thing you will own this year. A slightly cropped cardigan knit from featherlight kid mohair, finished with mother-of-pearl buttons.",
    details: [
      "70% kid mohair, 30% merino wool",
      "Mother-of-pearl buttons",
      "Relaxed cropped fit",
      "Hand wash cold",
    ],
    tags: ["cardigan", "knit", "pink"],
    bestseller: true,
  },
  {
    id: "charm-anklet",
    name: "Haneul Charm Anklet",
    koreanName: "하늘 참 앵클릿",
    price: 42,
    category: "jewelry",
    image: u("photo-1611652022419-a9419f74343d"),
    shortDescription: "A dainty gold chain with star, pearl and moon charms.",
    description:
      "For bare-foot balcony evenings. Three tiny charms — a seed pearl, a crescent and a star — on a whisper-thin 14k gold-filled chain.",
    details: [
      "14k gold-filled chain",
      "Seed pearl, crescent and star charms",
      "Adjustable 22–26cm",
      "Lobster clasp",
    ],
    tags: ["anklet", "charm"],
    newArrival: true,
  },
  {
    id: "silk-eye-mask",
    name: "Dalbit Silk Eye Mask",
    koreanName: "달빛 실크 아이마스크",
    price: 36,
    category: "accessories",
    image: u("photo-1556228453-efd6c1ff04f6"),
    shortDescription: "Pure mulberry silk eye mask in oyster with satin ribbon.",
    description:
      "A little ceremony for the end of each day. Double-sided mulberry silk, lightly padded, with a soft satin tie closure that won't tug fine hair.",
    details: [
      "22 momme mulberry silk",
      "Gentle satin ribbon tie",
      "One size fits most",
      "Hand wash cold",
    ],
    tags: ["silk", "sleep"],
  },
];

export const categories: { slug: Category | "all"; label: string }[] = [
  { slug: "all", label: "Everything" },
  { slug: "jewelry", label: "Jewelry" },
  { slug: "accessories", label: "Accessories" },
  { slug: "clothing", label: "Clothing" },
];
