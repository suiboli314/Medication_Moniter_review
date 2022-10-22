const lowStockItems = document.getElementById("lowStockItems")

const getItems = async () => {
    const res = await (await fetch("/monitor")).json()
    res.lowStock.forEach((element) => {
        makeItemCard(element)
    })
}

const makeItemCard = (item) => {
    const listItem = document.createElement("li")
    const itemCard = document.createElement("div")
    itemCard.classList.add("card")
    itemCard.classList.add("text-center")
    listItem.appendChild(itemCard)
    const cardTitle = document.createElement("h4")
    cardTitle.classList.add("card-title")
    cardTitle.innerHTML = item.name
    itemCard.appendChild(cardTitle)
    lowStockItems.appendChild(listItem)
    const stockLine = document.createElement("h6")
    stockLine.innerHTML = `Current Stock : ${item.stock}`
    itemCard.appendChild(stockLine)
    const manufactorLine = document.createElement("h6")
    manufactorLine.innerHTML = `Manufactor : ${item.manufactor}`
    itemCard.appendChild(manufactorLine)
    const idLine = document.createElement("h6")
    idLine.innerHTML = `Medication ID : ${item.id}`
    itemCard.appendChild(idLine)
}

getItems()
