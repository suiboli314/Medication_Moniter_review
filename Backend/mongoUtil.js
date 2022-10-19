const { MongoClient } = require("mongodb")
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2b2dd.mongodb.net/?retryWrites=true&w=majority`
let database

const connectToClient = () => {
    const client = new MongoClient(uri)
    database = client.db("Medication_Monitor")
    if (database) {
        console.log("connected")
    }
}

const getDB = () => {
    if (!database) {
        console.log("undefiend")
    }
    return database
}

exports.connectToClient = connectToClient
exports.getDB = getDB
