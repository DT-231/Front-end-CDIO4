// Nhúng sidebar
fetch("../components/sidebar.html")
  .then((res) => res.text())
  .then((html) => {
    document.getElementById("sidebar-container").innerHTML = html;
    setTimeout(() => {
      const sidebarItems = document.querySelectorAll(".sidebar-item");
      let activeIndex = localStorage.getItem("sidebar-active-index")
        ? parseInt(localStorage.getItem("sidebar-active-index"))
        : 1;

      function setActive(idx) {
        sidebarItems.forEach((item, i) => {
          if (i === idx) {
            item.classList.add("bg-[#11603c]", "text-white", "shadow-md");
            item.classList.remove("text-[#11603c]");
            item.querySelector("i").classList.add("text-white");
            item.querySelector("i").classList.remove("text-[#11603c]");
            item.querySelector("span").classList.add("text-white");
            item.querySelector("span").classList.remove("text-[#11603c]");
          } else {
            item.classList.remove("bg-[#11603c]", "text-white", "shadow-md");
            item.classList.add("text-[#11603c]");
            item.querySelector("i").classList.remove("text-white");
            item.querySelector("i").classList.add("text-[#11603c]");
            item.querySelector("span").classList.remove("text-white");
            item.querySelector("span").classList.add("text-[#11603c]");
          }
        });
      }

      setActive(activeIndex);

      sidebarItems.forEach((item, idx) => {
        item.addEventListener("click", function (e) {
          e.preventDefault();
          setActive(idx);
          localStorage.setItem("sidebar-active-index", idx);
        });
      });
    }, 100);
  });

// Dữ liệu mẫu menu
const menuData = [
  {
    name: "Caramel",
    desc: "Cà phê kết hợp cùng caramel",
    price: 3.95,
    img: "../assets/caramel.webp",
    category: "coffee",
  },
  {
    name: "Latte",
    desc: "Cà phê sữa thơm ngon",
    price: 4.25,
    img: "../assets/latte.webp",
    category: "coffee",
  },
  {
    name: "Matcha Latte",
    desc: "Trà xanh Nhật Bản",
    price: 4.0,
    img: "../assets/matcha.webp",
    category: "tea",
  },
  {
    name: "Trà Đào",
    desc: "Trà đào tươi mát",
    price: 3.5,
    img: "../assets/tradao.webp",
    category: "tea",
  },
  {
    name: "Nước Cam",
    desc: "Nước cam nguyên chất",
    price: 3.0,
    img: "../assets/nuoccam.webp",
    category: "juice",
  },
  {
    name: "Americano",
    desc: "Cà phê pha loãng kiểu Mỹ",
    price: 3.2,
    img: "../assets/americano.webp",
    category: "coffee",
  },
];

// Render menu cards
function renderMenu(data) {
  const container = document.getElementById("menu-container");
  container.innerHTML = "";
  data.forEach((item) => {
    const tpl = document
      .getElementById("menu-card-template")
      .content.cloneNode(true);
    tpl.querySelector(".menu-img").src = item.img;
    tpl.querySelector(".menu-name").textContent = item.name;
    tpl.querySelector(".menu-desc").textContent = item.desc;
    tpl.querySelector(".menu-price").textContent = item.price.toFixed(2) + " $";

    // fallback ảnh
    tpl.querySelector(".menu-img").onerror = function () {
      this.src = "../assets/default.webp";
    };

    container.appendChild(tpl);
  });
}

// Khởi tạo
document.addEventListener("DOMContentLoaded", () => {
  renderMenu(menuData);

  // Filter theo category
  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document
        .querySelectorAll(".category-btn")
        .forEach((b) => b.classList.remove("active-category"));
      this.classList.add("active-category");

      const cate = this.dataset.category;
      if (cate === "all") {
        renderMenu(menuData);
      } else {
        renderMenu(menuData.filter((item) => item.category === cate));
      }
    });
  });

  // Search menu
  document.getElementById("search-input").addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = menuData.filter(
      (item) =>
        item.name.toLowerCase().includes(keyword) ||
        item.desc.toLowerCase().includes(keyword)
    );
    renderMenu(filtered);
  });
});

// Chọn circle-btn (active)
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("circle-btn")) {
    const group = e.target.parentElement.querySelectorAll(".circle-btn");
    group.forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");
  }
});
