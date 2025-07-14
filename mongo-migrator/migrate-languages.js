const { pgClient, mongoClient } = require('./config');

async function migrateLanguages() {
  try {
    await pgClient.connect();
    await mongoClient.connect();
    const db = mongoClient.db('sakila_nosql');

    const res = await pgClient.query('SELECT * FROM language');
    const languages = res.rows.map(item => ({
      language_id: item.language_id,
      name: item.name,
      last_update: item.last_update.toISOString(),
    }));

    const result = await db.collection('languages').insertMany(languages);
    console.log(`✅ ${result.insertedCount} languages migrated`);
  } catch (err) {
    console.error('❌ Language migration error:', err.message);
  } finally {
    await pgClient.end();
    await mongoClient.close();
  }
}

migrateLanguages();
