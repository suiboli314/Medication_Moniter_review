// restock inventory when medication is low
const queryControllers = require("./query-controllers")
const DUMMY_MEDICATION = queryControllers.DUMMY_MEDICATION

const restockOrder = (req, res) => {
    // Want to take in id or name, and quantity required
    const { type, value, quantity } = req.body

    let medication
    // Need to figure out what if type == name (use else statement)
    if (type === "id") {
        // update stock quantity
        medication = DUMMY_MEDICATION.find((x) => x.id === value)
        medication.stock = medication.stock + quantity
    }
    res.json({ medication: medication })
}

exports.restockOrder = restockOrder
