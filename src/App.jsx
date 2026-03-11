import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  List, 
  Clock, 
  CheckCircle, 
  Users, 
  CreditCard, 
  Settings, 
  Search, 
  Bell, 
  ChevronRight,
  MoreVertical,
  Check,
  X,
  TrendingUp,
  Package,
  ShoppingCart,
  DollarSign
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { label: 'Total Listings', value: '1,284', icon: <Package size={20} />, color: '#fe9f3b' },
    { label: 'Pending Orders', value: '42', icon: <Clock size={20} />, color: '#f59e0b' },
    { label: 'Completed Orders', value: '856', icon: <CheckCircle size={20} />, color: '#10b981' },
    { label: 'Total Revenue', value: '$12,450', icon: <DollarSign size={20} />, color: '#fe9f3b' },
  ];

  const pendingListings = [
    { id: 1, name: 'Frost Dragon', game: 'Adopt Me', seller: 'user123', price: '$10.00', status: 'Pending' },
    { id: 2, name: 'Shadow Dragon', game: 'Adopt Me', seller: 'trader_pro', price: '$25.50', status: 'Pending' },
    { id: 3, name: 'Nik\'s Scythe', game: 'Murder Mystery 2', seller: 'mm2_king', price: '$15.00', status: 'Pending' },
    { id: 4, name: 'Brainrot Aura', game: 'Steal a brainrot', seller: 'meme_lord', price: '$5.00', status: 'Pending' },
  ];

  const recentOrders = [
    { id: '#1023', buyer: 'userA', item: 'Shadow Dragon', seller: 'sellerB', status: 'Pending Delivery' },
    { id: '#1022', buyer: 'alex_r', item: 'Bat Dragon', seller: 'adopt_me_fan', status: 'Processing' },
    { id: '#1021', buyer: 'roblox_dev', item: 'Chroma Heat', seller: 'mm2_trader', status: 'Delivered' },
  ];

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'listings', label: 'Listings', icon: <List size={20} /> },
    { id: 'pending', label: 'Pending Orders', icon: <Clock size={20} /> },
    { id: 'approved', label: 'Approved Items', icon: <CheckCircle size={20} /> },
    { id: 'users', label: 'Users', icon: <Users size={20} /> },
    { id: 'payments', label: 'Payments', icon: <CreditCard size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div style={{ backgroundColor: '#fe9f3b', padding: '6px', borderRadius: '8px', color: '#000' }}>
            <TrendingUp size={24} />
          </div>
          <span>StarMarket</span>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <a 
              key={item.id} 
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon}
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <div>
            <h1>Admin Dashboard</h1>
            <p style={{ color: 'var(--text-dim)', fontSize: '14px', marginTop: '4px' }}>Welcome back, Admin</p>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} size={18} />
              <input 
                type="text" 
                placeholder="Search everything..." 
                style={{ 
                  backgroundColor: 'var(--bg-card)', 
                  border: '1px solid var(--border)', 
                  borderRadius: '8px', 
                  padding: '10px 16px 10px 40px',
                  color: '#fff',
                  width: '300px'
                }} 
              />
            </div>
            <div style={{ backgroundColor: 'var(--bg-card)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', cursor: 'pointer' }}>
              <Bell size={18} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#fe9f3b', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: '#000', fontWeight: 'bold' }}>AD</div>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span className="stat-label">{stat.label}</span>
                <div style={{ color: stat.color, backgroundColor: `${stat.color}15`, padding: '6px', borderRadius: '6px' }}>
                  {stat.icon}
                </div>
              </div>
              <span className="stat-value">{stat.value}</span>
              <div style={{ fontSize: '12px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                <TrendingUp size={12} />
                <span>+12.5% from last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Listings Approval Panel */}
        <section className="panel">
          <div className="panel-header">
            <h2>Listings Approval</h2>
            <button className="btn-secondary" style={{ fontSize: '12px' }}>View All</button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Game</th>
                  <th>Seller</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingListings.map((item) => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: '500' }}>{item.name}</td>
                    <td>{item.game}</td>
                    <td>{item.seller}</td>
                    <td style={{ color: 'var(--accent)', fontWeight: '600' }}>{item.price}</td>
                    <td>
                      <span className="status-badge status-pending">{item.status}</span>
                    </td>
                    <td>
                      <button className="btn-action">Approve</button>
                      <button className="btn-secondary">Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Orders Panel */}
        <section className="panel">
          <div className="panel-header">
            <h2>Recent Orders</h2>
            <button className="btn-secondary" style={{ fontSize: '12px' }}>Track All</button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Buyer</th>
                  <th>Item</th>
                  <th>Seller</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td style={{ fontWeight: '600', color: 'var(--text-dim)' }}>{order.id}</td>
                    <td>{order.buyer}</td>
                    <td>{order.item}</td>
                    <td>{order.seller}</td>
                    <td>
                      <span className={`status-badge ${order.status === 'Delivered' ? 'status-approved' : 'status-pending'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn-secondary">Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
