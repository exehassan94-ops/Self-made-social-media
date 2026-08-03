const heading = document.querySelector(".heading");

const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const continueBtn = document.getElementById("continueBtn");

const nameInput = document.getElementById("name");
const numInput = document.getElementById("numInput");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

let currentMode = "login";

let users = JSON.parse(localStorage.getItem("savedUser")) || [];

function switchMode(mode) {

    currentMode = mode;

    if (mode === "login") {

        heading.textContent = "Login";

        loginBtn.classList.add("active");
        signupBtn.classList.remove("active");

        nameInput.classList.add("hidden");
        confirmPassword.classList.add("hidden");

    } else {

        heading.textContent = "Sign Up";

        signupBtn.classList.add("active");
        loginBtn.classList.remove("active");

        nameInput.classList.remove("hidden");
        confirmPassword.classList.remove("hidden");

    }

}

function inputCleaner() {

    nameInput.value = "";
    numInput.value = "";
    password.value = "";
    confirmPassword.value = "";

}

loginBtn.addEventListener("click", () => {
    switchMode("login");
});

signupBtn.addEventListener("click", () => {
    switchMode("signup");
});

continueBtn.addEventListener("click", () => {

    if (currentMode === "login") {

        if (!numInput.value || !password.value) {
            alert("Please enter the details");
            return;
        }

        const findUser = users.find(user => user.number === numInput.value);

        if (!findUser) {
            alert("User not found, please register.");
            return;
        }

        if (findUser.password !== password.value) {
            alert("Incorrect password.");
            return;
        }

        alert("Login succeeded 200!");
        inputCleaner();

    } else {

        if (
            !nameInput.value ||
            !numInput.value ||
            !password.value ||
            !confirmPassword.value
        ) {
            alert("Please fill the details.");
            return;
        }

        const userName = nameInput.value;
        const userNumber = numInput.value;
        const userPassword = password.value;
        const userConfirmedPassword = confirmPassword.value;

        const checkExistingUser = users.find(
            user => user.number === userNumber
        );

        if (checkExistingUser) {
            alert("Number already registered!");
            return;
        }

        if (userConfirmedPassword !== userPassword) {
            alert("Passwords don't match!");
            return;
        }

        const user = {
            id: Date.now(),
            name: userName,
            number: userNumber,
            password: userPassword
        };

        users.push(user);

        localStorage.setItem(
            "savedUser",
            JSON.stringify(users)
        );

        console.log(users);

        alert("Sign Up Successful 201!");

        inputCleaner();

        switchMode("login");

    }

});

switchMode("login");