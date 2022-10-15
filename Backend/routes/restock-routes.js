const express = require("express")

const restockControllers = require("../controllers/restock-controller")

const router = express.Router()

router.post("/", restockControllers.restockOrder)

module.exports = router
