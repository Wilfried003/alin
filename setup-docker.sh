#!/bin/bash

# Script de configuration et lancement du container Docker

set -e

echo "================================"
echo "Setup Playwright + Docker"
echo "================================"
echo ""

# Vérifier si Docker est installé
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé!"
    echo "Installez Docker depuis: https://www.docker.com/"
    exit 1
fi

echo "✅ Docker trouvé: $(docker --version)"
echo ""

# Vérifier si docker-compose est installé
if ! command -v docker-compose &> /dev/null; then
    echo "⚠️  docker-compose n'est pas trouvé (mais peut être intégré à docker)"
fi

echo ""
echo "📦 Construction de l'image Docker..."
docker build -t alin-playwright:latest .

echo ""
echo "✅ Image construite!"
echo ""
echo "🚀 Démarrage du container..."
echo ""

# Démarrer le container
docker-compose up -d

echo ""
echo "✅ Container démarré!"
echo ""
echo "📝 Commandes utiles:"
echo "  • Voir les logs: docker logs -f alin-playwright-tests"
echo "  • Arrêter: docker-compose down"
echo "  • Redémarrer: docker-compose restart"
echo "  • Voir les rapports: Vérifiez le dossier './test-results'"
echo ""
