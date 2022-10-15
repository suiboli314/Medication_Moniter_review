// refill order for patients
// const queryControllers = require("./query-controllers")
const mongoUtil = require("../mongoUtil")

const prescriptionOrder = async (req, res) => {
    // Want to take in id or name, and quantity required
    const { type, value, quantity } = req.body
    const database = mongoUtil.getDB()
    let query

    if (type === "id") {
        query = { id: value }
    } else {
        query = { name: value }
    }

    const medications = await database.collection("medications")
    let medication = await medications.findOne(query)

    // check if medication exists
    if (!medication) {
        console.log("Can't find medication in database")
    } else if (quantity > medication.stock) {
        console.log("Not enough medication in stock!")
    } else {
        const update = {
            $inc: {
                stock: -1 * quantity,
            },
        }
        await medications.updateOne(query, update)
        medication = await medications.findOne(query)
    }
    res.json({ medication: medication })
}

exports.prescriptionOrder = prescriptionOrder
