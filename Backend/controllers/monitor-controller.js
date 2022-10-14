const queryControllers = require("./query-controllers")
const mongoUtil = require("../mongoUtil")

const getLowStock = async (req, res) => {
    const database = mongoUtil.getDB()
    const query = { stock: { $lt: 5 } }
    const lowStock = await database
        .collection("medications")
        .find(query)
        .toArray()
    res.json({ lowStock: lowStock })
}

exports.getLowStock = getLowStock
