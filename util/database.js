const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoClient = (callback) => {
  MongoClient.connect(
    "mongodb+srv://Karan17:IsvA60d83FRRAolG@cluster0.nnioy.mongodb.net/test?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connected!!!");
      callback(client);
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = mongoClient;
