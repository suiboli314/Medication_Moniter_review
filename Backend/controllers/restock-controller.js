// restock inventory when medication is low
// const queryControllers = require("./query-controllers")
const mongoUtil = require("../mongoUtil")

const restockOrder = async (req, res) => {
    // Want to take in id or name, and quantity required
    const { id, name, manufactor, quantity } = req.body
    const database = mongoUtil.getDB()
    const query = { id: id }
    if (!id) res.json({ medication: null })
    const medications = await database.collection("medications")
    let medication = await medications.findOne(query)
    console.log(query)
    // if medication is not in database -> insert
    if (!medication) {
        const doc = { id, name, manufactor, stock: +quantity }
        await medications.insertOne(doc)
    } else {
        const update = {
            $inc: {
                stock: +quantity,
            },
        }
        await medications.updateOne(query, update)
    }
    medication = await medications.findOne(query)
    console.log(medication)
    res.json({ medication: medication })
}

exports.restockOrder = restockOrder
