const { MongoClient } = require('mongodb');
const config = require('../config');
const express = require('express');

const router = express.Router();

const col = 'ingredients';

router.get('/', async (req, res) => {
  const { uri, db } = config;
  const mongo = new MongoClient(uri);

  const options = {
    sort: { name: 1 },
    projection: { _id: 0, name: 1 }
  };

  await mongo.connect();
  
  const data = await mongo.db(db).collection(col).find({}, options).toArray();

  const ings = data.map(({name}) => name);

  console.log('Successfully retrieved data');

  await mongo.close();

  res.send(ings);
});

module.exports = router;