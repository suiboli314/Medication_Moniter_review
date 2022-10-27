const lowStockItems = document.getElementById("lowStockItems");

// getItems fetches the low stock items from the route "./moniter"
//Yao Zhong
const getItems = async () => {
  const res = await (await fetch("/monitor")).json();
  res.lowStock.forEach((element) => {
    makeItemCard(element);
  });
};

// makeItemCard renders each item into a card and append it to the parent <ul>.
//Yao zhong
const makeItemCard = (item) => {
  const listItem = document.createElement("li");
  listItem.innerHTML = `<div class="card text-center">
    <h4 class="card-title">${item.name}</h4>
    <h6>Current Stock : ${item.stock}</h6>
    <h6>Current Stock : ${item.manufactor}</h6>
    <h6>Current Stock : ${item.id}</h6>
  </div>`;
  lowStockItems.appendChild(listItem);
};

getItems();
