const { pgClient, mongoClient } = require('./config');

async function migrateFilms() {
  try {
    await pgClient.connect();
    await mongoClient.connect();
    const db = mongoClient.db('sakila_nosql');

    const films = await pgClient.query('SELECT * FROM film');
    const filmActors = await pgClient.query('SELECT * FROM film_actor');

    const filmActorMap = new Map();
    for (let link of filmActors.rows) {
      if (!filmActorMap.has(link.film_id)) {
        filmActorMap.set(link.film_id, []);
      }
      filmActorMap.get(link.film_id).push(link.actor_id);
    }

    const filmDocs = films.rows.map(item => ({
      film_id: item.film_id,
      title: item.title,
      description: item.description,
      release_year: item.release_year,
      language_id: item.language_id,
      rental_duration: item.rental_duration,
      rental_rate: item.rental_rate,
      length: item.length,
      replacement_cost: item.replacement_cost,
      rating: item.rating,
      special_features: item.special_features,
      actor_ids: filmActorMap.get(item.film_id) || [],
      last_update: item.last_update.toISOString(),
    }));

    const result = await db.collection('films').insertMany(filmDocs);
    console.log(`✅ ${result.insertedCount} films migrated`);
  } catch (err) {
    console.error('❌ Film migration error:', err.message);
  } finally {
    await pgClient.end();
    await mongoClient.close();
  }
}

migrateFilms();
