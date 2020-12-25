const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let _db;

const mongoConnect = (callback) => {
  const uri = process.env.DATABASE_URL;
  MongoClient.connect(
    uri,
    {
      useUnifiedTopology: true,
    } //Here shop will be the database were it will connect, if it is not there it will connect when we write data in it
  )
    .then((client) => {
      console.log("Connected!!!");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  } else {
    throw "No database specified!";
  }
};
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
