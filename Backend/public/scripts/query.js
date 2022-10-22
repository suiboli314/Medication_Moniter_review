const resultDisplay = document.getElementById("queryResult")

const renderResult = async () => {
    const resRaw = await fetch("/query/lastQuery")
    const res = await resRaw.json()
    console.log(res)

    if (!res.lastQuery) {
        const noResult = document.createElement("li")
        noResult.textContent = "Start Your query"
        resultDisplay.appendChild(noResult)
    } else {
        const medName = document.createElement("li")
        medName.textContent = `Medication : ${res.lastQuery.name}`
        resultDisplay.appendChild(medName)
        const medId = document.createElement("li")
        medId.textContent = `Medication ID : ${res.lastQuery.id}`
        resultDisplay.appendChild(medId)
        const medManufactor = document.createElement("li")
        medManufactor.textContent = `Manufactor : ${res.lastQuery.manufactor}`
        resultDisplay.appendChild(medManufactor)
        const medStock = document.createElement("li")
        medStock.textContent = `Stock : ${res.lastQuery.stock}`
        if (res.lastQuery.stock <= 5) {
            medStock.style.color = "red"
        } else {
            medStock.style.color = "green"
        }
        resultDisplay.appendChild(medStock)
    }
}

renderResult()
