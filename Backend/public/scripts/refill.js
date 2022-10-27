const testingBtn = document.getElementById("testingBtn")
const resetBtn = document.getElementById("resetBtn")
const type = document.getElementById("selectType")
const valueName = document.getElementById("medicationName")
const valueId = document.getElementById("medicationId")
const quantity = document.getElementById("quantity")
const notification = document.getElementById("notification")

// function validate() {
//     if (valueName.value == "") {
//         return false
//     }
//     return true
// }
// Adding validate function
// const validate = (data) => {
//     if (
//         data.type.value == "" ||
//         data.type.value != "id" ||
//         data.type.value != "name"
//     ) {
//         alert(
//             "Incorrect input in first field.  Field cannot be empty.  Please specify either id or name."
//         )
//         return false
//     } else if (data.quantity < 1) {
//         alert("Input must be a postive integer")
//         return false
//     }
//     return true
// }

testingBtn.onclick = async function test() {
    const data = {
        type: type.value,
        name: valueName.value,
        id: valueId.value,
        quantity: quantity.value,
    }
    console.log(data.type)
    // new part added here
    //if (validate(data)) {
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
            "Current stock: " +
            JSON.stringify(result.medication.stock)
        //}
    }

    ///
    // let medData = await fetch("/refill", {
    //     method: "POST", // or 'PUT'
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    // })
    // if (medData.ok) {
    //     // medication is in database, so response is ok
    //     let result = await medData.json()
    //     notification.innerHTML =
    //         //result.message + "<br>" + JSON.stringify(result.medication)
    //         result.message +
    //         "<br>" +
    //         "<br>" +
    //         "Medication: " +
    //         JSON.stringify(result.medication.name) +
    //         "<br>" +
    //         "Medication Id: " +
    //         JSON.stringify(result.medication.id) +
    //         "<br>" +
    //         "Current stock: " +
    //         JSON.stringify(result.medication.stock)
    //}
    // else {
    //     let error = await medData.json()
    //     notification.innerHTML = error
    // }
}

resetBtn.onclick = function () {
    notification.innerHTML = ""
}
