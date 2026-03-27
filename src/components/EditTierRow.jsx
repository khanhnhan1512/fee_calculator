import { useState } from 'react'

const inputStyle = {
  background: 'rgba(255,255,255,0.85)',
  border: '1px solid rgba(5,180,201,0.4)',
  borderRadius: '6px',
  padding: '6px 10px',
  color: '#333333',
  width: '100%',
  fontSize: '13px',
  outline: 'none',
}

export default function EditTierRow({ tier, onSave, onCancel }) {
  const [bound, setBound] = useState(tier.revenueUpperBound)
  const [fee, setFee] = useState(tier.fee)

  const handleSave = () => {
    if (!bound || !fee) return
    onSave(tier.id, { revenueUpperBound: Number(bound), fee: Number(fee) })
  }

  return (
    <tr style={{ background: 'rgba(5,180,201,0.06)', borderTop: '1px solid rgba(5,180,201,0.12)' }}>
      <td className="px-4 py-2">
        <input
          type="number"
          value={bound}
          onChange={e => setBound(e.target.value)}
          style={inputStyle}
          min="0"
        />
      </td>
      <td className="px-4 py-2">
        <input
          type="number"
          value={fee}
          onChange={e => setFee(e.target.value)}
          style={inputStyle}
          min="0"
        />
      </td>
      <td className="px-4 py-2">
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="px-3 py-1 rounded text-xs font-semibold text-white transition hover:opacity-90"
            style={{ background: '#1A322F' }}
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="px-3 py-1 rounded text-xs font-semibold transition hover:opacity-80"
            style={{
              background: 'transparent',
              border: '1px solid rgba(51,51,51,0.3)',
              color: '#333333',
            }}
          >
            Cancel
          </button>
        </div>
      </td>
    </tr>
  )
}
