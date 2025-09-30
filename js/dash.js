// Nhúng sidebar
fetch("../components/sidebar.html")
  .then((res) => res.text())
  .then((html) => {
    document.getElementById("sidebar-container").innerHTML = html;
    setTimeout(() => {
      const sidebarItems = document.querySelectorAll(".sidebar-item");
      let activeIndex = 2; // Store
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

// Demo fetch API (thay bằng API thật nếu có)
async function fetchDashboardData() {
  // const res = await fetch("YOUR_API_URL");
  // const data = await res.json();
  // return data;

  // Dữ liệu mẫu
  return {
    revenueToday: "23.000.000 VND",
    totalOrders: 600,
    totalCustomers: 500,
    monthlyPayment: "18.050.000 VND",
    transactions: [
      {
        date: "April 25",
        product: "Coffee",
        method: "Ví điện tử",
        status: "Hoàn thành",
        payment: "+45.000 VND",
      },
      {
        date: "April 23",
        product: "Coffee",
        method: "Ví điện tử",
        status: "Hoàn thành",
        payment: "+45.000 VND",
      },
      {
        date: "April 21",
        product: "Coffee",
        method: "Tiền mặt",
        status: "Hoàn thành",
        payment: "+45.000 VND",
      },
      {
        date: "April 19",
        product: "Latte",
        method: "Tiền mặt",
        status: "Hoàn thành",
        payment: "+65.000 VND",
      },
    ],
    chartIncome: [2, 4, 6, 8, 10, 8, 7, 9, 6, 7, 8, 9],
    chartOrder: [100, 120, 150, 130, 170, 160, 200],
    chartCategory: [65, 10, 25, 5],
  };
}

// Render dashboard
document.addEventListener("DOMContentLoaded", async () => {
  const data = await fetchDashboardData();

  // Top stats
  document.getElementById("revenue-today").textContent = data.revenueToday;
  document.getElementById("total-orders").textContent = data.totalOrders;
  document.getElementById("total-customers").textContent = data.totalCustomers;
  document.getElementById("monthly-payment").textContent = data.monthlyPayment;

  // Table
  const table = document.getElementById("transaction-table");
  table.innerHTML = data.transactions
    .map(
      (tr) =>
        `<tr>
      <td class="px-4 py-2">${tr.date}</td>
      <td class="px-4 py-2">${tr.product}</td>
      <td class="px-4 py-2">${tr.method}</td>
      <td class="px-4 py-2">${tr.status}</td>
      <td class="px-4 py-2 text-green-600 font-bold">${tr.payment}</td>
    </tr>`
    )
    .join("");

  // Chart: Income
  new Chart(document.getElementById("income-chart"), {
    type: "bar",
    data: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Thu nhập",
          data: data.chartIncome,
          backgroundColor: "#16a34a",
          borderRadius: 8,
        },
      ],
    },
    options: {
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } },
    },
  });

  // Chart: Category
  new Chart(document.getElementById("category-chart"), {
    type: "doughnut",
    data: {
      labels: ["Coffee", "Tea", "Latte", "Other"],
      datasets: [
        {
          data: data.chartCategory,
          backgroundColor: ["#11603c", "#4fd1c5", "#f6ad55", "#a0aec0"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      plugins: { legend: { display: false } },
      cutout: "65%", // Giúp pie chart đẹp, không bị tràn
    },
  });

  // Chart: Order
  new Chart(document.getElementById("order-chart"), {
    type: "line",
    data: {
      labels: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
      datasets: [
        {
          label: "Order",
          data: data.chartOrder,
          borderColor: "#16a34a",
          backgroundColor: "#e6faf3",
          tension: 0.4,
          fill: true,
          pointRadius: 3,
          pointBackgroundColor: "#16a34a",
        },
      ],
    },
    options: {
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } },
    },
  });
});
