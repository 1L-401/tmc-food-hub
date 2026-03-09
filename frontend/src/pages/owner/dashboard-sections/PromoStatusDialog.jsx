import React from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import styles from '../OwnerDashboard.module.css';

function PromoStatusDialog({ type, title, message, actionText, onAction, secondaryActionText = null, onSecondaryAction = null }) {
    const isSuccess = type === 'success';

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.statusDialogContent}>
                <div className={`${styles.statusIconCircle} ${isSuccess ? styles.iconSuccess : styles.iconError}`}>
                    {isSuccess ? <CheckCircle2 size={32} /> : <AlertTriangle size={32} />}
                </div>

                <h3 className={styles.statusDialogTitle}>{title}</h3>
                <p className={styles.statusDialogMessage}>{message}</p>

                <div className={styles.statusDialogActions}>
                    <button className={styles.btnStatusAction} onClick={onAction}>
                        {actionText}
                    </button>
                    {secondaryActionText && (
                        <button className={styles.btnStatusSecondary} onClick={onSecondaryAction}>
                            {secondaryActionText}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PromoStatusDialog;
