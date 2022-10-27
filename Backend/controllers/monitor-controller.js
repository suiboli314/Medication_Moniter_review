const mongoUtil = require("../mongoUtil");

// The getLowStock function querys medications that has a stock lower than 10.
// Yao Zhong
const getLowStock = async (req, res) => {
  const database = mongoUtil.getDB();
  const query = { stock: { $lt: 10 } };
  try {
    const lowStock = await database
      .collection("medications")
      .find(query)
      .toArray();
    res.json({ lowStock: lowStock });
  } catch (err) {
    res.status(500).send({ msg: err });
  }
};

exports.getLowStock = getLowStock;
