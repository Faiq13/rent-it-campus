const products=[
{id:1,title:"Proyektor & Layar Portable Set",category:"event",brand:"Epson Seri EB",rating:4.8,stock:3,isPeakSeason:true,image:"https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=600&q=80",desc:"Untuk seminar & nobar.",subModels:[{name:"Epson EB-X500 (3600 Lumens)",price:75000},{name:"Epson EB-X51 (3800 Lumens)",price:85000}],addons:[{name:"Layar Tripod 100 inch",price:25000},{name:"Kabel HDMI 10m",price:10000},{name:"Pointer Laser Presenter",price:10000}]},
{id:2,title:"Standing Roll Up Banner",category:"event",brand:"Alumunium Display",rating:4.7,stock:10,isPeakSeason:false,image:"https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=600&q=80",desc:"Untuk bazar & event BEM.",subModels:[{name:"Roll Up 60x160cm",price:20000},{name:"Roll Up Premium 80x200cm",price:25000}],addons:[{name:"Jasa Cetak Banner 1 sisi",price:45000},{name:"Lampu Sorot Jepit",price:15000}]},
{id:3,title:"Sound System & Mic Wireless",category:"event",brand:"Baretone Audio",rating:4.9,stock:4,isPeakSeason:true,image:"https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80",desc:"Troly + 2 mic wireless.",subModels:[{name:"Baretone MAX12AL 500W",price:90000},{name:"Baretone MAX15AL 800W",price:120000}],addons:[{name:"Mic Wireless Tambahan",price:20000},{name:"Kabel Rol 20m",price:10000}]},
{id:4,title:"Laptop Productivity & Coding",category:"laptop",brand:"Lenovo & ASUS",rating:4.9,stock:5,isPeakSeason:true,image:"https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80",desc:"Untuk TA & koding.",subModels:[{name:"ThinkPad E14 i5 Gen12 16GB",price:55000},{name:"VivoBook 14 i5 Gen11 8GB",price:45000},{name:"MacBook Air M1",price:85000}],addons:[{name:"SSD Eksternal 512GB",price:15000},{name:"Mouse Wireless + Cooling Pad",price:10000}]},
{id:5,title:"Kamera Mirrorless",category:"kamera",brand:"Sony & Canon",rating:4.9,stock:2,isPeakSeason:true,image:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",desc:"Dokumentasi sinematik.",subModels:[{name:"Sony A6400 Kit 16-50mm",price:90000},{name:"Sony A7 III Full-Frame",price:140000}],addons:[{name:"Tripod + Lighting LED",price:20000},{name:"Mic Clip-on Wireless",price:25000},{name:"Lensa Fix 50mm",price:30000}]},
{id:6,title:"Printer InkTank",category:"laptop",brand:"Epson & Canon",rating:4.6,stock:8,isPeakSeason:false,image:"https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=600&q=80",desc:"Cetak skripsi.",subModels:[{name:"Epson L3210",price:35000}],addons:[{name:"Kertas A4 1 rim",price:15000},{name:"Jilid + Laminating",price:10000}]},
{id:7,title:"Tablet & Pen Pad",category:"gadget",brand:"Apple & Wacom",rating:4.9,stock:6,isPeakSeason:false,image:"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80",desc:"Ilustrasi DKV.",subModels:[{name:"iPad Air 5 + Pencil 2",price:75000}],addons:[{name:"Paperlike + Glove",price:10000},{name:"Hub USB-C 6in1",price:15000}]},
{id:8,title:"Console Gaming",category:"gadget",brand:"PlayStation",rating:4.9,stock:0,isPeakSeason:false,image:"https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80",desc:"Gathering & expo.",subModels:[{name:"PS5 + 2 Stik",price:100000}],addons:[{name:"Stik Tambahan + Game",price:25000},{name:"TV 32 inch Portable",price:40000}]}
];

let currentSelectedProduct=null,currentSelectedSubModel=null,lastBooking=null;
const getUsers=()=>JSON.parse(localStorage.getItem('ric_users')||'[]');
const saveUsers=u=>localStorage.setItem('ric_users',JSON.stringify(u));
const getSession=()=>JSON.parse(localStorage.getItem('ric_session')||'null');

document.addEventListener('DOMContentLoaded',()=>{renderProducts(products);initEventListeners();setTodayDateDefault();initPasswordToggle();initLoginPlaceholders();updateAuthUI();});

function renderProducts(items){
 const c=document.getElementById('product-container');if(!c)return;
 c.innerHTML=items.map(item=>{
  const low=Math.min(...item.subModels.map(m=>m.price));
  const stock=item.stock>0?`● Stok: ${item.stock}`:`● Habis`;
  const peak=item.isPeakSeason?`Peak +20%`:`Hemat`;
  return `<div class="bg-white rounded-[2rem] border overflow-hidden flex flex-col"><div class="relative aspect-[4/3] bg-slate-100"><img src="${item.image}" class="w-full h-full object-cover"><div class="absolute top-4 left-4 flex flex-col gap-1"><span class="bg-white/90 text-[10px] font-bold px-3 py-1 rounded-full">${item.brand}</span><span class="bg-white/90 text-[10px] font-bold px-3 py-1 rounded-full">${stock}</span><span class="bg-amber-300 text-[10px] font-bold px-3 py-1 rounded-full">${peak}</span></div></div><div class="p-6 flex flex-col flex-grow"><h3 class="font-bold">${item.title}</h3><p class="text-xs text-slate-500">${item.desc}</p><p class="text-[11px] mt-2 text-slate-500">Add-on: ${item.addons.map(a=>a.name).join(', ')}</p><div class="mt-auto pt-4 border-t flex justify-between items-center"><span class="font-extrabold text-brand-teal">Rp ${low.toLocaleString('id-ID')}/hari</span><button onclick="openCheckoutModal(${item.id})" class="bg-slate-100 hover:bg-brand-teal hover:text-white p-3 rounded-2xl"><i class="fa-solid fa-arrow-right"></i></button></div></div></div>`;
 }).join('');
}
function initEventListeners(){
 document.querySelectorAll('.cat-btn').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.cat-btn').forEach(b=>{b.classList.remove('bg-brand-teal','text-white');b.classList.add('bg-white');});
  btn.classList.add('bg-brand-teal','text-white');
  const cat=btn.dataset.cat;renderProducts(cat==='all'?products:products.filter(p=>p.category===cat));
 }));
 ['global-search','mobile-search'].forEach(id=>{const el=document.getElementById(id);if(el)el.addEventListener('input',e=>{const q=e.target.value.toLowerCase();renderProducts(products.filter(p=>p.title.toLowerCase().includes(q)||p.brand.toLowerCase().includes(q)));});});
 const mmBtn=document.getElementById('mobile-menu-btn'),mmMenu=document.getElementById('mobile-menu');if(mmBtn&&mmMenu)mmBtn.onclick=()=>mmMenu.classList.toggle('hidden');
}
function setTodayDateDefault(){const d=document.getElementById('rental-date');if(d){const t=new Date();t.setDate(t.getDate()+1);d.value=t.toISOString().split('T')[0];}}

// AUTH SIMPAN AKUN
function switchAuthTab(t){
 document.getElementById('form-login').classList.toggle('hidden',t!=='login');
 document.getElementById('form-register').classList.toggle('hidden',t!=='register');
 document.getElementById('tab-login').className=t==='login'?'py-2 rounded-lg text-sm font-bold bg-white shadow':'py-2 rounded-lg text-sm font-bold text-slate-500';
 document.getElementById('tab-register').className=t==='register'?'py-2 rounded-lg text-sm font-bold bg-white shadow':'py-2 rounded-lg text-sm font-bold text-slate-500';
}
function handleRegister(e){
 e.preventDefault();
 const name=document.getElementById('reg-name').value,email=document.getElementById('reg-email').value,pass=document.getElementById('reg-pass').value,cat=document.getElementById('reg-category').value;
 let users=getUsers();if(users.find(u=>u.email===email))return showToast('Email sudah terdaftar, silakan Masuk','info');
 users.push({name,email,pass,category:cat,points:50});saveUsers(users);
 localStorage.setItem('ric_session',JSON.stringify({email,name,category:cat,points:50}));
 updateAuthUI();closeAuthModal();showToast(`Akun ${name} tersimpan & login! +50 poin`,'success');
}
function handleLogin(e){
 e.preventDefault();
 const email=document.getElementById('login-email').value,pass=document.getElementById('login-pass').value;
 const u=getUsers().find(u=>u.email===email&&u.pass===pass);if(!u)return showToast('Email/password salah','info');
 localStorage.setItem('ric_session',JSON.stringify({email:u.email,name:u.name,category:u.category,points:u.points}));
 updateAuthUI();closeAuthModal();showToast(`Selamat datang ${u.name}!`,'success');
 // Berhasil login di halaman login.html -> kembali ke beranda
 if(isLoginPage())setTimeout(()=>{window.location.href='index.html';},700);
}
function isLoginPage(){return !!document.querySelector('.login-page')||/login\.html$/i.test(window.location.pathname);}
// Halaman auth (login/register): tombol ikon mata untuk tampilkan/sembunyikan password.
// Input diambil dari .form-input-wrap terdekat, jadi berlaku untuk #login-pass maupun #register-password.
function initPasswordToggle(){
 document.querySelectorAll('.form-toggle-password').forEach((btn)=>{
  const wrap=btn.closest('.form-input-wrap')||btn.parentElement;
  const input=wrap?wrap.querySelector('input'):null;if(!input)return;
  const icon=btn.querySelector('i');
  const sync=()=>{
   const hidden=input.type==='password';
   btn.setAttribute('aria-label',hidden?'Tampilkan password':'Sembunyikan password');
   btn.setAttribute('aria-pressed',String(!hidden));
   if(icon){icon.classList.toggle('fa-eye',hidden);icon.classList.toggle('fa-eye-slash',!hidden);}
  };
  btn.addEventListener('click',()=>{input.type=input.type==='password'?'text':'password';sync();});
  sync();
 });
}
// Halaman auth: tombol Google belum punya OAuth. Ditangkap agar tidak berpindah
// halaman tanpa hasil, lalu beri info lewat toast.
function initLoginPlaceholders(){
 const google=document.querySelector('.google-btn');
 if(google)google.addEventListener('click',(e)=>{
  e.preventDefault();
  showToast('Fitur Login dengan Google sedang dalam pengembangan','info');
 });
}
// Halaman register.html: simpan akun ke ric_users (localStorage) lalu arahkan ke login.
function handleRegisterPage(e){
 e.preventDefault();
 const nameEl=document.getElementById('register-name');
 const emailEl=document.getElementById('register-email');
 const passEl=document.getElementById('register-password');
 if(!nameEl||!emailEl||!passEl)return;
 const name=nameEl.value.trim(),email=emailEl.value.trim(),pass=passEl.value;
 if(!name||!email||!pass)return showToast('Lengkapi nama, email, dan password dulu','info');
 const users=getUsers();
 if(users.find(u=>u.email===email))return showToast('Email sudah terdaftar, silakan login','info');
 users.push({name,email,pass,category:'Mahasiswa Kampus',points:50});
 saveUsers(users);
 showToast('Pendaftaran berhasil, silakan login','success');
 setTimeout(()=>{window.location.href='login.html';},700);
}
function handleLogout(){localStorage.removeItem('ric_session');updateAuthUI();showToast('Logout berhasil','info');}
function updateAuthUI(){
 const s=getSession();
 const html=s?`<span class="text-sm font-bold">Hi, ${s.name.split(' ')[0]} (${s.points} poin)</span><button onclick="handleLogout()" class="bg-slate-100 px-4 py-2 rounded-full text-xs font-bold">Logout</button>`:`<a href="login.html" class="inline-block bg-brand-navy text-white px-6 py-2.5 rounded-full text-sm font-semibold">Masuk / Daftar</a>`;
 const nav=document.getElementById('nav-auth-area');if(nav)nav.innerHTML=html;
 const navMobile=document.getElementById('nav-auth-area-mobile');if(navMobile)navMobile.innerHTML=html;
 const lp=document.getElementById('loyalty-point-display');if(lp)lp.innerText=s?`${s.points} Poin (${s.name})`:'Login dulu';
}
function openAuthModal(){openModal('auth-modal');}function closeAuthModal(){closeModal('auth-modal');}

// CHECKOUT
function openCheckoutModal(id){
 currentSelectedProduct=products.find(p=>p.id===id);if(!currentSelectedProduct)return;
 document.getElementById('checkout-item-img').src=currentSelectedProduct.image;
 document.getElementById('checkout-item-brand').innerText=currentSelectedProduct.brand;
 document.getElementById('checkout-item-name').innerText=currentSelectedProduct.title;
 document.getElementById('sub-model-select').innerHTML=currentSelectedProduct.subModels.map((s,i)=>`<option value="${i}">${s.name} - Rp ${s.price.toLocaleString('id-ID')}</option>`).join('');
 currentSelectedSubModel=currentSelectedProduct.subModels[0];
 document.getElementById('addon-list').innerHTML=currentSelectedProduct.addons.map((a,i)=>`<label class="flex justify-between text-xs bg-white border rounded-lg px-3 py-2"><span><input type="checkbox" class="addon-check mr-2" value="${a.price}" onchange="calculateTotal()">${a.name}</span><b>+Rp ${a.price.toLocaleString('id-ID')}</b></label>`).join('');
 document.getElementById('rental-days').value=1;document.getElementById('include-insurance').checked=false;
 calculateTotal();openModal('checkout-modal');
}
function onSubModelChange(){currentSelectedSubModel=currentSelectedProduct.subModels[document.getElementById('sub-model-select').value];calculateTotal();}
function closeCheckoutModal(){closeModal('checkout-modal');}
function calculateTotal(){
 if(!currentSelectedSubModel)return;
 const days=parseInt(document.getElementById('rental-days').value)||1;
 let base=currentSelectedSubModel.price;if(currentSelectedProduct.isPeakSeason)base=Math.round(base*1.2);
 let total=base*days;
 if(document.getElementById('hub-select').value.includes('Kurir'))total+=15000;
 if(document.getElementById('include-insurance').checked)total+=5000*days;
 document.querySelectorAll('.addon-check:checked').forEach(el=>total+=parseInt(el.value)*days);
 const s=getSession();let info=currentSelectedProduct.isPeakSeason?' • Peak Season':' • Hemat';
 if(s&&s.points>=100){const d=Math.round(total*0.1);total-=d;info+=` (Diskon loyalty -Rp ${d.toLocaleString('id-ID')})`;}
 document.getElementById('checkout-total-price').innerText=`Rp ${total.toLocaleString('id-ID')}`;
 document.getElementById('checkout-discount-info').innerText=info;
}
function handleCheckoutSubmit(e){
 e.preventDefault();
 const s=getSession();if(!s){closeCheckoutModal();openAuthModal();return showToast('Daftar/Masuk dulu agar kontrak atas nama kamu','info');}
 const days=document.getElementById('rental-days').value,date=document.getElementById('rental-date').value,hub=document.getElementById('hub-select').value,total=document.getElementById('checkout-total-price').innerText;
 const code='RIC-'+Math.floor(100000+Math.random()*900000);
 const addons=[...document.querySelectorAll('.addon-check:checked')].map(el=>el.parentElement.innerText.trim());
 lastBooking={code,name:s.name,email:s.email,item:currentSelectedSubModel.name,brand:currentSelectedProduct.brand,days,date,hub,total,addons};
 document.getElementById('ticket-code').innerText=code;
 document.getElementById('ticket-item-title').innerText=currentSelectedSubModel.name;
 document.getElementById('ticket-duration').innerText=days+' Hari';
 document.getElementById('ticket-date').innerText=date;
 document.getElementById('ticket-total-cost').innerText=total;
 // tambah poin
 let users=getUsers();let u=users.find(u=>u.email===s.email);if(u){u.points+=10;saveUsers(users);s.points=u.points;localStorage.setItem('ric_session',JSON.stringify(s));updateAuthUI();}
 document.getElementById('contract-text').classList.add('hidden');
 closeCheckoutModal();openModal('ticket-modal');showToast('E-Tiket + Kontrak diterbitkan!','success');
}
function buildContractText(){
 if(!lastBooking)return '';
 return `SURAT PERJANJIAN SEWA - RENT IT CAMPUS\nNo: ${lastBooking.code}\n\nPihak 1 (Penyedia): Rent It Campus, Pos PKM Lt.1\nPihak 2 (Penyewa): ${lastBooking.name} (${lastBooking.email})\n\nBarang: ${lastBooking.brand} - ${lastBooking.item}\nAdd-on: ${lastBooking.addons.join('; ')||'-'}\nDurasi: ${lastBooking.days} hari mulai ${lastBooking.date}\nHub: ${lastBooking.hub}\nTotal: ${lastBooking.total}\n\nPasal 1: Penyewa wajib tunjukkan KTM/KTP fisik + E-Tiket saat ambil.\nPasal 2: Keterlambatan denda 50%/hari. Kerusakan ringan cover asuransi jika ambil proteksi.\nPasal 3: Kehilangan/gadai = ganti 100% harga pasar + proses kampus.\nPasal 4: Unit diganti 2 jam jika malfungsi (Priority Support).\n\nTanda tangan digital sah. Unduh & bawa saat pengambilan.\n\nPenyewa: ${lastBooking.name}`;
}
function previewContract(){
 if(!lastBooking)return showToast('Belum ada booking untuk dipreview','info');
 const api=window.RIC&&window.RIC.contract;
 if(!api)return showToast('Generator PDF belum termuat — muat ulang halaman','info');
 try{
  const res=api.open(buildPdfBooking());
  showToast(res&&res.opened?'Preview PDF dibuka di tab baru':(res&&res.downloaded?'Popup diblokir — PDF diunduh otomatis':'Preview gagal dibuka'),'success');
 }catch(err){console.error('[RIC] preview PDF gagal',err);showToast('Gagal membuat preview PDF: '+err.message,'info');}
}
function downloadContract(){
 if(!lastBooking)return showToast('Belum ada booking untuk diunduh','info');
 const api=window.RIC&&window.RIC.contract;
 if(!api)return showToast('Generator PDF belum termuat — muat ulang halaman','info');
 try{
  const name=api.download(buildPdfBooking());
  showToast('Kontrak diunduh: '+name,'success');
 }catch(err){console.error('[RIC] unduh PDF gagal',err);showToast('Gagal mengunduh PDF: '+err.message,'info');}
}
/** Susun objek booking sesuai struktur yang dibaca js/contract.js dari data lastBooking. */
function buildPdfBooking(){
 const b=lastBooking;
 const days=Number(b.days)||1;
 const sub=currentSelectedSubModel,prod=currentSelectedProduct;
 let daily=sub?sub.price:0;
 if(sub&&prod&&prod.isPeakSeason)daily=Math.round(daily*1.2);
 if(!daily){
  const totalNum=parseInt(String(b.total).replace(/[^0-9]/g,''),10)||0;
  daily=days>0?Math.round(totalNum/days):totalNum;
 }
 const addons=(prod?prod.addons:[]).filter(a=>(b.addons||[]).indexOf(a.name)>-1).map(a=>({name:a.name,price:a.price}));
 const lines=[{title:prod?prod.title:b.item,variantName:b.item,qty:1,unitPrice:daily,addons:addons}];
 const subtotal=daily*days+addons.reduce((s,a)=>s+(a.price*days),0);
 const totalNum=parseInt(String(b.total).replace(/[^0-9]/g,''),10)||subtotal;
 const key=String(b.code||'')+String(b.total||'')+days+String(b.date||'');
 let h=0;for(let i=0;i<key.length;i++){h=((h<<5)-h+key.charCodeAt(i))|0;}
 return {
  code:b.code,
  createdAt:new Date().toISOString(),
  date:b.date,
  days:days,
  customer:{name:b.name,email:b.email},
  hub:{name:b.hub},
  items:lines,
  quote:{lines:lines,subtotal:subtotal,promo:null,deposit:0,total:totalNum,peak:!!(prod&&prod.isPeakSeason)},
  hash:(h>>>0).toString(16).padStart(8,'0')
 };
}
function closeTicketModal(){closeModal('ticket-modal');}
function copyTicketCode(){navigator.clipboard.writeText(document.getElementById('ticket-code').innerText);showToast('Kode disalin!','info');}
function openModal(id){const m=document.getElementById(id);if(!m)return;m.classList.remove('hidden');setTimeout(()=>m.classList.add('active'),10);}
function closeModal(id){const m=document.getElementById(id);if(!m)return;m.classList.remove('active');setTimeout(()=>m.classList.add('hidden'),200);}
function showToast(msg,type='info'){const c=document.getElementById('toast-container');const t=document.createElement('div');t.className='toast-item bg-slate-900 text-white text-sm px-4 py-3 rounded-2xl flex space-x-2';t.innerHTML=`<span>${msg}</span>`;c.appendChild(t);setTimeout(()=>t.remove(),3000);}
