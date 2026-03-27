import { useState, useEffect } from 'react'
import BusinessTypeSelector from './components/BusinessTypeSelector'
import FeeCalculator from './components/FeeCalculator'
import FeeTierTable from './components/FeeTierTable'
import AddTierForm from './components/AddTierForm'
import { fetchTiers, addTier, updateTier, deleteTier, seedIfEmpty } from './services/feeTierService'
import './index.css'

// Pure calculation function — no side effects
function calculateFee(tiers, revenue, isSaaS) {
  if (!tiers || tiers.length === 0) return null

  // Sort ascending by revenueUpperBound (defensive — Firestore already orderBy)
  const sorted = [...tiers].sort((a, b) => a.revenueUpperBound - b.revenueUpperBound)

  // Find first tier where upper bound >= revenue (inclusive)
  let matched = sorted.find(t => t.revenueUpperBound >= revenue)

  // Fallback: use highest tier if revenue exceeds all bounds
  if (!matched) matched = sorted[sorted.length - 1]

  const baseFee = matched.fee
  return isSaaS ? baseFee + 1000 : baseFee
}

export default function App() {
  const [tiers, setTiers]             = useState([])
  const [isSaaS, setIsSaaS]           = useState(false)
  const [revenue, setRevenue]         = useState('')
  const [result, setResult]           = useState(null)
  const [editingId, setEditingId]     = useState(null)
  const [loading, setLoading]         = useState(true)
  const [calculating, setCalculating] = useState(false)
  const [error, setError]             = useState(null)

  useEffect(() => {
    async function init() {
      try {
        await seedIfEmpty()
        const data = await fetchTiers()
        setTiers(data)
      } catch (err) {
        console.error('Failed to load tiers:', err)
        setError('Failed to connect to database. Check your Firebase configuration.')
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [])

  async function handleCalculate() {
    const rev = Number(revenue)
    if (!rev || rev <= 0) {
      alert('Please enter a valid positive revenue amount.')
      return
    }
    setCalculating(true)
    try {
      const latestTiers = await fetchTiers()
      setTiers(latestTiers)

      const fee = calculateFee(latestTiers, rev, isSaaS)
      if (fee === null) {
        alert('No fee tiers available. Please add at least one tier first.')
        return
      }
      setResult(fee)
    } catch (err) {
      console.error('Calculation failed:', err)
      alert('Failed to fetch tiers. Check your internet connection.')
    } finally {
      setCalculating(false)
    }
  }

  async function handleAddTier(newTier) {
    try {
      await addTier(newTier)
      setTiers(await fetchTiers())
    } catch (err) {
      console.error('Failed to add tier:', err)
      alert('Failed to add tier. Please try again.')
    }
  }

  async function handleSaveTier(id, changes) {
    try {
      await updateTier(id, changes)
      setEditingId(null)
      setTiers(await fetchTiers())
    } catch (err) {
      console.error('Failed to update tier:', err)
      alert('Failed to save changes. Please try again.')
    }
  }

  async function handleDeleteTier(id) {
    try {
      await deleteTier(id)
      setTiers(await fetchTiers())
    } catch (err) {
      console.error('Failed to delete tier:', err)
      alert('Failed to delete tier. Please try again.')
    }
  }

  return (
    <div
      className="min-h-screen w-full flex items-start justify-center p-6"
      style={{
        background: 'linear-gradient(135deg, #05B4C9 0%, #0e9aaa 40%, #1A322F 100%)',
      }}
    >
      {/* Decorative blurred blobs for depth */}
      <div
        style={{
          position: 'fixed',
          top: '-80px',
          left: '-80px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(5,180,201,0.25)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'fixed',
          bottom: '-100px',
          right: '-60px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'rgba(26,50,47,0.35)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Main Glass Card */}
      <div
        className="w-full max-w-2xl rounded-2xl p-8 mt-10 mb-10 relative"
        style={{
          background: 'rgba(255,255,255,0.82)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.55)',
          boxShadow: '0 10px 50px rgba(26,50,47,0.22), 0 2px 12px rgba(5,180,201,0.10)',
          zIndex: 1,
        }}
      >
        {/* App header */}
        <div className="mb-7">
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: '#05B4C9' }}>
            Quote Fee Calculator
          </h1>
          <p className="text-sm mt-1" style={{ color: '#666666' }}>
            Estimate advisory fees based on company revenue
          </p>
        </div>

        {/* Error banner */}
        {error && (
          <div
            className="mb-5 p-3 rounded-lg text-sm font-medium"
            style={{
              background: 'rgba(220,53,69,0.08)',
              border: '1px solid rgba(220,53,69,0.3)',
              color: '#c0392b',
            }}
          >
            ⚠ {error}
          </div>
        )}

        {/* Section 1: Business Type Qualifier */}
        <BusinessTypeSelector
          isSaaS={isSaaS}
          onChange={val => {
            setIsSaaS(val)
            setResult(null)
          }}
        />

        {/* Section 2: Fee Calculator */}
        <FeeCalculator
          revenue={revenue}
          onRevenueChange={val => {
            setRevenue(val)
            setResult(null)
          }}
          result={result}
          onCalculate={handleCalculate}
          calculating={calculating}
        />

        {/* Divider */}
        <div className="my-8" style={{ borderTop: '1px solid rgba(5,180,201,0.2)' }} />

        {/* Section 3: Fee Tier Management */}
        <div>
          <h2 className="text-xl font-bold mb-1" style={{ color: '#05B4C9' }}>
            Fee Tier Management
          </h2>
          <p className="text-xs mb-5" style={{ color: '#888888' }}>
            Sorted by Revenue Upper Bound. The first tier ≥ company revenue is applied.
            {isSaaS && (
              <span style={{ color: '#05B4C9', fontWeight: 600 }}> +$1,000 SaaS surcharge active.</span>
            )}
          </p>

          {loading ? (
            <div className="flex items-center gap-3 py-6 justify-center">
              <div
                className="w-5 h-5 rounded-full border-2 animate-spin"
                style={{ borderColor: '#05B4C9', borderTopColor: 'transparent' }}
              />
              <span className="text-sm" style={{ color: '#666' }}>
                Loading tiers from database...
              </span>
            </div>
          ) : (
            <>
              <FeeTierTable
                tiers={tiers}
                editingId={editingId}
                onEdit={setEditingId}
                onSave={handleSaveTier}
                onDelete={handleDeleteTier}
              />
              <AddTierForm onAdd={handleAddTier} />
            </>
          )}
        </div>

        {/* Footer note */}
        <p className="text-xs mt-8 text-center" style={{ color: '#aaaaaa' }}>
          All data is stored in Firebase Firestore and persists between sessions.
        </p>
      </div>
    </div>
  )
}
