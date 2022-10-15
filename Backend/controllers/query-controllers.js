const mongoUtil = require("../mongoUtil")

const queryMedication = async (req, res) => {
    const { type, value } = req.body
    const database = mongoUtil.getDB()
    let query
    if (type === "id") {
        query = { id: value }
    } else {
        query = { name: value }
    }

    const medication = await database.collection("medications").findOne(query)

    res.json({ medication: medication })
}

const DUMMY_MEDICATION = [
    {
        id: "9988776",
        name: "pepto",
        manufactor: "abc",
        stock: 7,
    },
    {
        id: "6655443",
        name: "sinux",
        manufactor: "def",
        stock: 0,
    },
    {
        id: "1234567",
        name: "amoxicillin",
        manufactor: "ghi",
        stock: 5,
    },
    {
        id: "7654321",
        name: "aspirin",
        manufactor: "xyz",
        stock: 2,
    },
]

exports.queryMedication = queryMedication
exports.DUMMY_MEDICATION = DUMMY_MEDICATION
