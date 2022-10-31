const express = require("express");

const loginControllers = require("../controllers/login-controller");

const router = express.Router();

router.post("/", loginControllers.authenticateUser);

router.get("/", loginControllers.loginStatus);

module.exports = router;
