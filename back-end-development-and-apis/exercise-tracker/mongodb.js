const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "<MONGO_URI>";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

async function init() {
  if (db) {
    return db;
  }
  
  await client.connect();
  db = client.db('dData');

  await db.collection('users').createIndex({ username: 1 }, { unique: true });
  await db.collection('exercises').createIndex({ userId: 1, date: 1 });

  return db;
}

function call() {
  if (!db) {
    throw new Error('init() function is not yet initialized.')
  }

  return db;
}

module.exports = { init, call, client };