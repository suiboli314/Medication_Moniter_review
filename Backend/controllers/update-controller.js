// refill order for patients
const queryControllers = require("./query-controllers")
const mongoUtil = require("../mongoUtil")
const DUMMY_MEDICATION = queryControllers.DUMMY_MEDICATION

const prescriptionOrder = (req, res) => {
    // Want to take in id or name, and quantity required
    const { type, value, quantity } = req.body
    const database = mongoUtil.getDB()

    let medication
    // Need to figure out what if type == name (use else statement)
    if (type === "id") {
        // update stock quantity
        medication = DUMMY_MEDICATION.find((x) => x.id === value)
        if (quantity > medication.stock) {
            console.log("Not enough medication in stock!")
        } else {
            medication.stock = medication.stock - quantity
        }
        //medication.stock = medication.stock - quantity
    }
    res.json({ medication: medication })
}

exports.prescriptionOrder = prescriptionOrder
