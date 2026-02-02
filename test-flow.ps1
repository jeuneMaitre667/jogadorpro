# Test rapide du flow de connexion

Write-Host "`n🔍 TEST DE CONNEXION - JogadorPro`n" -ForegroundColor Cyan

# Test 1: Page de login accessible
Write-Host "1. Test d'accessibilité de la page login..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/auth/login" -Method GET -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "   ✅ Page login accessible (200 OK)" -ForegroundColor Green
    }
} catch {
    Write-Host "   ❌ Erreur: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: API matches accessible
Write-Host "`n2. Test de l'API matches..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/matches" -Method GET -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        $data = $response.Content | ConvertFrom-Json
        Write-Host "   ✅ API matches accessible" -ForegroundColor Green
        Write-Host "   📊 Matchs disponibles: $($data.matches.Count)" -ForegroundColor Cyan
    }
} catch {
    Write-Host "   ❌ Erreur: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Page dashboard (sans auth - devrait rediriger)
Write-Host "`n3. Test de redirection dashboard..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/dashboard-pages/dashboard" -Method GET -UseBasicParsing -MaximumRedirection 0 -ErrorAction SilentlyContinue
    Write-Host "   ℹ️  Dashboard accessible (pas de redirect automatique détecté)" -ForegroundColor Yellow
} catch {
    if ($_.Exception.Response.StatusCode -eq 301 -or $_.Exception.Response.StatusCode -eq 302) {
        Write-Host "   ✅ Redirection détectée (comportement attendu)" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  Statut: $($_.Exception.Response.StatusCode)" -ForegroundColor Yellow
    }
}

Write-Host "`n✅ Tests terminés!`n" -ForegroundColor Cyan
Write-Host "📝 Instructions pour tester manuellement:" -ForegroundColor White
Write-Host "   1. Ouvre http://localhost:3000/auth/login" -ForegroundColor Gray
Write-Host "   2. Connecte-toi avec: arma@gmail.com / armada" -ForegroundColor Gray
Write-Host "   3. Tu devrais être redirigé vers /dashboard-pages/dashboard" -ForegroundColor Gray
Write-Host "   4. Le dashboard devrait afficher les matchs en temps réel`n" -ForegroundColor Gray
