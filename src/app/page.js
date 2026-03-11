'use client'
import { useState } from 'react'
import Link from 'next/link'
import { listings as initialListings, orders, topSellers } from '@/lib/data'

const barData = [
  { h: '40%', lbl: 'M' },
  { h: '65%', lbl: 'T' },
  { h: '55%', lbl: 'W' },
  { h: '100%', lbl: 'T', hi: true },
  { h: '75%', lbl: 'F' },
  { h: '45%', lbl: 'S' },
  { h: '30%', lbl: 'S' },
]

const GAMES = ['Adopt Me', 'MM2', 'Blox Fruits', 'Pet Sim X', 'Jailbreak', 'Other']
const CATEGORIES = ['Pet', 'Weapon', 'Egg', 'Fruit', 'Vehicle', 'Gamepass', 'Other']

const blank = { name: '', game: 'Adopt Me', category: 'Pet', meta: '', seller: '', price: '' }

function itemImg(seed) {
  return `https://api.dicebear.com/8.x/shapes/svg?seed=${seed}&backgroundColor=242424&shapeColor=fe93fb`
}

function Toast({ toast }) {
  if (!toast) return null
  return <div className={`toast toast-${toast.type}`}>{toast.msg}</div>
}

function NewListingModal({ onClose, onSubmit }) {
  const [form, setForm] = useState(blank)
  const [err, setErr] = useState('')

  function set(field, val) {
    setForm(prev => ({ ...prev, [field]: val }))
    setErr('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim())   return setErr('Item name is required')
    if (!form.seller.trim()) return setErr('Seller username is required')
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0)
      return setErr('Enter a valid price')

    onSubmit({
      id: Date.now(),
      name: form.name.trim(),
      meta: form.meta.trim() || `${form.category}`,
      game: form.game,
      category: form.category,
      seller: form.seller.trim(),
      price: `$${Number(form.price).toFixed(2)}`,
      views: 0,
      listed: 'just now',
      status: 'pending',
      image: itemImg(form.name.toLowerCase().replace(/\s+/g, '')),
    })
  }

  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-hd">
          <div className="modal-title">New Listing</div>
          <button className="modal-close" onClick={onClose}>&#10005;</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">

            <div className="field">
              <label>Item Name</label>
              <input
                className="input"
                type="text"
                placeholder="e.g. Frost Dragon"
                value={form.name}
                onChange={e => set('name', e.target.value)}
                autoFocus
              />
            </div>

            <div className="field-row">
              <div className="field">
                <label>Game</label>
                <select className="input" value={form.game} onChange={e => set('game', e.target.value)}>
                  {GAMES.map(g => <option key={g}>{g}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Category</label>
                <select className="input" value={form.category} onChange={e => set('category', e.target.value)}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="field">
              <label>Rarity / Description</label>
              <input
                className="input"
                type="text"
                placeholder="e.g. Legendary · Neon"
                value={form.meta}
                onChange={e => set('meta', e.target.value)}
              />
            </div>

            <div className="field-row">
              <div className="field">
                <label>Seller Username</label>
                <input
                  className="input"
                  type="text"
                  placeholder="e.g. user123"
                  value={form.seller}
                  onChange={e => set('seller', e.target.value)}
                />
              </div>
              <div className="field">
                <label>Price ($)</label>
                <input
                  className="input"
                  type="number"
                  placeholder="0.00"
                  min="0.01"
                  step="0.01"
                  value={form.price}
                  onChange={e => set('price', e.target.value)}
                />
              </div>
            </div>

            {err && (
              <div style={{ fontSize: '11.5px', color: 'var(--red)', background: 'rgba(224,82,82,0.08)', padding: '8px 10px', borderRadius: '5px' }}>
                {err}
              </div>
            )}

          </div>

          <div className="modal-foot">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn">Submit Listing</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [items, setItems] = useState(initialListings.slice(0, 4))
  const [toast, setToast] = useState(null)
  const [showModal, setShowModal] = useState(false)

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

  function handleNewListing(listing) {
    setItems(prev => [listing, ...prev])
    setShowModal(false)
    showToast(`"${listing.name}" submitted for review`, 'info')
  }

  const pendingCount = items.filter(i => i.status === 'pending').length

  return (
    <div>
      <Toast toast={toast} />
      {showModal && (
        <NewListingModal
          onClose={() => setShowModal(false)}
          onSubmit={handleNewListing}
        />
      )}

      <div className="ph">
        <div className="ph-left">
          <h1>Overview</h1>
          <p>Wednesday, Mar 11 &mdash; Last 30 days</p>
        </div>
        <div className="ph-right">
          <button className="btn btn-ghost">Export</button>
          <button className="btn" onClick={() => setShowModal(true)}>+ New Listing</button>
        </div>
      </div>

      <div className="stats">
        <div className="stat">
          <div className="stat-top"><div className="stat-lbl">Total Listings</div><div className="stat-ic">L</div></div>
          <div className="stat-val">1,284</div>
          <div className="stat-sub">+12% this week</div>
        </div>
        <div className="stat">
          <div className="stat-top">
            <div className="stat-lbl">Pending Orders</div>
            <div className="stat-ic" style={{ background: 'rgba(254,147,251,0.15)' }}>P</div>
          </div>
          <div className="stat-val">47</div>
          <div className="stat-sub neg">3 new today</div>
        </div>
        <div className="stat">
          <div className="stat-top">
            <div className="stat-lbl">Completed Orders</div>
            <div className="stat-ic" style={{ background: 'rgba(62,207,99,0.1)', color: 'var(--green)' }}>C</div>
          </div>
          <div className="stat-val">892</div>
          <div className="stat-sub">+8% this month</div>
        </div>
        <div className="stat">
          <div className="stat-top"><div className="stat-lbl">Total Revenue</div><div className="stat-ic">$</div></div>
          <div className="stat-val">$24.6k</div>
          <div className="stat-sub">+18% vs last mo</div>
        </div>
      </div>

      <div className="two-col">
        <div className="panel">
          <div className="panel-hd">
            <div className="panel-title">
              Listings Approval <span className="cnt">{pendingCount} pending</span>
            </div>
            <Link href="/listings" className="lnk">View all</Link>
          </div>
          <div className="tbl-wrap">
            <table>
              <thead>
                <tr>
                  <th>Item</th><th>Game</th><th>Seller</th><th>Price</th><th>Status</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
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
                    <td data-label="Seller">{item.seller}</td>
                    <td data-label="Price" className="price-val">{item.price}</td>
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
                          </>
                        )}
                        {item.status === 'approved' && (
                          <button className="act a-view">View</button>
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
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="panel">
            <div className="panel-hd">
              <div className="panel-title">Recent Orders <span className="cnt">7 active</span></div>
              <Link href="/pending" className="lnk">View all</Link>
            </div>
            <div className="chart-wrap">
              <div className="chart-title">Orders this week</div>
              <div className="bars">
                {barData.map((b, i) => (
                  <div className="bar-col" key={i}>
                    <div className={`bar${b.hi ? ' hi' : ''}`} style={{ height: b.h }} />
                    <div className="bar-lbl">{b.lbl}</div>
                  </div>
                ))}
              </div>
            </div>
            {orders.slice(0, 3).map((order) => (
              <div className="o-item" key={order.id}>
                <div className="o-row1">
                  <span className="o-id">{order.id}</span>
                  <span className={`pill p-${order.status}`}>
                    {order.status === 'delivery' ? 'Delivery' : order.status === 'complete' ? 'Complete' : 'Pending'}
                  </span>
                </div>
                <div className="o-name">{order.item}</div>
                <div className="o-meta">{order.buyer} &rarr; {order.seller} &middot; {order.amount}</div>
              </div>
            ))}
          </div>

          <div className="panel">
            <div className="panel-hd">
              <div className="panel-title">Top Sellers</div>
              <Link href="/users" className="lnk">View all</Link>
            </div>
            {topSellers.map((seller) => (
              <div className="u-row" key={seller.username}>
                <img
                  src={seller.image}
                  width={30}
                  height={30}
                  style={{ borderRadius: '50%', border: '1px solid var(--border)' }}
                  alt={seller.username}
                />
                <div>
                  <div className="u-n">{seller.username}</div>
                  <div className="u-sub">{seller.listings} listings &middot; {seller.rating}</div>
                </div>
                <div className="u-val">{seller.sales}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
