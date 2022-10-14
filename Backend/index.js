const express = require("express")
const bodyParser = require("body-parser")
const mongoUtil = require("./mongoUtil")

const app = express()
const port = 3000

const queryRoutes = require("./routes/query-routes")
const monitorRoutes = require("./routes/monitor-routes")

mongoUtil.connectToClient()

// with help of body parser, we can use req.body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("Hello medication muamua!")
})

app.use("/query", queryRoutes)

app.use("/monitor", monitorRoutes)

app.listen(port, () => {
    console.log(`Server runing at port ${port}`)
})
