import React, { useState } from 'react';
import { Plus, Search, Info, Edit2, Trash2 } from 'lucide-react';
import styles from '../OwnerDashboard.module.css';

// We map icon string names to the corresponding lucide-react component in the actual table
import * as Icons from 'lucide-react';
import CategoryCreateModal from './CategoryCreateModal';
import PromoStatusDialog from './PromoStatusDialog';

const MOCK_CATEGORIES = [
    { id: 1, name: 'Burgers', icon: 'Burger', itemCount: 8 },
    { id: 2, name: 'Pizzas', icon: 'Pizza', itemCount: 4 },
    { id: 3, name: 'Main Courses', icon: 'ConciergeBell', itemCount: 12 },
    { id: 4, name: 'Desserts', icon: 'IceCream', itemCount: 8 },
    { id: 5, name: 'Beverages', icon: 'Coffee', itemCount: 14 },
];

function CategoriesSection() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [showErrorDialog, setShowErrorDialog] = useState(false);

    const filteredCategories = MOCK_CATEGORIES.filter(cat =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Fallback icon rendering
    const renderIcon = (iconName) => {
        // Simple mapping, since Lucide might not have exact matches for some standard UI icons
        const IconComponent = Icons[iconName] || Icons.Utensils;
        return <IconComponent size={20} className={styles.categoryIconList} />;
    };

    const handleSaveCategory = () => {
        // Mock save logic
        setShowCreateModal(false);
        setShowSuccessDialog(true);
    };

    return (
        <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
                <div>
                    <h2 className={styles.sectionTitle}>Categories</h2>
                    <p className={styles.sectionSubtitle}>Organize menu items into clear categories for easier browsing by customers.</p>
                </div>
                <div className={styles.headerActions}>
                    <div className={styles.searchWrap}>
                        <Search className={styles.searchIcon} size={16} />
                        <input
                            type="text"
                            placeholder="Search items..."
                            className={styles.searchInput}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button className={styles.btnSave} onClick={() => setShowCreateModal(true)}>
                        <Plus size={16} style={{ marginRight: '6px' }} /> Add Category
                    </button>
                </div>
            </div>

            <div className={styles.infoBanner}>
                <div className={styles.infoBannerIcon}>
                    <Info size={16} />
                </div>
                <div className={styles.infoBannerText}>
                    <strong>Quick Tip</strong>
                    <p>Categories at the top of this list will appear first in your customer-facing app. We recommend placing your most popular categories (like Burgers or Rice Meals) near the top for better conversion.</p>
                </div>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Category Name</th>
                            <th>Menu Items</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCategories.map(cat => (
                            <tr key={cat.id}>
                                <td>
                                    <div className={styles.categoryNameCell}>
                                        <Icons.GripVertical size={16} className={styles.dragHandle} />
                                        <div className={styles.categoryIconCircle}>
                                            {renderIcon(cat.icon)}
                                        </div>
                                        <span className={styles.itemTitle}>{cat.name}</span>
                                    </div>
                                </td>
                                <td>
                                    <span className={styles.itemSubtitle}>{cat.itemCount} items</span>
                                </td>
                                <td>
                                    <div className={styles.actionButtonsRight}>
                                        <button className={styles.iconBtn}><Edit2 size={16} /></button>
                                        <button className={styles.iconBtn}><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredCategories.length === 0 && (
                    <div className={styles.emptyState}>
                        <p>No categories found.</p>
                    </div>
                )}
            </div>

            {showCreateModal && (
                <CategoryCreateModal
                    onClose={() => setShowCreateModal(false)}
                    onSave={handleSaveCategory}
                />
            )}

            {showSuccessDialog && (
                <PromoStatusDialog
                    type="success"
                    title="Category Create Successfully"
                    message="Your new category has been added and is now visible to customers."
                    actionText="Done"
                    onAction={() => setShowSuccessDialog(false)}
                />
            )}

            {showErrorDialog && (
                <PromoStatusDialog
                    type="error"
                    title="Action Failed"
                    message="We couldn't create the category. Please check your internet connection or try a different name."
                    actionText="Try Again"
                    onAction={() => setShowErrorDialog(false)}
                    secondaryActionText="Cancel"
                    onSecondaryAction={() => {
                        setShowErrorDialog(false);
                        setShowCreateModal(false);
                    }}
                />
            )}
        </div>
    );
}

export default CategoriesSection;
