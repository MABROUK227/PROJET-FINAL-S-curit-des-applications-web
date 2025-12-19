# 🛡️ SafeNote - Application de Gestion de Notes Sécurisée

**SafeNote** est une application web Fullstack (MERN) conçue selon le principe du **"Security by Design"**.
Elle permet aux utilisateurs de stocker, gérer et consulter leurs notes personnelles dans un environnement chiffré et protégé contre les vulnérabilités web courantes (XSS, Injections NoSQL, Brute Force, etc.).

## 🚀 Fonctionnalités Clés

* 
**Authentification Forte :** Inscription et connexion sécurisées via JWT (JSON Web Tokens) et hachage de mots de passe (Bcrypt).


* 
**Chiffrement de bout en bout :** Communication Client-Serveur exclusivement via **HTTPS** (TLS/SSL).


* 
**Contrôle d'accès (RBAC) :** Distinction stricte entre les rôles `User` (accès à ses propres notes) et `Admin` (gestion des utilisateurs).


* **Protection Avancée :**
* Protection contre les attaques par force brute (Rate Limiting).


* En-têtes HTTP sécurisés (Helmet, HSTS, CSP).


* Sanitisation des entrées contre les injections NoSQL et XSS.




* **Audit de Code :** Code validé par **SonarCloud** (Note A) et **OWASP ZAP**.

## 🛠️ Stack Technique

* 
**Frontend :** React.js, React Router, Context API, Axios.


* 
**Backend :** Node.js, Express.js.


* 
**Base de Données :** MongoDB Atlas (NoSQL).


* 
**Sécurité & DevOps :** Helmet, Express-Rate-Limit, OpenSSL, SonarCloud, OWASP ZAP.



## ⚙️ Installation et Démarrage

Suivez ces instructions pour lancer le projet en local.

### 1. Prérequis

* Node.js (v14+) et npm installés.
* Un compte MongoDB Atlas (pour l'URI de connexion).
* Git.

### 2. Installation du Serveur (Backend)

```bash
# Cloner le dépôt
git clone git@github.com:MABROUK227/PROJET-FINAL-S-curit-des-applications-web.git
cd PROJET-FINAL-S-curit-des-applications-web/server

# Installer les dépendances
npm install

# Créer les certificats SSL (Indispensable pour le HTTPS)
openssl req -nodes -new -x509 -keyout server.key -out server.cert -days 365 -subj "/C=FR/ST=Paris/L=Paris/O=SafeNote/OU=Dev/CN=localhost"

```

Créez un fichier `.env` dans le dossier `server/` avec les variables suivantes:

```env
PORT=5000
MONGO_URI=votre_lien_mongodb_atlas
JWT_SECRET=votre_secret_tres_long_et_complexe
NODE_ENV=development

```

### 3. Installation du Client (Frontend)

```bash
# Dans un nouveau terminal, aller dans le dossier client
cd ../client

# Installer les dépendances
npm install

# Copier les certificats du serveur (pour que le client reconnaisse le HTTPS local)
cp ../server/server.key .
cp ../server/server.cert .

```

### 4. Lancement

Lancer le backend (Port 5000) :

```bash
# Dans le dossier server
npm run dev

```

Lancer le frontend (Port 3000) :

```bash
# Dans le dossier client
npm start

```

*Note : Lors de la première connexion, votre navigateur affichera une alerte de sécurité car le certificat est auto-signé. Vous devez accepter le risque pour accéder à `localhost`.*

## 🔒 Résultats d'Audit de Sécurité

Le projet a subi des audits rigoureux pour valider sa robustesse :

* **SonarCloud :** Note de sécurité **A** (0 vulnérabilités, 0 hotspots critiques).
* **OWASP ZAP :** Scan actif validé sur le serveur (Port 5000).
* 
**npm audit :** 0 vulnérabilités critiques dans les dépendances.



## 👥 Auteurs

Projet réalisé dans le cadre du module "Sécurité des Applications Web" par:

* **ADJAHO Mabrouk**
* **KAKPO Imhotep**
* **ATOHOUN Koffi**

---

*SafeNote © 2025 - Security by Design.*