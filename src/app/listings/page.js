'use client'
import { useState, useMemo } from 'react'
import { listings as initialListings } from '@/lib/data'

const TABS = ['All', 'Pending', 'Approved', 'Rejected']

function Toast({ toast }) {
  if (!toast) return null
  return <div className={`toast toast-${toast.type}`}>{toast.msg}</div>
}

export default function ListingsPage() {
  const [items, setItems] = useState(initialListings)
  const [activeTab, setActiveTab] = useState(0)
  const [search, setSearch] = useState('')
  const [gameFilter, setGameFilter] = useState('All Games')
  const [toast, setToast] = useState(null)

  function showToast(msg, type = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 2500)
  }

  function handleApprove(id) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, status: 'approved' } : i))
    showToast('Listing approved', 'success')
  }

  function handleReject(id) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, status: 'rejected' } : i))
    showToast('Listing rejected', 'error')
  }

  const filtered = useMemo(() => {
    let result = items
    if (activeTab === 1) result = result.filter(i => i.status === 'pending')
    if (activeTab === 2) result = result.filter(i => i.status === 'approved')
    if (activeTab === 3) result = result.filter(i => i.status === 'rejected')
    if (gameFilter !== 'All Games') result = result.filter(i => i.game === gameFilter)
    if (search) result = result.filter(i =>
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.seller.toLowerCase().includes(search.toLowerCase())
    )
    return result
  }, [items, activeTab, search, gameFilter])

  const pendingCount = items.filter(i => i.status === 'pending').length

  const tabLabels = [
    `All`,
    `Pending (${pendingCount})`,
    `Approved`,
    `Rejected`,
  ]

  return (
    <div>
      <Toast toast={toast} />

      <div className="ph">
        <div className="ph-left">
          <h1>Listings</h1>
          <p>All items submitted to the marketplace</p>
        </div>
        <div className="ph-right">
          <button className="btn btn-ghost">Export CSV</button>
          <button className="btn">+ Add Listing</button>
        </div>
      </div>

      <div className="three-col">
        <div className="stat">
          <div className="stat-top"><div className="stat-lbl">Total Listings</div><div className="stat-ic">L</div></div>
          <div className="stat-val">1,284</div>
          <div className="stat-sub">All time</div>
        </div>
        <div className="stat">
          <div className="stat-top">
            <div className="stat-lbl">Pending Review</div>
            <div className="stat-ic" style={{ background: 'rgba(254,159,59,0.15)' }}>P</div>
          </div>
          <div className="stat-val">{pendingCount}</div>
          <div className="stat-sub neg">Needs action</div>
        </div>
        <div className="stat">
          <div className="stat-top">
            <div className="stat-lbl">Rejected</div>
            <div className="stat-ic" style={{ background: 'rgba(224,82,82,0.1)', color: 'var(--red)' }}>R</div>
          </div>
          <div className="stat-val">{items.filter(i => i.status === 'rejected').length}</div>
          <div className="stat-sub" style={{ color: 'var(--muted)' }}>This month</div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-hd">
          <div className="panel-title">
            All Listings <span className="cnt">{filtered.length} shown</span>
          </div>
          <div className="acts">
            <button className="act a-approve" onClick={() => {
              setItems(prev => prev.map(i => i.status === 'pending' ? { ...i, status: 'approved' } : i))
              showToast('All pending listings approved', 'success')
            }}>Bulk Approve</button>
            <button className="act a-reject" onClick={() => {
              setItems(prev => prev.map(i => i.status === 'pending' ? { ...i, status: 'rejected' } : i))
              showToast('All pending listings rejected', 'error')
            }}>Bulk Reject</button>
          </div>
        </div>

        <div className="tabs">
          {tabLabels.map((tab, i) => (
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
            placeholder="Search listings..."
            style={{ width: '180px' }}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select className="filter-input" value={gameFilter} onChange={e => setGameFilter(e.target.value)}>
            <option>All Games</option>
            <option>Adopt Me</option>
            <option>MM2</option>
            <option>Blox Fruits</option>
            <option>Pet Sim X</option>
          </select>
          <select className="filter-input">
            <option>All Categories</option>
            <option>Pets</option>
            <option>Weapons</option>
            <option>Eggs</option>
          </select>
          <select className="filter-input">
            <option>Sort: Newest</option>
            <option>Sort: Price High</option>
            <option>Sort: Price Low</option>
          </select>
        </div>

        <div className="tbl-wrap">
          <table>
            <thead>
              <tr>
                <th><input type="checkbox" className="cb" /></th>
                <th>#</th>
                <th>Item</th>
                <th>Game</th>
                <th>Category</th>
                <th>Seller</th>
                <th>Price</th>
                <th>Views</th>
                <th>Listed</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={11} style={{ textAlign: 'center', padding: '30px', color: 'var(--muted)' }}>
                    No listings match this filter
                  </td>
                </tr>
              )}
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td className="td-hide"><input type="checkbox" className="cb" /></td>
                  <td className="td-hide" style={{ color: 'var(--muted)' }}>{item.id}</td>
                  <td data-label="Item">
                    <div className="item-cell">
                      <img src={item.image} width={30} height={30} style={{ borderRadius: '5px' }} alt={item.name} />
                      <div>
                        <div className="item-n">{item.name}</div>
                        <div className="item-m">{item.meta}</div>
                      </div>
                    </div>
                  </td>
                  <td data-label="Game"><span className="tag">{item.game}</span></td>
                  <td className="td-hide"><span className="tag">{item.category}</span></td>
                  <td data-label="Seller">{item.seller}</td>
                  <td data-label="Price" className="price-val">{item.price}</td>
                  <td className="td-hide" style={{ color: 'var(--muted)' }}>{item.views}</td>
                  <td className="td-hide" style={{ color: 'var(--muted)' }}>{item.listed}</td>
                  <td data-label="Status">
                    <span className={`pill p-${item.status}`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </td>
                  <td data-label="Action">
                    <div className="acts">
                      {item.status === 'pending' && (
                        <>
                          <button className="act a-approve" onClick={() => handleApprove(item.id)}>Approve</button>
                          <button className="act a-reject"  onClick={() => handleReject(item.id)}>Reject</button>
                          <button className="act a-view">View</button>
                        </>
                      )}
                      {item.status === 'approved' && (
                        <>
                          <button className="act a-edit">Edit</button>
                          <button className="act a-reject" onClick={() => handleReject(item.id)}>Remove</button>
                          <button className="act a-view">View</button>
                        </>
                      )}
                      {item.status === 'rejected' && (
                        <>
                          <button className="act a-approve" onClick={() => handleApprove(item.id)}>Re-approve</button>
                          <button className="act a-view">View</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pager">
          <div className="pager-info">Showing {filtered.length} of 1,284</div>
          <div className="pager-btns">
            <button className="pg-btn">&#8592;</button>
            <button className="pg-btn cur">1</button>
            <button className="pg-btn">2</button>
            <button className="pg-btn">3</button>
            <button className="pg-btn" style={{ width: 'auto', padding: '0 8px' }}>...</button>
            <button className="pg-btn">184</button>
            <button className="pg-btn">&#8594;</button>
          </div>
        </div>
      </div>
    </div>
  )
}
