'use client'
import { useState, useMemo } from 'react'
import { users } from '@/lib/data'

const tabs = ['All', 'Sellers', 'Buyers', 'Banned (17)']

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState(0)

  const filtered = useMemo(() => {
    if (activeTab === 1) return users.filter(u => u.role === 'Seller')
    if (activeTab === 2) return users.filter(u => u.role === 'Buyer')
    if (activeTab === 3) return users.filter(u => u.status === 'banned')
    return users
  }, [activeTab])

  return (
    <div>
      <div className="ph">
        <div className="ph-left">
          <h1>Users</h1>
          <p>All registered accounts</p>
        </div>
        <div className="ph-right">
          <button className="btn btn-ghost">Export</button>
          <button className="btn">+ Invite User</button>
        </div>
      </div>

      <div className="stats">
        <div className="stat">
          <div className="stat-top">
            <div className="stat-lbl">Total Users</div>
            <div className="stat-ic">U</div>
          </div>
          <div className="stat-val">3,841</div>
          <div className="stat-sub">+24 this week</div>
        </div>
        <div className="stat">
          <div className="stat-top">
            <div className="stat-lbl">Active Today</div>
            <div className="stat-ic" style={{ background: 'rgba(62,207,99,0.1)', color: 'var(--green)' }}>A</div>
          </div>
          <div className="stat-val">412</div>
          <div className="stat-sub">+6% vs yesterday</div>
        </div>
        <div className="stat">
          <div className="stat-top">
            <div className="stat-lbl">Sellers</div>
            <div className="stat-ic">S</div>
          </div>
          <div className="stat-val">892</div>
          <div className="stat-sub" style={{ color: 'var(--muted)' }}>23% of users</div>
        </div>
        <div className="stat">
          <div className="stat-top">
            <div className="stat-lbl">Banned</div>
            <div className="stat-ic" style={{ background: 'rgba(224,82,82,0.1)', color: 'var(--red)' }}>B</div>
          </div>
          <div className="stat-val">17</div>
          <div className="stat-sub neg">2 new bans</div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-hd">
          <div className="panel-title">
            All Users <span className="cnt">3,841 total</span>
          </div>
        </div>

        <div className="tabs">
          {tabs.map((tab, i) => (
            <div
              key={tab}
              className={`tab${activeTab === i ? ' active' : ''}`}
              onClick={() => setActiveTab(i)}
            >
              {tab}
            </div>
          ))}
        </div>

        <div className="filter-bar">
          <input
            className="filter-input"
            type="text"
            placeholder="Search by username or email..."
            style={{ width: '200px' }}
          />
          <select className="filter-input">
            <option>All Roles</option>
            <option>Seller</option>
            <option>Buyer</option>
            <option>Admin</option>
          </select>
          <select className="filter-input">
            <option>Sort: Newest</option>
            <option>Sort: Most Sales</option>
            <option>Sort: Most Listings</option>
          </select>
        </div>

        <div className="tbl-wrap">
          <table>
            <thead>
              <tr>
                <th><input type="checkbox" className="cb" /></th>
                <th>User</th>
                <th>Role</th>
                <th>Email</th>
                <th>Listings</th>
                <th>Orders</th>
                <th>Total Sales</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.username}>
                  <td className="td-hide"><input type="checkbox" className="cb" /></td>
                  <td data-label="User">
                    <div className="item-cell">
                      <img
                        src={user.image}
                        width={30}
                        height={30}
                        style={{ borderRadius: '50%', border: '1px solid var(--border)' }}
                        alt={user.username}
                      />
                      <div>
                        <div className="item-n">{user.username}</div>
                        <div className="item-m">@{user.username.toLowerCase()}</div>
                      </div>
                    </div>
                  </td>
                  <td data-label="Role"><span className="tag">{user.role}</span></td>
                  <td className="td-hide">{user.email}</td>
                  <td className="td-hide">{user.listings}</td>
                  <td className="td-hide">{user.orders}</td>
                  <td
                    data-label="Sales"
                    className={user.sales === '$0' ? '' : 'price-val'}
                    style={user.sales === '$0' ? { color: 'var(--muted)' } : undefined}
                  >
                    {user.sales}
                  </td>
                  <td className="td-hide">{user.joined}</td>
                  <td data-label="Status">
                    <span className={`pill p-${user.status}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td data-label="Action">
                    <div className="acts">
                      <button className="act a-view">View</button>
                      {user.status !== 'banned' && (
                        <>
                          <button className="act a-msg">Msg</button>
                          <button className="act a-ban">Ban</button>
                        </>
                      )}
                      {user.status === 'banned' && (
                        <button className="act a-unban">Unban</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pager">
          <div className="pager-info">Showing 1&ndash;5 of 3,841</div>
          <div className="pager-btns">
            <button className="pg-btn">&#8592;</button>
            <button className="pg-btn cur">1</button>
            <button className="pg-btn">2</button>
            <button className="pg-btn">3</button>
            <button className="pg-btn" style={{ width: 'auto', padding: '0 8px' }}>...</button>
            <button className="pg-btn">769</button>
            <button className="pg-btn">&#8594;</button>
          </div>
        </div>
      </div>
    </div>
  )
}
