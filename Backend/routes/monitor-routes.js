const express = require("express")

const monitorControllers = require("../controllers/monitor-controller")

const router = express.Router()

router.get("/", monitorControllers.getLowStock)

module.exports = router
