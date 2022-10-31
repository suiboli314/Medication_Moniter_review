const mongoUtil = require("../mongoUtil");

let isLoggedIn = false;

const authenticateUser = async (req, res) => {
  const { username, password } = req.body;
  const database = mongoUtil.getDB();

  // query inside users collection
  let user;
  try {
    user = await database.collection("users").findOne({ username: username });
  } catch (err) {
    res.status(500).send({ msg: err });
  }

  let message;
  if (!user || user.password !== password) {
    isLoggedIn = false;
    message = "Wrong credentials, please check your username or password!";
  } else {
    isLoggedIn = true;
    message = "Login Success!";
  }

  res.json({ isLoggedIn: isLoggedIn, message: message });
};

const loginStatus = (req, res) => {
  res.json({ isLoggedIn: isLoggedIn });
};

exports.authenticateUser = authenticateUser;
exports.loginStatus = loginStatus;
