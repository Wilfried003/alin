# Utiliser une image Node officielle
FROM node:20-bullseye

# Installer les dépendances système requises par Playwright
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libappindicator1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgbm1 \
    libgcc1 \
    libglib2.0-0 \
    libgtk-3-0 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxinerama1 \
    libxrandr2 \
    libxrender1 \
    libxt6 \
    xdg-utils \
    libnss3 \
    cron \
    && rm -rf /var/lib/apt/lists/*

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers du projet
COPY . .

# Installer les dépendances npm
RUN npm install

# Installer les navigateurs Playwright
RUN npx playwright install chromium

# Rendre les scripts exécutables
RUN chmod +x run-tests-cron.sh

# Créer les répertoires pour les rapports
RUN mkdir -p /app/test-reports /app/videos

# Port pour les rapports HTML (optionnel)
EXPOSE 3000

# Commande par défaut: lancer les tests en boucle
CMD ["./run-tests-cron.sh"]
