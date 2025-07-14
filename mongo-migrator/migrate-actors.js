const { pgClient, mongoClient } = require('./config');

async function migrateActors() {
  try {
    await pgClient.connect();
    await mongoClient.connect();
    const db = mongoClient.db('sakila_nosql');

    const res = await pgClient.query('SELECT * FROM actor');
    const actors = res.rows.map(item => ({
      actor_id: item.actor_id,
      first_name: item.first_name,
      last_name: item.last_name,
      last_update: item.last_update.toISOString(),
    }));

    const result = await db.collection('actors').insertMany(actors);
    console.log(`✅ ${result.insertedCount} actors migrated`);
  } catch (err) {
    console.error('❌ Actor migration error:', err.message);
  } finally {
    await pgClient.end();
    await mongoClient.close();
  }
}

migrateActors();
