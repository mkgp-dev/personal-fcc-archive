const { MongoClient, ServerApiVersion } = require('mongodb');
const { URL } = require('url');

const uri = "<YOUR MONGODB_URI>";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function ping() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}

// Helper
function isURLValid(u) {
  try {
    if (!u.startsWith('http://') && !u.startsWith('https://')) {
      return false;
    }

    new URL(u);
    return true;
  } catch(err) {
    console.log(err);
    return false;
  }
}

function isNumberValid(n) {
  return /^\d+$/.test(n);
}

// Definition
const dbname = 'dData';
const collectioname = 'urls'

// Once connection to database
client.connect();

// Create/Open database
const database = client.db(dbname);
const collection = database.collection(collectioname);
const counter = database.collection('counters');

// Functions
async function insert(url) {
  if (!isURLValid(url)) {
    return { response: 0 };
  }

  const session = client.startSession();
  try {
    let result;
    await session.withTransaction(async () => {
      const check_url = await collection.findOne({ url }, { projection: { short_url: 1 }, session });
      if (check_url?.short_url != null) {
        //console.log('so you existed');
        result = { response: check_url?.short_url };
        return;
      }

      // Sequence
      //console.log('not existed, going to sequence');
      const key = { db: database.databaseName, coll: collection.collectionName }
      const res = await counter.findOneAndUpdate(
        { _id: key },
        { $inc: { seq_value: 1 } },
        { upsert: true, returnDocument: "after" }
      );
      const seq = res.value?.seq_value ?? res?.seq_value;

      await collection.insertOne({ url, short_url: seq, createdAt: new Date() }, { session });

      result = { response: seq };
    });

    return result ?? { response: null };
  } catch(err) {
    console.log(err);

    if (err?.code === 11000) {
      const doc = await collection.findOne({ domain }, { projection: { short_url: 1 } });
      if (doc?.short_url != null) return { response: doc.short_url };
    }
    return { response: err }
  } finally {
    await session.endSession();
  }
}

async function find(code) {
  if (!isNumberValid(code)) {
    console.log('not valid?')
    return { domain: 0 };
  }

  const check_code = await collection.findOne({ short_url: code });
  return { domain: check_code?.url ?? 0 };
}

module.exports = { ping, insert, find };