import { supabase } from '../lib/supabase'

const TABLE = 'fee_tiers'

// Map DB row → JS object (snake_case → camelCase)
const toTier = row => ({
  id:                 row.id,
  revenueUpperBound:  row.revenue_upper_bound,
  fee:                row.fee,
})

export async function fetchTiers() {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('revenue_upper_bound', { ascending: true })

  if (error) throw error
  return data.map(toTier)
}

export async function addTier({ revenueUpperBound, fee }) {
  const { error } = await supabase
    .from(TABLE)
    .insert({ revenue_upper_bound: revenueUpperBound, fee })

  if (error) throw error
}

export async function updateTier(id, { revenueUpperBound, fee }) {
  const { error } = await supabase
    .from(TABLE)
    .update({ revenue_upper_bound: revenueUpperBound, fee })
    .eq('id', id)

  if (error) throw error
}

export async function deleteTier(id) {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq('id', id)

  if (error) throw error
}

const DEFAULT_TIERS = [
  { revenue_upper_bound: 100000,   fee: 500   },
  { revenue_upper_bound: 500000,   fee: 1000  },
  { revenue_upper_bound: 1000000,  fee: 2000  },
  { revenue_upper_bound: 5000000,  fee: 5000  },
  { revenue_upper_bound: 10000000, fee: 10000 },
]

export async function seedIfEmpty() {
  // Check with limit 1 — minimal read cost
  const { data, error } = await supabase
    .from(TABLE)
    .select('id')
    .limit(1)

  if (error) throw error

  if (!data || data.length === 0) {
    const { error: insertError } = await supabase
      .from(TABLE)
      .insert(DEFAULT_TIERS)

    if (insertError) throw insertError
  }
}
