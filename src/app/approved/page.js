import { listings } from '@/lib/data'

const approvedItems = listings.filter((l) => l.status === 'approved')

export default function ApprovedPage() {
  return (
    <div>
      <div className="ph">
        <div className="ph-left">
          <h1>Approved Items</h1>
          <p>Live listings visible to buyers</p>
        </div>
        <div className="ph-right">
          <button className="btn btn-ghost">Export</button>
        </div>
      </div>

      <div className="three-col">
        <div className="stat">
          <div className="stat-top">
            <div className="stat-lbl">Live Listings</div>
            <div className="stat-ic" style={{ background: 'rgba(62,207,99,0.1)', color: 'var(--green)' }}>L</div>
          </div>
          <div className="stat-val">1,222</div>
          <div className="stat-sub">Active now</div>
        </div>
        <div className="stat">
          <div className="stat-top">
            <div className="stat-lbl">Sold Today</div>
            <div className="stat-ic">$</div>
          </div>
          <div className="stat-val">34</div>
          <div className="stat-sub">+11% vs yesterday</div>
        </div>
        <div className="stat">
          <div className="stat-top">
            <div className="stat-lbl">Avg. Price</div>
            <div className="stat-ic">~</div>
          </div>
          <div className="stat-val">$9.20</div>
          <div className="stat-sub" style={{ color: 'var(--muted)' }}>Per listing</div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-hd">
          <div className="panel-title">
            Live Listings <span className="cnt">1,222 live</span>
          </div>
          <div className="acts">
            <button className="act a-reject">Bulk Remove</button>
          </div>
        </div>

        <div className="filter-bar">
          <input
            className="filter-input"
            type="text"
            placeholder="Search approved items..."
            style={{ width: '180px' }}
          />
          <select className="filter-input">
            <option>All Games</option>
            <option>Adopt Me</option>
            <option>MM2</option>
            <option>Blox Fruits</option>
          </select>
          <select className="filter-input">
            <option>Sort: Newest</option>
            <option>Sort: Most Viewed</option>
            <option>Sort: Price High</option>
          </select>
        </div>

        <div className="tbl-wrap">
          <table>
            <thead>
              <tr>
                <th><input type="checkbox" className="cb" /></th>
                <th>Item</th>
                <th>Game</th>
                <th>Seller</th>
                <th>Price</th>
                <th>Views</th>
                <th>Approved</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {approvedItems.map((item) => (
                <tr key={item.id}>
                  <td className="td-hide"><input type="checkbox" className="cb" /></td>
                  <td data-label="Item">
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
                  <td data-label="Game"><span className="tag">{item.game}</span></td>
                  <td data-label="Seller">{item.seller}</td>
                  <td data-label="Price" className="price-val">{item.price}</td>
                  <td className="td-hide">{item.views}</td>
                  <td className="td-hide">{item.listed}</td>
                  <td data-label="Action">
                    <div className="acts">
                      <button className="act a-edit">Edit</button>
                      <button className="act a-reject">Remove</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pager">
          <div className="pager-info">Showing 1&ndash;4 of 1,222</div>
          <div className="pager-btns">
            <button className="pg-btn">&#8592;</button>
            <button className="pg-btn cur">1</button>
            <button className="pg-btn">2</button>
            <button className="pg-btn">3</button>
            <button className="pg-btn" style={{ width: 'auto', padding: '0 8px' }}>...</button>
            <button className="pg-btn">175</button>
            <button className="pg-btn">&#8594;</button>
          </div>
        </div>
      </div>
    </div>
  )
}
