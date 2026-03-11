'use client'
import { useState } from 'react'

const NAV = ['General', 'Payments', 'Notifications', 'Security', 'Appearance', 'API']

function Toggle({ on, onToggle }) {
  return (
    <div className={`toggle${on ? ' on' : ''}`} onClick={onToggle} />
  )
}

function Toast({ toast }) {
  if (!toast) return null
  return <div className={`toast toast-${toast.type}`}>{toast.msg}</div>
}

export default function SettingsPage() {
  const [activeNav, setActiveNav] = useState(0)
  const [toast, setToast] = useState(null)

  // General — Listing Controls
  const [requireApproval, setRequireApproval] = useState(true)
  const [allowListings,   setAllowListings]   = useState(true)
  const [autoExpire,      setAutoExpire]      = useState(false)
  const [allowOffers,     setAllowOffers]     = useState(true)
  const [maintenance,     setMaintenance]     = useState(false)

  // Payments
  const [gateway,       setGateway]       = useState('stripe')
  const [payoutFreq,    setPayoutFreq]    = useState('weekly')
  const [minPayout,     setMinPayout]     = useState('20')
  const [autoPayout,    setAutoPayout]    = useState(true)

  // Notifications
  const [notifyOrder,    setNotifyOrder]    = useState(true)
  const [notifyApproval, setNotifyApproval] = useState(true)
  const [notifyDispute,  setNotifyDispute]  = useState(true)
  const [notifyPayout,   setNotifyPayout]   = useState(false)
  const [adminEmail,     setAdminEmail]     = useState('admin@marketplace.gg')

  // Security
  const [require2FA,    setRequire2FA]    = useState(false)
  const [sessionMins,   setSessionMins]   = useState('60')
  const [rateLimit,     setRateLimit]     = useState(true)
  const [ipWhitelist,   setIpWhitelist]   = useState('')

  // Appearance
  const [accentColor,   setAccentColor]   = useState('#fe93fb')
  const [compactMode,   setCompactMode]   = useState(false)
  const [showRatings,   setShowRatings]   = useState(true)

  // API
  const [apiKey,        setApiKey]        = useState('mk_live_••••••••••••••••••••••••')
  const [webhookUrl,    setWebhookUrl]    = useState('')
  const [ratePerMin,    setRatePerMin]    = useState('60')
  const [showKey,       setShowKey]       = useState(false)

  function showToast(msg, type = 'info') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 2500)
  }

  function handleSave() {
    showToast('Settings saved', 'success')
  }

  function handleRegenKey() {
    setApiKey('mk_live_' + Math.random().toString(36).slice(2, 26))
    showToast('API key regenerated', 'info')
  }

  return (
    <div>
      <Toast toast={toast} />

      <div className="ph">
        <div className="ph-left">
          <h1>Settings</h1>
          <p>Site configuration and preferences</p>
        </div>
      </div>

      <div className="settings-grid">
        <div className="settings-nav">
          {NAV.map((item, i) => (
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

          {/* ── GENERAL ── */}
          {activeNav === 0 && (
            <>
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
                    <Toggle on={requireApproval} onToggle={() => setRequireApproval(v => !v)} />
                  </div>
                  <div className="toggle-row">
                    <div className="toggle-info">
                      <div className="t-lbl">Allow new listings</div>
                      <div className="t-sub">Sellers can submit new items for approval</div>
                    </div>
                    <Toggle on={allowListings} onToggle={() => setAllowListings(v => !v)} />
                  </div>
                  <div className="toggle-row">
                    <div className="toggle-info">
                      <div className="t-lbl">Auto-expire inactive listings</div>
                      <div className="t-sub">Remove listings with no views after 30 days</div>
                    </div>
                    <Toggle on={autoExpire} onToggle={() => setAutoExpire(v => !v)} />
                  </div>
                  <div className="toggle-row">
                    <div className="toggle-info">
                      <div className="t-lbl">Allow buyer offers</div>
                      <div className="t-sub">Buyers can submit custom offers below asking price</div>
                    </div>
                    <Toggle on={allowOffers} onToggle={() => setAllowOffers(v => !v)} />
                  </div>
                </div>
                <div className="s-foot">
                  <button className="btn btn-ghost">Cancel</button>
                  <button className="btn" onClick={handleSave}>Save Changes</button>
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
                    <Toggle on={maintenance} onToggle={() => {
                      setMaintenance(v => !v)
                      showToast(!maintenance ? 'Maintenance mode enabled' : 'Maintenance mode disabled', !maintenance ? 'error' : 'success')
                    }} />
                  </div>
                  <div style={{ display: 'flex', gap: '8px', paddingTop: '4px' }}>
                    <button className="btn btn-danger" onClick={() => showToast('Listing cache cleared', 'info')}>
                      Clear Listing Cache
                    </button>
                    <button className="btn btn-danger" onClick={() => showToast('All sessions reset', 'info')}>
                      Reset All Sessions
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── PAYMENTS ── */}
          {activeNav === 1 && (
            <div className="s-section">
              <div className="s-sec-hd">Payment Settings</div>
              <div className="s-sec-body">
                <div className="field">
                  <label>Payment Gateway</label>
                  <select className="input" value={gateway} onChange={e => setGateway(e.target.value)}>
                    <option value="stripe">Stripe</option>
                    <option value="paypal">PayPal</option>
                    <option value="coinbase">Coinbase Commerce</option>
                  </select>
                </div>
                <div className="field-row">
                  <div className="field">
                    <label>Payout Frequency</label>
                    <select className="input" value={payoutFreq} onChange={e => setPayoutFreq(e.target.value)}>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="biweekly">Bi-weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Minimum Payout ($)</label>
                    <input className="input" type="number" value={minPayout} onChange={e => setMinPayout(e.target.value)} />
                  </div>
                </div>
                <div className="toggle-row">
                  <div className="toggle-info">
                    <div className="t-lbl">Auto-payout sellers</div>
                    <div className="t-sub">Automatically send payouts on the scheduled frequency</div>
                  </div>
                  <Toggle on={autoPayout} onToggle={() => setAutoPayout(v => !v)} />
                </div>
              </div>
              <div className="s-foot">
                <button className="btn btn-ghost">Cancel</button>
                <button className="btn" onClick={handleSave}>Save Changes</button>
              </div>
            </div>
          )}

          {/* ── NOTIFICATIONS ── */}
          {activeNav === 2 && (
            <div className="s-section">
              <div className="s-sec-hd">Email Notifications</div>
              <div className="s-sec-body">
                <div className="field">
                  <label>Admin Email Address</label>
                  <input className="input" type="email" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} />
                </div>
                <div className="toggle-row">
                  <div className="toggle-info">
                    <div className="t-lbl">New order placed</div>
                    <div className="t-sub">Email when a buyer completes a purchase</div>
                  </div>
                  <Toggle on={notifyOrder} onToggle={() => setNotifyOrder(v => !v)} />
                </div>
                <div className="toggle-row">
                  <div className="toggle-info">
                    <div className="t-lbl">Listing approval needed</div>
                    <div className="t-sub">Email when a new listing is submitted for review</div>
                  </div>
                  <Toggle on={notifyApproval} onToggle={() => setNotifyApproval(v => !v)} />
                </div>
                <div className="toggle-row">
                  <div className="toggle-info">
                    <div className="t-lbl">Dispute opened</div>
                    <div className="t-sub">Email when a buyer or seller opens a dispute</div>
                  </div>
                  <Toggle on={notifyDispute} onToggle={() => setNotifyDispute(v => !v)} />
                </div>
                <div className="toggle-row">
                  <div className="toggle-info">
                    <div className="t-lbl">Payout processed</div>
                    <div className="t-sub">Email confirmation when a seller payout is sent</div>
                  </div>
                  <Toggle on={notifyPayout} onToggle={() => setNotifyPayout(v => !v)} />
                </div>
              </div>
              <div className="s-foot">
                <button className="btn btn-ghost">Cancel</button>
                <button className="btn" onClick={handleSave}>Save Changes</button>
              </div>
            </div>
          )}

          {/* ── SECURITY ── */}
          {activeNav === 3 && (
            <div className="s-section">
              <div className="s-sec-hd">Security Settings</div>
              <div className="s-sec-body">
                <div className="toggle-row">
                  <div className="toggle-info">
                    <div className="t-lbl">Require 2FA for admins</div>
                    <div className="t-sub">All admin accounts must use two-factor authentication</div>
                  </div>
                  <Toggle on={require2FA} onToggle={() => setRequire2FA(v => !v)} />
                </div>
                <div className="toggle-row">
                  <div className="toggle-info">
                    <div className="t-lbl">Enable rate limiting</div>
                    <div className="t-sub">Limit API and login attempts to prevent abuse</div>
                  </div>
                  <Toggle on={rateLimit} onToggle={() => setRateLimit(v => !v)} />
                </div>
                <div className="field">
                  <label>Session Timeout (minutes)</label>
                  <input className="input" type="number" value={sessionMins} onChange={e => setSessionMins(e.target.value)} style={{ width: '120px' }} />
                </div>
                <div className="field">
                  <label>IP Whitelist (admin panel)</label>
                  <textarea
                    className="input"
                    placeholder="One IP per line, e.g. 192.168.1.1"
                    value={ipWhitelist}
                    onChange={e => setIpWhitelist(e.target.value)}
                  />
                </div>
              </div>
              <div className="s-foot">
                <button className="btn btn-ghost">Cancel</button>
                <button className="btn" onClick={handleSave}>Save Changes</button>
              </div>
            </div>
          )}

          {/* ── APPEARANCE ── */}
          {activeNav === 4 && (
            <div className="s-section">
              <div className="s-sec-hd">Appearance</div>
              <div className="s-sec-body">
                <div className="field">
                  <label>Accent Color</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '4px' }}>
                    <input
                      type="color"
                      value={accentColor}
                      onChange={e => setAccentColor(e.target.value)}
                      style={{ width: '36px', height: '36px', borderRadius: '5px', border: '1px solid var(--border)', background: 'none', cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '12px', color: 'var(--muted)', fontFamily: 'monospace' }}>{accentColor}</span>
                  </div>
                </div>
                <div className="toggle-row">
                  <div className="toggle-info">
                    <div className="t-lbl">Compact mode</div>
                    <div className="t-sub">Reduce padding and font sizes across the admin panel</div>
                  </div>
                  <Toggle on={compactMode} onToggle={() => setCompactMode(v => !v)} />
                </div>
                <div className="toggle-row">
                  <div className="toggle-info">
                    <div className="t-lbl">Show seller ratings</div>
                    <div className="t-sub">Display ratings on seller profiles and listings</div>
                  </div>
                  <Toggle on={showRatings} onToggle={() => setShowRatings(v => !v)} />
                </div>
              </div>
              <div className="s-foot">
                <button className="btn btn-ghost">Cancel</button>
                <button className="btn" onClick={handleSave}>Save Changes</button>
              </div>
            </div>
          )}

          {/* ── API ── */}
          {activeNav === 5 && (
            <div className="s-section">
              <div className="s-sec-hd">API Access</div>
              <div className="s-sec-body">
                <div className="field">
                  <label>API Key</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input
                      className="input"
                      type={showKey ? 'text' : 'password'}
                      value={apiKey}
                      readOnly
                      style={{ flex: 1, fontFamily: 'monospace', fontSize: '11px' }}
                    />
                    <button className="btn btn-ghost" style={{ whiteSpace: 'nowrap' }} onClick={() => setShowKey(v => !v)}>
                      {showKey ? 'Hide' : 'Show'}
                    </button>
                    <button className="btn" onClick={handleRegenKey}>Regenerate</button>
                  </div>
                </div>
                <div className="field">
                  <label>Webhook URL</label>
                  <input
                    className="input"
                    type="url"
                    placeholder="https://your-site.com/webhook"
                    value={webhookUrl}
                    onChange={e => setWebhookUrl(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Rate Limit (requests / minute)</label>
                  <input
                    className="input"
                    type="number"
                    value={ratePerMin}
                    onChange={e => setRatePerMin(e.target.value)}
                    style={{ width: '120px' }}
                  />
                </div>
              </div>
              <div className="s-foot">
                <button className="btn btn-ghost">Cancel</button>
                <button className="btn" onClick={handleSave}>Save Changes</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
