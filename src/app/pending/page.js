'use client'
import { useState, useMemo } from 'react'
import { orders as initialOrders } from '@/lib/data'

const TABS = ['All', 'Pending Payment', 'In Delivery', 'Disputes']

function statusLabel(s) {
  if (s === 'delivery') return 'In Delivery'
  if (s === 'pending')  return 'Pending Pay'
  if (s === 'complete') return 'Complete'
  if (s === 'cancelled') return 'Cancelled'
  if (s === 'dispute')  return 'Dispute'
  return s
}

function statusPill(s) {
  if (s === 'delivery')  return 'p-delivery'
  if (s === 'pending')   return 'p-pending'
  if (s === 'complete')  return 'p-complete'
  if (s === 'cancelled') return 'p-rejected'
  if (s === 'dispute')   return 'p-rejected'
  return 'p-pending'
}

function Toast({ toast }) {
  if (!toast) return null
  return <div className={`toast toast-${toast.type}`}>{toast.msg}</div>
}

export default function PendingPage() {
  const [orderList, setOrderList] = useState(initialOrders)
  const [activeTab, setActiveTab] = useState(0)
  const [search, setSearch] = useState('')
  const [toast, setToast] = useState(null)

  function showToast(msg, type = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 2500)
  }

  function markComplete(id) {
    setOrderList(prev => prev.map(o => o.id === id ? { ...o, status: 'complete' } : o))
    showToast('Order marked as complete', 'success')
  }

  function cancelOrder(id) {
    setOrderList(prev => prev.map(o => o.id === id ? { ...o, status: 'cancelled' } : o))
    showToast('Order cancelled', 'error')
  }

  function resolveDispute(id) {
    setOrderList(prev => prev.map(o => o.id === id ? { ...o, status: 'complete' } : o))
    showToast('Dispute resolved', 'success')
  }

  const filtered = useMemo(() => {
    let result = orderList
    if (activeTab === 1) result = result.filter(o => o.status === 'pending')
    if (activeTab === 2) result = result.filter(o => o.status === 'delivery')
    if (activeTab === 3) result = result.filter(o => o.status === 'dispute')
    if (search) result = result.filter(o =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.buyer.toLowerCase().includes(search.toLowerCase()) ||
      o.item.toLowerCase().includes(search.toLowerCase())
    )
    return result
  }, [orderList, activeTab, search])

  const deliveryCount = orderList.filter(o => o.status === 'delivery').length
  const pendingCount  = orderList.filter(o => o.status === 'pending').length
  const disputeCount  = orderList.filter(o => o.status === 'dispute').length

  const tabLabels = [
    `All (${orderList.length})`,
    `Pending Payment (${pendingCount})`,
    `In Delivery (${deliveryCount})`,
    `Disputes (${disputeCount})`,
  ]

  return (
    <div>
      <Toast toast={toast} />

      <div className="ph">
        <div className="ph-left">
          <h1>Pending Orders</h1>
          <p>Orders waiting for delivery or action</p>
        </div>
        <div className="ph-right">
          <button className="btn btn-ghost">Export</button>
        </div>
      </div>

      <div className="three-col">
        <div className="stat">
          <div className="stat-top">
            <div className="stat-lbl">Pending Delivery</div>
            <div className="stat-ic" style={{ background: 'rgba(99,149,255,0.1)', color: 'var(--blue)' }}>D</div>
          </div>
          <div className="stat-val">{deliveryCount}</div>
          <div className="stat-sub neg">Awaiting seller</div>
        </div>
        <div className="stat">
          <div className="stat-top">
            <div className="stat-lbl">Awaiting Payment</div>
            <div className="stat-ic" style={{ background: 'rgba(254,147,251,0.15)' }}>$</div>
          </div>
          <div className="stat-val">{pendingCount}</div>
          <div className="stat-sub neg">Buyer action needed</div>
        </div>
        <div className="stat">
          <div className="stat-top">
            <div className="stat-lbl">Disputes Open</div>
            <div className="stat-ic" style={{ background: 'rgba(224,82,82,0.1)', color: 'var(--red)' }}>!</div>
          </div>
          <div className="stat-val">{disputeCount}</div>
          <div className="stat-sub neg">Needs review</div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-hd">
          <div className="panel-title">
            Order Queue <span className="cnt">{orderList.filter(o => o.status !== 'complete' && o.status !== 'cancelled').length} active</span>
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
            placeholder="Search order ID or buyer..."
            style={{ width: '200px' }}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select className="filter-input">
            <option>All Games</option>
            <option>Adopt Me</option>
            <option>MM2</option>
            <option>Blox Fruits</option>
          </select>
          <select className="filter-input">
            <option>Sort: Newest</option>
            <option>Sort: Oldest</option>
            <option>Sort: Value High</option>
          </select>
        </div>

        <div className="tbl-wrap">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Item</th>
                <th>Buyer</th>
                <th>Seller</th>
                <th>Game</th>
                <th>Amount</th>
                <th>Placed</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} style={{ textAlign: 'center', padding: '30px', color: 'var(--muted)' }}>
                    No orders match this filter
                  </td>
                </tr>
              )}
              {filtered.map((order) => (
                <tr key={order.id}>
                  <td data-label="Order" style={{ fontWeight: 700, color: 'var(--accent)' }}>{order.id}</td>
                  <td data-label="Item">
                    <div className="item-cell">
                      <img src={order.itemImage} width={30} height={30} style={{ borderRadius: '5px' }} alt={order.item} />
                      <div>
                        <div className="item-n">{order.item}</div>
                        <div className="item-m">{order.itemMeta}</div>
                      </div>
                    </div>
                  </td>
                  <td data-label="Buyer">{order.buyer}</td>
                  <td className="td-hide">{order.seller}</td>
                  <td className="td-hide"><span className="tag">{order.game}</span></td>
                  <td data-label="Amount" className="price-val">{order.amount}</td>
                  <td data-label="Placed" style={{ color: 'var(--muted)' }}>{order.placed}</td>
                  <td data-label="Status">
                    <span className={`pill ${statusPill(order.status)}`}>
                      {statusLabel(order.status)}
                    </span>
                  </td>
                  <td data-label="Action">
                    <div className="acts">
                      {order.status === 'delivery' && (
                        <>
                          <button className="act a-approve" onClick={() => markComplete(order.id)}>Mark Complete</button>
                          <button className="act a-view">View</button>
                        </>
                      )}
                      {order.status === 'pending' && (
                        <>
                          <button className="act a-view">View</button>
                          <button className="act a-reject" onClick={() => cancelOrder(order.id)}>Cancel</button>
                        </>
                      )}
                      {order.status === 'complete' && (
                        <button className="act a-view">View</button>
                      )}
                      {order.status === 'cancelled' && (
                        <button className="act a-view">View</button>
                      )}
                      {order.status === 'dispute' && (
                        <>
                          <button className="act a-edit" onClick={() => resolveDispute(order.id)}>Resolve</button>
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
          <div className="pager-info">Showing {filtered.length} of {orderList.length}</div>
          <div className="pager-btns">
            <button className="pg-btn">&#8592;</button>
            <button className="pg-btn cur">1</button>
            <button className="pg-btn">2</button>
            <button className="pg-btn">3</button>
            <button className="pg-btn">&#8594;</button>
          </div>
        </div>
      </div>
    </div>
  )
}
