document.addEventListener("DOMContentLoaded", async () => {
  feather.replace();

  const container = document.getElementById("detailProduk");
  const terkaitContainer = document.getElementById("produkBestSeller");
  const pilihanContainer = document.getElementById("produkPilihan");

  const id = new URLSearchParams(window.location.search).get("id");

  const addToCart = (produk) => {
    try {
      let cart = JSON.parse(localStorage.getItem("cartItems") || "[]");
      if (!Array.isArray(cart)) cart = [];

      const index = cart.findIndex((item) => String(item.id) === String(produk.id));

      if (index >= 0) {
        cart[index].qty = (cart[index].qty || 1) + 1;
      } else {
        cart.push({
          ...produk,
          qty: 1,
          checked: true,
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(cart));
      return true;
    } catch (error) {
      console.error("Error adding to cart:", error);
      return false;
    }
  };

  try {
    const response = await fetch("../json/produk.json");
    const data = await response.json();
    const produk = data.find((item) => String(item.id) === String(id));

    if (!produk) {
      container.innerHTML = `<div class="bg-white p-10 rounded-3xl text-center"><p>Produk tidak ditemukan.</p></div>`;
      return;
    }

    container.innerHTML = `
      <div class="border border-[#DDE2F0] rounded-[28px] p-5">
        <div class="flex gap-5">
          <div class="w-45 shrink-0 bg-[#F5F7FF] rounded-[22px] p-3 flex items-center justify-center relative">
            <div class="absolute -top-2 -left-2 bg-orange-500 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold text-xs">${produk.rating || 0}</div>
            <img src="${produk.gambar}" alt="${produk.nama}" class="w-full h-62.5 object-contain rounded-xl">
          </div>
          <div class="flex flex-col flex-1">
            <p class="text-sm font-semibold text-[#0F4C75]">${produk.penulis}</p>
            <h1 class="mt-1 text-[30px] font-bold text-[#2B2363]">${produk.nama}</h1>
            <p class="mt-3 text-2xl font-bold text-[#0F4C75]">Rp ${produk.harga.toLocaleString("id-ID")}</p>
            <p class="mt-4 text-sm text-gray-500">${produk.deskripsi}</p>
            <div class="mt-auto pt-6 flex gap-3">
              <a href="cart.html" id="btnBeli" 
                class="flex-1 flex items-center justify-center gap-2 bg-[#112D4E] hover:bg-[#0F4C75] text-white font-semibold py-3.5 px-6 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg active:scale-95">
                <i data-feather="shopping-bag" class="w-4 h-4"></i>
                Beli Sekarang
              </a>
              <button id="btnCart" class="w-14 h-14 flex items-center justify-center border border-[#0F4C75] rounded-2xl text-[#0F4C75] cursor-pointer hover:bg-slate-50 transition">
                <i data-feather="shopping-cart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Event Listener untuk tombol "Tambah ke Keranjang"
    document.getElementById("btnCart").addEventListener("click", () => {
      if (addToCart(produk)) {
        const alertBox = document.createElement("div");
        alertBox.className = "fixed bottom-4 right-4 bg-slate-900 text-white px-4 py-3 rounded-2xl z-50 shadow-lg";
        alertBox.textContent = "Produk ditambahkan ke keranjang.";
        document.body.appendChild(alertBox);
        setTimeout(() => alertBox.remove(), 1600);
      }
    });

    document.getElementById("btnBeli").addEventListener("click", (e) => {
      e.preventDefault(); 
      if (addToCart(produk)) {
        window.location.href = "cart.html";
      }
    });

    const renderCard = (item) => `
      <a href="detailProduk.html?id=${item.id}" class="group border border-slate-100 rounded-2xl p-4 w-full min-w-45 max-w-55 snap-start hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-sm shrink-0">
        <div class="h-52 w-full bg-slate-50 overflow-hidden relative p-3 flex items-center justify-center rounded-xl">
          <img src="${item.gambar}" alt="${item.nama}" class="max-w-full max-h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300">
        </div>
        <div class="mt-4 flex flex-col grow justify-between">
          <div>
            <h2 class="font-bold text-sm sm:text-base text-[#112D4E] line-clamp-2 leading-5 group-hover:text-[#0F4C75] transition-colors">${item.nama}</h2>
            <p class="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">${item.deskripsi || "Tidak ada deskripsi tersedia."}</p>
          </div>
          <div class="flex items-center justify-between pt-3 mt-3 border-t border-slate-50">
            <p class="font-bold text-sm text-[#0F4C75]">Rp ${Number(item.harga).toLocaleString("id-ID")}</p>
            <span class="text-[11px] font-semibold bg-amber-50 text-amber-600 px-2 py-0.5 rounded-md flex items-center gap-1">⭐ ${Number(item.rating || 0).toFixed(1)}</span>
          </div>
        </div>
      </a>
    `;

    if (terkaitContainer) {
      terkaitContainer.innerHTML = data
        .filter((i) => i.kategori === produk.kategori && i.id !== produk.id)
        .slice(0, 10)
        .map(renderCard)
        .join("");
    }
    if (pilihanContainer) {
      pilihanContainer.innerHTML = data
        .filter((i) => i.id !== produk.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 10)
        .map(renderCard)
        .join("");
    }

    feather.replace();
  } catch (err) {
    console.error("Error loading product detail:", err);
  }
});