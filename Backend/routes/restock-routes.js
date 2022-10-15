const express = require("express")

const restockControllers = require("../controllers/update-controller")

const router = express.Router()

router.post("/", restockControllers.restockOrder)

module.exports = router
