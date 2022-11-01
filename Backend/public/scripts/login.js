// Login Frontend - Aaron Leung
const username = document.getElementById("user");
const userPassword = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const userError = document.getElementById("userError");
const passwordError = document.getElementById("passwordError");
const loginError = document.getElementById("loginError");

loginBtn.onclick = async function test() {
  // store input data into data
  const data = {
    username: username.value,
    password: userPassword.value,
  };

  // various checks to see if input fields of form are valid
  // before sending input to backend
  if (!username.value) {
    userError.innerHTML = "Field cannot be empty!";
  } else if (!userPassword.value) {
    passwordError.innerHTML = "Field cannot be empty";
  } else {
    let userData = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    // check login status and if logged in, redirect
    // Yao Zhong
    if (userData.ok) {
      const res = await userData.json();
      if (res.isLoggedIn) {
        window.location.replace("/");
      } else {
        console.log(res.message);
        loginError.innerHTML = res.message;
      }
    }
  }
};
