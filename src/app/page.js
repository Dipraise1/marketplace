'use client'
import Link from 'next/link'
import { listings, orders, topSellers } from '@/lib/data'

const barData = [
  { h: '40%', lbl: 'M' },
  { h: '65%', lbl: 'T' },
  { h: '55%', lbl: 'W' },
  { h: '100%', lbl: 'T', hi: true },
  { h: '75%', lbl: 'F' },
  { h: '45%', lbl: 'S' },
  { h: '30%', lbl: 'S' },
]

export default function DashboardPage() {
  const previewListings = listings.slice(0, 4)
  const previewOrders = orders.slice(0, 3)

  return (
    <div>
      <div className="ph">
        <div className="ph-left">
          <h1>Overview</h1>
          <p>Wednesday, Mar 11 &mdash; Last 30 days</p>
        </div>
        <div className="ph-right">
          <button className="btn btn-ghost">Export</button>
          <button className="btn">+ New Listing</button>
        </div>
      </div>

      <div className="stats">
        <div className="stat">
          <div className="stat-top">
            <div className="stat-lbl">Total Listings</div>
            <div className="stat-ic">L</div>
          </div>
          <div className="stat-val">1,284</div>
          <div className="stat-sub">+12% this week</div>
        </div>
        <div className="stat">
          <div className="stat-top">
            <div className="stat-lbl">Pending Orders</div>
            <div className="stat-ic" style={{ background: 'rgba(254,159,59,0.15)' }}>P</div>
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
          <div className="stat-top">
            <div className="stat-lbl">Total Revenue</div>
            <div className="stat-ic">$</div>
          </div>
          <div className="stat-val">$24.6k</div>
          <div className="stat-sub">+18% vs last mo</div>
        </div>
      </div>

      <div className="two-col">
        <div className="panel">
          <div className="panel-hd">
            <div className="panel-title">
              Listings Approval <span className="cnt">24 pending</span>
            </div>
            <Link href="/listings" className="lnk">View all</Link>
          </div>
          <div className="tbl-wrap">
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Game</th>
                  <th>Seller</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {previewListings.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="item-cell">
                        <img
                          src={item.image}
                          width={30}
                          height={30}
                          style={{ borderRadius: '5px' }}
                          alt={item.name}
                        />
                        <div>
                          <div className="item-n">{item.name}</div>
                          <div className="item-m">{item.meta}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className="tag">{item.game}</span></td>
                    <td>{item.seller}</td>
                    <td className="price-val">{item.price}</td>
                    <td>
                      <span className={`pill p-${item.status}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className="acts">
                        {item.status === 'pending' && (
                          <>
                            <button className="act a-approve">Approve</button>
                            <button className="act a-reject">Reject</button>
                          </>
                        )}
                        {item.status === 'approved' && (
                          <button className="act a-view">View</button>
                        )}
                        {item.status === 'rejected' && (
                          <>
                            <button className="act a-approve">Re-approve</button>
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
              <div className="panel-title">
                Recent Orders <span className="cnt">7 active</span>
              </div>
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
            {previewOrders.map((order) => (
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
