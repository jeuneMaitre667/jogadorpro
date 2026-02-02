// Script pour nettoyer les challenges démo en double
// Garde seulement le premier challenge démo par utilisateur

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function cleanupDemoChallenges() {
  try {
    console.log('🔍 Searching for duplicate demo challenges...')

    // Get all demo challenges
    const { data: demoChallenges, error } = await supabase
      .from('challenges')
      .select('id, user_id, created_at')
      .eq('tier', 'demo')
      .order('user_id', { ascending: true })
      .order('created_at', { ascending: true })

    if (error) {
      console.error('❌ Error fetching challenges:', error)
      return
    }

    console.log(`📊 Found ${demoChallenges.length} demo challenges`)

    // Group by user_id
    const byUser = {}
    demoChallenges.forEach(challenge => {
      if (!byUser[challenge.user_id]) {
        byUser[challenge.user_id] = []
      }
      byUser[challenge.user_id].push(challenge)
    })

    // Find duplicates
    let toDelete = []
    Object.entries(byUser).forEach(([userId, challenges]) => {
      if (challenges.length > 1) {
        console.log(`👤 User ${userId} has ${challenges.length} demo challenges`)
        // Keep first, delete others
        const [keep, ...duplicates] = challenges
        console.log(`  ✅ Keeping: ${keep.id} (created: ${keep.created_at})`)
        duplicates.forEach(dup => {
          console.log(`  ❌ Will delete: ${dup.id} (created: ${dup.created_at})`)
          toDelete.push(dup.id)
        })
      }
    })

    if (toDelete.length === 0) {
      console.log('✅ No duplicates found!')
      return
    }

    console.log(`\n🗑️  Deleting ${toDelete.length} duplicate challenges...`)

    const { error: deleteError } = await supabase
      .from('challenges')
      .delete()
      .in('id', toDelete)

    if (deleteError) {
      console.error('❌ Error deleting duplicates:', deleteError)
      return
    }

    console.log('✅ Cleanup completed successfully!')
  } catch (err) {
    console.error('❌ Unexpected error:', err)
  }
}

cleanupDemoChallenges()
