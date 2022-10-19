const express = require("express")
const cors = require('cors')
const bodyParser = require("body-parser")
const mongoUtil = require("./mongoUtil")
// const path = require("path")


const app = express()
const port = 3000

const queryRoutes = require("./routes/query-routes")
const monitorRoutes = require("./routes/monitor-routes")
const refillRoutes = require("./routes/refill-routes")
const restockRoutes = require("./routes/restock-routes")

mongoUtil.connectToClient()

// with help of body parser, we can use req.body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.get("/", (req, res) => {
//     res.send("Hello medication muamua!")
// })
app.use(express.static(path.join(__dirname, "public")))

app.use(cors({
    origin: '*'
}))

app.use("/query", queryRoutes)

app.use("/monitor", monitorRoutes)

app.use("/refill", refillRoutes)

app.use("/restock", restockRoutes)

app.use(express.static('./public'))

app.listen(port, () => {
    console.log(`Server runing at port ${port}`)
})
