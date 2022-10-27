const express = require("express")

const loginControllers = require("../controllers/login-controller")

const router = express.Router()
// create function called prescriptionOrder
router.post("/", loginControllers.authenticateUser)

module.exports = router
