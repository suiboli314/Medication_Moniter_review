const mongoUtil = require("../mongoUtil")

const authenticateUser = async (req, res) => {
    const { user, password } = req.body
    console.log(req.body)
    // console.log(type, value, quantity)
    const database = mongoUtil.getDB()

    // store user input into variables
    let query
    query = { user: user }
    let userPassword
    userPassword = { password: password }

    // query inside users collection
    const users = await database.collection("users")
    let username = await users.findOne(query)

    if (!username) {
        console.log("Can't find username in database")
        res.json({
            message: "Username not in database!",
        })
        // can remove return if we put line 55 into line 54
        return
    } else if (username.password != userPassword) {
        res.json({
            message: "Username and password do not match!",
        })
    }
    // else redirect to page?
}

exports.authenticateUser = authenticateUser
