const resultDisplay = document.getElementById("queryResult")

const renderResult = async () => {
    const resRaw = await fetch("/query/lastQuery")
    const res = await resRaw.json()

    if (!res.lastQuery) {
        const noResult = document.createElement("li")
        noResult.textContent = "Start Your query"
        resultDisplay.appendChild(noResult)
    } else {
        const item = document.createElement("li")
        item.textContent = res.lastQuery.stock
        resultDisplay.appendChild(item)
    }
}

renderResult()
