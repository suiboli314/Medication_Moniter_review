const express = require("express")
const bodyParser = require("body-parser")
const { MongoClient } = require("mongodb")

const app = express()
const port = 3000
const uri =
    "mongodb+srv://<username>:<password>@cluster0.2b2dd.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri)

const queryRoutes = require("./routes/query-routes")
const monitorRoutes = require("./routes/monitor-routes")
const refillRoutes = require("./routes/refill-routes")
const restockRoutes = require("./routes/restock-routes")

// with help of body parser, we can use req.body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("Hello medication muamua!")
})

app.use("/query", queryRoutes)

app.use("/monitor", monitorRoutes)

app.use("/refill", refillRoutes)

app.use("/restock", restockRoutes)

app.listen(port, () => {
    console.log(`Server runing at port ${port}`)
})
