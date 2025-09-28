// Chuyển panel
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

if (signUpButton && signInButton && container) {
  signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
  });

  signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
  });
}

// Đăng ký
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const newUser = {
      username: document.getElementById("username").value.trim(),
      email: document.getElementById("email").value.trim(),
      password: document.getElementById("password").value.trim(),
      full_name: document.getElementById("full_name").value.trim(),
      phone: document.getElementById("phone").value.trim(),
    };

    try {
      const res = await fetch("http://20.2.234.37:8000/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("User đăng ký:", data);
        container.classList.remove("right-panel-active"); // Chuyển sang login
      } else {
        alert("Lỗi: " + (data.message || "Đăng ký thất bại"));
      }
    } catch (err) {
      alert("Không thể kết nối đến server!");
      console.error("Fetch error:", err);
    }
  });
}

// Đăng nhập
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    try {
      const res = await fetch("http://20.2.234.37:8000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.data.token.access_token);
        window.location.href = "../html/choose.html";
      } else {
        alert("Đăng nhập thất bại: " + (data.message || "Sai thông tin"));
      }
    } catch (err) {
      console.error("Lỗi đăng nhập:", err);
      alert("Không thể kết nối đến server!");
    }
  });
}
