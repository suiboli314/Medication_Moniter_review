// The mongoDB connector, Yao Zhong
// Considered the answer from: https://stackoverflow.com/questions/24621940/how-to-properly-reuse-connection-to-mongodb-across-nodejs-application-and-module

const { MongoClient } = require("mongodb");
// This allows we use the local mongoDB
const uri = process.env.URI || "mongodb://127.0.0.1:27017";

let database;

//To be called when the project starts, and the reference to the db will be stored in "database"
const connectToClient = () => {
  const client = new MongoClient(uri);
  database = client.db("Medication_Monitor");
  if (database) {
    console.log("connected");
  }
};

//Returns the database when separate pages want to do CRUD operations to the collections
const getDB = () => {
  if (!database) {
    console.log("undefiend");
  }
  return database;
};

exports.connectToClient = connectToClient;
exports.getDB = getDB;
