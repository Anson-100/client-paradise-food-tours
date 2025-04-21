// import IMG from "@/assets/placeholder.png"
import eatingIMG from "@/assets/eatingIMG.jpg"

import { StarIcon } from "@heroicons/react/20/solid"

export const tours = [
  {
    slug: "naples-taco-tour",
    name: "Nacho Average Taco Tour",
    title: "Hidden gems, bold flavors — the ultimate taco crawl",
    heroText:
      "Discover the authentic side of Naples with this taco tour featuring family-run spots, handmade tortillas, and ice-cold drinks.",
    ctaLine: "Book your taco experience today.",
    duration: "4 hrs",
    stops: 5,
    guests: "14+",
    cost: "$149",
    about: [
      "Expect sizzling meats, smoky salsas, and fresh-made guacamole. This tour explores the tucked-away taquerias locals rave about — no chains, just flavor.",
      "Whether you’re craving carne asada, al pastor, or something plant-based, every stop brings something different. Come hungry and leave with a newfound love for real Mexican food.",
    ],
    galleryImages: [
      "naples-taco-tour-image-0",
      "naples-taco-tour-image-1",
      "naples-taco-tour-image-2",
      "naples-taco-tour-image-3",
    ],

    bannerImage: eatingIMG,
    included: [
      { value: "Tacos", name: "5 local stops" },
      { value: "Drinks", name: "Margs or aguas frescas" },
      { value: "Guide", name: "Fluent & friendly host" },
      { value: "Ride", name: "Hassle-free shuttle" },
    ],
    testimonial: {
      quote:
        "I’ve lived in Naples for years and never knew these taco spots existed. Authentic, tasty, and super fun. 10/10.",
      name: "Marco L.",
      role: "Local foodie",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80",
      ratingIcon: StarIcon,
    },
  },
  {
    slug: "naples-pizza-wars",
    name: "Naples Pizza Wars Tour",
    title: "4 pizzerias. 1 winner. you decide.",
    heroText:
      "Taste the top contenders in the local pizza scene and vote on your favorite — from fire-roasted Neapolitan to cheesy New York slices.",
    ctaLine: "Join the pizza battle today.",
    duration: "4 hrs",
    stops: 4,
    guests: "14+",
    cost: "$149",
    about: [
      "The Naples Pizza Wars pits the city's best pies against each other in a saucy competition. At each stop, you'll sample slices and score them.",
      "Expect everything from wood-fired crusts to deep dish classics. At the end, cast your vote and crown a champion. May the best slice win.",
    ],
    galleryImages: [
      "naples-pizza-wars-image-0",
      "naples-pizza-wars-image-1",
      "naples-pizza-wars-image-2",
      "naples-pizza-wars-image-3",
    ],

    bannerImage: eatingIMG,
    included: [
      { value: "Pizza", name: "4 top-rated pizzerias" },
      { value: "Drinks", name: "Beer or soda pairings" },
      { value: "Host", name: "Pizza-obsessed guide" },
      { value: "Fun", name: "Cast your vote" },
    ],
    testimonial: {
      quote:
        "We had a blast — loved the competition aspect and the pizza was amazing. The voting made it even more fun.",
      name: "Chelsea K.",
      role: "Self-proclaimed pizza expert",
      avatar:
        "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80",
      ratingIcon: StarIcon,
    },
  },
  {
    slug: "naples-italian-tour",
    name: "Naples Italian Tour",
    title: "Mangia like a local — Naples' Italian gems",
    heroText:
      "Family-owned trattorias, flowing wine, and handmade pastas — this is an indulgent evening you’ll remember long after the last bite.",
    ctaLine: "Book your Naples Italian tour today.",
    duration: "4 hrs",
    stops: 3,
    guests: "14+",
    cost: "$175",
    about: [
      "Uncover the soul of Naples through the rich flavors of Italy. This tour brings you to three cherished Italian kitchens, each serving multi-course experiences steeped in tradition.",
      "From silky pastas to classic desserts and regional wines, you’ll explore why Naples is a haven for Italian food lovers. Come hungry — leave full and happy.",
    ],
    galleryImages: [
      "naples-italian-tour-image-0",
      "naples-italian-tour-image-1",
      "naples-italian-tour-image-2",
      "naples-italian-tour-image-3",
    ],

    bannerImage: eatingIMG,
    included: [
      { value: "Food", name: "3 full-course meals" },
      { value: "Drinks", name: "Wine pairings at each stop" },
      { value: "Guide", name: "Hosted by a Naples local" },
      { value: "Ride", name: "Shuttle included" },
    ],
    testimonial: {
      quote:
        "Everything was just amazing — especially the pasta and dessert. I felt like I was eating in someone’s home, not a restaurant. 10/10!",
      name: "Linda Fazio",
      role: "Food tour regular",
      avatar:
        "https://images.unsplash.com/photo-1544725176-7c40e5a2c9f8?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80",
      ratingIcon: StarIcon,
    },
  },
]

// {
//   slug: "brewery",
//   name: "N Naples/Bonita Brewery Tour",
//   title: "Brew-hop through Southwest Florida's craft scene",
//   heroText:
//     "Sip your way through three local breweries featuring bold IPAs, smooth stouts, and creative seasonal pours — with snacks and good vibes included.",
//   ctaLine: "Book your Bonita & North Naples brewery tour today.",
//   duration: "4 hrs",
//   stops: 3,
//   guests: "14+",
//   cost: "$149",
//   about: [
//     "Hop aboard and let us take you behind the scenes of the area’s best craft breweries. From fermentation secrets to taproom exclusives, you’ll sample flights and learn the story behind each pour.",
//     "Whether you're a hop head or just here for the ride, this relaxed tour pairs great beer with even better conversation — and food truck bites to keep you fueled along the way.",
//   ],
//   galleryImages: [IMG1, IMG2, IMG3, IMG4],
//   bannerImage: eatingIMG,
//   included: [
//     { value: "Beer", name: "Craft flights at each stop" },
//     { value: "Snacks", name: "Local food truck access" },
//     { value: "Guide", name: "Local beer enthusiast host" },
//     { value: "Ride", name: "Shuttle between breweries" },
//   ],
//   testimonial: {
//     quote:
//       "Best beer tour I’ve ever done. The breweries were fantastic, the guide was hilarious, and we even made new friends along the way.",
//     name: "Kelsey J.",
//     role: "IPA aficionado",
//     avatar:
//       "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&q=80&w=1024&h=1024",
//     ratingIcon: StarIcon,
//   },
// },
// {
//   slug: "dessert-naples",
//   name: "Naples Dessert Tour",
//   title: "A sweet stroll through Naples’ finest treats",
//   heroText:
//     "Gelato, macarons, tiramisu, and more — treat yourself to Naples’ top dessert spots in one indulgent afternoon.",
//   ctaLine: "Book your Naples dessert tour today.",
//   duration: "4 hrs",
//   stops: 5,
//   guests: "14+",
//   cost: "$149",
//   about: [
//     "This sugar-coated tour takes you to the most decadent dessert destinations in town. Each stop features something unique — from handcrafted pastries to frozen delights.",
//     "You’ll experience the passion behind every bite as you meet bakers, gelato artisans, and dessert creators who’ve perfected the art of indulgence.",
//   ],
//   galleryImages: [IMG1, IMG2, IMG3, IMG4],
//   bannerImage: eatingIMG,
//   included: [
//     { value: "Desserts", name: "Sweet tastings at 5 stops" },
//     { value: "Drinks", name: "Coffee, tea, or dessert wines" },
//     { value: "Guide", name: "Local dessert expert" },
//     { value: "Ride", name: "Shuttle between locations" },
//   ],
//   testimonial: {
//     quote:
//       "I never thought I could eat so many desserts in one day. Every stop was amazing — the tiramisu especially was unreal.",
//     name: "Rachel M.",
//     role: "Dessert lover & part-time food critic",
//     avatar:
//       "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&q=80&w=1024&h=1024",
//     ratingIcon: StarIcon,
//   },
// },
// {
//   slug: "seafood-marco",
//   name: "Marco Island Seafood Tour",
//   title: "Fresh catches and ocean breezes on Marco",
//   heroText:
//     "Dive into a coastal culinary adventure — this tour highlights the freshest seafood Marco Island has to offer, all with stunning waterfront views.",
//   ctaLine: "Book your Marco Island seafood tour today.",
//   duration: "4 hrs",
//   stops: 5,
//   guests: "14+",
//   cost: "$165",
//   about: [
//     "Savor the salt air and signature seafood as you explore Marco’s finest coastal kitchens. Expect everything from succulent crab claws to zesty shrimp ceviche.",
//     "This tour is a celebration of flavor and scenery, offering a relaxing yet flavor-packed afternoon across waterfront gems and hidden local haunts.",
//   ],
//   galleryImages: [IMG1, IMG2, IMG3, IMG4],
//   bannerImage: eatingIMG,
//   included: [
//     { value: "Seafood", name: "Fresh tastings at 5 stops" },
//     { value: "Drinks", name: "Cocktails or craft beer pairings" },
//     { value: "Guide", name: "Local seafood connoisseur" },
//     { value: "Ride", name: "Transportation included" },
//   ],
//   testimonial: {
//     quote:
//       "Every bite tasted like it came straight off the boat. The views, the food, the vibe — absolutely unforgettable.",
//     name: "Tom W.",
//     role: "Snowbird & seafood fanatic",
//     avatar:
//       "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&q=80&w=1024&h=1024",
//     ratingIcon: StarIcon,
//   },
// },
// {
//   slug: "brewery-fortmyers",
//   name: "Fort Myers Brewery Tour",
//   title: "Hops, vibes & local flavor in Fort Myers",
//   heroText:
//     "Explore the best local breweries across Fort Myers and Cape Coral. Sample crisp IPAs, smooth stouts, and enjoy laid-back brewery culture at its finest.",
//   ctaLine: "Book your Fort Myers brewery tour today.",
//   duration: "4 hrs",
//   stops: 3,
//   guests: "14+",
//   cost: "$149",
//   about: [
//     "Kick back with refreshing pours at three top breweries known for creative craft beers and casual charm. From crisp pilsners to hazy IPAs, there’s a flavor for everyone.",
//     "This tour blends bold flavors with good company and chill energy, making it the perfect afternoon for beer lovers and weekend wanderers alike.",
//   ],
//   galleryImages: [IMG1, IMG2, IMG3, IMG4],
//   bannerImage: eatingIMG,
//   included: [
//     { value: "Brews", name: "Tastings at each stop" },
//     { value: "Snacks", name: "Food truck or kitchen access" },
//     { value: "Guide", name: "Brew expert onboard" },
//     { value: "Ride", name: "Safe travel between breweries" },
//   ],
//   testimonial: {
//     quote:
//       "Chill atmosphere, great pours, and a crew that knows how to have fun. I’ll be back for round two next season.",
//     name: "Steve K.",
//     role: "Craft beer lover",
//     avatar:
//       "https://images.unsplash.com/photo-1603415526960-f7e0328b6c24?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&q=80&w=1024&h=1024",
//     ratingIcon: StarIcon,
//   },
// },
// {
//   slug: "distillery-fortmyers",
//   name: "Fort Myers Distillery & Tasting Tour",
//   title: "Small batch, big flavor — spirits of Fort Myers",
//   heroText:
//     "Sip your way through the region’s finest local distilleries with guided tastings of handcrafted rum, vodka, whiskey, and more.",
//   ctaLine: "Book your Fort Myers tasting tour today.",
//   duration: "4 hrs",
//   stops: 3,
//   guests: "14+",
//   cost: "$149",
//   about: [
//     "This tasting tour highlights Fort Myers' booming craft distillery scene. You'll experience smooth pours, infused cocktails, and learn the art of small-batch spirits from passionate makers.",
//     "Whether you're into sipping neat or mixing it up, this experience blends flavor with local stories in an upscale yet approachable vibe.",
//   ],
//   galleryImages: [IMG1, IMG2, IMG3, IMG4],
//   bannerImage: eatingIMG,
//   included: [
//     { value: "Tastings", name: "Samples at every stop" },
//     { value: "Cocktails", name: "Crafted drinks included" },
//     { value: "Guide", name: "Spirits expert onboard" },
//     { value: "Ride", name: "Transport between locations" },
//   ],
//   testimonial: {
//     quote:
//       "Every distillery had its own vibe, and the cocktails were phenomenal. This tour felt exclusive without being pretentious.",
//     name: "Rachel V.",
//     role: "Event planner",
//     avatar:
//       "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&q=80&w=1024&h=1024",
//     ratingIcon: StarIcon,
//   },
// },
// {
//   slug: "seafood-fortmyers",
//   name: "Fort Myers Seafood Tour",
//   title: "Catch of the day — Fort Myers-style",
//   heroText:
//     "Indulge in the freshest Gulf seafood Fort Myers has to offer, from crab cakes to grilled snapper and citrusy ceviche.",
//   ctaLine: "Book your Fort Myers seafood tour today.",
//   duration: "4 hrs",
//   stops: 5,
//   guests: "14+",
//   cost: "$149",
//   about: [
//     "Explore Fort Myers' coastal cuisine with a curated seafood lineup. Each stop highlights signature dishes that celebrate the region’s waters and bold, fresh flavors.",
//     "Whether it’s buttery lobster rolls or crispy grouper bites, you’ll enjoy sea-to-table tastings that pair perfectly with waterfront views and salty breezes.",
//   ],
//   galleryImages: [IMG1, IMG2, IMG3, IMG4],
//   bannerImage: eatingIMG,
//   included: [
//     { value: "Seafood", name: "5 tasting stops" },
//     { value: "Drinks", name: "Select drinks included" },
//     { value: "Guide", name: "Local seafood expert" },
//     { value: "Ride", name: "Shuttle service included" },
//   ],
//   testimonial: {
//     quote:
//       "Every bite tasted like the ocean — fresh, bold, and unforgettable. This was hands down the best food experience of our trip.",
//     name: "Alex G.",
//     role: "Chef & traveler",
//     avatar:
//       "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&q=80&w=1024&h=1024",
//     ratingIcon: StarIcon,
//   },
// },
// {
//   slug: "brunch-naples",
//   name: "Naples Brunch Tour (Coming Soon)",
//   title: "Brunch goals — Naples edition",
//   heroText:
//     "Mimosas, fluffy pancakes, and crispy bacon — Naples’ brunch scene is calling. Get ready to brunch like never before.",
//   ctaLine: "Join the waitlist for Naples' ultimate brunch tour.",
//   duration: "4 hrs",
//   stops: 4,
//   guests: "14+",
//   cost: "$149",
//   about: [
//     "Wake up to Naples' best brunch spots, where sweet meets savory and every bite is paired with a refreshing morning cocktail.",
//     "From gourmet eggs benedict to artisan pastries, this tour blends elegance with comfort food — perfect for foodies who brunch hard.",
//   ],
//   galleryImages: [IMG1, IMG2, IMG3, IMG4],
//   bannerImage: eatingIMG,
//   included: [
//     { value: "Brunch", name: "4 delicious stops" },
//     { value: "Drinks", name: "Mimosas & coffee pairings" },
//     { value: "Guide", name: "Hosted by a brunch enthusiast" },
//     { value: "Ride", name: "Comfy shuttle service" },
//   ],
//   testimonial: {
//     quote:
//       "Can’t wait for this one to launch — Naples has some of the best brunch spots in Florida. This tour is going to be a game changer!",
//     name: "Samantha Lee",
//     role: "Brunch blogger",
//     avatar:
//       "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&q=80&w=1024&h=1024",
//     ratingIcon: StarIcon,
//   },
// },
// {
//   slug: "bonita",
//   name: "Taste of Bonita Tour",
//   title: "Savor Bonita Springs — one bite at a time",
//   heroText:
//     "From hidden taco stands to breezy beachside bites, our Bonita tour is a flavorful journey through Southwest Florida’s coastal charm.",
//   ctaLine: "Book your Bonita food tour today.",
//   duration: "4 hrs",
//   stops: 5,
//   guests: "14+",
//   cost: "$149",
//   about: [
//     "Picture warm tortillas crisping on a flat-top grill, the citrusy zing of fresh ceviche, and the aroma of slow-cooked meats drifting through the air. Each stop on the tour brings a new sensation — sizzling, spicy, sweet, and savory — crafted to awaken every corner of your palate.",
//     "You’ll hear the buzz of local spots, feel the breeze as you stroll palm-lined streets, and see Bonita’s vibrant colors reflected in every plate. This is more than just a food tour — it’s a feast for all your senses, wrapped in sun-soaked charm and coastal hospitality.",
//   ],
//   galleryImages: [IMG1, IMG2, IMG3, IMG4],
//   bannerImage: eatingIMG,
//   included: [
//     { value: "Food", name: "5 curated tastings" },
//     { value: "Drinks", name: "Local favorites included" },
//     { value: "Guide", name: "Led by a local expert" },
//     { value: "Ride", name: "Shuttle between stops" },
//   ],
//   testimonial: {
//     quote:
//       "Every stop on the tour was a total hit. The food was incredible, the pacing was perfect, and our guide made the whole experience feel effortless. I’d recommend this to anyone visiting Bonita — or even locals who want to discover hidden gems.",
//     name: "Judith Black",
//     role: "Food & travel blogger",
//     avatar:
//       "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80",
//     ratingIcon: StarIcon,
//   },
// },
