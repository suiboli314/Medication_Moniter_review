const mongoUtil = require("../mongoUtil");

let lastQuery;
let message;

// queryMedication function takes in the request(the query type(name or id) and query value) then stores this value in lastQuery, then redirect to the query page
//Yao Zhong
const queryMedication = async (req, res) => {
  const type = req.query.type;
  const value = req.query.value;
  const database = mongoUtil.getDB();
  let query;
  //Different query for different query type
  if (type === "id") {
    query = { id: value };
  } else {
    query = { name: value };
  }
  let medication;
  try {
    medication = await database.collection("medications").findOne(query);
  } catch (err) {
    res.status(500).send({ msg: err });
  }

  //Diffrent messages for the success found or not found
  if (medication) {
    lastQuery = medication;
    message = `We found by "${type} : ${value}" for you`;
  } else {
    lastQuery = undefined;
    message = `We are unable to find by "${type} : ${value}"`;
  }

  res.redirect("/");
};

// getLastQuery is called by the query page, and sends the result of last query, this allows user always stay at the query page.
// Yao Zhong
const getLastQuery = (req, res) => {
  res.json({ message: message, lastQuery: lastQuery });
};

exports.queryMedication = queryMedication;
exports.getLastQuery = getLastQuery;
