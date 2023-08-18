# Utiliser une image de base Node.js
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app/front

# Copier package.json et package-lock.json
COPY front/package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code client
COPY front/ .


# Démarrer le serveur client en utilisant Vite

CMD ["npm", "run", "dev"]
# Exposer le port du client
EXPOSE 8080
