const queryMedication = (req, res) => {
    const { type, value } = req.body

    let medication
    if (type === "id") {
        medication = DUMMY_MEDICATION.find((x) => x.id === value)
    } else {
        medication = DUMMY_MEDICATION.findOne({ name: value })
    }
    console.log(medication.stock)
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
]

exports.queryMedication = queryMedication
exports.DUMMY_MEDICATION = DUMMY_MEDICATION
