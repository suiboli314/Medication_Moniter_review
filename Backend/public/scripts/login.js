const username = document.getElementById("user")
const userPassword = document.getElementById("password")
const loginBtn = document.getElementById("loginBtn")
const userError = document.getElementById("userError")
const passwordError = document.getElementById("passwordError")

loginBtn.onclick = async function test() {
    // store input data into data
    const data = {
        user: username.value,
        password: userPassword.value,
    }

    // various checks to see if input fields of form are valid
    // before sending input to backend
    if (username.value.length === 0) {
        userError.innerHTML = "Field cannot be empty!"
    } else if (userPassword.value === 0) {
        passwordError.innerHTML = "Field cannot be empty"
    } else {
        let userData = await fetch("/refill", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        // check whether response is successful
        if (userData.ok) {
            // redirect to different page
        }
    }
}
