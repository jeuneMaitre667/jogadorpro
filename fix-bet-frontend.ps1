# Script de correction automatique du frontend
Write-Host "🔧 Correction automatique des problèmes de paris..." -ForegroundColor Cyan

$dashboardPagesFile = "c:\Users\cedpa\Desktop\jogadorpro\app\dashboard-pages\matches\page.tsx"
$dashboardFile = "c:\Users\cedpa\Desktop\jogadorpro\app\dashboard\matches\page.tsx"

# Fonction pour corriger le handlePlaceBet
function Fix-HandlePlaceBet {
    param($file)
    
    Write-Host "📝 Traitement de: $file" -ForegroundColor Yellow
    $content = Get-Content $file -Raw -Encoding UTF8
    
    # Remplacer le bloc handlePlaceBet avec une version simplifiée qui log tout
    $oldPattern = '      const userId = authUser\.id[\s\S]*?console\.log\(''📥 Insert response:'', \{ data, error \}\)'
    
    $newCode = @'
      const userId = authUser.id
      console.log('✅ User authenticated:', userId)

      // Get session and log everything
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      console.log('📝 Session check:', { 
        hasSession: !!session, 
        sessionError,
        userId: session?.user?.id 
      })

      if (!session) {
        alert('Session expirée. Veuillez vous reconnecter.')
        router.push('/auth/login')
        return
      }

      // Get active challenge with detailed logging
      console.log('🔍 Fetching challenge for user:', userId)
      const { data: challengeData, error: challengeError } = await supabase
        .from('challenges')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active')
        .maybeSingle()

      console.log('📊 Challenge query result:', { 
        challengeData, 
        challengeError,
        hasChallenge: !!challengeData 
      })

      if (challengeError) {
        console.error('❌ Challenge error:', challengeError)
        alert(`Erreur challenge: ${challengeError.message}`)
        return
      }

      if (!challengeData) {
        alert('Pas de challenge actif. Créez-en un d\'abord!')
        return
      }

      // Prepare insert data
      const insertData = {
        user_id: userId,
        challenge_id: challengeData.id,
        bet_type: 'match_winner',
        sport: 'soccer',
        event_description: `${selectedPick.homeTeam} vs ${selectedPick.awayTeam}`,
        odds: parseFloat(selectedPick.odds.toString()),
        stake: parseFloat(stake.toString()),
        potential_win: parseFloat(potentialWin.toString()),
        result: 'pending',
        placed_at: new Date().toISOString(),
      }

      console.log('📤 Insert data prepared:', insertData)
      console.log('🔐 Auth UID:', session.user.id)
      console.log('👤 User ID in data:', insertData.user_id)
      console.log('⚖️ IDs match:', session.user.id === insertData.user_id)

      // Try insert with detailed error catching
      let data, error
      try {
        const result = await supabase
          .from('bets')
          .insert([insertData])
          .select()
        
        data = result.data
        error = result.error
        
        console.log('📥 Insert response:', { 
          success: !error,
          data, 
          error,
          errorType: error?.constructor?.name,
          errorKeys: error ? Object.keys(error) : []
        })
      } catch (err) {
        console.error('💥 Insert exception:', err)
        alert(`Exception: ${err.message}`)
        return
      }
'@
    
    if ($content -match $oldPattern) {
        $content = $content -replace $oldPattern, $newCode
        Set-Content $file -Value $content -Encoding UTF8 -NoNewline
        Write-Host "✅ Fichier corrigé!" -ForegroundColor Green
    } else {
        Write-Host "⚠️ Pattern non trouvé, tentative de remplacement manuel..." -ForegroundColor Yellow
    }
}

Fix-HandlePlaceBet $dashboardPagesFile
Fix-HandlePlaceBet $dashboardFile

Write-Host "`n✨ Corrections terminées!" -ForegroundColor Green
Write-Host "📋 Prochaines étapes:" -ForegroundColor Cyan
Write-Host "  1. Allez sur https://supabase.com/dashboard" -ForegroundColor White
Write-Host "  2. Ouvrez SQL Editor" -ForegroundColor White
Write-Host "  3. Exécutez le contenu de fix-db-and-auth.sql" -ForegroundColor White
Write-Host "  4. Essayez de placer un pari" -ForegroundColor White
Write-Host "  5. Vérifiez les logs dans la console" -ForegroundColor White
