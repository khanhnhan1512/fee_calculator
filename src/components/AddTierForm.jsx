import { useState } from 'react'

const inputStyle = {
  background: 'rgba(255,255,255,0.65)',
  border: '1px solid rgba(5,180,201,0.4)',
  borderRadius: '8px',
  padding: '10px 14px',
  color: '#333333',
  width: '100%',
  outline: 'none',
  fontSize: '14px',
  transition: 'border-color 0.2s',
}

export default function AddTierForm({ onAdd }) {
  const [bound, setBound] = useState('')
  const [fee, setFee] = useState('')

  const handleSubmit = () => {
    if (!bound || !fee || Number(bound) <= 0 || Number(fee) <= 0) return
    onAdd({ revenueUpperBound: Number(bound), fee: Number(fee) })
    setBound('')
    setFee('')
  }

  return (
    <div
      className="mt-2 p-4 rounded-xl"
      style={{
        background: 'rgba(5,180,201,0.05)',
        border: '1px solid rgba(5,180,201,0.18)',
      }}
    >
      <p className="text-sm font-semibold mb-3" style={{ color: '#05B4C9' }}>
        Add New Tier
      </p>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-xs font-medium mb-1" style={{ color: '#555555' }}>
            Revenue Upper Bound
          </label>
          <input
            type="number"
            value={bound}
            onChange={e => setBound(e.target.value)}
            placeholder="e.g. 1000000"
            min="0"
            style={inputStyle}
            onFocus={e => (e.target.style.borderColor = '#05B4C9')}
            onBlur={e => (e.target.style.borderColor = 'rgba(5,180,201,0.4)')}
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1" style={{ color: '#555555' }}>
            Fee ($)
          </label>
          <input
            type="number"
            value={fee}
            onChange={e => setFee(e.target.value)}
            placeholder="e.g. 2000"
            min="0"
            style={inputStyle}
            onFocus={e => (e.target.style.borderColor = '#05B4C9')}
            onBlur={e => (e.target.style.borderColor = 'rgba(5,180,201,0.4)')}
          />
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="w-full py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]"
        style={{ background: '#1A322F' }}
      >
        Add New Tier
      </button>
    </div>
  )
}
