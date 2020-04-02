const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;

var ObjectID = require('mongodb').ObjectID

async function insert(driver) {

  const client = await MongoClient.connect(url, { useUnifiedTopology: true })
    .catch(err => { return undefined; });

  if (!client) { return undefined; }

  try {

    const db = client.db(dbName);
    let collection = db.collection('drivers');
    let query = driver;
    let res = (await collection.insertOne(query)).insertedId;
    return res;
  }
  catch (err) {
    return undefined;
  }
  finally { client.close(); }
}

async function update(id, document) {

  const client = await MongoClient.connect(url, { useUnifiedTopology: true })
    .catch(err => { return undefined; });

  if (!client) { return undefined; }

  try {

    const db = client.db(dbName);
    let collection = db.collection('drivers');
    let res = await collection.findOneAndUpdate({ _id: ObjectID(id) }, { $set: document }, { upsert: true });
    return res;
  }
  catch (err) { return undefined; }
  finally { client.close(); }
}

async function find(params) {

  const client = await MongoClient.connect(url, { useUnifiedTopology: true })
    .catch(err => { console.log(err); });

  if (!client) { return; }

  try {

    const db = client.db(dbName);
    let collection = db.collection('drivers');
    let res = await collection.find(params).toArray();
    return res;
  }
  catch (err) { console.log(err); }
  finally { client.close(); }
}


module.exports = { insert, update, find };
