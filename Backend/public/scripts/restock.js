const testingBtn2 = document.getElementById("testingBtn2")
//const type = document.getElementById("selectType")
const valueName = document.getElementById("medicationName")
const valueId = document.getElementById("medicationId")
const quantity = document.getElementById("quantity")
const manufacture = document.getElementById("manufacture")
const notification = document.getElementById("notification")

testingBtn2.onclick = async function test() {
    const data = {
        name: valueName.value,
        id: valueId.value,
        manufactor: manufacture.value,
        quantity: quantity.value,
    }
    console.log(data, "line16 restock")
    let medData = await fetch("/restock", {
        method: "POST", // or 'PUT'
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    if (medData.ok) {
        // medication is in database, so response is ok
        let result = await medData.json()
        //console.log(result.medication.stock)
        notification.innerHTML =
            result.message + "<br>" + JSON.stringify(result.medication)
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
}
