const { pgClient, mongoClient } = require('./config');

async function migrateCategories() {
  try {
    await pgClient.connect();
    await mongoClient.connect();
    const db = mongoClient.db('sakila_nosql');

    const res = await pgClient.query('SELECT * FROM category');
    const categories = res.rows.map(item => ({
      category_id: item.category_id,
      name: item.name,
      last_update: item.last_update.toISOString(),
    }));

    const result = await db.collection('categories').insertMany(categories);
    console.log(`✅ ${result.insertedCount} categories migrated`);
  } catch (err) {
    console.error('❌ Category migration error:', err.message);
  } finally {
    await pgClient.end();
    await mongoClient.close();
  }
}

migrateCategories();
