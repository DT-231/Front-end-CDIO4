// ===================== Nhúng sidebar =====================
fetch("../components/sidebar.html")
  .then((res) => res.text())
  .then((html) => {
    document.getElementById("sidebar-container").innerHTML = html;
    setTimeout(() => {
      const sidebarItems = document.querySelectorAll(".sidebar-item");
      let activeIndex = 3; // Staff

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

// ===================== Hàm format ngày =====================
function formatDate(dateStr) {
  if (!dateStr) return "—";
  const date = new Date(dateStr);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

// ===================== Hàm fetch danh sách user =====================
async function getUsers() {
  try {
    // Login để lấy token
    const loginRes = await fetch("http://20.2.234.37:8000/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "admin", password: "123456" }),
    });
    const loginData = await loginRes.json();
    const token = loginData.data.token.access_token;

    // Gọi API lấy danh sách user
    const usersRes = await fetch(
      "http://20.2.234.37:8000/api/v1/users/list?page=1&page_size=10",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const response = await usersRes.json();
    const staffList = response.data || [];

    // Render mặc định dạng grid
    renderStaff(staffList, "grid");

    // Gắn sự kiện đổi view
    document.getElementById("grid-view-btn").onclick = function () {
      this.classList.add("active-view");
      document.getElementById("list-view-btn").classList.remove("active-view");
      renderStaff(staffList, "grid");
    };

    document.getElementById("list-view-btn").onclick = function () {
      this.classList.add("active-view");
      document.getElementById("grid-view-btn").classList.remove("active-view");
      renderStaff(staffList, "list");
    };
  } catch (error) {
    console.error("Lỗi:", error);
    document.getElementById("staff-container").innerHTML =
      '<div class="col-span-5 text-center text-red-500">Không thể tải dữ liệu nhân viên!</div>';
  }
}
getUsers();

// ===================== Render danh sách Staff =====================
function renderStaff(staffList, view = "grid") {
  const container = document.getElementById("staff-container");
  container.innerHTML = "";

  if (!staffList || staffList.length === 0) {
    container.innerHTML =
      '<div class="col-span-5 text-center text-gray-500">Không có nhân viên nào</div>';
    return;
  }

  if (view === "grid") {
    container.className = "grid grid-cols-5 gap-6";
    staffList.forEach((staff) => {
      const tpl = document
        .getElementById("staff-card-template")
        .content.cloneNode(true);

      tpl.querySelector(".staff-name").textContent = staff.full_name;
      tpl.querySelector(".staff-role").textContent =
        staff.role_id === 3 ? "Staff" : staff.role_id;
      tpl.querySelector(".staff-id").textContent = staff.id;
      tpl.querySelector(".staff-phone").textContent = staff.phone || "N/A";
      tpl.querySelector(".staff-date").textContent = formatDate(
        staff.created_at
      );
      tpl.querySelector(".staff-status").textContent = staff.is_active
        ? "Đang làm việc"
        : "Ngưng hoạt động";

      container.appendChild(tpl);
    });
  } else {
    container.className = "flex flex-col gap-4";
    staffList.forEach((staff) => {
      const tpl = document
        .getElementById("staff-list-template")
        .content.cloneNode(true);

      tpl.querySelector(".staff-name").textContent = staff.full_name;
      tpl.querySelector(".staff-role").textContent =
        staff.role_id === 3 ? "Staff" : staff.role_id;
      tpl.querySelector(".staff-id").textContent = staff.id;
      tpl.querySelector(".staff-phone").textContent = staff.phone || "N/A";
      tpl.querySelector(".staff-date").textContent = formatDate(
        staff.created_at
      );
      tpl.querySelector(".staff-status").textContent = staff.is_active
        ? "Đang làm việc"
        : "Ngưng hoạt động";

      container.appendChild(tpl);
    });
  }
}
// ===================== Modal thêm nhân viên =====================
document.getElementById("add-staff-btn").onclick = function () {
  // Hiển thị modal
  document.getElementById("add-staff-modal").classList.remove("hidden");

  // Lấy ngày hiện tại và set vào input
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  document.getElementById("start_date").value = `${yyyy}-${mm}-${dd}`;
};

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeModal();
});

document.getElementById("cancel-btn").onclick = closeModal;

function closeModal() {
  document.getElementById("add-staff-modal").classList.add("hidden");
}

// ===================== Submit form thêm nhân viên =====================
document.getElementById("add-staff-form").onsubmit = async function (e) {
  e.preventDefault();

  // Lấy dữ liệu từ form
  const newStaff = {
    username: document.getElementById("username")?.value || "",
    password: document.getElementById("password")?.value || "",
    full_name: document.getElementById("full_name").value,
    phone: document.getElementById("phone").value || null,
    role_id: parseInt(document.getElementById("role").value),
    store_id: document.getElementById("store_id")?.value || null,
    start_date: document.getElementById("start_date").value,
  };

  console.log("📌 Nhân viên mới:", newStaff);

  // TODO: Gọi API ở đây (Albert)
  // fetch("API_URL", { method: "POST", headers: {...}, body: JSON.stringify(newStaff) })

  alert("✅ Dữ liệu nhân viên đã được thu thập (chưa gọi API).");
  closeModal();
};

