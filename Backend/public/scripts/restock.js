// Aaron Leung
// restock (frontend), displays feedback results to the user
const submitBtn2 = document.getElementById("submitBtn2");
const resetBtn2 = document.getElementById("resetBtn2");
const valueName = document.getElementById("medicationName");
const valueId = document.getElementById("medicationId");
const quantity = document.getElementById("quantity");
const manufacture = document.getElementById("manufacture");
const notification = document.getElementById("notification");
const typeErrorA = document.getElementById("typeErrorA");
const typeErrorB = document.getElementById("typeErrorB");
const typeErrorC = document.getElementById("typeErrorC");
const typeErrorD = document.getElementById("typeErrorD");

// Error message color and fontsize
document.getElementById("typeErrorA").style.color = "red";
document.getElementById("typeErrorB").style.color = "red";
document.getElementById("typeErrorC").style.color = "red";
document.getElementById("typeErrorD").style.color = "red";
document.getElementById("typeErrorA").style.fontSize = "small";
document.getElementById("typeErrorB").style.fontSize = "small";
document.getElementById("typeErrorC").style.fontSize = "small";
document.getElementById("typeErrorD").style.fontSize = "small";

// Yao Zhong - checkLogin
const checkLogin = async () => {
  const isLoggedInRaw = await fetch("/api/login");
  const isLoggedIn = await isLoggedInRaw.json();
  if (!isLoggedIn.isLoggedIn) {
    window.location.replace("/pages/login.html");
  }
};

// function is called when submit button is clicked (Aaron Leung)
submitBtn2.onclick = async function test() {
  // store input data into data
  const data = {
    name: valueName.value,
    id: valueId.value,
    manufactor: manufacture.value,
    quantity: quantity.value,
  };

  // various checks to see if input fields of form are valid
  // before sending input to backend
  if (valueName.value.length === 0) {
    typeErrorA.innerHTML = "Field cannot be empty!";
  } else if (valueId.value.length === 0) {
    typeErrorB.innerHTML = "Field cannot be empty!";
  } else if (manufacture.value.length === 0) {
    typeErrorC.innerHTML = "Field cannot be empty!";
  } else if (quantity.value <= 0 || quantity.value === null) {
    typeErrorD.innerHTML = "Invalid value!";
  } else {
    let medData = await fetch("/api/restock", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    // check whether response is successful
    if (medData.ok) {
      // Remove error messages when displaying feedback message
      typeErrorA.innerHTML = "";
      typeErrorB.innerHTML = "";
      typeErrorC.innerHTML = "";
      typeErrorD.innerHTML = "";

      // store response json into result
      // display message
      let result = await medData.json();
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
        "Updated stock: " +
        JSON.stringify(result.medication.stock);
    }
  }
};

// clears all error messages and notification (Aaron Leung)
resetBtn2.onclick = function () {
  notification.innerHTML = "";
  typeErrorA.innerHTML = "";
  typeErrorB.innerHTML = "";
  typeErrorC.innerHTML = "";
  typeErrorD.innerHTML = "";
};

checkLogin();
