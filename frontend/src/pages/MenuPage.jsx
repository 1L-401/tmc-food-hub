import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, Clock, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import StoreModal from '../components/ui/StoreModal';
import Navbar from '../components/sections/Navbar';
import Footer from '../components/sections/Footer';
import BackToTop from '../components/ui/BackToTop';
import styles from './MenuPage.module.css';

// ── Store / Restaurant Data ──────────────────────────────────────────────
const stores = [
    {
        id: 1,
        name: "Jollibee",
        branchName: "Jollibee SM City Branch",
        cuisine: "Filipino Fast Food · Chicken · Burgers",
        category: "Fast Food",
        dietary: "Halal",
        location: "SM City, North Reclamation Area, Cebu City",
        hours: "7:00 AM – 11:00 PM",
        phone: "+63 32 234 5678",
        status: "Operational",
        deliveryTime: "20–35 min",
        minOrder: "$2.00",
        cover: '/assets/images/service/burger.webp',
        logo: '/assets/images/service/fries.webp',
        brandColor: "linear-gradient(135deg, #D62027 0%, #EE3124 100%)",
        rating: 4.7,
        about: "One of the Philippines' most beloved fast food chains. Famous for Chickenjoy, Jolly Spaghetti, and Yumburger since 1978.",
        menuItems: [
            { id: 101, title: 'Chickenjoy', description: 'World-famous crispy fried chicken, juicy inside.', price: 3.50, image: '/assets/images/service/fries.webp' },
            { id: 102, title: 'Jolly Spaghetti', description: 'Sweet-style spaghetti topped with hotdog and cheese.', price: 2.80, image: '/assets/images/service/spag.webp' },
            { id: 103, title: 'Yumburger', description: 'Classic beef burger with special Jollibee sauce.', price: 1.80, image: '/assets/images/service/burger.webp' },
            { id: 104, title: 'Peach Mango Pie', description: 'Flaky pastry with sweet peach and mango filling.', price: 1.20, image: '/assets/images/service/juice.webp' },
        ],
        reviews: [
            { id: 1, name: 'Ana M.', avatar: 'AM', rating: 5, date: 'Mar 1, 2026', text: 'Best Chickenjoy in the city! Always fresh and crispy.' },
            { id: 2, name: 'Ben C.', avatar: 'BC', rating: 5, date: 'Feb 22, 2026', text: 'Fast service and the food is always consistent. Love it!' },
            { id: 3, name: 'Carla D.', avatar: 'CD', rating: 4, date: 'Feb 10, 2026', text: 'Spaghetti is a bit sweeter than usual but still delicious.' },
        ]
    },
    {
        id: 2,
        name: "McDonald's",
        branchName: "McDonald's Ayala Center Branch",
        cuisine: "American Fast Food · Burgers · Coffee",
        category: "Fast Food",
        dietary: "All",
        location: "Ayala Center Cebu, Archbishop Reyes Ave.",
        hours: "24 Hours",
        phone: "+63 32 888 1234",
        status: "Operational",
        deliveryTime: "15–25 min",
        minOrder: "$3.00",
        cover: '/assets/images/service/burger.webp',
        logo: '/assets/images/service/burger.webp',
        brandColor: "linear-gradient(135deg, #DA291C 0%, #FFC72C 100%)",
        rating: 4.5,
        about: "The world's largest fast food chain. Known for the Big Mac, McFlurry, and McCafé. Now serving 24/7 at Ayala.",
        menuItems: [
            { id: 201, title: 'Big Mac', description: 'Double beef patty with special Mac sauce and lettuce.', price: 5.00, image: '/assets/images/service/burger.webp' },
            { id: 202, title: 'McFries (Large)', description: 'Perfectly salted golden fries, always crispy.', price: 2.50, image: '/assets/images/service/fries.webp' },
            { id: 203, title: 'McFlurry', description: 'Creamy soft-serve swirled with Oreo and caramel.', price: 3.00, image: '/assets/images/service/juice.webp' },
            { id: 204, title: 'Chicken McNuggets', description: '6-piece crispy chicken nuggets with dipping sauce.', price: 3.50, image: '/assets/images/service/steak.webp' },
        ],
        reviews: [
            { id: 1, name: 'Rico P.', avatar: 'RP', rating: 5, date: 'Mar 3, 2026', text: 'Open 24 hours is a lifesaver! Big Mac never disappoints.' },
            { id: 2, name: 'Lea S.', avatar: 'LS', rating: 4, date: 'Feb 28, 2026', text: 'Clean branch, fast lanes. McFlurry is always on point.' },
            { id: 3, name: 'Mark T.', avatar: 'MT', rating: 4, date: 'Feb 15, 2026', text: 'Good food but can get crowded during lunch rush.' },
        ]
    },
    {
        id: 3,
        name: "Sushi Nori",
        branchName: "Sushi Nori IT Park Branch",
        cuisine: "Japanese · Sushi · Ramen",
        category: "Japanese",
        dietary: "All",
        location: "Cebu IT Park, Lahug, Cebu City",
        hours: "11:00 AM – 10:00 PM",
        phone: "+63 32 411 9900",
        status: "Operational",
        deliveryTime: "30–45 min",
        minOrder: "$5.00",
        cover: '/assets/images/service/sushi.webp',
        logo: '/assets/images/service/sushi.webp',
        brandColor: "linear-gradient(135deg, #1e3a5f 0%, #2563EB 100%)",
        rating: 4.6,
        about: "A modern Japanese dining experience with fresh sushi, bento sets, and authentic ramen.",
        menuItems: [
            { id: 301, title: 'Dragon Roll', description: 'Shrimp tempura, avocado, and spicy mayo roll.', price: 8.00, image: '/assets/images/service/sushi.webp' },
            { id: 302, title: 'Tonkotsu Ramen', description: 'Rich creamy pork broth with chashu and soft egg.', price: 9.50, image: '/assets/images/service/spag.webp' },
            { id: 303, title: 'Wagyu Steak', description: 'Premium A5 wagyu, grilled to your liking.', price: 15.00, image: '/assets/images/service/steak.webp' },
            { id: 304, title: 'Matcha Latte', description: 'Ceremonial grade matcha with oat milk.', price: 4.00, image: '/assets/images/service/juice.webp' },
        ],
        reviews: [
            { id: 1, name: 'Yuki L.', avatar: 'YL', rating: 5, date: 'Mar 2, 2026', text: 'The Dragon Roll is incredible. Best sushi in Cebu!' },
            { id: 2, name: 'James T.', avatar: 'JT', rating: 5, date: 'Feb 20, 2026', text: 'Ambiance is amazing. The ramen is soul-warming.' },
            { id: 3, name: 'Sarah G.', avatar: 'SG', rating: 4, date: 'Feb 5, 2026', text: 'Pricier but totally worth it for the quality.' },
        ]
    },
    {
        id: 4,
        name: "Mang Inasal",
        branchName: "Mang Inasal Colon Branch",
        cuisine: "Filipino BBQ · Rice Meals · Inasal",
        category: "Filipino",
        dietary: "Halal",
        location: "Colon Street, Downtown, Cebu City",
        hours: "9:00 AM – 10:00 PM",
        phone: "+63 32 256 7788",
        status: "Operational",
        deliveryTime: "25–40 min",
        minOrder: "$2.50",
        cover: '/assets/images/service/steak.webp',
        logo: '/assets/images/service/steak.webp',
        brandColor: "linear-gradient(135deg, #7C2D12 0%, #EA580C 100%)",
        rating: 4.4,
        about: "Home of unlimited rice and authentic charcoal-grilled chicken inasal. Great value for Cebuanos.",
        menuItems: [
            { id: 401, title: 'Chicken Paa', description: 'Marinated chicken leg quarter, charcoal-grilled.', price: 3.80, image: '/assets/images/service/steak.webp' },
            { id: 402, title: 'Palabok', description: 'Rice noodles in savory shrimp sauce with pork.', price: 3.50, image: '/assets/images/service/spag.webp' },
            { id: 403, title: 'Halo-Halo', description: 'Classic Filipino shaved ice dessert with leche flan.', price: 2.50, image: '/assets/images/service/juice.webp' },
            { id: 404, title: 'Bangus Sisig', description: 'Sizzling milkfish sisig with onions and peppers.', price: 4.20, image: '/assets/images/service/fries.webp' },
        ],
        reviews: [
            { id: 1, name: 'Pedro L.', avatar: 'PL', rating: 5, date: 'Mar 1, 2026', text: 'Unli rice is the best deal! Inasal flavor is perfect.' },
            { id: 2, name: 'Nena J.', avatar: 'NJ', rating: 4, date: 'Feb 18, 2026', text: 'Always busy but worth the wait. The chicken is always juicy.' },
            { id: 3, name: 'Lito B.', avatar: 'LB', rating: 4, date: 'Feb 8, 2026', text: 'Good value, big portions. Halo-halo is refreshing!' },
        ]
    },
    {
        id: 5,
        name: "Steak & Co.",
        branchName: "Steak & Co. Crossroads Branch",
        cuisine: "Western · Steakhouse · Grills",
        category: "Grills",
        dietary: "All",
        location: "Crossroads Mall, Banilad, Cebu City",
        hours: "11:00 AM – 11:00 PM",
        phone: "+63 32 317 4422",
        status: "Operational",
        deliveryTime: "35–50 min",
        minOrder: "$8.00",
        cover: '/assets/images/service/steak.webp',
        logo: '/assets/images/service/steak.webp',
        brandColor: "linear-gradient(135deg, #1C1C1C 0%, #4B2D1A 100%)",
        rating: 4.8,
        about: "Premium steaks sourced from quality cuts. A fine dining experience bringing Western steakhouse flavors to Cebu.",
        menuItems: [
            { id: 501, title: 'Ribeye Steak', description: 'Prime ribeye, flame-grilled with garlic butter.', price: 18.00, image: '/assets/images/service/steak.webp' },
            { id: 502, title: 'Wagyu Burger', description: 'A5 wagyu beef patty with truffle aioli on brioche.', price: 12.00, image: '/assets/images/service/burger.webp' },
            { id: 503, title: 'Truffle Fries', description: 'Crispy fries tossed in truffle oil and parmesan.', price: 5.00, image: '/assets/images/service/fries.webp' },
            { id: 504, title: 'Red Wine', description: 'Chilean Cabernet Sauvignon, full-bodied and smooth.', price: 7.00, image: '/assets/images/service/juice.webp' },
        ],
        reviews: [
            { id: 1, name: 'Chris B.', avatar: 'CB', rating: 5, date: 'Mar 3, 2026', text: 'Best steak in Cebu. Perfectly cooked medium-rare.' },
            { id: 2, name: 'Dana F.', avatar: 'DF', rating: 5, date: 'Feb 26, 2026', text: 'Worth every peso. Smoky, tender, full of flavour.' },
            { id: 3, name: 'Mike A.', avatar: 'MA', rating: 4, date: 'Feb 14, 2026', text: 'The Wagyu Burger blew my mind. Will definitely return.' },
        ]
    },
    {
        id: 6,
        name: "Té Hana Ramen",
        branchName: "Té Hana Ramen Mango Ave. Branch",
        cuisine: "Japanese · Korean · Asian Fusion",
        category: "Drinks",
        dietary: "Vegetarian",
        location: "Mango Avenue, Cebu City",
        hours: "10:00 AM – 12:00 AM",
        phone: "+63 32 520 8833",
        status: "Operational",
        deliveryTime: "20–30 min",
        minOrder: "$4.00",
        cover: '/assets/images/service/spag.webp',
        logo: '/assets/images/service/spag.webp',
        brandColor: "linear-gradient(135deg, #134E4A 0%, #0D9488 100%)",
        rating: 4.3,
        about: "A vibrant fusion spot blending Japanese ramen with Korean-inspired toppings. Late-night favourite on Mango Ave.",
        menuItems: [
            { id: 601, title: 'Spicy Miso Ramen', description: 'Fiery miso broth with corn, butter, and chashu.', price: 7.50, image: '/assets/images/service/spag.webp' },
            { id: 602, title: 'Korean Bibimbap', description: 'Steamed rice with veggies, egg, and gochujang.', price: 6.00, image: '/assets/images/service/steak.webp' },
            { id: 603, title: 'Karaage', description: 'Japanese fried chicken, juicy inside, crispy outside.', price: 5.50, image: '/assets/images/service/fries.webp' },
            { id: 604, title: 'Bubble Tea', description: 'Taro milk tea with tapioca pearls, served cold.', price: 3.50, image: '/assets/images/service/juice.webp' },
        ],
        reviews: [
            { id: 1, name: 'Kai M.', avatar: 'KM', rating: 4, date: 'Mar 2, 2026', text: 'The Spicy Miso Ramen hits different at midnight!' },
            { id: 2, name: 'Ria T.', avatar: 'RT', rating: 5, date: 'Feb 25, 2026', text: 'Love the fusion concept. Bibimbap is filling and flavourful.' },
            { id: 3, name: 'Lena P.', avatar: 'LP', rating: 4, date: 'Feb 12, 2026', text: 'Great ambiance. The bubble tea is very authentic.' },
        ]
    },
];

function MenuPage() {
    const [selectedStore, setSelectedStore] = useState(null);
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeDietary, setActiveDietary] = useState('All');

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const filtered = stores.filter(s => {
        const matchCat = activeCategory === 'All' || s.category === activeCategory;
        const matchDiet = activeDietary === 'All' || s.dietary === activeDietary;
        return matchCat && matchDiet;
    });

    return (
        <>
            <div className="site-wrap">
                <Navbar />

                <main className={styles.menuPage}>
                    <div className="container-lg">

                        {/* Header */}
                        <div className={styles.pageHeader} data-aos="fade-up">
                            <div className={styles.breadcrumbs}>
                                <Link to="/">Home</Link> <span className="mx-2">/</span>
                                <span className={styles.current}>Restaurants</span>
                            </div>
                            <h1 className={styles.title}>Explore Restaurants</h1>
                            <p className={styles.subtitle}>Browse local branches, check their menus, and order with ease.</p>
                        </div>

                        {/* Search and Sort */}
                        <div className={styles.searchBarContainer} data-aos="fade-up" data-aos-delay="100">
                            <div className={styles.searchInputWrapper}>
                                <Search className={styles.searchIcon} size={18} />
                                <input type="text" className={styles.searchInput} placeholder="Search for a restaurant or cuisine..." />
                            </div>
                            <div className={styles.searchMeta}>
                                <div>
                                    <span className={styles.recipeCount}>{filtered.length}</span> restaurants found
                                </div>
                                <div>
                                    <span style={{ color: '#555', marginRight: '5px' }}>Sort by:</span>
                                    <select className={styles.sortSelect} defaultValue="Popularity">
                                        <option value="Popularity">Popularity</option>
                                        <option value="Rating">Rating</option>
                                        <option value="DeliveryTime">Delivery Time</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="row">

                            {/* Sidebar */}
                            <div className="col-lg-3 mb-4 mb-lg-0" data-aos="fade-right" data-aos-delay="200">
                                <div className={styles.sidebar}>
                                    <div className={styles.filterHeader}>
                                        <Filter size={20} color="#888" />
                                        <span>Filters</span>
                                    </div>

                                    {/* Category Filter */}
                                    <div className={styles.filterGroup}>
                                        <div className={styles.filterGroupTitle}>CATEGORY</div>
                                        {['All', 'Fast Food', 'Filipino', 'Japanese', 'Grills', 'Drinks'].map(cat => (
                                            <label key={cat} className={styles.radioLabel}>
                                                <input
                                                    type="radio"
                                                    name="category"
                                                    className={styles.radioInput}
                                                    checked={activeCategory === cat}
                                                    onChange={() => setActiveCategory(cat)}
                                                />
                                                {cat}
                                            </label>
                                        ))}
                                    </div>

                                    {/* Dietary Preference */}
                                    <div className={styles.filterGroup}>
                                        <div className={styles.filterGroupTitle}>DIETARY PREFERENCE</div>
                                        {['All', 'Vegetarian', 'Halal'].map(diet => (
                                            <label key={diet} className={styles.radioLabel}>
                                                <input
                                                    type="radio"
                                                    name="dietary"
                                                    className={styles.radioInput}
                                                    checked={activeDietary === diet}
                                                    onChange={() => setActiveDietary(diet)}
                                                />
                                                {diet}
                                            </label>
                                        ))}
                                    </div>

                                    <button
                                        className={styles.clearFiltersBtn}
                                        onClick={() => { setActiveCategory('All'); setActiveDietary('All'); }}
                                    >
                                        Clear all filters
                                    </button>
                                </div>
                            </div>

                            {/* Main content grid */}
                            <div className="col-lg-9" data-aos="fade-up" data-aos-delay="300">
                                <div className="row g-4">
                                    {filtered.map(store => (
                                        <div className="col-md-6 col-lg-4" key={store.id}>
                                            <div
                                                className={styles.productCard}
                                                onClick={() => setSelectedStore(store)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {/* Cover image */}
                                                <div className={styles.cardImageWrapper}>
                                                    <img src={store.cover} alt={store.name} className={styles.cardImage} loading="lazy" />
                                                    <span className={styles.deliveryBadge}>
                                                        <Clock size={11} /> {store.deliveryTime}
                                                    </span>
                                                    <span className={store.status === 'Operational' ? styles.statusBadgeOpen : styles.statusBadgeClosed}>
                                                        ● {store.status}
                                                    </span>
                                                </div>

                                                {/* Card body */}
                                                <div className={styles.cardBody}>
                                                    <h3 className={styles.cardTitle}>{store.name}</h3>
                                                    <p className={styles.cardBranch}>{store.branchName}</p>
                                                    <p className={styles.cardDesc}>{store.cuisine}</p>
                                                    <div className={styles.cardMeta}>
                                                        <MapPin size={12} className={styles.metaIcon} />
                                                        <span className={styles.cardLocation}>{store.location}</span>
                                                    </div>
                                                    <div className={styles.cardFooter}>
                                                        <span className={styles.price}>
                                                            <Star size={13} fill="#F5A623" color="#F5A623" /> {store.rating}
                                                        </span>
                                                        <button className={styles.addBtn} aria-label="View store">
                                                            View Menu
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                <div className={styles.pagination}>
                                    <Link to="#" className={`${styles.pageBtn} ${styles.pageIconBtn}`}><ChevronLeft size={18} /></Link>
                                    <Link to="#" className={`${styles.pageBtn} ${styles.active}`}>1</Link>
                                    <Link to="#" className={styles.pageBtn}>2</Link>
                                    <Link to="#" className={styles.pageBtn}>3</Link>
                                    <Link to="#" className={`${styles.pageBtn} ${styles.pageIconBtn}`}><ChevronRight size={18} /></Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </main>

                <Footer />
            </div>

            <BackToTop />

            {selectedStore && (
                <StoreModal
                    store={selectedStore}
                    onClose={() => setSelectedStore(null)}
                />
            )}
        </>
    );
}

export default MenuPage;
