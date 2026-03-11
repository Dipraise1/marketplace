'use client'
import { useState } from 'react'
import { listings } from '@/lib/data'

const tabs = ['All', 'Pending (24)', 'Approved', 'Rejected']

export default function ListingsPage() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div>
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
          <div className="stat-top">
            <div className="stat-lbl">Total Listings</div>
            <div className="stat-ic">L</div>
          </div>
          <div className="stat-val">1,284</div>
          <div className="stat-sub">All time</div>
        </div>
        <div className="stat">
          <div className="stat-top">
            <div className="stat-lbl">Pending Review</div>
            <div className="stat-ic" style={{ background: 'rgba(254,159,59,0.15)' }}>P</div>
          </div>
          <div className="stat-val">24</div>
          <div className="stat-sub neg">Needs action</div>
        </div>
        <div className="stat">
          <div className="stat-top">
            <div className="stat-lbl">Rejected</div>
            <div className="stat-ic" style={{ background: 'rgba(224,82,82,0.1)', color: 'var(--red)' }}>R</div>
          </div>
          <div className="stat-val">38</div>
          <div className="stat-sub" style={{ color: 'var(--muted)' }}>This month</div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-hd">
          <div className="panel-title">
            All Listings <span className="cnt">1,284 total</span>
          </div>
          <div className="acts">
            <button className="act a-approve">Bulk Approve</button>
            <button className="act a-reject">Bulk Reject</button>
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
            placeholder="Search listings..."
            style={{ width: '180px' }}
          />
          <select className="filter-input">
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
            <option>Vehicles</option>
          </select>
          <select className="filter-input">
            <option>Sort: Newest</option>
            <option>Sort: Oldest</option>
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
              {listings.map((item) => (
                <tr key={item.id}>
                  <td><input type="checkbox" className="cb" /></td>
                  <td style={{ color: 'var(--muted)' }}>{item.id}</td>
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
                  <td><span className="tag">{item.category}</span></td>
                  <td>{item.seller}</td>
                  <td className="price-val">{item.price}</td>
                  <td style={{ color: 'var(--muted)' }}>{item.views}</td>
                  <td style={{ color: 'var(--muted)' }}>{item.listed}</td>
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
                          <button className="act a-view">View</button>
                        </>
                      )}
                      {item.status === 'approved' && (
                        <>
                          <button className="act a-edit">Edit</button>
                          <button className="act a-reject">Remove</button>
                          <button className="act a-view">View</button>
                        </>
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

        <div className="pager">
          <div className="pager-info">Showing 1&ndash;7 of 1,284</div>
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
