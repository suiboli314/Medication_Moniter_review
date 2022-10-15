const express = require("express")

const refillControllers = require("../controllers/refill-controller")

const router = express.Router()
// create function called prescriptionOrder
router.post("/", refillControllers.prescriptionOrder)

module.exports = router
