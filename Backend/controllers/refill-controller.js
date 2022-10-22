// refill order for patients
// const queryControllers = require("./query-controllers")
const mongoUtil = require("../mongoUtil")

const prescriptionOrder = async (req, res) => {
    // Want to take in id or name, and quantity required
    // const { type, value, quantity } = req.body
    const { type, name, id, quantity } = req.body
    console.log(req.body)
    // console.log(type, value, quantity)
    const database = mongoUtil.getDB()
    let query

    if (type === "id") {
        query = { id: id }
    } else {
        query = { name: name }
    }

    // const medications = await database.collection("medications")
    // let medication = await medications.findOne(query)

    // check if medication exists
    try {
        const medications = await database.collection("medications")
        let medication = await medications.findOne(query)

        if (!medication) {
            console.log("Can't find medication in database")
            // throw new Error("Can't find medication in database")
            res.json({
                message: "Can't find medication in database!",
                medication: medication,
            })
            // can remove return if we put line 55 into line 54
            return
        } else if (quantity > medication.stock) {
            console.log("Not enough medication in stock!")
            // res.status(500).json({msg: "Not enough medication in stock!"})
            // throw new Error("Not enough medication in stock!")
            res.json({
                message: "Not enough medication in stock!",
                medication: medication,
            })
            return
        } else {
            const update = {
                $inc: {
                    stock: -1 * quantity,
                },
            }
            await medications.updateOne(query, update)
            medication = await medications.findOne(query)
        }
        res.json({ message: "Success", medication: medication })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

exports.prescriptionOrder = prescriptionOrder
