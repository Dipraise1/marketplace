'use client'
import { useState } from 'react'
import { transactions } from '@/lib/data'

const tabs = ['All', 'Payments In', 'Refunds', 'Payouts']

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState(0)

  const filtered =
    activeTab === 1 ? transactions.filter(tx => tx.type === 'Payment') :
    activeTab === 2 ? transactions.filter(tx => tx.type === 'Refund') :
    activeTab === 3 ? transactions.filter(tx => tx.type === 'Payout') :
    transactions

  return (
    <div>
      <div className="ph">
        <div className="ph-left">
          <h1>Payments</h1>
          <p>All transactions and payouts</p>
        </div>
        <div className="ph-right">
          <button className="btn btn-ghost">Export CSV</button>
        </div>
      </div>

      <div className="stats">
        <div className="stat">
          <div className="stat-top">
            <div className="stat-lbl">Total Revenue</div>
            <div className="stat-ic">$</div>
          </div>
          <div className="stat-val">$24.6k</div>
          <div className="stat-sub">+18% this month</div>
        </div>
        <div className="stat">
          <div className="stat-top">
            <div className="stat-lbl">Platform Fees</div>
            <div className="stat-ic" style={{ background: 'rgba(62,207,99,0.1)', color: 'var(--green)' }}>F</div>
          </div>
          <div className="stat-val">$2.4k</div>
          <div className="stat-sub">10% per sale</div>
        </div>
        <div className="stat">
          <div className="stat-top">
            <div className="stat-lbl">Refunds Issued</div>
            <div className="stat-ic" style={{ background: 'rgba(224,82,82,0.1)', color: 'var(--red)' }}>R</div>
          </div>
          <div className="stat-val">$184</div>
          <div className="stat-sub neg">7 refunds</div>
        </div>
        <div className="stat">
          <div className="stat-top">
            <div className="stat-lbl">Pending Payout</div>
            <div className="stat-ic" style={{ background: 'rgba(254,147,251,0.15)' }}>P</div>
          </div>
          <div className="stat-val">$1.2k</div>
          <div className="stat-sub neg">Due this week</div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-hd">
          <div className="panel-title">
            Transaction History <span className="cnt">All time</span>
          </div>
        </div>

        <div className="tabs">
          {tabs.map((tab, i) => (
            <div key={tab} className={`tab${activeTab === i ? ' active' : ''}`} onClick={() => setActiveTab(i)}>{tab}</div>
          ))}
        </div>

        <div className="filter-bar">
          <input
            className="filter-input"
            type="text"
            placeholder="Search user or order..."
            style={{ width: '180px' }}
          />
          <input
            className="filter-input"
            type="date"
            style={{ width: '130px', colorScheme: 'dark' }}
          />
          <input
            className="filter-input"
            type="date"
            style={{ width: '130px', colorScheme: 'dark' }}
          />
          <select className="filter-input">
            <option>All Types</option>
            <option>Payment</option>
            <option>Refund</option>
            <option>Payout</option>
          </select>
        </div>

        <div className="tbl-wrap">
          <table>
            <thead>
              <tr>
                <th>Tx ID</th>
                <th>Type</th>
                <th>From</th>
                <th>To</th>
                <th>Item</th>
                <th>Amount</th>
                <th>Fee</th>
                <th>Net</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx) => (
                <tr key={tx.txnId}>
                  <td className="td-hide" style={{ fontSize: '11px' }}>{tx.txnId}</td>
                  <td data-label="Type"><span className={`pill ${tx.typeClass}`}>{tx.type}</span></td>
                  <td data-label="From">{tx.from}</td>
                  <td data-label="To">{tx.to}</td>
                  <td className="td-hide">{tx.item}</td>
                  <td
                    data-label="Amount"
                    className={tx.amountClass === 'price-val' ? 'price-val' : undefined}
                    style={
                      tx.amountClass === 'neg-val'
                        ? { color: 'var(--red)', fontWeight: 600 }
                        : tx.amountClass === 'blue-val'
                        ? { color: 'var(--blue)', fontWeight: 600 }
                        : undefined
                    }
                  >
                    {tx.amount}
                  </td>
                  <td className="td-hide">{tx.fee}</td>
                  <td
                    data-label="Net"
                    style={
                      tx.netClass === 'neg-val'
                        ? { color: 'var(--red)', fontWeight: 600 }
                        : tx.netClass === 'blue-val'
                        ? { color: 'var(--blue)', fontWeight: 600 }
                        : { color: 'var(--green)', fontWeight: 600 }
                    }
                  >
                    {tx.net}
                  </td>
                  <td data-label="Date" style={{ color: 'var(--muted)' }}>{tx.date}</td>
                  <td data-label="Status">
                    <span className={`pill p-${tx.status}`}>
                      {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pager">
          <div className="pager-info">Showing 1&ndash;6 of 4,210</div>
          <div className="pager-btns">
            <button className="pg-btn">&#8592;</button>
            <button className="pg-btn cur">1</button>
            <button className="pg-btn">2</button>
            <button className="pg-btn">3</button>
            <button className="pg-btn" style={{ width: 'auto', padding: '0 8px' }}>...</button>
            <button className="pg-btn">702</button>
            <button className="pg-btn">&#8594;</button>
          </div>
        </div>
      </div>
    </div>
  )
}
