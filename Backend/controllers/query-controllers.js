const mongoUtil = require("../mongoUtil")

let lastQuery

const queryMedication = async (req, res) => {
    const type = req.querytype
    const value = req.query.value
    const database = mongoUtil.getDB()
    let query
    if (type === "id") {
        query = { id: value }
    } else {
        query = { name: value }
    }

    const medication = await database.collection("medications").findOne(query)

    lastQuery = medication

    res.redirect("/")
}

const getLastQuery = (req, res) => {
    console.log(lastQuery)
    res.json({ lastQuery: lastQuery })
}

exports.queryMedication = queryMedication
exports.getLastQuery = getLastQuery
