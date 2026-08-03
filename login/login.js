const heading = document.querySelector(".heading");

const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const deleteBtn = document.getElementById("deleteBtn");

const nameInput = document.getElementById("name");
const numInput = document.getElementById("numInput");
const password = document.getElementById("password")
const confirmPassword = document.getElementById("confirmPassword");

let currentMode = "login";

let users = JSON.parse(localStorage.getItem("savedUser")) || [];
console.log(users);

function switchMode(mode) {
    
    currentMode = mode;
    
    if (mode === "login") {
        
        heading.textContent = "Login";
        deleteBtn.classList.add("hidden");
        loginBtn.classList.add("active");
        signupBtn.classList.remove("active");
        
        nameInput.classList.add("hidden");
        confirmPassword.classList.add("hidden");
        
    } else {
        
        heading.textContent = "Sign Up";
        deleteBtn.classList.remove("hidden");
        signupBtn.classList.add("active");
        loginBtn.classList.remove("active");
        
        nameInput.classList.remove("hidden");
        confirmPassword.classList.remove("hidden");
        
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
        
        if (!password.value || !numInput.value) {
            alert("Please enter the details");
            return;
        }
        
        const findUser = users.find(user => user.number === numInput.value);
        
        if (!findUser) {
            alert("User not found, please register");
            return;
        }
        if(findUser.password !== password.value){
            alert("incorrect password or number");
            return;
        }
        
        alert("Login succeeded 200!");
        numInput.value = "";
        password.value = "";
        
    } else {
        
        if (!numInput.value || !password.value || !confirmPassword.value || !nameInput.value) {
            alert("please fill the details");
            return;
        }
        
        
        let userNumber = numInput.value;
        let userPassword = password.value;
        let userConfirmedPassword = confirmPassword.value;
        let userName = nameInput.value;
        const checkExistingUser = users.find(user => user.number === userNumber);
        
        if (checkExistingUser) {
            alert("number already registered!");
            return;
        }
        
        
        if (userConfirmedPassword !== userPassword) {
            alert("Password doesnt match!");
            return;
        }
        alert("Sign up successfull 201");
        
        let user = {
            id: Date.now(),
            name: userName,
            password: userPassword,
            number: userNumber,
        };
        
        users.push(user);
        
        localStorage.setItem("savedUser", JSON.stringify(users));
        
        console.log(users);
        numInput.value = "";
        password.value = "";
        confirmPassword.value = "";
        nameInput.value = "";
    }
    
});

deleteBtn.addEventListener("click", () => {
    localStorage.removeItem("savedUser");
    users = [];
    numInput.value = "";
    password.value = "";
    confirmPassword.value = "";
    nameInput.value = "";
    console.log(users);
})
switchMode("login");