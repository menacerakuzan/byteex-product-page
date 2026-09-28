/**
 * Seeds the Sanity dataset with the content from the Figma design.
 *
 *   npm run seed
 *
 * Runs through `sanity exec --with-user-token`, so it uses the credentials of
 * the developer logged in via `npx sanity login`. Safe to re-run: images are
 * de-duplicated by Sanity (same file → same asset) and the page document is
 * replaced.
 */
import { createReadStream } from "node:fs";
import { basename, join } from "node:path";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-09-01" });
const ASSETS = join(process.cwd(), "seed", "assets");

let keyCounter = 0;
const key = () => `k${(keyCounter++).toString(36).padStart(4, "0")}`;

async function upload(file: string) {
  const asset = await client.assets.upload("image", createReadStream(join(ASSETS, file)), {
    filename: basename(file),
  });
  return asset._id;
}

async function figure(file: string, alt = "") {
  return {
    _type: "figure",
    _key: key(),
    alt,
    asset: { _type: "reference", _ref: await upload(file) },
  };
}

const withKeys = <T extends object>(items: T[]) =>
  items.map((item) => ({ _key: key(), ...item }));

const LOREM_SHORT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lobortis sapien facilisis tincidunt pellentesque. In eget ipsum et felis finibus consequat.";
const LOREM_REVIEW =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sed sollicitudin dolor, non sodales justo. Aenean eget aliquet mi.";

async function main() {
  console.log("Uploading images…");

  // Column-major order: the grid is two rows that flow left to right.
  const ugcAlts = [
    "Woman with curly hair in a black tee",
    "Woman in a long cardigan by the bookshelf",
    "Woman in a patterned cardigan outdoors",
    "Woman relaxing on a tufted sofa",
    "Grey lounge jumpsuit by the bed",
    "Woman in a cream slip dress",
    "Woman relaxing with her eyes closed",
    "Mother and daughter reading together",
    "Man stretching in the bedroom",
    "Woman stretching in an olive shirt",
    "Woman sitting in a cosy home office",
    "Two friends holding cushions",
    "Woman in yellow floral pyjamas",
    "Woman leaning on a stack of books",
    "Smiling woman in a satin camisole",
    "Woman sitting in the kitchen",
    "Woman doing yoga on an empty road",
    "Woman in an olive sweater",
    "Woman reading in bed",
    "Woman relaxing with a cup of tea",
    "Woman reading on a green sofa",
    "Two friends on a sofa",
  ];

  const [heroLeft, heroCenter, heroRight] = await Promise.all([
    figure("hero-left.jpg", "Model in a grey knit crop top and shorts"),
    figure("hero-center.jpg", "Model in a white robe stretching"),
    figure("hero-right.jpg", "Woman reading on a green sofa in a white camisole"),
  ]);

  const press = await Promise.all(
    [
      ["Eco-Stylist", "press-eco-stylist.png"],
      ["Canadian Living", "press-canadian-living.png"],
      ["Jillian Harris", "press-jillian-harris.png"],
      ["The Eco Hub", "press-eco-hub.png"],
      ["Trend Hunter", "press-trendhunter.png"],
    ].map(async ([name, file]) => ({
      _type: "pressLogo",
      _key: key(),
      name,
      logo: await figure(file, name),
    })),
  );

  const galleryAlts = [
    "White robe — front view",
    "White robe — relaxed fit",
    "Grey knit crop top and shorts",
    "Grey knit set — stretching",
    "Sage long-sleeve top with shorts",
    "Blush knit set",
    "Morning light in the bedroom",
    "Rust wide-leg pants",
  ];
  const gallery = await Promise.all(
    galleryAlts.map((alt, i) => figure(`gallery-${i + 1}.jpg`, alt)),
  );

  const founderImages = await Promise.all([
    figure("founder-main.jpg", "Model in a white robe"),
    figure("founder-top.jpg", "Model in a grey loungewear set"),
    figure("founder-bottom.jpg", "Woman opening the curtains in the morning"),
  ]);

  const ugc = await Promise.all(
    ugcAlts.map((alt, i) => figure(`ugc-${String(i + 1).padStart(2, "0")}.jpg`, alt)),
  );

  const faqImages = await Promise.all([
    figure("faq-top.jpg", "Woman stretching in an olive pyjama shirt"),
    figure("faq-center.jpg", "Model in a grey knit set"),
    figure("faq-bottom.jpg", "Woman reading on a green sofa"),
  ]);

  const finalImages = await Promise.all([
    figure("find-left.jpg", "Woman in an olive pyjama shirt"),
    figure("find-center.jpg", "Woman in yellow floral pyjamas"),
    figure("find-right.jpg", "Model in a grey knit set"),
  ]);

  const payments = await figure(
    "payments.png",
    "Accepted payments: Amex, Apple Pay, Diners, Discover, Google Pay, Mastercard, PayPal, Shop Pay, Visa",
  );
  const avatar = await figure("review-avatar.jpg", "");

  const doc = {
    _id: "productPage",
    _type: "productPage",
    title: "Product page",
    seo: {
      title: "Byteex — Loungewear you can be proud of",
      description:
        "Beautiful, comfortable loungewear for day or night. Consciously made, butter-soft staples with free shipping on orders over $200.",
    },
    announcements: [
      "CONSCIOUSLY MADE BUTTER SOFT STAPLES FOR EVERY DAY (OR NIGHT)",
      "FREE SHIPPING on orders > $200",
      "easy 45 day return window.",
    ],
    cta: { _type: "link", label: "Customize Your Outfit", href: "#shop" },
    ratingText: "Over 500+ 5 Star Reviews Online",
    hero: {
      heading: "Don’t apologize for being comfortable.",
      bullets: withKeys([
        { _type: "iconText", icon: "sunMoon", text: "Beautiful, comfortable loungewear for day or night." },
        { _type: "iconText", icon: "cartLeaf", text: "No wasteful extras, like tags or plastic packaging." },
        {
          _type: "iconText",
          icon: "waves",
          text: "Our signature fabric is incredibly comfortable — unlike anything you’ve ever felt.",
        },
      ]),
      images: [heroLeft, heroCenter, heroRight],
      review: {
        _type: "review",
        author: "Amy P.",
        rating: 5,
        text: "Overjoyed with my Loungewear set. I have the jogger and the sweatshirt. Quality product on every level. From the compostable packaging, to the supplied washing bag, even the garments smells like fresh herbs when I first held them.",
        avatar,
      },
      reviewBadge: "One of 500+ 5 Star Reviews Online",
      pressHeading: "as seen in",
      press,
    },
    benefits: {
      heading: "Loungewear you can be proud of.",
      items: withKeys(
        [
          ["cartLeaf", "Ethically sourced."],
          ["leaf", "Responsibly made."],
          ["sunMoon", "Made for living in."],
          ["waves", "Unimaginably comfortable."],
        ].map(([icon, title]) => ({ _type: "feature", icon, title, text: LOREM_SHORT })),
      ),
      galleryCaption: "White Robe",
      gallery,
    },
    founder: {
      heading: "Be your best self.",
      body: [
        "Hi! My name’s [Insert Name], and I founded [Insert] in ____.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lobortis sapien facilisis tincidunt pellentesque. In eget ipsum et felis finibus consequat.",
        "Fusce non nibh luctus, dignissim risus quis, bibendum dolor. Donec placerat volutpat ligula, ac consectetur felis varius non. Aliquam a nunc rutrum, porttitor dolor eu, pellentesque est. Vivamus id arcu congue, faucibus libero nec, placerat ligula.",
        "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed eu nisl a metus ultrices sodales.",
        "Fusce non ante velit. Sed auctor odio eu semper molestie. Nam mattis, sapien eget lobortis fringilla, eros ipsum tristique tellus, ac convallis urna massa at nibh.",
        "Duis non fermentum augue. Vivamus laoreet aliquam risus, sed euismod leo aliquam ut. Vivamus in felis eu lacus feugiat aliquam nec in sapien.",
        "Cras mattis varius mollis.",
      ].join("\n\n"),
      ctaLabel: "Customize Your Outfit",
      images: founderImages,
    },
    howItWorks: {
      heading: "Comfort made easy",
      steps: withKeys([
        {
          _type: "feature",
          icon: "store",
          title: "You save.",
          text: "Browse our comfort sets and save 15% when you bundle.",
        },
        {
          _type: "feature",
          icon: "truck",
          title: "We ship.",
          text: "We ship your items within 1-2 days of receiving your order.",
          highlighted: true,
        },
        {
          _type: "feature",
          icon: "sunMoon",
          title: "You enjoy!",
          text: "Wear hernest around the house, out on the town, or in bed.",
        },
      ]),
    },
    reviews: {
      heading: "What are our fans saying?",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lobortis sapien facilisis tincidunt pellentesque. In eget ipsum et felis finibus consequat. Fusce non nibh luctus.",
      gallery: ugc,
      items: withKeys([
        { _type: "review", author: "Jane, S.", rating: 5, text: LOREM_REVIEW },
        {
          _type: "review",
          author: "Jane, S.",
          rating: 5,
          text: `${LOREM_REVIEW.replace(" Aenean eget aliquet mi.", "")} Aenean eget aliquet mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sed sollicitudin dolor, non sodales.`,
        },
        { _type: "review", author: "Jane, S.", rating: 5, text: LOREM_REVIEW },
        { _type: "review", author: "Jane, S.", rating: 5, text: LOREM_REVIEW },
        { _type: "review", author: "Jane, S.", rating: 5, text: LOREM_REVIEW },
      ]),
    },
    faq: {
      heading: "Frequently asked questions.",
      items: withKeys(
        Array.from({ length: 6 }, () => ({
          _type: "faqItem",
          question: "lorem ipsum dolor sit amet",
          answer: LOREM_SHORT,
        })),
      ),
      images: faqImages,
    },
    impact: {
      heading: "Our total green impact",
      stats: withKeys([
        { _type: "stat", icon: "co2", value: "3,927 kg", label: "of CO2 saved" },
        { _type: "stat", icon: "water", value: "2,546,167 days", label: "of drinking water saved" },
        { _type: "stat", icon: "energy", value: "7,321 kWh", label: "of energy saved" },
      ]),
    },
    finalCta: {
      heading: "Find something you love.",
      text: LOREM_SHORT,
      images: finalImages,
      shippingNote: "Ships in 1-2 Days",
      payments,
      perks: withKeys([
        { _type: "iconText", icon: "truck", text: "FREE Shipping on Orders over $200" },
        { _type: "iconText", icon: "shield", text: "Over 500+ 5 Star Reviews Online" },
        { _type: "iconText", icon: "cartLeaf", text: "Made ethically and responsibly." },
      ]),
    },
  };

  await client.createOrReplace(doc);
  console.log("✓ Product page seeded");

  // Remove images left over from previous seed runs.
  const orphans = await client.fetch<string[]>(
    `*[_type == "sanity.imageAsset" && count(*[references(^._id)]) == 0]._id`,
  );
  if (orphans.length) {
    const tx = client.transaction();
    orphans.forEach((id) => tx.delete(id));
    await tx.commit();
    console.log(`✓ Removed ${orphans.length} unused image(s)`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
