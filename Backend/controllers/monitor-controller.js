const queryControllers = require("./query-controllers")
const DUMMY_MEDICATION = queryControllers.DUMMY_MEDICATION

const getLowStock = (req, res) => {
    const lowStock = DUMMY_MEDICATION.filter((e) => e.stock < 5)
    res.json({ lowStock: lowStock })
}

exports.getLowStock = getLowStock
