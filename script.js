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
document.addEventListener("DOMContentLoaded", function () {
    // Render rental requests table
    renderTable();

    // Show Bootstrap welcome modal if exists
    const welcomeModalEl = document.getElementById('welcomeModal');
    if (window.bootstrap && welcomeModalEl) {
        try {
            const welcomeModal = new bootstrap.Modal(welcomeModalEl);
            welcomeModal.show();
        } catch (err) {
            console.error('Failed to show welcome modal:', err);
        }
    }
});
// =================================
// Date Validation
// =================================
const today = new Date().toISOString().split('T')[0];
const pickupDateEl = document.getElementById('pickup-date');
const returnDateEl = document.getElementById('return-date');
if (pickupDateEl) pickupDateEl.setAttribute('min', today);
if (returnDateEl) returnDateEl.setAttribute('min', today);

if (pickupDateEl && returnDateEl) {
    pickupDateEl.addEventListener('change', function () {
        returnDateEl.setAttribute('min', this.value);
    });
}

// =================================
// Smooth Scrolling
// =================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// =================================
// Navbar Scroll Effect
// =================================
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'white';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// =================================
// Search Form Handler
// =================================
const searchForm = document.getElementById('searchForm');
if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = {
            location: document.getElementById('location') ? document.getElementById('location').value : '',
            pickupDate: pickupDateEl ? pickupDateEl.value : '',
            returnDate: returnDateEl ? returnDateEl.value : '',
            carType: document.getElementById('car-type') ? document.getElementById('car-type').value : ''
        };

        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.innerHTML : '';
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Searching...';
            submitBtn.disabled = true;
        }

        // Simulate API call
        setTimeout(() => {
            showNotification('Searching for available cars...', 'success');
            if (submitBtn) {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }

            // Scroll to cars section if present
            const carsSection = document.getElementById('cars');
            if (carsSection) carsSection.scrollIntoView({ behavior: 'smooth' });
        }, 1500);
    });
}

// =================================
// Newsletter Form Handler
// =================================
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput ? emailInput.value : '';

        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.textContent : '';
        if (submitBtn) {
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
        }

        // Simulate API call
        setTimeout(() => {
            showNotification('Thank you for subscribing to our newsletter!', 'success');
            if (emailInput) emailInput.value = '';
            if (submitBtn) {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        }, 1000);
    });
}

// =================================
// Rent Button Handlers
// =================================
document.querySelectorAll('.btn-rent').forEach(button => {
    button.addEventListener('click', function () {
        const card = this.closest('.car-card');
        const carName = card ? (card.querySelector('h3') ? card.querySelector('h3').textContent : 'selected car') : 'selected car';
        showNotification(`Processing rental request for ${carName}...`, 'info');
    });
});

// =================================
// Notification System
// =================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} position-fixed top-0 start-50 translate-middle-x mt-5`;
    notification.style.zIndex = '9999';
    notification.style.minWidth = '300px';
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'} me-2"></i>
            ${message}
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(-50%) translateY(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// =================================
// Scroll Animations
// =================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

let observer;
try {
    observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
} catch (err) {
    observer = null;
}

// Observe elements for animation
document.querySelectorAll('.step-card, .car-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    if (observer) observer.observe(el);
});

// =================================
// Initialize on DOM Load
// =================================
document.addEventListener('DOMContentLoaded', function () {
    // Add initial animations if elements exist
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) heroContent.style.animation = 'fadeInDown 1s ease';

    // Set current year in footer
    const footerP = document.querySelector('.footer-bottom p');
    if (footerP) {
        const currentYear = new Date().getFullYear();
        footerP.innerHTML = `&copy; ${currentYear} RentCars. All Rights Reserved.`;
    }
});

// ---- Login modal (custom) ----
const loginModalEl = document.getElementById('loginModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const loginForm = document.getElementById('loginForm');

function openLoginModal() {
    if (!loginModalEl) return;
    loginModalEl.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scroll
}

function closeLoginModalAndRedirect() {
    if (!loginModalEl) return;
    loginModalEl.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore background scroll
    // Redirect to home (index.html)
    window.location.href = 'index.html';
}

if (openModalBtn) {
    openModalBtn.addEventListener('click', function (e) {
        e.preventDefault();
        openLoginModal();
    });
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        closeLoginModalAndRedirect();
    });

    // Visual feedback for close button
    closeModalBtn.addEventListener('mouseenter', function () {
        this.style.backgroundColor = '#e0e0e0';
        this.style.color = '#333';
    });
    closeModalBtn.addEventListener('mouseleave', function () {
        this.style.backgroundColor = '';
        this.style.color = '';
    });
}

if (loginModalEl) {
    loginModalEl.addEventListener('click', function (e) {
        if (e.target === loginModalEl) closeLoginModalAndRedirect();
    });
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && loginModalEl && loginModalEl.style.display === 'flex') {
        closeLoginModalAndRedirect();
    }
});

if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('email') ? document.getElementById('email').value : '';
        const password = document.getElementById('password') ? document.getElementById('password').value : '';
        if (!email || !password) {
            alert('Mohon isi email dan password');
            return;
        }
        alert('Login berhasil! Mengarahkan ke dashboard...');
        closeLoginModalAndRedirect();
        this.reset();
    });
}

// Hover effects for social buttons
document.querySelectorAll('.social-login > div').forEach(btn => {
    btn.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    });
    btn.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (email === "" || password === "") {
    alert("Please fill all fields!");
  } else {
    alert(`Welcome, ${email}!`);
    // Di sini kamu bisa arahkan ke halaman admin misalnya:
    // window.location.href = "admin.html";
  }
});

console.log('Script initialized successfully');