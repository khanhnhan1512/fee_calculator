export default function BusinessTypeSelector({ isSaaS, onChange }) {
  return (
    <div
      className="mb-6 p-4 rounded-xl"
      style={{
        background: 'rgba(5,180,201,0.07)',
        border: '1px solid rgba(5,180,201,0.25)',
      }}
    >
      <p className="font-semibold mb-3 text-sm" style={{ color: '#333333' }}>
        Is this company a SaaS business?
      </p>
      <div className="flex gap-6">
        {['Yes', 'No'].map(opt => (
          <label
            key={opt}
            className="flex items-center gap-2 cursor-pointer text-sm select-none"
            style={{ color: '#333333' }}
          >
            <input
              type="radio"
              name="isSaaS"
              value={opt}
              checked={isSaaS === (opt === 'Yes')}
              onChange={() => onChange(opt === 'Yes')}
              className="w-4 h-4 cursor-pointer"
              style={{ accentColor: '#1A322F' }}
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  )
}
