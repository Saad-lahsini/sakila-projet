const { pgClient, redisClient } = require('./config');

async function migrateCountries() {
  try {
    await pgClient.connect();
    await redisClient.connect();

    const res = await pgClient.query('SELECT country_id, country FROM country');
    for (const row of res.rows) {
      await redisClient.set(`country:${row.country_id}`, row.country);
      console.log(`✅ country:${row.country_id} → ${row.country}`);
    }

    console.log('🌍 Country data migration completed.');
  } catch (err) {
    console.error('❌ Country migration error:', err.message);
  } finally {
    await pgClient.end();
    await redisClient.disconnect();
  }
}

migrateCountries();
