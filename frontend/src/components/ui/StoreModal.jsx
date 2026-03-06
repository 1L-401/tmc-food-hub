import React, { useEffect, useContext, useState } from 'react';
import { X, Star, MapPin, Clock, Phone, ChevronRight, ShoppingCart, Info } from 'lucide-react';
import { CartContext } from './CartContext';
import styles from './StoreModal.module.css';

function StarRow({ rating, size = 14 }) {
    return (
        <span className={styles.starRow}>
            {[1, 2, 3, 4, 5].map(n => (
                <Star key={n} size={size}
                    fill={n <= Math.round(rating) ? '#F59E0B' : 'none'}
                    color={n <= Math.round(rating) ? '#F59E0B' : '#D1D5DB'}
                />
            ))}
        </span>
    );
}

function StoreModal({ store, onClose }) {
    const { addToCart } = useContext(CartContext);
    const [activeTab, setActiveTab] = useState('menu');

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    const avgRating = store.reviews.length
        ? (store.reviews.reduce((s, r) => s + r.rating, 0) / store.reviews.length).toFixed(1)
        : store.rating;

    return (
        <div className={styles.backdrop} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>

                {/* Header banner */}
                <div className={styles.banner} style={{ background: store.brandColor }}>
                    <div className={styles.bannerOverlay} />
                    <img src={store.logo} alt={store.name} className={styles.storeLogo} />
                    <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
                        <X size={18} />
                    </button>
                </div>

                {/* Store identity */}
                <div className={styles.storeIdentity}>
                    <div>
                        <h2 className={styles.storeName}>{store.name}</h2>
                        <p className={styles.storeCuisine}>{store.cuisine}</p>
                        <div className={styles.metaRow}>
                            <span className={styles.metaChip}>
                                <MapPin size={12} /> {store.location}
                            </span>
                            <span className={styles.metaChip}>
                                <Clock size={12} /> {store.hours}
                            </span>
                            <span className={styles.metaChip}>
                                <Phone size={12} /> {store.phone}
                            </span>
                        </div>
                        <div className={styles.ratingRow}>
                            <StarRow rating={avgRating} size={14} />
                            <span className={styles.ratingNum}>{avgRating}</span>
                            <span className={styles.ratingCount}>({store.reviews.length} reviews)</span>
                            <span className={store.status === 'Operational'
                                ? styles.statusOpen : styles.statusClosed}>
                                ● {store.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === 'menu' ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab('menu')}
                    >
                        Menu
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'reviews' ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab('reviews')}
                    >
                        Reviews ({store.reviews.length})
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'info' ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab('info')}
                    >
                        <Info size={13} /> Info
                    </button>
                </div>

                {/* Tab content */}
                <div className={styles.tabContent}>

                    {/* ── Menu Tab ── */}
                    {activeTab === 'menu' && (
                        <div className={styles.menuGrid}>
                            {store.menuItems.map(item => (
                                <div key={item.id} className={styles.menuCard}>
                                    <img src={item.image} alt={item.title} className={styles.menuCardImg} />
                                    <div className={styles.menuCardBody}>
                                        <h4 className={styles.menuCardTitle}>{item.title}</h4>
                                        <p className={styles.menuCardDesc}>{item.description}</p>
                                        <div className={styles.menuCardFooter}>
                                            <span className={styles.menuCardPrice}>${item.price.toFixed(2)}</span>
                                            <button
                                                className={styles.addBtn}
                                                onClick={() => addToCart({ ...item, storeName: store.name })}
                                                aria-label="Add to cart"
                                            >
                                                <ShoppingCart size={14} /> Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* ── Reviews Tab ── */}
                    {activeTab === 'reviews' && (
                        <div className={styles.reviewList}>
                            <div className={styles.reviewSummary}>
                                <div className={styles.reviewBigNum}>{avgRating}</div>
                                <div>
                                    <StarRow rating={avgRating} size={18} />
                                    <p className={styles.reviewTotal}>Based on {store.reviews.length} reviews</p>
                                </div>
                            </div>
                            {store.reviews.map(r => (
                                <div key={r.id} className={styles.reviewItem}>
                                    <div className={styles.reviewAvatar}>{r.avatar}</div>
                                    <div className={styles.reviewBody}>
                                        <div className={styles.reviewTop}>
                                            <span className={styles.reviewName}>{r.name}</span>
                                            <span className={styles.reviewDate}>{r.date}</span>
                                        </div>
                                        <StarRow rating={r.rating} size={12} />
                                        <p className={styles.reviewText}>{r.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* ── Info Tab ── */}
                    {activeTab === 'info' && (
                        <div className={styles.infoSection}>
                            <div className={styles.infoGrid}>
                                <div className={styles.infoItem}>
                                    <strong>Branch Name</strong>
                                    <span>{store.branchName}</span>
                                </div>
                                <div className={styles.infoItem}>
                                    <strong>Location</strong>
                                    <span>{store.location}</span>
                                </div>
                                <div className={styles.infoItem}>
                                    <strong>Status</strong>
                                    <span className={store.status === 'Operational' ? styles.statusOpen : styles.statusClosed}>
                                        ● {store.status}
                                    </span>
                                </div>
                                <div className={styles.infoItem}>
                                    <strong>Operating Hours</strong>
                                    <span>{store.hours}</span>
                                </div>
                                <div className={styles.infoItem}>
                                    <strong>Contact</strong>
                                    <span>{store.phone}</span>
                                </div>
                                <div className={styles.infoItem}>
                                    <strong>Cuisine Type</strong>
                                    <span>{store.cuisine}</span>
                                </div>
                                <div className={`${styles.infoItem} ${styles.infoFull}`}>
                                    <strong>About</strong>
                                    <span>{store.about}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default StoreModal;
