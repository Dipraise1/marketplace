'use client'
import { useState } from 'react'

const settingsNavItems = ['General', 'Payments', 'Notifications', 'Security', 'Appearance', 'API']

export default function SettingsPage() {
  const [activeNav, setActiveNav] = useState(0)
  const [requireApproval, setRequireApproval] = useState(true)
  const [allowListings, setAllowListings] = useState(true)
  const [autoExpire, setAutoExpire] = useState(false)
  const [allowOffers, setAllowOffers] = useState(true)
  const [maintenance, setMaintenance] = useState(false)

  return (
    <div>
      <div className="ph">
        <div className="ph-left">
          <h1>Settings</h1>
          <p>Site configuration and preferences</p>
        </div>
      </div>

      <div className="settings-grid">
        <div className="settings-nav">
          {settingsNavItems.map((item, i) => (
            <div
              key={item}
              className={`s-nav-item${activeNav === i ? ' active' : ''}`}
              onClick={() => setActiveNav(i)}
            >
              {item}
            </div>
          ))}
        </div>

        <div className="settings-body">
          <div className="s-section">
            <div className="s-sec-hd">Site Information</div>
            <div className="s-sec-body">
              <div className="field-row">
                <div className="field">
                  <label>Site Name</label>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', padding: '6px 0' }}>
                    Marketplace
                  </div>
                </div>
                <div className="field">
                  <label>Support Email</label>
                  <div style={{ fontSize: '13px', color: 'var(--text)', padding: '6px 0' }}>
                    support@marketplace.gg
                  </div>
                </div>
              </div>
              <div className="field">
                <label>Site Description</label>
                <div style={{ fontSize: '12.5px', color: 'var(--muted)', padding: '6px 0', lineHeight: 1.5 }}>
                  The premier Roblox item trading marketplace.
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Platform Fee</label>
                  <div style={{ fontSize: '13px', color: 'var(--text)', padding: '6px 0' }}>10%</div>
                </div>
                <div className="field">
                  <label>Min Listing Price</label>
                  <div style={{ fontSize: '13px', color: 'var(--text)', padding: '6px 0' }}>$1.00</div>
                </div>
              </div>
            </div>
          </div>

          <div className="s-section">
            <div className="s-sec-hd">Listing Controls</div>
            <div className="s-sec-body">
              <div className="toggle-row">
                <div className="toggle-info">
                  <div className="t-lbl">Require manual approval</div>
                  <div className="t-sub">All new listings must be reviewed before going live</div>
                </div>
                <div
                  className={`toggle${requireApproval ? ' on' : ''}`}
                  onClick={() => setRequireApproval(!requireApproval)}
                />
              </div>
              <div className="toggle-row">
                <div className="toggle-info">
                  <div className="t-lbl">Allow new listings</div>
                  <div className="t-sub">Sellers can submit new items for approval</div>
                </div>
                <div
                  className={`toggle${allowListings ? ' on' : ''}`}
                  onClick={() => setAllowListings(!allowListings)}
                />
              </div>
              <div className="toggle-row">
                <div className="toggle-info">
                  <div className="t-lbl">Auto-expire inactive listings</div>
                  <div className="t-sub">Remove listings with no views after 30 days</div>
                </div>
                <div
                  className={`toggle${autoExpire ? ' on' : ''}`}
                  onClick={() => setAutoExpire(!autoExpire)}
                />
              </div>
              <div className="toggle-row">
                <div className="toggle-info">
                  <div className="t-lbl">Allow buyer offers</div>
                  <div className="t-sub">Buyers can submit custom offers below asking price</div>
                </div>
                <div
                  className={`toggle${allowOffers ? ' on' : ''}`}
                  onClick={() => setAllowOffers(!allowOffers)}
                />
              </div>
            </div>
            <div className="s-foot">
              <button className="btn btn-ghost">Cancel</button>
              <button className="btn">Save Changes</button>
            </div>
          </div>

          <div className="s-section">
            <div className="s-sec-hd">Danger Zone</div>
            <div className="s-sec-body">
              <div className="toggle-row">
                <div className="toggle-info">
                  <div className="t-lbl">Maintenance mode</div>
                  <div className="t-sub">Take the site offline for all non-admin users</div>
                </div>
                <div
                  className={`toggle${maintenance ? ' on' : ''}`}
                  onClick={() => setMaintenance(!maintenance)}
                />
              </div>
              <div style={{ display: 'flex', gap: '8px', paddingTop: '4px' }}>
                <button className="btn btn-danger">Clear Listing Cache</button>
                <button className="btn btn-danger">Reset All Sessions</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
