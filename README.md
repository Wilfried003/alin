# Playwright Tests pour AL-IN

Projet Playwright pour tester le site [al-in.fr](https://al-in.fr) avec enregistrement vidéo.

## 📋 Table des matières

- [Installation rapide](#installation-rapide)
- [Scripts disponibles](#scripts-disponibles)
- [Structure du projet](#structure-du-projet)
- [Tests inclus](#tests-inclus)
- [Vidéos et Rapports](#vidéos-et-rapports)

## 🚀 Installation rapide

```bash
npm install
```

## 📝 Scripts disponibles

```bash
npm test                # Lancer tous les tests
npm run test:ui        # Mode interface visuelle (plus facile)
npm run test:headed    # Voir les navigateurs
npm run test:debug     # Mode debug
npm run report         # Voir le rapport HTML avec vidéos
``` 

## ⏲️ Exécution automatique toutes les 1 minute

- Utilisation : `chmod +x run-tests-cron.sh` (Linux/macOS)
- Lancer : `./run-tests-cron.sh`
- Le script exécute `npm test` toutes les 60 secondes


## 📁 Structure du projet

```
alin/
├── tests/
│   └── al-in.spec.ts              # Tests du site al-in
├── test-results/                  # Résultats et vidéos des tests
├── playwright-report/             # Rapport HTML
├── playwright.config.ts           # Configuration Playwright
├── package.json                   # Dépendances npm
├── tsconfig.json                  # Configuration TypeScript
├── .gitignore                     # Fichiers à ignorer
└── README.md                      # Cette documentation
```

## 🎬 Vidéos et Rapports

Les vidéos et rapports sont générés automatiquement dans:
- **Vidéos:** `./test-results/` (fichiers `.webm`)
- **Rapport HTML:** `./playwright-report/`
- **Résultats JSON:** `./test-results/`

Pour voir le rapport HTML avec vidéos intégrées:
```bash
npm run report
```

## ✅ Tests inclus

1. **should open browser and verify it works**
   - Vérifie que le navigateur fonctionne

2. **should load al-in homepage**
   - Teste le chargement de https://al-in.fr
   - Vérifie le code HTTP de réponse

3. **should verify page header**
   - Vérifie que le contenu de la page se charge

## 📊 Configuration Playwright

Le fichier `playwright.config.ts` est configuré avec:
- **Navigateur:** Chromium
- **Vidéos:** Enregistrées pour tous les tests (`video: 'on'`)
- **Screenshots:** Capturés en cas d'échec
- **Rapports:** Format HTML
- **Traces:** Enregistrées en cas d'erreur

### Activer plus de navigateurs

Modifiez `playwright.config.ts` pour ajouter Firefox et Safari:

```typescript
projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  { name: 'webkit', use: { ...devices['Desktop Safari'] } },
],
```

Puis installer les navigateurs:
```bash
npx playwright install
```

## 🔧 Comment ajouter un test

Modifiez ou créez un fichier `.spec.ts` dans le dossier `tests/`:

```typescript
import { test, expect } from '@playwright/test';

test('mon test personnalisé', async ({ page }) => {
  await page.goto('https://al-in.fr');
  const title = await page.title();
  expect(title).toBeTruthy();
});
```

## 🐛 Dépannage

### PowerShell - Erreur d'exécution
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Playwright - Navigateurs manquants
```bash
npx playwright install chromium
```

### Vider le cache et réinstaller
```bash
rm -r node_modules playwright-report test-results
npm install
```

## 📞 Support

Pour plus d'infos:
- [Documentation Playwright](https://playwright.dev)
- Site testé: [al-in.fr](https://al-in.fr)

## 📞 Support

Pour plus d'infos:
- [Documentation Playwright](https://playwright.dev)
- [Documentation Docker](https://docs.docker.com)
- Site testé: [al-in.fr](https://al-in.fr)

