document.addEventListener("DOMContentLoaded", function() {
  const container = document.getElementById("item");
  const totalEl = document.getElementById("total");
  const subtotalEl = document.getElementById("subtotalText");
  const emptyState = document.getElementById("tidakAdaProduk");
  const grid = document.getElementById("checkoutGrid");

  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  const checkoutSelection = JSON.parse(localStorage.getItem("checkoutItems") || "[]");

  let selectedItems = [];
  for (let i = 0; i < cartItems.length; i++) {
    let item = cartItems[i];
    if (checkoutSelection.includes(item.id)) {
      selectedItems.push(item);
    }
  }

  if (selectedItems.length === 0) {
    if (grid) grid.classList.add("hidden");
    if (emptyState) emptyState.classList.remove("hidden");
  } else {
    if (grid) grid.classList.remove("hidden");
    if (emptyState) emptyState.classList.add("hidden");

    function formatRp(val) {
      return "Rp " + new Intl.NumberFormat("id-ID").format(val);
    }

    let subtotal = 0;
    for (let i = 0; i < selectedItems.length; i++) {
      subtotal += selectedItems[i].harga * selectedItems[i].qty;
    }
    const biayaLayanan = 3000;

    if (container) {
      let htmlContent = "";
      for (let i = 0; i < selectedItems.length; i++) {
        let item = selectedItems[i];
        htmlContent += `
          <div class="flex items-start gap-4 py-4 border-b">
            <img src="${item.gambar}" class="w-20 h-20 object-cover rounded-lg" />
            <div class="flex-1">
              <p class="font-bold text-sm">${item.nama}</p>
              <p class="text-xs text-slate-500">Jumlah: ${item.qty}</p>
            </div>
            <p class="font-bold text-sm">${formatRp(item.harga * item.qty)}</p>
          </div>
        `;
      }
      container.innerHTML = htmlContent;
    }

    if (subtotalEl) subtotalEl.textContent = formatRp(subtotal);
    if (totalEl) totalEl.textContent = formatRp(subtotal + biayaLayanan);
  }

  
  const tombolBayar = document.getElementById("btnBayar") || document.querySelector("button[type='submit']");
  if (tombolBayar) {
    tombolBayar.addEventListener("click", selesaikanPembayaran);
  }

  const paymentRadios = document.querySelectorAll('input[name="payment"]');
  const paymentLabels = document.querySelectorAll('.payment-option');

  function updatePaymentStyle() {
    for (let i = 0; i < paymentLabels.length; i++) {
      paymentLabels[i].classList.remove(
        'border-[#112D4E]',
        'bg-blue-50',
        'text-[#112D4E]',
        'font-bold'
      );
    }

    const selected = document.querySelector('input[name="payment"]:checked');
    if (selected) {
      const label = document.querySelector(`label[for="${selected.id}"]`);
      if (label) {
        label.classList.add(
          'border-[#112D4E]',
          'bg-blue-50',
          'text-[#112D4E]',
          'font-bold'
        );
      }
    }
  }

  for (let i = 0; i < paymentRadios.length; i++) {
    paymentRadios[i].addEventListener('change', updatePaymentStyle);
  }

  updatePaymentStyle();
});

function selesaikanPembayaran(event) {
  if (event) event.preventDefault();

  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  const checkoutSelection = JSON.parse(localStorage.getItem("checkoutItems") || "[]");

  let barangYangDibeli = [];
  for (let i = 0; i < cartItems.length; i++) {
    if (checkoutSelection.includes(cartItems[i].id)) {
      barangYangDibeli.push(cartItems[i]);
    }
  }
  
  if (barangYangDibeli.length === 0) {
    alert("Tidak ada barang yang diproses.");
    return;
  }

  let subtotal = 0;
  for (let i = 0; i < barangYangDibeli.length; i++) {
    subtotal += barangYangDibeli[i].harga * barangYangDibeli[i].qty;
  }
  
  const biayaLayanan = 3000;
  const totalFinal = subtotal + biayaLayanan;

  const metodeTerpilih = document.querySelector('input[name="payment"]:checked');
  const namaMetode = metodeTerpilih ? metodeTerpilih.value : "Belum memilih metode";

  const dataTransaksi = {
    items: barangYangDibeli,
    subtotal: subtotal,
    biayaLayanan: biayaLayanan,
    totalAkhir: totalFinal,
    metodePembayaran: namaMetode,
    waktu: new Date().toLocaleString("id-ID")
  };
  localStorage.setItem("lastTransaction", JSON.stringify(dataTransaksi));

  let sisaKeranjang = [];
  for (let i = 0; i < cartItems.length; i++) {
    if (!checkoutSelection.includes(cartItems[i].id)) {
      sisaKeranjang.push(cartItems[i]);
    }
  }
  localStorage.setItem("cartItems", JSON.stringify(sisaKeranjang));
  localStorage.removeItem("checkoutItems");

  window.location.href = "pembayaran.html"; 
}