#!/bin/bash

# Script de lancement des tests toutes les 1 minute
# Utilisation: ./run-tests-cron.sh

echo "🚀 Démarrage du monitoring des tests al-in (chaque 1 minute)"
echo "=================================================="

while true; do
  TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
  echo ""
  echo "[$TIMESTAMP] Lancement des tests..."
  echo "=================================================="
  
  npm test
  
  TEST_STATUS=$?
  
  if [ $TEST_STATUS -eq 0 ]; then
    echo "✅ [$TIMESTAMP] Tests réussis!"
  else
    echo "❌ [$TIMESTAMP] Tests échoués! Code d'erreur: $TEST_STATUS"
  fi
  
  echo ""
  echo "⏳ Prochains tests dans 1 minute..."
  echo "=================================================="
  
  sleep 60  # 1 minute = 60 secondes
done
