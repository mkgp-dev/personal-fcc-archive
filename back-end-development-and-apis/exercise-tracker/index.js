const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser');
const { init, call } = require('./mongodb');
const { ObjectId } = require('mongodb');

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// Date
const dateString = (d) => new Date(d).toDateString();

// Create User
app.post('/api/users', async(req, res, next) => {
  const db = call();
  const username = req.body.username;
  if (!username) {
    return res.json({ error: 'Username is required.' });
  }

  try {
    const { insertedId } = await db.collection('users').insertOne({ username });
    res.json({ username, _id: insertedId });
  } catch(err) {
    console.error('Error:', err.message);

    // avoid duplication
    if (err.code === 11000) {
      const user_exist = await db.collection('users').findOne({ username }, { projection: { username: 1 } })
      return res.json({ username: user_exist.username, _id: user_exist._id })
    }

    next(err);
  }
});

// Retrieve Users
app.get('/api/users', async(req, res, next) => {
  const db = call();

  try {
    const users = await db.collection('users').find({}, { projection: { username: 1 } }).toArray();
    res.json(users);
  } catch (err) {
    console.error('Error:', err.message);
    next(err);
  }
});

// Add Exercise
app.post('/api/users/:id/exercises', async(req, res, next) => {
  const db = call();
  const id = req.params.id;
  if (!id) {
    return res.json({ error: 'ID is required.' });
  }

  try {
    const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
    if (!user) {
      return res.json({ error: 'User not found.' });
    }

    // fields
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const _date = req.body.date;

    // basic restrictions
    if (!description) {
      return res.json({ error: 'Description is required.' });
    }

    if (duration <= 0) {
      return res.json({ error: 'Duration should not be equal or less than to 0.' });
    }

    const date = new Date(_date);
    if (isNaN(date.getTime())) {
      return res.json({ error: 'Invalid Date.' });
    }

    await db.collection('exercises').insertOne({
      userId: user._id,
      description,
      duration,
      date
    });

    res.json({
      _id: user._id,
      username: user.username,
      date: dateString(date),
      duration,
      description
    });
  } catch(err) {
    console.error('Error:', err.message);
    next(err);
  }
});

// Check logs
app.get('/api/users/:id/logs', async(req, res, next) => {
  const db = call();
  const { from, to, limit } = req.query;
  const id = req.params.id;
  if (!id) {
    return res.json({ error: 'ID is required.' });
  }

  try {
    const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
    if (!user) {
      return res.json({ error: 'User not found.' });
    }

    const uid = { userId: user._id };
    const filter = {};
    
    if (from) {
      const d = new Date(from);
      if (!isNaN(d)){
        filter.$gte = new Date(d.setHours(0, 0, 0, 0));
      }
    }

    if (to) {
      const d = new Date(to);
      if (!isNaN(d)) {
        filter.$lte = new Date(d.setHours(23, 59, 59, 999));
      }
    }

    if (Object.keys(filter).length) {
      uid.date = filter;
    }

    const lim = limit ? Math.max(0, parseInt(limit, 10)) : 0;

    const base = db.collection('exercises')
      .find(uid, { projection: { description: 1, duration: 1, date: 1 } })
      .sort({ date: 1, _id: 1 })

    const b = lim ? await base.limit(lim).toArray() : await base.toArray();

    const log = b.map((i) => ({
      description: i.description,
      duration: i.duration,
      date: dateString(i.date)
    }));
    
    res.json({
      _id: user._id,
      username: user.username,
      count: b.length,
      log
    });
  } catch(err) {
    console.error('Error:', err.message);
    next(err);
  }
})

// Initialize Mongodb
init()
  .then(() => app.listen(process.env.PORT || 3000, () => console.log(`Running on default.`)))
  .catch((err) => {
    console.error('Error:', err.message);
  });
