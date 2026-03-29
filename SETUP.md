# 🚀 Guide de Démarrage - Playlist Tests AL-IN

## 📺 Résumé

Vous avez maintenant:
✅ **Enregistrement vidéo** de tous les tests  
✅ **Exécution chronométrée** (toutes les 5 minutes)  
✅ **Docker & Docker Compose** pour exécuter en tant que service  
✅ **Rapports HTML visuels** avec vidéos intégrées  

---

## 🎯 Choix rapide - Comment lancer?

### Option 1️⃣: **Lancer sur Windows (commande unique)**
```bash
.\run-tests-cron.bat
```
✅ Facile | ⏲️ Tests toutes les 5 min | 📹 Vidéos enregistrées

### Option 2️⃣: **Lancer avec PowerShell**
```powershell
powershell -ExecutionPolicy Bypass -File run-tests-cron.ps1
```
✅ Avec statistiques colorées | ⏲️ Tests toutes les 5 min

### Option 3️⃣: **Docker (recommandé)**
```bash
docker-compose up -d
```
✅ Isolé | ✅ Persistant | ✅ Logs | ✅ Scalable

---

## 📺 Voir les Vidéos et Rapports

### Après chaque exécution:

1. **Rapport HTML** (avec vidéos):
   ```bash
   npm run report
   ```

2. **Dossiers**:
   - Vidéos: `./test-results/` (fichiers `.webm`)
   - Rapports: `./playwright-report/`
   - Résultats: `./test-results/`

3. **Dans Docker**:
   ```bash
   docker exec alin-playwright-tests npx playwright show-report
   ```

---

## 🐳 Docker - Guide Complet

### Démarrage rapide
```bash
# Construire l'image une seule fois
docker build -t alin-playwright:latest .

# Lancer le container
docker-compose up -d

# Voir les logs en direct
docker logs -f alin-playwright-tests
```

### Voir les vidéos depuis Docker
```bash
# Copier les vidéos du container
docker cp alin-playwright-tests:/app/test-results ./

# Ouvrir les rapports
docker exec alin-playwright-tests npx playwright show-report
```

### Arrêter/Redémarrer
```bash
# Arrêter
docker-compose down

# Redémarrer
docker-compose restart

# Voir le statut
docker ps
```

---

## 📊 Configuration de l'Exécution Périodique

### Changer l'intervalle (5 min → autre)

#### Dans `run-tests-cron.sh` (Linux/Mac):
Ligne 25: `sleep 300` → Changez `300` (secondes)
- 300 = 5 minutes
- 600 = 10 minutes
- 60 = 1 minute

#### Dans `run-tests-cron.ps1` (Windows PowerShell):
Ligne 40: `Start-Sleep -Seconds 300` → Changez la valeur

#### Dans `run-tests-cron.bat` (Windows CMD):
Ligne 42: `timeout /t 300 /nobreak` → Changez `300`

---

## 🎥 Vérifier que les Vidéos s'Enregistrent

Les vidéos sont automatiquement capturées grâce à:
```typescript
video: 'on'  // dans playwright.config.ts
```

📂 Localisation:
- Chemin: `test-results/{navigateur}/{test}/video.webm`
- Format: WebM (compatible avec tous les navigateurs)

---

## 📈 Vérifier les Résultats

### Logs en temps réel
```bash
# Windows PowerShell
Get-Content test-results\.last-run.json

# Linux/Mac
cat test-results/.last-run.json
```

### Statistiques
- Fichier: `test-results/.last-run.json`
- Contient: statut, tests échoués, etc.

---

## 🔍 Déboguer les Vidéos Manquantes

Si les vidéos ne s'enregistrent pas:

1. **Vérifier la configuration**:
   ```bash
   grep -n "video:" playwright.config.ts
   ```
   Doit afficher: `video: 'on'`

2. **Relancer avec vidéos**:
   ```bash
   npm test
   ```

3. **Vérifier les permissions**:
   ```bash
   ls -la test-results/
   ```

---

## 💡 Astuces Pro

### 1. Combiner avec les notifications
```powershell
# Ajouter une notification quand un test échoue
# Modifiez run-tests-cron.ps1 pour ajouter:
if ($testStatus -ne 0) {
    [system.media.systemsounds]::Beep.Play() # Bip sonore
}
```

### 2. Archiver les résultats
```bash
# Créer un backup des vidéos
mkdir -p videos-backup
cp -r test-results/video-* videos-backup/
```

### 3. Visualiser les vidéos en temps réel
```bash
# Faire un stream des rapports
cd playwright-report
python -m http.server 8000
# Ouvrir: http://localhost:8000
```

---

## 🚨 Troubleshooting

| Problème | Solution |
|----------|----------|
| Vidéos vides | Vérifier `video: 'on'` dans config |
| Docker ne démarre pas | `docker-compose logs` pour voir les erreurs |
| Tests ne lancent pas | `npm install` puis `npx playwright install` |
| Permission denied (Linux) | `chmod +x run-tests-cron.sh` |
| PowerShell bloqué | `Set-ExecutionPolicy RemoteSigned` |

---

## 📞 Besoin d'aide?

- 📖 [Playlist Docs](https://playwright.dev)
- 🐳 [Docker Docs](https://docs.docker.com)
- 💬 Site testé: [al-in.fr](https://al-in.fr)

---

**Fait! 🎉 Vous pouvez maintenant lancer les tests en vidéo toutes les 5 minutes!**
