document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.getElementById("productGrid");
  const categoryButtons = document.querySelectorAll(".category-btn");
  const categoryLabel = document.getElementById("categoryLabel");

  let allProducts = [];
  let activeCategory = null;

  const formatRp = (value) => "Rp " + new Intl.NumberFormat("id-ID").format(value);

  fetch("../json/produk.json")
    .then((response) => response.json())
    .then((data) => {
      allProducts = data;
      const categoryParam = new URLSearchParams(window.location.search).get("kategori");
      categoryParam ? activateCategoryFilter(categoryParam) : showEmptyInstruction();
    })
    .catch((error) => {
      console.log("Error:", error);
      productGrid.innerHTML = '<div class="col-span-full text-center py-12">Gagal memuat data.</div>';
    });

  const showEmptyInstruction = () => {
    categoryLabel.textContent = "Belum Ada Kategori Terpilih";
    productGrid.innerHTML = '<div class="col-span-full text-center py-20">Silakan pilih kategori di atas.</div>';
  };

  const renderProducts = (products) => {
    productGrid.innerHTML = "";
    if (products.length === 0) {
      productGrid.innerHTML = '<div class="col-span-full text-center py-16">Tidak ada produk ditemukan.</div>';
      return;
    }

    products.forEach((product) => {
      const card = document.createElement("a");
      card.href = `detailProduk.html?id=${product.id}`;
      card.className = "group bg-white border border-slate-100 rounded-2xl p-4 w-full max-w-55 snap-start hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-sm relative";
      card.innerHTML = `
        <div class="h-56 w-full bg-slate-50 overflow-hidden relative p-3 flex items-center justify-center rounded-xl">
          <img src="${product.gambar}" alt="${product.nama}" class="max-w-full max-h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300">
        </div>
        <div class="mt-4 flex flex-col grow justify-between">
          <div>
            <h2 class="font-bold text-base text-[#112D4E] line-clamp-2 leading-5 group-hover:text-[#0F4C75] transition-colors">${product.nama}</h2>
            <p class="text-xs text-slate-500 line-clamp-3 mt-1.5 leading-relaxed">${product.deskripsi || "Tidak ada deskripsi."}</p>
          </div>
          <div class="flex items-center justify-between pt-4 mt-3 border-t border-slate-50">
            <p class="font-bold text-sm text-[#0F4C75]">${formatRp(product.harga)}</p>
            <span class="text-xs font-semibold bg-amber-50 text-amber-600 px-2 py-1 rounded-md flex items-center gap-1">⭐ ${Number(product.rating || 0).toFixed(1)}</span>
          </div>
        </div>`;
      productGrid.appendChild(card);
    });
  };

  const resetActiveStyles = () => {
    categoryButtons.forEach((btn) => (btn.style.backgroundColor = "white"));
  };

  const activateCategoryFilter = (categoryName) => {
    activeCategory = categoryName;
    categoryLabel.textContent = `Kategori: ${categoryName}`;
    resetActiveStyles();
    categoryButtons.forEach((btn) => {
      if (btn.getAttribute("data-category") === categoryName) btn.style.backgroundColor = "#e0e7ff";
    });
    renderProducts(allProducts.filter((p) => p.kategori === categoryName));
  };

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selected = button.getAttribute("data-category");
      if (activeCategory === selected) {
        activeCategory = null;
        resetActiveStyles();
        showEmptyInstruction();
        window.history.replaceState({}, "", window.location.pathname);
      } else {
        activateCategoryFilter(selected);
        window.history.replaceState({}, "", `?kategori=${selected}`);
      }
    });
  });
});