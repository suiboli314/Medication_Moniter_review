//Yao Zhong

const express = require("express");
const bodyParser = require("body-parser");
const mongoUtil = require("./mongoUtil");

const app = express();
const port = 3000;

//importing the different routes
const queryRoutes = require("./routes/query-routes");
const monitorRoutes = require("./routes/monitor-routes");
const refillRoutes = require("./routes/refill-routes");
const restockRoutes = require("./routes/restock-routes");

//connect to the database when the project starts
mongoUtil.connectToClient();

// with help of body parser, we can use req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("./public"));

app.use("/query", queryRoutes);

app.use("/monitor", monitorRoutes);

app.use("/refill", refillRoutes);

app.use("/restock", restockRoutes);

app.use(express.static("./public"));

app.listen(port, () => {
  console.log(`Server runing at port ${port}`);
});
