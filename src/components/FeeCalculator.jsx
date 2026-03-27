export default function FeeCalculator({ revenue, onRevenueChange, result, onCalculate, calculating }) {
  return (
    <div className="mb-2">
      <h2 className="text-2xl font-bold mb-5" style={{ color: '#05B4C9' }}>
        Fee Calculator
      </h2>

      <label className="block text-sm font-medium mb-1" style={{ color: '#333333' }}>
        Company Revenue
      </label>
      <input
        type="number"
        value={revenue}
        onChange={e => onRevenueChange(e.target.value)}
        placeholder="Enter company revenue..."
        min="0"
        className="w-full rounded-lg px-4 py-3 mb-4 outline-none transition-all"
        style={{
          background: 'rgba(255,255,255,0.65)',
          border: '1px solid rgba(5,180,201,0.4)',
          color: '#333333',
          fontSize: '15px',
        }}
        onFocus={e => (e.target.style.borderColor = '#05B4C9')}
        onBlur={e => (e.target.style.borderColor = 'rgba(5,180,201,0.4)')}
      />

      <button
        onClick={onCalculate}
        disabled={calculating}
        className="w-full py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ background: '#1A322F', fontSize: '15px' }}
      >
        {calculating ? 'Calculating...' : 'Calculate Fee'}
      </button>

      {result !== null && (
        <div
          className="mt-5 p-4 rounded-xl"
          style={{
            background: 'rgba(5,180,201,0.09)',
            border: '1px solid rgba(5,180,201,0.3)',
          }}
        >
          <p className="text-base font-semibold" style={{ color: '#333333' }}>
            Estimated Fee:{' '}
            <span style={{ color: '#05B4C9', fontSize: '18px' }}>
              ${result.toLocaleString()}
            </span>
          </p>
        </div>
      )}
    </div>
  )
}
