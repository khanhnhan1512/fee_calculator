import EditTierRow from './EditTierRow'

export default function FeeTierTable({ tiers, editingId, onEdit, onSave, onDelete }) {
  if (tiers.length === 0) {
    return (
      <p className="mb-4 text-sm py-4 text-center" style={{ color: '#888' }}>
        No tiers yet. Add one below.
      </p>
    )
  }

  return (
    <div
      className="overflow-x-auto mb-6 rounded-xl"
      style={{ border: '1px solid rgba(5,180,201,0.2)' }}
    >
      <table className="w-full text-sm" style={{ color: '#333333', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: 'rgba(5,180,201,0.10)' }}>
            <th
              className="px-4 py-3 text-left font-semibold text-sm"
              style={{ color: '#05B4C9' }}
            >
              Revenue Upper Bound
            </th>
            <th
              className="px-4 py-3 text-left font-semibold text-sm"
              style={{ color: '#05B4C9' }}
            >
              Fee
            </th>
            <th
              className="px-4 py-3 text-left font-semibold text-sm"
              style={{ color: '#05B4C9' }}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {tiers.map(tier =>
            editingId === tier.id ? (
              <EditTierRow
                key={tier.id}
                tier={tier}
                onSave={onSave}
                onCancel={() => onEdit(null)}
              />
            ) : (
              <tr
                key={tier.id}
                style={{ borderTop: '1px solid rgba(5,180,201,0.10)' }}
                className="transition-colors hover:bg-[rgba(5,180,201,0.03)]"
              >
                <td className="px-4 py-3 font-medium">
                  ${tier.revenueUpperBound.toLocaleString()}
                </td>
                <td className="px-4 py-3">${tier.fee.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(tier.id)}
                      className="px-3 py-1 rounded text-xs font-semibold text-white transition hover:opacity-85"
                      style={{ background: '#05B4C9' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(tier.id)}
                      className="px-3 py-1 rounded text-xs font-semibold text-white transition hover:opacity-85"
                      style={{ background: '#1A322F' }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  )
}
