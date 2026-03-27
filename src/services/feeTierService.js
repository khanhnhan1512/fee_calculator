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
  { revenue_upper_bound: 1000000,  fee: 3900 },
  { revenue_upper_bound: 2000000,  fee: 4500 },
  { revenue_upper_bound: 3000000,  fee: 4900 },
  { revenue_upper_bound: 5000000,  fee: 5500 },
  { revenue_upper_bound: 7000000,  fee: 5900 },
  { revenue_upper_bound: 10000000, fee: 6000 },
  { revenue_upper_bound: 15000000, fee: 6500 },
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
