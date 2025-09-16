//Login
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

document.addEventListener("DOMContentLoaded", function () {
    const userBtn = document.getElementById("userBtn");
    const userDropdown = document.getElementById("userDropdown");

    userBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        userDropdown.style.display = userDropdown.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", function () {
        userDropdown.style.display = "none";
    });
});