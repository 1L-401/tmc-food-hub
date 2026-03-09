import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import * as Icons from 'lucide-react'; // Needed for dynamic rendering of standard icons
import styles from '../OwnerDashboard.module.css';

// Predefined set of icons the owner can choose from for their categories
const AVAILABLE_ICONS = [
    'Coffee', 'Utensils', 'Pizza', 'IceCream', 'Croissant',
    'Candy', 'Martini', 'ConciergeBell', 'CupSoda', 'Apple',
    'Beef', 'Cake', 'Carrot', 'ChefHat', 'Egg',
    'Fish', 'Grape', 'NutOff', 'Salad', 'Soup'
];

function CategoryCreateModal({ onClose, onSave }) {
    const [selectedIcon, setSelectedIcon] = useState('Utensils');

    const handleSave = () => {
        // In a real app we'd gather the form data here, but mock for now
        onSave();
    };

    const renderIcon = (iconName) => {
        const IconComponent = Icons[iconName] || Icons.HelpCircle;
        return <IconComponent size={24} />;
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h3 className={styles.modalTitle}>Create New Category</h3>
                    <button className={styles.modalCloseBtn} onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className={styles.modalBody}>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Category Name</label>
                        <input type="text" className={styles.formInput} placeholder="e.g., Seafood" />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Choose Icon</label>
                        <div className={styles.iconSelectorGrid}>
                            {AVAILABLE_ICONS.map(iconName => (
                                <button
                                    key={iconName}
                                    className={`${styles.iconSelectBtn} ${selectedIcon === iconName ? styles.iconSelectBtnActive : ''}`}
                                    onClick={() => setSelectedIcon(iconName)}
                                >
                                    {renderIcon(iconName)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Description (Optional)</label>
                        <textarea
                            className={styles.formTextarea}
                            placeholder="Write the description..."
                            rows={3}
                        />
                    </div>
                </div>

                <div className={styles.modalFooter}>
                    <button className={styles.btnCancel} onClick={onClose}>Cancel</button>
                    <button className={styles.btnSave} onClick={handleSave}>Create Category</button>
                </div>
            </div>
        </div>
    );
}

export default CategoryCreateModal;
