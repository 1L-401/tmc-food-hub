import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, UtensilsCrossed, Clock, Settings, LogOut,
    Plus, Pencil, Trash2, ToggleLeft, ToggleRight, Save, X, Check,
    ChefHat, TrendingUp, Package, DollarSign, AlertCircle
} from 'lucide-react';
import { useOwnerAuth } from '../context/OwnerAuthContext';
import styles from './OwnerDashboard.module.css';

// ── Utility ────────────────────────────────────────────────────────────
function statCard(icon, label, value, color) {
    return { icon, label, value, color };
}

// ── Sub-components ─────────────────────────────────────────────────────

/* --- Overview Section --- */
function OverviewSection({ store }) {
    const cats = [...new Set(store.menuItems.map(i => i.category))];
    const active = store.menuItems.filter(i => i.available).length;
    const avgPrice = store.menuItems.length
        ? (store.menuItems.reduce((s, i) => s + i.price, 0) / store.menuItems.length).toFixed(2)
        : '0.00';

    const stats = [
        { icon: <Package size={22} />, label: 'Total Items', value: store.menuItems.length, color: '#2563EB' },
        { icon: <Check size={22} />, label: 'Available', value: active, color: '#059669' },
        { icon: <UtensilsCrossed size={22} />, label: 'Categories', value: cats.length, color: '#7C3AED' },
        { icon: <DollarSign size={22} />, label: 'Avg. Price', value: `$${avgPrice}`, color: '#D97706' },
    ];

    return (
        <div>
            <h2 className={styles.sectionTitle}>Overview</h2>
            <div className={styles.statGrid}>
                {stats.map(s => (
                    <div key={s.label} className={styles.statCard}>
                        <div className={styles.statIcon} style={{ background: s.color + '18', color: s.color }}>
                            {s.icon}
                        </div>
                        <div>
                            <div className={styles.statValue}>{s.value}</div>
                            <div className={styles.statLabel}>{s.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.overviewInfo}>
                <div className={styles.infoBlock}>
                    <h3>Branch Details</h3>
                    <div className={styles.infoRow}><span>Branch</span><strong>{store.branchName}</strong></div>
                    <div className={styles.infoRow}><span>Location</span><strong>{store.location}</strong></div>
                    <div className={styles.infoRow}><span>Phone</span><strong>{store.phone}</strong></div>
                    <div className={styles.infoRow}><span>Delivery Time</span><strong>{store.deliveryTime}</strong></div>
                    <div className={styles.infoRow}><span>Min. Order</span><strong>{store.minOrder}</strong></div>
                    <div className={styles.infoRow}>
                        <span>Status</span>
                        <strong className={store.status === 'Operational' ? styles.statusOpen : styles.statusClosed}>
                            ● {store.status}
                        </strong>
                    </div>
                </div>
            </div>
        </div>
    );
}

const BLANK_ITEM = { title: '', description: '', price: '', category: '', available: true, image: '/assets/images/service/burger.webp' };

/* --- Menu Management Section --- */
function MenuSection({ store, onUpdate }) {
    const [addOpen, setAddOpen] = useState(false);
    const [form, setForm] = useState(BLANK_ITEM);
    const [editId, setEditId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [error, setError] = useState('');

    const cats = [...new Set(store.menuItems.map(i => i.category))];

    function handleAdd(e) {
        e.preventDefault();
        if (!form.title || !form.price || !form.category) { setError('Title, category, and price are required.'); return; }
        const newItem = {
            ...form,
            id: Date.now(),
            price: parseFloat(form.price),
            available: true,
        };
        onUpdate({ ...store, menuItems: [...store.menuItems, newItem] });
        setForm(BLANK_ITEM);
        setAddOpen(false);
        setError('');
    }

    function handleDelete(id) {
        if (!window.confirm('Delete this menu item?')) return;
        onUpdate({ ...store, menuItems: store.menuItems.filter(i => i.id !== id) });
    }

    function toggleAvail(id) {
        onUpdate({
            ...store,
            menuItems: store.menuItems.map(i => i.id === id ? { ...i, available: !i.available } : i)
        });
    }

    function startEdit(item) {
        setEditId(item.id);
        setEditForm({ title: item.title, description: item.description, price: item.price, category: item.category });
    }

    function saveEdit(id) {
        onUpdate({
            ...store,
            menuItems: store.menuItems.map(i => i.id === id
                ? { ...i, ...editForm, price: parseFloat(editForm.price) }
                : i)
        });
        setEditId(null);
    }

    return (
        <div>
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Menu Management</h2>
                <button className={styles.addBtn} onClick={() => setAddOpen(true)}>
                    <Plus size={16} /> Add Item
                </button>
            </div>

            {/* Add item form */}
            {addOpen && (
                <div className={styles.formCard}>
                    <div className={styles.formCardHeader}>
                        <h3>Add New Menu Item</h3>
                        <button className={styles.iconBtn} onClick={() => { setAddOpen(false); setError(''); }}><X size={18} /></button>
                    </div>
                    {error && <div className={styles.formError}><AlertCircle size={14} /> {error}</div>}
                    <form onSubmit={handleAdd} className={styles.addForm}>
                        <div className={styles.addFormGrid}>
                            <div className={styles.formField}>
                                <label>Item Name *</label>
                                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Chickenjoy Solo" />
                            </div>
                            <div className={styles.formField}>
                                <label>Category *</label>
                                <input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} placeholder="e.g. Chickenjoy Meals" list="catSuggestions" />
                                <datalist id="catSuggestions">{cats.map(c => <option key={c} value={c} />)}</datalist>
                            </div>
                            <div className={styles.formField}>
                                <label>Price (USD) *</label>
                                <input type="number" step="0.01" min="0" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="0.00" />
                            </div>
                            <div className={`${styles.formField} ${styles.formFieldFull}`}>
                                <label>Description</label>
                                <input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Short description of this item" />
                            </div>
                        </div>
                        <div className={styles.formActions}>
                            <button type="button" className={styles.cancelBtn} onClick={() => { setAddOpen(false); setError(''); }}>Cancel</button>
                            <button type="submit" className={styles.saveBtn}><Save size={15} /> Save Item</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Items grouped by category */}
            {cats.map(cat => (
                <div key={cat} className={styles.menuCategory}>
                    <h3 className={styles.catLabel}>{cat}</h3>
                    <div className={styles.menuTable}>
                        <div className={styles.menuTableHead}>
                            <span>Name</span>
                            <span>Description</span>
                            <span>Price</span>
                            <span>Availability</span>
                            <span>Actions</span>
                        </div>
                        {store.menuItems.filter(i => i.category === cat).map(item => (
                            <div key={item.id} className={`${styles.menuRow} ${!item.available ? styles.menuRowDisabled : ''}`}>
                                {editId === item.id ? (
                                    <>
                                        <input className={styles.inlineInput} value={editForm.title} onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))} />
                                        <input className={styles.inlineInput} value={editForm.description} onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))} />
                                        <input className={styles.inlineInput} style={{ width: 80 }} type="number" step="0.01" value={editForm.price} onChange={e => setEditForm(f => ({ ...f, price: e.target.value }))} />
                                        <span />
                                        <div className={styles.rowActions}>
                                            <button className={styles.saveRowBtn} onClick={() => saveEdit(item.id)}><Check size={14} /></button>
                                            <button className={styles.cancelRowBtn} onClick={() => setEditId(null)}><X size={14} /></button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <span className={styles.itemName}>{item.title}</span>
                                        <span className={styles.itemDesc}>{item.description}</span>
                                        <span className={styles.itemPrice}>${item.price.toFixed(2)}</span>
                                        <button
                                            className={`${styles.toggleBtn} ${item.available ? styles.toggleOn : styles.toggleOff}`}
                                            onClick={() => toggleAvail(item.id)}
                                            title={item.available ? 'Mark Unavailable' : 'Mark Available'}
                                        >
                                            {item.available ? <><ToggleRight size={18} /> Available</> : <><ToggleLeft size={18} /> Unavailable</>}
                                        </button>
                                        <div className={styles.rowActions}>
                                            <button className={styles.editRowBtn} onClick={() => startEdit(item)} title="Edit"><Pencil size={14} /></button>
                                            <button className={styles.deleteRowBtn} onClick={() => handleDelete(item.id)} title="Delete"><Trash2 size={14} /></button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

/* --- Operating Hours Section --- */
function HoursSection({ store, onUpdate }) {
    const [hours, setHours] = useState(store.operatingHours);
    const [saved, setSaved] = useState(false);

    function setDay(idx, field, value) {
        setHours(h => h.map((d, i) => i === idx ? { ...d, [field]: value } : d));
        setSaved(false);
    }

    function handleSave() {
        onUpdate({ ...store, operatingHours: hours });
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    }

    return (
        <div>
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Operating Hours</h2>
                <button className={`${styles.saveBtn} ${saved ? styles.savedBtn : ''}`} onClick={handleSave}>
                    {saved ? <><Check size={15} /> Saved!</> : <><Save size={15} /> Save Hours</>}
                </button>
            </div>

            <div className={styles.hoursTable}>
                <div className={styles.hoursHead}>
                    <span>Day</span><span>Status</span><span>Opens at</span><span>Closes at</span>
                </div>
                {hours.map((row, idx) => (
                    <div key={row.day} className={`${styles.hoursRow} ${!row.open ? styles.hoursRowClosed : ''}`}>
                        <span className={styles.dayName}>{row.day}</span>
                        <label className={styles.toggleSwitch}>
                            <input type="checkbox" checked={row.open} onChange={e => setDay(idx, 'open', e.target.checked)} />
                            <span className={styles.slider} />
                            <span className={styles.toggleLabel}>{row.open ? 'Open' : 'Closed'}</span>
                        </label>
                        <input type="time" className={styles.timeInput} value={row.from} disabled={!row.open}
                            onChange={e => setDay(idx, 'from', e.target.value)} />
                        <input type="time" className={styles.timeInput} value={row.to} disabled={!row.open}
                            onChange={e => setDay(idx, 'to', e.target.value)} />
                    </div>
                ))}
            </div>
        </div>
    );
}

/* --- Settings Section --- */
function SettingsSection({ store, onUpdate }) {
    const [form, setForm] = useState({
        branchName: store.branchName,
        location: store.location,
        phone: store.phone,
        about: store.about,
        deliveryTime: store.deliveryTime,
        minOrder: store.minOrder,
        status: store.status,
    });
    const [saved, setSaved] = useState(false);

    function handleSave(e) {
        e.preventDefault();
        onUpdate({ ...store, ...form });
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    }

    return (
        <div>
            <h2 className={styles.sectionTitle}>Branch Settings</h2>
            <div className={styles.formCard}>
                <form onSubmit={handleSave} className={styles.settingsForm}>
                    <div className={styles.settingsGrid}>
                        {[
                            { key: 'branchName', label: 'Branch Name' },
                            { key: 'location', label: 'Location / Address' },
                            { key: 'phone', label: 'Contact Number' },
                            { key: 'deliveryTime', label: 'Delivery Time (e.g. 20–35 min)' },
                            { key: 'minOrder', label: 'Minimum Order (e.g. $2.00)' },
                        ].map(({ key, label }) => (
                            <div key={key} className={styles.formField}>
                                <label>{label}</label>
                                <input value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />
                            </div>
                        ))}

                        <div className={styles.formField}>
                            <label>Status</label>
                            <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                                <option value="Operational">Operational</option>
                                <option value="Temporarily Closed">Temporarily Closed</option>
                                <option value="Closed">Closed</option>
                            </select>
                        </div>

                        <div className={`${styles.formField} ${styles.formFieldFull}`}>
                            <label>About / Description</label>
                            <textarea rows={3} value={form.about} onChange={e => setForm(f => ({ ...f, about: e.target.value }))} />
                        </div>
                    </div>

                    <div className={styles.formActions}>
                        <button type="submit" className={`${styles.saveBtn} ${saved ? styles.savedBtn : ''}`}>
                            {saved ? <><Check size={15} /> Changes Saved!</> : <><Save size={15} /> Save Changes</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// ── Dashboard Shell ─────────────────────────────────────────────────────
const NAV = [
    { key: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { key: 'menu', label: 'Menu', icon: <UtensilsCrossed size={18} /> },
    { key: 'hours', label: 'Hours', icon: <Clock size={18} /> },
    { key: 'settings', label: 'Settings', icon: <Settings size={18} /> },
];

function OwnerDashboard() {
    const { currentOwner, ownerStore, logout, updateStore } = useOwnerAuth();
    const navigate = useNavigate();
    const [activeNav, setActiveNav] = useState('overview');

    if (!currentOwner) { navigate('/owner-login'); return null; }
    if (!ownerStore) { return <p>Store not found.</p>; }

    function handleLogout() { logout(); navigate('/owner-login'); }

    return (
        <div className={styles.shell}>
            {/* ── Sidebar ── */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebarTop}>
                    <div className={styles.sidebarLogo}>
                        <ChefHat size={22} color="#fff" />
                    </div>
                    <div>
                        <div className={styles.sidebarStoreName}>{ownerStore.name}</div>
                        <div className={styles.sidebarBranch}>{ownerStore.branchName}</div>
                    </div>
                </div>

                <nav className={styles.sidebarNav}>
                    {NAV.map(n => (
                        <button
                            key={n.key}
                            className={`${styles.navItem} ${activeNav === n.key ? styles.navItemActive : ''}`}
                            onClick={() => setActiveNav(n.key)}
                        >
                            {n.icon} {n.label}
                        </button>
                    ))}
                </nav>

                <div className={styles.sidebarBottom}>
                    <div className={styles.ownerEmail}>{currentOwner.email}</div>
                    <button className={styles.logoutBtn} onClick={handleLogout}>
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </aside>

            {/* ── Main content ── */}
            <main className={styles.main}>
                <div className={styles.mainHeader}>
                    <div>
                        <h1 className={styles.mainTitle}>{NAV.find(n => n.key === activeNav)?.label}</h1>
                        <p className={styles.mainSub}>{ownerStore.branchName}</p>
                    </div>
                    <span className={`${styles.statusBadge} ${ownerStore.status === 'Operational' ? styles.statusOpen : styles.statusClosed}`}>
                        ● {ownerStore.status}
                    </span>
                </div>

                <div className={styles.mainContent}>
                    {activeNav === 'overview' && <OverviewSection store={ownerStore} />}
                    {activeNav === 'menu' && <MenuSection store={ownerStore} onUpdate={updateStore} />}
                    {activeNav === 'hours' && <HoursSection store={ownerStore} onUpdate={updateStore} />}
                    {activeNav === 'settings' && <SettingsSection store={ownerStore} onUpdate={updateStore} />}
                </div>
            </main>
        </div>
    );
}

export default OwnerDashboard;
