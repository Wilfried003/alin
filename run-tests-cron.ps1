# Script PowerShell pour lancer les tests toutes les 5 minutes
# Utilisation: .\run-tests-cron.ps1

Write-Host "🚀 Démarrage du monitoring des tests al-in (chaque 5 minutes)" -ForegroundColor Green
Write-Host "===========================================================" -ForegroundColor Yellow

$testCount = 0
$passCount = 0
$failCount = 0

while ($true) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $testCount++
    
    Write-Host ""
    Write-Host "[$timestamp] Lancement du test #$testCount..." -ForegroundColor Cyan
    Write-Host "===========================================================" -ForegroundColor Yellow
    
    # Lancer les tests
    & npm test
    
    $testStatus = $LASTEXITCODE
    
    if ($testStatus -eq 0) {
        Write-Host "✅ [$timestamp] Tests réussis!" -ForegroundColor Green
        $passCount++
    }
    else {
        Write-Host "❌ [$timestamp] Tests échoués! Code d'erreur: $testStatus" -ForegroundColor Red
        $failCount++
    }
    
    Write-Host ""
    Write-Host "📊 Statistiques:"
    Write-Host "  Total: $testCount | Réussis: $passCount | Échoués: $failCount" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "⏳ Prochains tests dans 5 minutes... (Appuyez sur Ctrl+C pour arrêter)" -ForegroundColor Yellow
    Write-Host "===========================================================" -ForegroundColor Yellow
    
    # Attendre 5 minutes (300 secondes)
    Start-Sleep -Seconds 300
}
