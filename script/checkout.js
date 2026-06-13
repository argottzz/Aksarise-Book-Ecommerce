document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("item");
  const totalEl = document.getElementById("total");
  const subtotalEl = document.getElementById("subtotalText");
  const emptyState = document.getElementById("tidakAdaProduk");
  const grid = document.getElementById("checkoutGrid");

  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  const checkoutSelection = JSON.parse(localStorage.getItem("checkoutItems") || "[]");

  const selectedItems = cartItems.filter(item => checkoutSelection.includes(item.id));

  if (selectedItems.length === 0) {
    grid?.classList.add("hidden");
    emptyState?.classList.remove("hidden");
  } else {
    const formatRp = (val) => "Rp " + new Intl.NumberFormat("id-ID").format(val);
    const subtotal = selectedItems.reduce((sum, item) => sum + (item.harga * item.qty), 0);
    const biayaLayanan = 1000;

    container.innerHTML = selectedItems.map(item => `
      <div class="flex items-start gap-4 py-4 border-b">
        <img src="${item.gambar}" class="w-20 h-20 object-cover rounded-lg" />
        <div class="flex-1">
          <p class="font-bold text-sm">${item.nama}</p>
          <p class="text-xs text-slate-500">Jumlah: ${item.qty}</p>
        </div>
        <p class="font-bold text-sm">${formatRp(item.harga * item.qty)}</p>
      </div>
    `).join("");

    subtotalEl.textContent = formatRp(subtotal);
    totalEl.textContent = formatRp(subtotal + biayaLayanan);
  }
});