require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')

const { insert, find } = require('./mongodb');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

//ping().catch(console.dir);

// POST
app.post('/api/shorturl', async(req, res) => {
  var err = { error: 'invalid url' };
  const url_query = req.body.url;

  if (!url_query) {
    res.json(err);
  }

  try {
    const result = await insert(url_query);
    console.log(result);

    if (result.response != 0) {
      res.json({ original_url: url_query, short_url: result.response })
    } else {
      res.json(err);
    }
  } catch(err) {
    res.json({ error: err.message });
  }
});

// GET
app.get('/api/shorturl/:code', async(req, res) => {
  const code_query = req.params.code;
  console.log(code_query);

  try {
    const result = await find(Number(code_query));
    console.log(result);
    if (result.domain != 0) {
      res.redirect(result.domain);
    } else {
      res.json({ error: 'No short URL found for the given input' })
    }
  } catch(err) {
    res.json({ error: err.message })
  }
});


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});