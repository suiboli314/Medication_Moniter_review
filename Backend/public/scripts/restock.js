const testingBtn2 = document.getElementById("testingBtn2")
//const type = document.getElementById("selectType")
const resetBtn2 = document.getElementById("resetBtn2")
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
            //result.message + "<br>" + JSON.stringify(result.medication)
            result.message +
            "<br>" +
            "<br>" +
            "Medication: " +
            JSON.stringify(result.medication.name) +
            "<br>" +
            "Medication Id: " +
            JSON.stringify(result.medication.id) +
            "<br>" +
            "Updated stock: " +
            JSON.stringify(result.medication.stock)
    }
    resetBtn2.onclick = function () {
        notification.innerHTML = ""
    }
}
