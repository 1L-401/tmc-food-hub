import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const NotificationContext = createContext();

export function useNotification() {
    return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);

    const showNotification = useCallback((message, type = 'info', duration = 3000) => {
        const id = Math.random().toString(36).substr(2, 9);
        setNotifications(prev => [...prev, { id, message, type }]);

        if (duration > 0) {
            setTimeout(() => {
                removeNotification(id);
            }, duration);
        }
    }, []);

    const removeNotification = useCallback((id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    }, []);

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            <div
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    zIndex: 9999,
                    pointerEvents: 'none'
                }}
            >
                {notifications.map(notification => (
                    <div
                        key={notification.id}
                        style={{
                            backgroundColor: notification.type === 'success' ? '#10B981' : notification.type === 'error' ? '#EF4444' : '#3B82F6',
                            color: 'white',
                            padding: '12px 16px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            minWidth: '250px',
                            maxWidth: '350px',
                            animation: 'slideInRight 0.3s ease-out forwards',
                            pointerEvents: 'auto'
                        }}
                    >
                        {notification.type === 'success' && <CheckCircle size={20} />}
                        {notification.type === 'error' && <AlertCircle size={20} />}
                        {notification.type === 'info' && <Info size={20} />}

                        <span style={{ flex: 1, fontSize: '14px', fontWeight: 500 }}>{notification.message}</span>

                        <button
                            onClick={() => removeNotification(notification.id)}
                            style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <X size={16} />
                        </button>
                    </div>
                ))}
            </div>
            <style>
                {`
                    @keyframes slideInRight {
                        from { transform: translateX(100%); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                    }
                `}
            </style>
        </NotificationContext.Provider>
    );
}
