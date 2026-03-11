// ── Reusable image refs ──────────────────────────────────────────────────
const IMG = {
    fries: '/assets/images/service/fries.png',
    spag: '/assets/images/service/spag.png',
    burger: '/assets/images/service/burger.png',
    juice: '/assets/images/service/juice.png',
    steak: '/assets/images/service/steak.png',
    sushi: '/assets/images/service/sushi.png',
};

// ── Reusable restaurant logo refs ────────────────────────────────────────
const LOGO = {
    jollibee: '/assets/images/service/resturant_logo/jollibee.svg',
    mcdonalds: '/assets/images/service/resturant_logo/mcdonald-s-7.svg',
    sushiNori: '/assets/images/service/resturant_logo/sushi nori.svg',
    mangInasal: '/assets/images/service/resturant_logo/Mang_Inasal.svg',
    chowking: '/assets/images/service/resturant_logo/chowking.svg',
    kfc: '/assets/images/service/resturant_logo/KFC.svg',
};

// ── Owner credentials (one per store) ───────────────────────────────────
export const ownerCredentials = [
    { storeId: 1, email: 'jollibee@tmcfoodhub.com', password: 'jollibee123' },
    { storeId: 2, email: 'mcdo@tmcfoodhub.com', password: 'mcdo123' },
    { storeId: 3, email: 'sushinori@tmcfoodhub.com', password: 'sushi123' },
    { storeId: 4, email: 'manginasal@tmcfoodhub.com', password: 'inasal123' },
    { storeId: 5, email: 'kfc@tmcfoodhub.com', password: 'kfc123' },
    { storeId: 6, email: 'chowking@tmcfoodhub.com', password: 'chowking123' },
];

// ── Default operating hours (Mon-Sun) ────────────────────────────────────
const defaultHours = [
    { day: 'Monday', open: true, from: '09:00', to: '22:00' },
    { day: 'Tuesday', open: true, from: '09:00', to: '22:00' },
    { day: 'Wednesday', open: true, from: '09:00', to: '22:00' },
    { day: 'Thursday', open: true, from: '09:00', to: '22:00' },
    { day: 'Friday', open: true, from: '09:00', to: '23:00' },
    { day: 'Saturday', open: true, from: '09:00', to: '23:00' },
    { day: 'Sunday', open: true, from: '10:00', to: '21:00' },
];

// ── Store / Restaurant Data ──────────────────────────────────────────────
export const defaultStores = [
    {
        id: 1,
        name: 'Jollibee',
        branchName: 'Jollibee SM City Branch',
        cuisine: 'Filipino Fast Food · Chicken · Burgers',
        category: 'Fast Food',
        dietary: 'Halal',
        location: 'SM City, North Reclamation Area, Cebu City',
        hours: '7:00 AM – 11:00 PM',
        phone: '+63 32 234 5678',
        status: 'Operational',
        deliveryTime: '20–35 min',
        minOrder: '$2.00',
        cover: LOGO.jollibee,
        logo: LOGO.jollibee,
        brandColor: 'linear-gradient(135deg, #D62027 0%, #EE3124 100%)',
        rating: 4.7,
        about: "One of the Philippines' most beloved fast food chains. Famous for Chickenjoy, Jolly Spaghetti, and Yumburger since 1978.",
        operatingHours: [
            { day: 'Monday', open: true, from: '07:00', to: '23:00' },
            { day: 'Tuesday', open: true, from: '07:00', to: '23:00' },
            { day: 'Wednesday', open: true, from: '07:00', to: '23:00' },
            { day: 'Thursday', open: true, from: '07:00', to: '23:00' },
            { day: 'Friday', open: true, from: '07:00', to: '23:00' },
            { day: 'Saturday', open: true, from: '07:00', to: '23:00' },
            { day: 'Sunday', open: true, from: '07:00', to: '23:00' },
        ],
        menuItems: [
            { id: 101, category: 'Chickenjoy Meals', title: 'Chickenjoy Solo', description: '1-pc crispy fried chicken, regular fries & drinks.', price: 3.50, available: true, image: IMG.fries },
            { id: 102, category: 'Chickenjoy Meals', title: 'Chickenjoy 2-pc', description: '2-pc fried chicken with rice and gravy.', price: 5.80, available: true, image: IMG.fries },
            { id: 103, category: 'Chickenjoy Meals', title: 'Chickenjoy Bucket 8-pc', description: 'Family bucket of 8 crispy chicken pieces.', price: 18.00, available: true, image: IMG.fries },
            { id: 104, category: 'Chickenjoy Meals', title: 'Chicken Strips Meal', description: 'Juicy chicken strips with honeydip sauce and fries.', price: 4.20, available: true, image: IMG.fries },
            { id: 105, category: 'Burgers & Sandwiches', title: 'Yumburger', description: "Classic beef burger with Jollibee's signature sauce.", price: 1.80, available: true, image: IMG.burger },
            { id: 106, category: 'Burgers & Sandwiches', title: 'Cheesy Yumburger', description: 'Yumburger topped with melted American cheese.', price: 2.30, available: true, image: IMG.burger },
            { id: 107, category: 'Burgers & Sandwiches', title: 'Jolly Crispy Burger', description: 'Crispy chicken fillet in a soft burger bun.', price: 3.00, available: true, image: IMG.burger },
            { id: 108, category: 'Pasta & Rice', title: 'Jolly Spaghetti', description: 'Sweet-style spaghetti with hotdog slices and cheese.', price: 2.80, available: true, image: IMG.spag },
            { id: 109, category: 'Pasta & Rice', title: 'Garlic Rice', description: 'Fragrant garlic fried rice perfect with any meal.', price: 1.50, available: true, image: IMG.steak },
            { id: 110, category: 'Pasta & Rice', title: 'Jolly Hotdog', description: 'Grilled hotdog in a soft bun with cheese sauce.', price: 2.00, available: true, image: IMG.burger },
            { id: 111, category: 'Desserts & Drinks', title: 'Peach Mango Pie', description: 'Flaky pastry filled with sweet peach and mango.', price: 1.20, available: true, image: IMG.fries },
            { id: 112, category: 'Desserts & Drinks', title: 'Jolly Sundae', description: 'Creamy soft-serve in chocolate or strawberry.', price: 1.00, available: true, image: IMG.juice },
            { id: 113, category: 'Desserts & Drinks', title: 'Pineapple Juice', description: 'Refreshing 100% pineapple juice, chilled.', price: 1.50, available: true, image: IMG.juice },
        ],
        reviews: [
            { id: 1, name: 'Ana M.', avatar: 'AM', rating: 5, date: 'Mar 1, 2026', text: 'Best Chickenjoy in the city! Always fresh and crispy.' },
            { id: 2, name: 'Ben C.', avatar: 'BC', rating: 5, date: 'Feb 22, 2026', text: 'Fast service and always consistent. Love it!' },
            { id: 3, name: 'Carla D.', avatar: 'CD', rating: 4, date: 'Feb 10, 2026', text: 'Spaghetti is a bit sweeter than usual but still delicious.' },
            { id: 4, name: 'Dan R.', avatar: 'DR', rating: 5, date: 'Feb 3, 2026', text: 'Peach Mango Pie is always the highlight! Great value.' },
        ]
    },
    {
        id: 2,
        name: "McDonald's",
        branchName: "McDonald's Ayala Center Branch",
        cuisine: 'American Fast Food · Burgers · Coffee',
        category: 'Fast Food',
        dietary: 'All',
        location: 'Ayala Center Cebu, Archbishop Reyes Ave.',
        hours: '24 Hours',
        phone: '+63 32 888 1234',
        status: 'Operational',
        deliveryTime: '15–25 min',
        minOrder: '$3.00',
        cover: LOGO.mcdonalds,
        logo: LOGO.mcdonalds,
        brandColor: 'linear-gradient(135deg, #DA291C 0%, #FFC72C 100%)',
        rating: 4.5,
        about: "The world's largest fast food chain. Known for the Big Mac, McFlurry, and McCafé. Now serving 24/7 at Ayala.",
        operatingHours: [
            { day: 'Monday', open: true, from: '00:00', to: '23:59' },
            { day: 'Tuesday', open: true, from: '00:00', to: '23:59' },
            { day: 'Wednesday', open: true, from: '00:00', to: '23:59' },
            { day: 'Thursday', open: true, from: '00:00', to: '23:59' },
            { day: 'Friday', open: true, from: '00:00', to: '23:59' },
            { day: 'Saturday', open: true, from: '00:00', to: '23:59' },
            { day: 'Sunday', open: true, from: '00:00', to: '23:59' },
        ],
        menuItems: [
            { id: 201, category: 'Mix & Match', title: 'McSavers Burger', description: 'Budget-friendly beef burger with lettuce and ketchup.', price: 1.50, available: true, image: IMG.burger },
            { id: 202, category: 'Mix & Match', title: 'McSavers McFries', description: 'Small golden fries at a great everyday price.', price: 1.20, available: true, image: IMG.fries },
            { id: 203, category: 'Mix & Match', title: 'McSavers Sundae', description: 'Soft-serve sundae in chocolate or strawberry drizzle.', price: 1.00, available: true, image: IMG.juice },
            { id: 204, category: 'Mix & Match', title: 'McSavers Fried Chicken', description: '1-pc crispy chicken at budget price.', price: 2.00, available: true, image: IMG.fries },
            { id: 205, category: 'Fully Loaded', title: 'Big Mac', description: 'Double beef patty, special sauce, lettuce, cheese, pickles.', price: 5.00, available: true, image: IMG.burger },
            { id: 206, category: 'Fully Loaded', title: 'Quarter Pounder Deluxe', description: 'Quarter-pound beef with fresh tomato and crispy lettuce.', price: 5.50, available: true, image: IMG.burger },
            { id: 207, category: 'Fully Loaded', title: 'McSpicy Double', description: 'Double crispy spicy fillets with jalapeño sauce.', price: 4.80, available: true, image: IMG.burger },
            { id: 208, category: 'Fully Loaded', title: 'Mega McFries', description: 'Our largest serving of golden crispy fries.', price: 3.50, available: true, image: IMG.fries },
            { id: 209, category: 'McCafé', title: 'Caramel Macchiato', description: 'Espresso shots with vanilla syrup and caramel drizzle.', price: 3.80, available: true, image: IMG.juice },
            { id: 210, category: 'McCafé', title: 'Mocha Frappe', description: 'Blended mocha with whipped cream and chocolate drizzle.', price: 3.50, available: true, image: IMG.juice },
            { id: 211, category: 'McCafé', title: 'Strawberry Shake', description: 'Thick strawberry milkshake with real strawberries.', price: 3.00, available: true, image: IMG.juice },
            { id: 212, category: 'Happy Meals', title: 'Chicken McDo Happy Meal', description: '1-pc chicken, small fries, juice, and a toy surprise.', price: 4.00, available: true, image: IMG.fries },
            { id: 213, category: 'Happy Meals', title: 'Burger Happy Meal', description: 'Cheeseburger, small fries, apple juice, and a toy.', price: 3.80, available: true, image: IMG.burger },
        ],
        reviews: [
            { id: 1, name: 'Rico P.', avatar: 'RP', rating: 5, date: 'Mar 3, 2026', text: 'Open 24 hours is a lifesaver! Big Mac never disappoints.' },
            { id: 2, name: 'Lea S.', avatar: 'LS', rating: 4, date: 'Feb 28, 2026', text: 'Clean branch, fast lanes. McFlurry is always on point.' },
            { id: 3, name: 'Mark T.', avatar: 'MT', rating: 4, date: 'Feb 15, 2026', text: 'Good food but can get crowded during lunch rush.' },
            { id: 4, name: 'Joy B.', avatar: 'JB', rating: 5, date: 'Feb 8, 2026', text: 'The McCafé drinks are seriously underrated.' },
        ]
    },
    {
        id: 3,
        name: 'Sushi Nori',
        branchName: 'Sushi Nori IT Park Branch',
        cuisine: 'Japanese · Sushi · Ramen',
        category: 'Japanese',
        dietary: 'All',
        location: 'Cebu IT Park, Lahug, Cebu City',
        hours: '11:00 AM – 10:00 PM',
        phone: '+63 32 411 9900',
        status: 'Operational',
        deliveryTime: '30–45 min',
        minOrder: '$5.00',
        cover: LOGO.sushiNori,
        logo: LOGO.sushiNori,
        brandColor: 'linear-gradient(135deg, #1e3a5f 0%, #2563EB 100%)',
        rating: 4.6,
        about: 'A modern Japanese dining experience with fresh sushi, bento sets, and authentic ramen.',
        operatingHours: [
            { day: 'Monday', open: true, from: '11:00', to: '22:00' },
            { day: 'Tuesday', open: true, from: '11:00', to: '22:00' },
            { day: 'Wednesday', open: true, from: '11:00', to: '22:00' },
            { day: 'Thursday', open: true, from: '11:00', to: '22:00' },
            { day: 'Friday', open: true, from: '11:00', to: '23:00' },
            { day: 'Saturday', open: true, from: '11:00', to: '23:00' },
            { day: 'Sunday', open: false, from: '12:00', to: '21:00' },
        ],
        menuItems: [
            { id: 301, category: 'Signature Rolls', title: 'Dragon Roll', description: 'Shrimp tempura, avocado, spicy mayo and tobiko.', price: 8.00, available: true, image: IMG.sushi },
            { id: 302, category: 'Signature Rolls', title: 'Rainbow Roll', description: 'California roll topped with assorted sashimi.', price: 9.50, available: true, image: IMG.sushi },
            { id: 303, category: 'Signature Rolls', title: 'Volcano Roll', description: 'Spicy tuna inside, baked seafood mixture on top.', price: 9.00, available: true, image: IMG.sushi },
            { id: 304, category: 'Signature Rolls', title: 'Salmon Aburi', description: 'Torched Norwegian salmon with yuzu ponzu and scallion.', price: 10.50, available: true, image: IMG.sushi },
            { id: 305, category: 'Ramen & Hot Bowls', title: 'Tonkotsu Ramen', description: 'Rich creamy pork broth with chashu, soft egg, and nori.', price: 9.50, available: true, image: IMG.spag },
            { id: 306, category: 'Ramen & Hot Bowls', title: 'Spicy Miso Ramen', description: 'Bold miso broth with chili, corn, butter, bean sprouts.', price: 9.00, available: true, image: IMG.spag },
            { id: 307, category: 'Ramen & Hot Bowls', title: 'Gyudon (Beef Bowl)', description: 'Seasoned beef and onions over steamed Japanese rice.', price: 8.50, available: true, image: IMG.steak },
            { id: 308, category: 'Ramen & Hot Bowls', title: 'Chirashi Bowl', description: 'Assorted sashimi over sushi rice with pickled ginger.', price: 12.00, available: true, image: IMG.sushi },
            { id: 309, category: 'Grills & Mains', title: 'Wagyu Steak', description: 'A5 wagyu sirloin, grilled to order with truffle butter.', price: 15.00, available: true, image: IMG.steak },
            { id: 310, category: 'Grills & Mains', title: 'Grilled Salmon Teriyaki', description: 'Norwegian salmon glazed with teriyaki sauce and sesame.', price: 11.00, available: true, image: IMG.steak },
            { id: 311, category: 'Grills & Mains', title: 'Karaage Platter', description: 'Double serving of Japanese fried chicken with kewpie mayo.', price: 7.50, available: true, image: IMG.fries },
            { id: 312, category: 'Beverages', title: 'Matcha Latte', description: 'Ceremonial grade matcha with steamed oat milk.', price: 4.00, available: true, image: IMG.juice },
            { id: 313, category: 'Beverages', title: 'Yuzu Lemonade', description: 'Refreshing yuzu citrus with sparkling water.', price: 3.50, available: true, image: IMG.juice },
            { id: 314, category: 'Beverages', title: 'Peach Oolong Tea', description: 'Brewed oolong tea with fresh peach and ice.', price: 3.00, available: true, image: IMG.juice },
        ],
        reviews: [
            { id: 1, name: 'Yuki L.', avatar: 'YL', rating: 5, date: 'Mar 2, 2026', text: 'The Dragon Roll is incredible. Best sushi in Cebu!' },
            { id: 2, name: 'James T.', avatar: 'JT', rating: 5, date: 'Feb 20, 2026', text: 'Ambiance is amazing. The ramen is soul-warming.' },
            { id: 3, name: 'Sarah G.', avatar: 'SG', rating: 4, date: 'Feb 5, 2026', text: 'Pricier but totally worth it for the quality.' },
            { id: 4, name: 'Ken M.', avatar: 'KM', rating: 5, date: 'Jan 28, 2026', text: 'Wagyu Steak is absolutely divine. 10/10 would order again.' },
        ]
    },
    {
        id: 4,
        name: 'Mang Inasal',
        branchName: 'Mang Inasal Colon Branch',
        cuisine: 'Filipino BBQ · Rice Meals · Inasal',
        category: 'Filipino',
        dietary: 'Halal',
        location: 'Colon Street, Downtown, Cebu City',
        hours: '9:00 AM – 10:00 PM',
        phone: '+63 32 256 7788',
        status: 'Operational',
        deliveryTime: '25–40 min',
        minOrder: '$2.50',
        cover: LOGO.mangInasal,
        logo: LOGO.mangInasal,
        brandColor: 'linear-gradient(135deg, #7C2D12 0%, #EA580C 100%)',
        rating: 4.4,
        about: 'Home of unlimited rice and authentic charcoal-grilled chicken inasal. Great value for Cebuanos.',
        operatingHours: defaultHours.map(h => ({ ...h, from: '09:00', to: '22:00' })),
        menuItems: [
            { id: 401, category: 'Paborito Meals', title: 'Chicken Paa Solo', description: 'Charcoal-grilled chicken leg with unli-rice and soup.', price: 3.80, available: true, image: IMG.steak },
            { id: 402, category: 'Paborito Meals', title: 'Chicken Pecho Solo', description: 'Grilled chicken breast, extra juicy with calamansi marinade.', price: 4.00, available: true, image: IMG.steak },
            { id: 403, category: 'Paborito Meals', title: 'BBQ Pork Combo', description: 'Skewered pork BBQ with garlic rice and sawsawan.', price: 4.50, available: true, image: IMG.steak },
            { id: 404, category: 'Paborito Meals', title: 'Liempo Meal', description: 'Grilled pork belly with rice. A Cebuano classic.', price: 5.00, available: true, image: IMG.steak },
            { id: 405, category: 'Fiesta Packages', title: '4-pc Inasal Pack', description: '4 pcs chicken inasal, rice, soup, sawsawan for 2-3 pax.', price: 12.00, available: true, image: IMG.fries },
            { id: 406, category: 'Fiesta Packages', title: '8-pc Paborito Bucket', description: '8 pcs chicken, 4 rice, 2 soup. Perfect for family sharing.', price: 22.00, available: true, image: IMG.fries },
            { id: 407, category: 'Sidings', title: 'Palabok', description: 'Rice noodles in savory shrimp sauce with pork chicharon.', price: 3.50, available: true, image: IMG.spag },
            { id: 408, category: 'Sidings', title: 'Bangus Sisig', description: 'Sizzling milkfish sisig with onions and peppers.', price: 4.20, available: true, image: IMG.steak },
            { id: 409, category: 'Sidings', title: 'Garlic Fried Rice', description: 'Fragrant garlic rice perfect with any grilled dish.', price: 1.50, available: true, image: IMG.steak },
            { id: 410, category: 'Desserts & Drinks', title: 'Halo-Halo', description: 'Classic Filipino shaved ice with leche flan and ube ice cream.', price: 2.50, available: true, image: IMG.juice },
            { id: 411, category: 'Desserts & Drinks', title: 'Mais con Yelo', description: 'Sweet corn kernels on crushed ice, drizzled with milk.', price: 2.00, available: true, image: IMG.juice },
            { id: 412, category: 'Desserts & Drinks', title: 'Pineapple Cooler', description: 'Chilled pineapple juice with a hint of mint.', price: 1.50, available: true, image: IMG.juice },
        ],
        reviews: [
            { id: 1, name: 'Pedro L.', avatar: 'PL', rating: 5, date: 'Mar 1, 2026', text: 'Unli rice is the best deal! Inasal flavor is perfect.' },
            { id: 2, name: 'Nena J.', avatar: 'NJ', rating: 4, date: 'Feb 18, 2026', text: 'Always busy but worth the wait. The chicken is always juicy.' },
            { id: 3, name: 'Lito B.', avatar: 'LB', rating: 4, date: 'Feb 8, 2026', text: 'Good value, big portions. Halo-halo is refreshing!' },
            { id: 4, name: 'Grace C.', avatar: 'GC', rating: 5, date: 'Jan 30, 2026', text: 'The Liempo Meal is so worth it. Best BBQ spot in Colon.' },
        ]
    },
    {
        id: 5,
        name: 'KFC',
        branchName: 'KFC IT Park Branch',
        cuisine: 'American Fast Food · Chicken',
        category: 'Fast Food',
        dietary: 'All',
        location: 'Cebu IT Park, Lahug, Cebu City',
        hours: '10:00 AM – 10:00 PM',
        phone: '+63 32 412 1234',
        status: 'Operational',
        deliveryTime: '20–35 min',
        minOrder: '$3.00',
        cover: LOGO.kfc,
        logo: LOGO.kfc,
        brandColor: 'linear-gradient(135deg, #E60000 0%, #A30000 100%)',
        rating: 4.8,
        about: 'Finger Lickin Good fried chicken.',
        operatingHours: defaultHours.map(h => ({ ...h, from: '10:00', to: '22:00' })),
        menuItems: [
            { id: 501, category: 'Chicken Meals', title: '1-PC Fully Loaded Meal', description: '1-pc chicken, rice, mushroom soup, and drink.', price: 4.00, available: true, image: IMG.fries },
            { id: 502, category: 'Chicken Meals', title: '2-pc Chicken Meal', description: '2-pc original recipe chicken, rice, and gravy.', price: 5.50, available: true, image: IMG.fries },
            { id: 503, category: 'Chicken Meals', title: '8-pc Chicken Bucket', description: '8 pieces of delicious fried chicken.', price: 18.00, available: true, image: IMG.fries },
            { id: 504, category: 'Bowls', title: 'Ala King Rice Bowl', description: 'Chicken shots with Ala King sauce and rice.', price: 2.80, available: true, image: IMG.steak },
            { id: 505, category: 'Bowls', title: 'Sisig Rice Bowl', description: 'Sisig style chicken shots over rice.', price: 3.00, available: true, image: IMG.steak },
            { id: 506, category: 'Burgers & Wraps', title: 'Zinger Burger', description: 'Spicy chicken fillet burger with lettuce and mayo.', price: 3.50, available: true, image: IMG.burger },
            { id: 507, category: 'Burgers & Wraps', title: 'Cali Maki Twister', description: 'Chicken strips, cucumber, mango, wrapped in a tortilla.', price: 3.20, available: true, image: IMG.burger },
            { id: 508, category: 'Sides', title: 'Crispy Fries', description: 'Golden crispy fries.', price: 2.00, available: true, image: IMG.fries },
            { id: 509, category: 'Sides', title: 'Mashed Potato Regular', description: 'Creamy mashed potato with signature gravy.', price: 1.50, available: true, image: IMG.juice },
            { id: 510, category: 'Sides', title: 'Regular Shots', description: 'Bite-sized chicken shots.', price: 2.50, available: true, image: IMG.fries },
            { id: 511, category: 'Desserts', title: 'Brownie Box', description: 'Box of fudgy brownies.', price: 3.00, available: true, image: IMG.juice },
        ],
        reviews: [
            { id: 1, name: 'John D.', avatar: 'JD', rating: 5, date: 'Mar 1, 2026', text: 'Zinger is the best fast food burger!' }
        ]
    },
    {
        id: 6,
        name: 'Chowking',
        branchName: 'Chowking SM City',
        cuisine: 'Chinese Fast Food · Dimsum',
        category: 'Chinese',
        dietary: 'All',
        location: 'SM City Cebu',
        hours: '10:00 AM – 9:00 PM',
        phone: '+63 32 234 9999',
        status: 'Operational',
        deliveryTime: '25–40 min',
        minOrder: '$3.00',
        cover: LOGO.chowking,
        logo: LOGO.chowking,
        brandColor: 'linear-gradient(135deg, #DA291C 0%, #FFC72C 100%)',
        rating: 4.3,
        about: 'Freshly prepared Chinese fast food.',
        operatingHours: defaultHours.map(h => ({ ...h, from: '10:00', to: '21:00' })),
        menuItems: [
            { id: 601, category: 'Chao Fan', title: 'Beef Chao Fan', description: 'Fried rice served with beef toppings.', price: 2.50, available: true, image: IMG.steak },
            { id: 602, category: 'Chao Fan', title: 'Pork Chao Fan', description: 'Fried rice served with pork toppings.', price: 2.30, available: true, image: IMG.steak },
            { id: 603, category: 'Chao Fan', title: 'Siomai Chao Fan', description: 'Fried rice topped with steamed siomai.', price: 3.00, available: true, image: IMG.sushi },
            { id: 604, category: 'Chao Fan', title: 'Spicy Chao Fan Platter', description: 'Spicy fried rice platter for sharing.', price: 5.50, available: true, image: IMG.steak },
            { id: 605, category: 'Noodles', title: 'Beef Mami', description: 'Noodle soup with slow-cooked beef bricket.', price: 3.50, available: true, image: IMG.spag },
            { id: 606, category: 'Noodles', title: 'Wonton Mami', description: 'Noodle soup with pork wontons.', price: 3.20, available: true, image: IMG.spag },
            { id: 607, category: 'Noodles', title: 'Pancit Canton', description: 'Stir-fried noodles with meat and vegetables.', price: 3.50, available: true, image: IMG.spag },
            { id: 608, category: 'Chicken', title: '1pc Chinese-Style Fried Chicken', description: 'Fried chicken with a crisp, savory skin.', price: 3.00, available: true, image: IMG.fries },
            { id: 609, category: 'Chicken', title: '8pc Chinese-Style Fried Chicken', description: '8 pieces of crispy fried chicken.', price: 16.00, available: true, image: IMG.fries },
            { id: 610, category: 'Chicken', title: 'Chinese-Style Fried Chicken Lauriat', description: 'Chicken, rice, noodles, chicharap, and buchi.', price: 6.00, available: true, image: IMG.fries },
            { id: 611, category: 'Desserts & Drinks', title: 'Halo-Halo Supreme', description: 'Classic Filipino shaved ice dessert.', price: 3.50, available: true, image: IMG.juice },
            { id: 612, category: 'Desserts & Drinks', title: 'Black Tea Latte with Pudding', description: 'Sweet black tea latte with pudding.', price: 2.80, available: true, image: IMG.juice },
            { id: 613, category: 'Desserts & Drinks', title: 'Buchi Group Platter', description: 'Deep-fried sesame balls with lotus paste.', price: 4.50, available: true, image: IMG.fries },
        ],
        reviews: [
            { id: 1, name: 'Maria C.', avatar: 'MC', rating: 4, date: 'Mar 2, 2026', text: 'Chao Fan is my go-to comfort food.' }
        ]
    },
];

// ── Get live stores (merges localStorage edits on top of defaults) ───────
export function getStores() {
    try {
        const saved = localStorage.getItem('tmcStores');
        if (saved) {
            const parsed = JSON.parse(saved);
            // Invalidate cache if it contains old stores that were replaced
            if (parsed.some(s => s.name === 'Steak & Co.' || s.name === 'Té Hana Ramen' || s.name === 'Patty Shack')) {
                localStorage.removeItem('tmcStores');
                return defaultStores;
            }
            return parsed;
        }
        return defaultStores;
    } catch {
        return defaultStores;
    }
}

export function saveStores(stores) {
    localStorage.setItem('tmcStores', JSON.stringify(stores));
}
