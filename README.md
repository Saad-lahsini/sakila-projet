````markdown
# Migration Sakila

Migration de la base de données Sakila depuis PostgreSQL vers Redis et MongoDB avec Node.js.

---

## Prérequis

Node.js installé, Docker et Docker-compose installés.

---

## Configuration

Créer un dossier et y accéder :

```bash
mkdir sakila-migration
cd sakila-migration
````

Créer un fichier `.env` avec le contenu suivant :

```env
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=postgres
PG_DATABASE=sakila

REDIS_HOST=localhost
REDIS_PORT=6379

MONGO_URI=mongodb://localhost:27017
```

Créer un fichier `docker-compose.yml` avec ce contenu :

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:13
    container_name: sakila-postgres
    environment:
      POSTGRES_DB: sakila
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - ./db:/docker-entrypoint-initdb.d

  redis:
    image: redis:7
    container_name: sakila-redis
    ports:
      - "6379:6379"

  mongodb:
    image: mongo:5
    container_name: sakila-mongo
    ports:
      - "27017:27017"
```

Démarrer les conteneurs avec :

```bash
docker-compose up -d
```

Placer les fichiers `sakila-schema.sql` et `sakila-data.sql` dans le dossier `db/` afin que PostgreSQL les charge.

---

## Installation des paquets Node.js

Depuis la racine `sakila-migration`, lancer la commande :

```bash
npm install
```

---

## Lancer la migration

### Redis

Se placer dans le dossier `redis-migrator` (ou le dossier où se trouvent les scripts Redis) :

```bash
cd redis-migrator
```

Puis exécuter les migrations une par une :

```bash
node migrate-countries.js
node migrate-cities.js
```

Ou tout lancer avec :

```bash
node run.js
```

---

### MongoDB

Se placer dans le dossier `mongo-migrator` (ou le dossier où se trouvent les scripts MongoDB) :

```bash
cd mongo-migrator
```

Puis exécuter les migrations une par une :

```bash
node migrate-languages.js
node migrate-categories.js
node migrate-actors.js
node migrate-films.js
```

Ou tout lancer avec :

```bash
node run.js
```

---

## Fichiers importants

* `.env` : configuration des connexions
* `redis-migrator/` : scripts de migration Redis
* `mongo-migrator/` : scripts de migration MongoDB
* `docker-compose.yml` : configuration des conteneurs Docker

```

