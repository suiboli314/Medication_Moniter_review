// Aaron Leung - refill order for patients
const mongoUtil = require("../mongoUtil")

const prescriptionOrder = async (req, res) => {
    // Extract input and store into variables
    const { type, name, id, quantity } = req.body
    const database = mongoUtil.getDB()
    let query
    
    // Query for medication is based on type selected by user
    // If user selects "id", we look find the medication in database using medication id provided
    // Otherwise we use medication name
    if (type === "id") {
        query = { id: id }
    } else {
        query = { name: name }
    }

    // check if medication exists
    try {
        const medications = await database.collection("medications")
        let medication = await medications.findOne(query)

        if (!medication) {
            console.log("Can't find medication in database")
            res.json({
                message: "Can't find medication in database!",
                medication: medication,
            })
            return
        } else if (quantity > medication.stock) {
            console.log("Not enough medication in stock!")
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
        res.json({ message: "Refill Successful!", medication: medication })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

exports.prescriptionOrder = prescriptionOrder
