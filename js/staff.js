// Nhúng sidebar
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

// Fetch API staff
document.addEventListener("DOMContentLoaded", () => {
  fetch(
    "http://20.2.234.37:8000/api/v1/users/list?page=1&page_size=20&role_id=3"
  )
    .then((res) => res.json())
    .then((response) => {
      const staffList = response.data; // ✅ lấy đúng danh sách nhân viên
      renderStaff(staffList, "grid");

      document.getElementById("grid-view-btn").onclick = function () {
        this.classList.add("active-view");
        document
          .getElementById("list-view-btn")
          .classList.remove("active-view");
        renderStaff(staffList, "grid");
      };
      document.getElementById("list-view-btn").onclick = function () {
        this.classList.add("active-view");
        document
          .getElementById("grid-view-btn")
          .classList.remove("active-view");
        renderStaff(staffList, "list");
      };
    })
    .catch((err) => {
      console.error(err);
      document.getElementById("staff-container").innerHTML =
        '<div class="col-span-5 text-center text-red-500">Không thể tải dữ liệu nhân viên!</div>';
    });

  document.getElementById("add-staff-btn").onclick = function () {
    alert("Chức năng thêm nhân viên!");
  };
});

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
      tpl.querySelector(".staff-date").textContent = staff.created_at || "—";
      tpl.querySelector(".staff-status").textContent = staff.is_active
        ? "Active"
        : "Inactive";
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
      tpl.querySelector(".staff-date").textContent = staff.created_at || "—";
      tpl.querySelector(".staff-status").textContent = staff.is_active
        ? "Active"
        : "Inactive";
      container.appendChild(tpl);
    });
  }
}
