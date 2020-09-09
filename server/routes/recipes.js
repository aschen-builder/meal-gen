const { MongoClient } = require('mongodb');
const config = require('../config');
const express = require('express');

const router = express.Router();

const col = 'japanese';

router.get('/', async (req, res) => {
  const { uri, db } = config;
  const mongo = new MongoClient(uri);

  await mongo.connect();
  
  const data = await mongo.db(db).collection(col).find({}).toArray();

  console.log(data);
  console.log('Successfully retrieved data');

  await mongo.close();

  res.send(data);
});

module.exports = router;