const testingBtn = document.getElementById("testingBtn")
const type = document.getElementById("selectType")
const valueName = document.getElementById("medicationName")
const quantity = document.getElementById("quantity")

const data = { type: type, value: valueName, quantity: quantity }
testingBtn.onclick = async function test() {
    await fetch("http://localhost:3000/refill", {
        method: "POST", // or 'PUT'
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data)
        })
        .catch((error) => {
            console.error("Error:", error)
        })
}
