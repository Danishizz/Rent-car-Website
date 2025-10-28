// Dummy data permintaan peminjaman
const rentalRequests = [
  {
    id: 1,
    name: "Fatih Al Akram",
    email: "fatih@example.com",
    car: "BMW M3",
    start: "2025-11-01",
    end: "2025-11-03",
    status: "Pending"
  },
  {
    id: 2,
    name: "Aisyah Rahma",
    email: "aisyah@example.com",
    car: "Audi R8",
    start: "2025-11-02",
    end: "2025-11-04",
    status: "Pending"
  }
];

function renderTable() {
  const tableBody = document.getElementById("rentalTable");
  tableBody.innerHTML = "";

  rentalRequests.forEach((req) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${req.id}</td>
      <td>${req.name}</td>
      <td>${req.email}</td>
      <td>${req.car}</td>
      <td>${req.start}</td>
      <td>${req.end}</td>
      <td><span class="badge bg-${req.status === 'Approved' ? 'success' : req.status === 'Rejected' ? 'danger' : 'warning'}">${req.status}</span></td>
      <td>
        <button class="btn-approve me-2" onclick="approve(${req.id})">Setujui</button>
        <button class="btn-reject" onclick="reject(${req.id})">Tolak</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function approve(id) {
  const req = rentalRequests.find((r) => r.id === id);
  if (req) {
    req.status = "Approved";
    renderTable();
  }
}

function reject(id) {
  const req = rentalRequests.find((r) => r.id === id);
  if (req) {
    req.status = "Rejected";
    renderTable();
  }
}

document.addEventListener("DOMContentLoaded", renderTable);