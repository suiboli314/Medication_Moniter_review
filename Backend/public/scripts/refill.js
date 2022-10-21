const testingBtn = document.getElementById("testingBtn")
const type = document.getElementById("selectType")
const valueName = document.getElementById("medicationName")
const valueId = document.getElementById("medicationId")
const quantity = document.getElementById("quantity")
const notification = document.getElementById("notification")

testingBtn.onclick = async function test() {
    const data = {
        type: type.value,
        name: valueName.value,
        id: valueId.value,
        quantity: quantity.value,
    }
    let medData = await fetch("/refill", {
        method: "POST", // or 'PUT'
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    if (medData.ok) {
        // medication is in database, so response is ok
        let result = await medData.json()
        //console.log(result.medication.stock), < 1
        if (JSON.stringify(result.medication.stock) <= 0) {
            notification.innerHTML = "Not enough medication in stock!"
        } else {
            notification.innerHTML = "Order refill successful!"
        }
    } else {
        // since this medication doesn't exist in database this is actually an error
        //let error = await medData.json()
        //notification.innerHTML = error
        notification.innerHTML = "Medication doesn't exist in database!"
    }
    //     .then((response) => response.json())
    //     .then((data) => {
    //         let updated = JSON.stringify(data)
    //         console.log("Updated:", Object.values(data))
    //         if (updated.quantity < 1) {
    //             notification.innerHTML = "Not enough medication in stock"
    //         }
    //     })
    //     .catch((error) => {
    //         console.error("Error56:", error)
    //     })
    // console.log("XYZ", data)
}
