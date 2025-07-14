const { pgClient, redisClient } = require('./config');

async function migrateCities() {
  try {
    await pgClient.connect();
    await redisClient.connect();

    const res = await pgClient.query('SELECT city_id, city FROM city');
    for (const row of res.rows) {
      await redisClient.set(`city:${row.city_id}`, row.city);
      console.log(`✅ city:${row.city_id} → ${row.city}`);
    }

    console.log('🏙️ City data migration completed.');
  } catch (err) {
    console.error('❌ City migration error:', err.message);
  } finally {
    await pgClient.end();
    await redisClient.disconnect();
  }
}

migrateCities();
