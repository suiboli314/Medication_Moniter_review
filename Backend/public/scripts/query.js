//Yao Zhong
const resultDisplay = document.getElementById("queryResult");
const messageDisplay = document.getElementById("queryMessage");
const refillLink = document.getElementById("refillLink");
const restockLink = document.getElementById("restockLink");
const loginLink = document.getElementById("loginLink");

// rendeResult will render the query result for lastQuery on the same page
//Yao Zhong
const checkLogin = async () => {
  const isLoggedInRaw = await fetch("/api/login");
  const isLoggedIn = await isLoggedInRaw.json();
  if (isLoggedIn.isLoggedIn) {
    loginLink.style.display = "none";
  } else {
    refillLink.style.display = "none";
    restockLink.style.display = "none";
  }
};

const renderResult = async () => {
  const resRaw = await fetch("/api/query/lastQuery");
  const res = await resRaw.json();

  if (!res.message) {
    //If there's no message, which means the first render, return "Start query"
    const noResult = document.createElement("li");
    noResult.textContent = "Start Your query";
    resultDisplay.appendChild(noResult);
  } else {
    messageDisplay.textContent = res.message;

    //If last query is not success, this part will not be rendered, only the message will be sent
    if (res.lastQuery) {
      resultDisplay.innerHTML = `
        <li>Medication : ${res.lastQuery.name}</li>
        <li>Medication ID : ${res.lastQuery.id}</li>
        <li>Manufactor : ${res.lastQuery.manufactor}</li>
        `;
      const medStock = document.createElement("li");
      medStock.textContent = `Stock : ${res.lastQuery.stock}`;
      //Set different color for low stock medicine
      if (res.lastQuery.stock < 10) {
        medStock.style.color = "red";
      } else {
        medStock.style.color = "green";
      }
      resultDisplay.appendChild(medStock);
    }
  }
};

checkLogin();
renderResult();
