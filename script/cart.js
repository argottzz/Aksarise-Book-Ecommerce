document.addEventListener("DOMContentLoaded", () => {
  const cartItemContainer = document.getElementById("cartItems");
  const ringkasanBelanja = document.getElementById("ringkasanBelanja");
  
  if (!cartItemContainer) return;

  let cartItem = JSON.parse(localStorage.getItem("cartItems") || "[]");

  cartItem = cartItem.map(item => ({
    ...item,
    checked: item.checked !== undefined ? item.checked : true,
    qty: item.qty || 1
  }));

  const formatRp = (val) => "Rp " + new Intl.NumberFormat("id-ID").format(val);

  const updateUI = () => {
    localStorage.setItem("cartItems", JSON.stringify(cartItem));
    renderCart();
  };

  const renderCart = () => {
    if (cartItem.length === 0) {
      cartItemContainer.innerHTML = `<p class="text-slate-500 p-4">Keranjang kosong.</p>`;
      ringkasanBelanja?.classList.add("hidden");
    } else {
      ringkasanBelanja?.classList.remove("hidden");
      cartItemContainer.innerHTML = cartItem.map((item, i) => `
        <article class="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl mb-4">
          <input type="checkbox" ${item.checked ? "checked" : ""} onchange="toggleCheck(${i})" class="w-5 h-5 accent-[#112D4E] cursor-pointer">
          <img src="${item.gambar}" class="w-20 h-24 object-cover rounded-lg bg-slate-100" />
          <div class="flex-1">
            <h2 class="font-semibold text-slate-800">${item.nama}</h2>
            <p class="font-bold text-slate-900 mt-1">${formatRp(item.harga)}</p>
          </div>
          <div class="flex items-center gap-4">
            <button onclick="updateQty(${i}, -1)" class="px-3 py-1 bg-slate-100 rounded">-</button>
            <span class="text-sm font-medium">${item.qty}</span>
            <button onclick="updateQty(${i}, 1)" class="px-3 py-1 bg-slate-100 rounded">+</button>
            <button onclick="hapusItem(${i})" class="text-red-500"><i data-feather="trash-2" class="w-4 h-4"></i></button>
          </div>
        </article>
      `).join("");

      const total = cartItem.filter(i => i.checked).reduce((sum, i) => sum + (i.harga * i.qty), 0);
      const count = cartItem.filter(i => i.checked).reduce((sum, i) => sum + i.qty, 0);
      document.getElementById("totalItem").textContent = count;
      document.getElementById("subtotalText").textContent = formatRp(total);
    }
    if (typeof feather !== "undefined") feather.replace();
  };

  window.toggleCheck = (i) => { 
    cartItem[i].checked = !cartItem[i].checked; 
    updateUI(); 
  };

  window.updateQty = (i, delta) => { 
    cartItem[i].qty = Math.max(1, cartItem[i].qty + delta); 
    updateUI(); 
  };

  window.hapusItem = (i) => { 
    cartItem.splice(i, 1); 
    updateUI(); 
  };
 
  window.prosesCheckout = () => {
    const terpilih = cartItem.filter(item => item.checked);
    if (terpilih.length === 0) return alert("Pilih minimal satu produk!");
    localStorage.setItem("checkoutItems", JSON.stringify(terpilih.map(it => it.id)));
    window.location.href = "checkout.html";
  };

  renderCart();
});