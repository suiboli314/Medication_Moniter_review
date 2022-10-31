const lowStockItems = document.getElementById("lowStockItems");
const refillLink = document.getElementById("refillLink");
const restockLink = document.getElementById("restockLink");
const loginLink = document.getElementById("loginLink");

const checkLogin = async () => {
  const isLoggedInRaw = await fetch("/login");
  const isLoggedIn = await isLoggedInRaw.json();
  if (isLoggedIn.isLoggedIn) {
    loginLink.style.display = "none";
  } else {
    refillLink.style.display = "none";
    restockLink.style.display = "none";
  }
};

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
    <h6>Manufactor : ${item.manufactor}</h6>
    <h6>Medication ID : ${item.id}</h6>
  </div>`;
  lowStockItems.appendChild(listItem);
};

checkLogin();
getItems();
