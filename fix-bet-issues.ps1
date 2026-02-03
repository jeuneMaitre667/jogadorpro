# Script de correction automatique des problèmes de paris
Write-Host "🔧 Correction automatique des problèmes..." -ForegroundColor Cyan

$basePath = "c:\Users\cedpa\Desktop\jogadorpro"

# Fichiers à modifier
$files = @(
    "$basePath\app\dashboard-pages\matches\page.tsx",
    "$basePath\app\dashboard\matches\page.tsx"
)

foreach ($file in $files) {
    Write-Host "`n📝 Traitement de: $file" -ForegroundColor Yellow
    
    $content = Get-Content $file -Raw -Encoding UTF8
    
    # 1. Supprimer la section "Cancellation Rule" complète
    $content = $content -replace '(?s)\s*\{/\* Cancellation Rule \*/\}.*?</div>\s*(?=\{/\* Potential Win \*/\})', ''
    
    # 2. Améliorer le diagnostic d'erreur d'insertion
    $oldErrorBlock = @'
      if (error) {
        console.error('Supabase insert error full:', error)
        const errorMsg = error.message || JSON.stringify(error)
        alert(`Erreur Supabase: ${errorMsg}`)
        return
      }
'@

    $newErrorBlock = @'
      if (error) {
        console.error('❌ Supabase insert error:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
          full: error
        })
        const errorMsg = error.message || error.hint || JSON.stringify(error)
        alert(`Erreur lors du placement du pari:\n${errorMsg}\n\nVérifiez la console pour plus de détails.`)
        return
      }
'@

    $content = $content -replace [regex]::Escape($oldErrorBlock), $newErrorBlock
    
    # 3. Ajouter vérification de session auth avant insertion
    $oldAuthCheck = @'
      // Get authenticated user from Supabase auth session
      const { data: { user: authUser } } = await supabase.auth.getUser()
      const userId = authUser?.id

      if (!userId) {
        alert('Utilisateur non authentifié. Veuillez vous reconnecter.')
        router.push('/auth/login')
        return
      }

      console.log('User ID from auth:', userId)
'@

    $newAuthCheck = @'
      // Get authenticated user from Supabase auth session
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
      
      if (authError || !authUser) {
        console.error('❌ Auth error:', authError)
        alert('Session expirée. Veuillez vous reconnecter.')
        router.push('/auth/login')
        return
      }

      const userId = authUser.id
      console.log('✅ User authenticated:', userId)
'@

    $content = $content -replace [regex]::Escape($oldAuthCheck), $newAuthCheck
    
    # Sauvegarder
    Set-Content $file -Value $content -Encoding UTF8 -NoNewline
    Write-Host "✅ Fichier corrigé" -ForegroundColor Green
}

Write-Host "`n✨ Corrections terminées!" -ForegroundColor Green
Write-Host "🔄 Le serveur Next.js va recharger automatiquement..." -ForegroundColor Cyan
