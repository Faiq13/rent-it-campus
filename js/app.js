/**
 * RENT IT CAMPUS - Main Application Logic
 */

// Data Etalase Barang dengan Sub-Tipe & Foto Asli Akurat
const products = [
    {
        id: 1,
        title: "Proyektor & Layar Portable Set",
        category: "event",
        brand: "Epson Seri EB",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=600&q=80",
        desc: "Layar proyektor jernih untuk seminar, presentasi kelompok, & nonton bareng.",
        subModels: [
            { name: "Epson EB-X500 (3600 Lumens, XGA)", price: 75000 },
            { name: "Epson EB-X51 (3800 Lumens, HDMI High-Bright)", price: 85000 },
            { name: "Epson EB-E500 Compact (3300 Lumens)", price: 65000 }
        ]
    },
    {
        id: 2,
        title: "Standing Roll Up Banner Display Set",
        category: "event",
        brand: "Alumunium Display",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=600&q=80",
        desc: "Standing banner kokoh & praktis untuk pameran, bazar, & event BEM.",
        subModels: [
            { name: "Roll Up Banner Alumunium (60 x 160 cm)", price: 20000 },
            { name: "Roll Up Banner Premium Stainless (80 x 200 cm)", price: 25000 },
            { name: "Tripod Banner Double-Sided Frame", price: 30000 }
        ]
    },
    {
        id: 3,
        title: "Portable Sound System & Mic Wireless",
        category: "event",
        brand: "Baretone Audio",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80",
        desc: "Pengeras suara troly nirkabel jernih lengkap dengan 2 mic wireless & Bluetooth.",
        subModels: [
            { name: "Baretone MAX12AL (12 Inch / 500 Watt)", price: 90000 },
            { name: "Baretone MAX15AL (15 Inch / 800 Watt Super Bass)", price: 120000 }
        ]
    },
    {
        id: 4,
        title: "Laptop Productivity & Coding",
        category: "laptop",
        brand: "Lenovo & ASUS",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80",
        desc: "Laptop performa lancar untuk pengerjaan tugas akhir, koding, & kompilasi data.",
        subModels: [
            { name: "Lenovo ThinkPad E14 (Core i5 Gen 12 / RAM 16GB)", price: 55000 },
            { name: "ASUS VivoBook 14 (Core i5 Gen 11 / RAM 8GB)", price: 45000 },
            { name: "MacBook Air M1 (RAM 8GB / 256GB SSD)", price: 85000 }
        ]
    },
    {
        id: 5,
        title: "Kamera Mirrorless & Dokumentasi",
        category: "kamera",
        brand: "Sony Alpha & Canon",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
        desc: "Standar dokumentasi foto & video sinematik liputan acara kampus.",
        subModels: [
            { name: "Sony Alpha A6400 + Lensa Kit 16-50mm", price: 90000 },
            { name: "Sony Alpha A7 III Full-Frame Creator Kit", price: 140000 },
            { name: "Canon EOS M50 Mark II Vlog Kit", price: 75000 }
        ]
    },
    {
        id: 6,
        title: "Printer InkTank Multifungsi",
        category: "laptop",
        brand: "Epson & Canon",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=600&q=80",
        desc: "Cetak cepat proposal, dokumen skripsi, & laporan sekretariat.",
        subModels: [
            { name: "Epson EcoTank L3210 (Print / Scan / Copy)", price: 35000 },
            { name: "Canon PIXMA G3010 Wireless InkTank", price: 40000 }
        ]
    },
    {
        id: 7,
        title: "Tablet Graphic & Digital Pen Pad",
        category: "gadget",
        brand: "Apple & Wacom",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80",
        desc: "Mendukung ilustrasi digital, catatan perkuliahan, & desain grafis.",
        subModels: [
            { name: "iPad Air 5 M1 (64GB) + Apple Pencil 2", price: 75000 },
            { name: "iPad Pro 11 M2 (128GB) + Apple Pencil 2", price: 95000 },
            { name: "Wacom Intuos Pro Medium Pen Tablet", price: 35000 }
        ]
    },
    {
        id: 8,
        title: "Console Gaming & Gathering",
        category: "gadget",
        brand: "PlayStation & Nintendo",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80",
        desc: "Hiburan game seru untuk gathering kepanitiaan, booth expo, atau santai.",
        subModels: [
            { name: "PlayStation 5 + 2 Stik DualSense & Game FC24/GTA", price: 100000 },
            { name: "Nintendo Switch OLED + 4 Joycon & Game Mario", price: 65000 }
        ]
    }
];

// Active State
let currentSelectedProduct = null;
let currentSelectedSubModel = null;
let userCategory = 'Mahasiswa Kampus';

// DOM Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    initEventListeners();
    setTodayDateDefault();
});

// Render Product Cards
function renderProducts(items) {
    const container = document.getElementById('product-container');
    if (!container) return;

    if (items.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fa-solid fa-box-open text-4xl text-slate-300 mb-3 block"></i>
                <p class="text-slate-500 font-medium">Perangkat yang kamu cari tidak ditemukan.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = items.map(item => {
        // Hitung harga termurah sebagai batas "Mulai Dari"
        const lowestPrice = Math.min(...item.subModels.map(m => m.price));

        return `
            <div class="bg-white rounded-3xl border border-slate-200/80 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
                <div>
                    <!-- Image Box -->
                    <div class="h-48 overflow-hidden bg-slate-100 relative">
                        <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        <div class="absolute top-3 left-3 bg-white/90 backdrop-blur text-brand-navy text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                            ${item.subModels.length} Tipe Tersedia
                        </div>
                        <div class="absolute top-3 right-3 bg-teal-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center shadow-sm">
                            <i class="fa-solid fa-star text-yellow-300 mr-1 text-[10px]"></i> ${item.rating}
                        </div>
                    </div>

                    <!-- Info Box -->
                    <div class="p-5">
                        <span class="text-[10px] font-bold text-brand-teal uppercase tracking-wider block mb-0.5">${item.brand}</span>
                        <h3 class="font-bold text-brand-navy text-base leading-snug line-clamp-1">${item.title}</h3>
                        <p class="text-slate-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">${item.desc}</p>
                    </div>
                </div>

                <!-- Footer Action Box -->
                <div class="px-5 pb-5 pt-0">
                    <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <div>
                            <span class="text-[10px] text-slate-400 block uppercase">Mulai Dari</span>
                            <span class="text-base font-extrabold text-brand-teal">Rp ${lowestPrice.toLocaleString('id-ID')} <span class="text-[10px] text-slate-400 font-normal">/hr</span></span>
                        </div>
                        <button onclick="openCheckoutModal(${item.id})" class="bg-brand-navy hover:bg-brand-teal text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center space-x-1.5 shadow-sm">
                            <i class="fa-solid fa-sliders"></i>
                            <span>Pilih Tipe</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Event Listeners Filter & Search
function initEventListeners() {
    const catButtons = document.querySelectorAll('.cat-btn');
    catButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            catButtons.forEach(b => {
                b.classList.remove('active', 'bg-brand-teal', 'text-white');
                b.classList.add('bg-white', 'text-slate-600');
            });
            btn.classList.add('active', 'bg-brand-teal', 'text-white');
            btn.classList.remove('bg-white', 'text-slate-600');

            const cat = btn.getAttribute('data-cat');
            if (cat === 'all') {
                renderProducts(products);
            } else {
                const filtered = products.filter(p => p.category === cat);
                renderProducts(filtered);
            }
        });
    });

    const searchInputs = [document.getElementById('global-search'), document.getElementById('mobile-search')];
    searchInputs.forEach(input => {
        if (input) {
            input.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                const filtered = products.filter(p => 
                    p.title.toLowerCase().includes(query) || 
                    p.desc.toLowerCase().includes(query) ||
                    p.brand.toLowerCase().includes(query)
                );
                renderProducts(filtered);
            });
        }
    });

    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

function setTodayDateDefault() {
    const dateInput = document.getElementById('rental-date');
    if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.value = tomorrow.toISOString().split('T')[0];
    }
}

/* ================= MODAL & CHECKOUT LOGIC ================= */

function openAuthModal() {
    openModal('auth-modal');
}
function closeAuthModal() {
    closeModal('auth-modal');
}
function handleAuthSubmit(e) {
    e.preventDefault();
    const catSelect = document.getElementById('auth-category').value;
    userCategory = catSelect;
    document.getElementById('nav-user-label').innerText = catSelect.split(' ')[0];
    showToast(`Berhasil masuk sebagai ${catSelect}`, 'success');
    closeAuthModal();
}

function openCheckoutModal(productId) {
    currentSelectedProduct = products.find(p => p.id === productId);
    if (!currentSelectedProduct) return;

    document.getElementById('checkout-item-img').src = currentSelectedProduct.image;
    document.getElementById('checkout-item-brand').innerText = currentSelectedProduct.brand;
    document.getElementById('checkout-item-name').innerText = currentSelectedProduct.title;

    // Populate Dropdown Tipe (SubModels)
    const selectEl = document.getElementById('sub-model-select');
    selectEl.innerHTML = currentSelectedProduct.subModels.map((sub, idx) => `
        <option value="${idx}">
            ${sub.name} - Rp ${sub.price.toLocaleString('id-ID')} / hari
        </option>
    `).join('');

    currentSelectedSubModel = currentSelectedProduct.subModels[0];
    document.getElementById('rental-days').value = 1;
    document.getElementById('delivery-method').value = 'kantor';
    document.getElementById('include-insurance').checked = false;

    calculateTotal();
    openModal('checkout-modal');
}

function onSubModelChange() {
    const idx = document.getElementById('sub-model-select').value;
    if (currentSelectedProduct && currentSelectedProduct.subModels[idx]) {
        currentSelectedSubModel = currentSelectedProduct.subModels[idx];
        calculateTotal();
    }
}

function closeCheckoutModal() {
    closeModal('checkout-modal');
}

function calculateTotal() {
    if (!currentSelectedSubModel) return;

    const days = parseInt(document.getElementById('rental-days').value) || 1;
    const delivery = document.getElementById('delivery-method').value;
    const insuranceChecked = document.getElementById('include-insurance').checked;

    let total = currentSelectedSubModel.price * days;
    if (delivery === 'kurir') total += 15000;
    if (insuranceChecked) total += (5000 * days);

    document.getElementById('checkout-total-price').innerText = `Rp ${total.toLocaleString('id-ID')}`;
}

function handleCheckoutSubmit(e) {
    e.preventDefault();
    if (!currentSelectedSubModel) return;

    const days = document.getElementById('rental-days').value;
    const date = document.getElementById('rental-date').value;
    const totalText = document.getElementById('checkout-total-price').innerText;

    const bookingCode = 'RIC-' + Math.floor(100000 + Math.random() * 900000);

    document.getElementById('ticket-code').innerText = bookingCode;
    document.getElementById('ticket-item-title').innerText = currentSelectedSubModel.name;
    document.getElementById('ticket-duration').innerText = `${days} Hari`;
    document.getElementById('ticket-date').innerText = date;
    document.getElementById('ticket-total-cost').innerText = totalText;

    closeCheckoutModal();
    openModal('ticket-modal');
    showToast('Pemesanan berhasil dikonfirmasi!', 'success');
}

function closeTicketModal() {
    closeModal('ticket-modal');
}

function copyTicketCode() {
    const code = document.getElementById('ticket-code').innerText;
    navigator.clipboard.writeText(code);
    showToast('Kode booking berhasil disalin!', 'info');
}

function simulatedDownloadTicket() {
    showToast('Tiket digital tersimpan di galeri perangkat Anda.', 'success');
}

/* ================= UTILITIES ================= */

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 200);
    }
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast-item pointer-events-auto bg-slate-900 text-white text-xs sm:text-sm px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center space-x-2.5`;
    
    let icon = '<i class="fa-solid fa-circle-info text-teal-400"></i>';
    if (type === 'success') icon = '<i class="fa-solid fa-circle-check text-emerald-400"></i>';

    toast.innerHTML = `${icon} <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}