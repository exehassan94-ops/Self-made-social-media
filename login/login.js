const heading = document.querySelector(".heading");

const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const continueBtn = document.getElementById("continueBtn");

const nameInput = document.getElementById("name");
const numInput = document.getElementById("numInput");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

let currentMode = "login";

const MAX_TRIES = 3;
const LOCK_TIME = 15000;

let tries = Number(localStorage.getItem("loginTries")) || 0;
let lockUntil = Number(localStorage.getItem("lockUntil")) || 0;

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

function loginLimiter() {

  tries++;

  localStorage.setItem("loginTries", tries);

  console.log(`Failed Attempts: ${tries}`);

  if (tries >= MAX_TRIES) {

    lockUntil = Date.now() + LOCK_TIME;

    localStorage.setItem("lockUntil", lockUntil);

    alert(`Too many failed attempts.\nLogin locked for ${LOCK_TIME / 1000} seconds.`);

  }

}

loginBtn.addEventListener("click", () => {
  switchMode("login");
});

signupBtn.addEventListener("click", () => {
  switchMode("signup");
});

continueBtn.addEventListener("click", () => {

  if (currentMode === "login") {

    const currentTime = Date.now();

    if (currentTime < lockUntil) {

      const secondsLeft = Math.ceil((lockUntil - currentTime) / 1000);

      alert(`Login locked.\nTry again in ${secondsLeft} seconds.`);

      return;

    }
    if (currentTime >= lockUntil && lockUntil !== 0) {

      tries = 0;
      lockUntil = 0;

      localStorage.removeItem("loginTries");
      localStorage.removeItem("lockUntil");

    }

    if (!numInput.value || !password.value) {
      alert("Please enter the details.");
      return;
    }

    const findUser = users.find(user => user.number === numInput.value);

    if (!findUser) {
      alert("User not found. Please register.");
      loginLimiter();
      return;
    }

    if (findUser.password !== password.value) {
      alert("Incorrect password.");
      loginLimiter();
      return;
    }

    alert("Login succeeded!");

    tries = 0;
    lockUntil = 0;

    localStorage.removeItem("loginTries");
    localStorage.removeItem("lockUntil");

    inputCleaner();

  } else {

    if (
      !nameInput.value ||
      !numInput.value ||
      !password.value ||
      !confirmPassword.value
    ) {
      alert("Please fill all details.");
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

    localStorage.setItem("savedUser", JSON.stringify(users));

    alert("Sign Up Successful!");

    inputCleaner();

    switchMode("login");

  }

});

switchMode("login");