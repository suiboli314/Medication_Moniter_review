// Aaron Leung - Refill (frontend)
const submitBtn = document.getElementById("submitBtn")
const resetBtn = document.getElementById("resetBtn")
const type = document.getElementById("selectType")
const valueName = document.getElementById("medicationName")
const valueId = document.getElementById("medicationId")
const quantity = document.getElementById("quantity")
const notification = document.getElementById("notification")
const typeError1 = document.getElementById("typeError1")
const typeError2 = document.getElementById("typeError2")
const typeError3 = document.getElementById("typeError3")
const typeError4 = document.getElementById("typeError4")

// Error message color and fontsize
document.getElementById("typeError1").style.color = "red"
document.getElementById("typeError2").style.color = "red"
document.getElementById("typeError3").style.color = "red"
document.getElementById("typeError4").style.color = "red"
document.getElementById("typeError1").style.fontSize = "small"
document.getElementById("typeError2").style.fontSize = "small"
document.getElementById("typeError3").style.fontSize = "small"
document.getElementById("typeError4").style.fontSize = "small"

// function is called when submit button is clicked (Aaron Leung)
submitBtn.onclick = async function test() {
    // store input data into data
    const data = {
        type: type.value,
        name: valueName.value,
        id: valueId.value,
        quantity: quantity.value,
    }

    // Check if the input of the first field is either "name" or "id"
    // Store result into typeCheck
    let typeCheck
    if (type.value == "name") {
        typeCheck = true
    } else if (type.value == "id") {
        typeCheck = true
    } else {
        typeCheck = false
    }

    // various checks to see if input fields of form are valid
    // before sending input to backend
    if (type.value.length === 0) {
        typeError1.innerHTML = "Field cannot be empty!"
    } else if (valueName.value.length === 0) {
        typeError2.innerHTML = "Field cannot be empty!"
    } else if (!typeCheck) {
        typeError1.innerHTML = "Please select id or name"
    } else if (valueId.value.length === 0) {
        typeError3.innerHTML = "Invalid value!"
    } else if (quantity.value.length <= 0 || quantity.value === null) {
        typeError4.innerHTML =
            "Invalid value!  Value has to be a positive integer."
    } else {
        let medData = await fetch("/refill", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        // check whether response is successful
        if (medData.ok) {
            // Remove error messages when displaying feedback message
            typeError1.innerHTML = ""
            typeError2.innerHTML = ""
            typeError3.innerHTML = ""
            typeError4.innerHTML = ""

            // store response json into result
            // display message
            let result = await medData.json()
            if(result.medication === null) {
                notification.innerHTML = result.message
            } else {
                notification.innerHTML =
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
            }
        }
    }
}

// clears all error messages and notification
resetBtn.onclick = function () {
    notification.innerHTML = ""
    typeError1.innerHTML = ""
    typeError2.innerHTML = ""
    typeError3.innerHTML = ""
    typeError4.innerHTML = ""
}
