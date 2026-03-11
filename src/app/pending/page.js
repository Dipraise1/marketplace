'use client'
import { useState } from 'react'
import { orders } from '@/lib/data'

const tabs = ['All (47)', 'Pending Payment (29)', 'In Delivery (18)', 'Disputes (4)']

export default function PendingPage() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div>
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
          <div className="stat-val">18</div>
          <div className="stat-sub neg">Awaiting seller</div>
        </div>
        <div className="stat">
          <div className="stat-top">
            <div className="stat-lbl">Awaiting Payment</div>
            <div className="stat-ic" style={{ background: 'rgba(254,159,59,0.15)' }}>$</div>
          </div>
          <div className="stat-val">29</div>
          <div className="stat-sub neg">Buyer action needed</div>
        </div>
        <div className="stat">
          <div className="stat-top">
            <div className="stat-lbl">Disputes Open</div>
            <div className="stat-ic" style={{ background: 'rgba(224,82,82,0.1)', color: 'var(--red)' }}>!</div>
          </div>
          <div className="stat-val">4</div>
          <div className="stat-sub neg">Needs review</div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-hd">
          <div className="panel-title">
            Order Queue <span className="cnt">47 active</span>
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
            placeholder="Search order ID or buyer..."
            style={{ width: '200px' }}
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
              {orders.map((order) => (
                <tr key={order.id}>
                  <td style={{ fontWeight: 700, color: 'var(--accent)' }}>{order.id}</td>
                  <td>
                    <div className="item-cell">
                      <img
                        src={order.itemImage}
                        width={30}
                        height={30}
                        style={{ borderRadius: '5px' }}
                        alt={order.item}
                      />
                      <div>
                        <div className="item-n">{order.item}</div>
                        <div className="item-m">{order.itemMeta}</div>
                      </div>
                    </div>
                  </td>
                  <td>{order.buyer}</td>
                  <td>{order.seller}</td>
                  <td><span className="tag">{order.game}</span></td>
                  <td className="price-val">{order.amount}</td>
                  <td style={{ color: 'var(--muted)' }}>{order.placed}</td>
                  <td>
                    {order.status === 'delivery' && <span className="pill p-delivery">In Delivery</span>}
                    {order.status === 'pending' && <span className="pill p-pending">Pending Pay</span>}
                    {order.status === 'complete' && <span className="pill p-complete">Complete</span>}
                    {order.status === 'dispute' && (
                      <span className="pill p-rejected" style={{ background: 'rgba(224,82,82,0.1)', color: 'var(--red)' }}>Dispute</span>
                    )}
                  </td>
                  <td>
                    <div className="acts">
                      {order.status === 'delivery' && (
                        <>
                          <button className="act a-approve">Mark Complete</button>
                          <button className="act a-view">View</button>
                        </>
                      )}
                      {order.status === 'pending' && (
                        <>
                          <button className="act a-view">View</button>
                          <button className="act a-reject">Cancel</button>
                        </>
                      )}
                      {order.status === 'complete' && (
                        <button className="act a-view">View</button>
                      )}
                      {order.status === 'dispute' && (
                        <>
                          <button className="act a-edit">Resolve</button>
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
          <div className="pager-info">Showing 1&ndash;5 of 47</div>
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
