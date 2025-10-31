let db;

function initModule(database) {
  db = database;
}

async function findAll() {
  return await db.collection('data').find({}).toArray();
}

async function findById(id) {
  return await db.collection('data').findOne({ id });
}

async function insertOne(data) {
  return await db.collection('data').insertOne(data);
}

async function updateOne(id, data) {
  return await db.collection('data').updateOne(
    { id }, 
    { $set: data }
  );
}

async function deleteOne(id) {
  return await db.collection('data').deleteOne({ id });
}

module.exports = {
  initModule,
  findAll,
  findById,
  insertOne,
  updateOne,
  deleteOne
}; 