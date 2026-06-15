document.addEventListener("DOMContentLoaded", function () {
  var containerBarang = document.getElementById("daftarBarangDibeli");
  var totalNominalEl = document.getElementById("totalNominalTx");
  var txIdEl = document.getElementById("txId");
  
  var metodePembayaranEl = document.getElementById("metodePembayaranTx"); 

  var dataTransaksi = JSON.parse(localStorage.getItem("lastTransaction") || "null");

  if (!dataTransaksi || !dataTransaksi.items || dataTransaksi.items.length === 0) {
    if (containerBarang) {
      containerBarang.innerHTML = '<p class="text-slate-400 text-center py-1">Tidak ada rincian produk.</p>';
    }
    return;
  }

  var lastTxItems = dataTransaksi.items;

  function formatRupiah(angka) {
    return "Rp " + angka.toLocaleString("id-ID");
  }

  var subtotal = 0;
  for (var i = 0; i < lastTxItems.length; i++) {
    subtotal += lastTxItems[i].harga * lastTxItems[i].qty;
  }
  
  var biayaLayanan = dataTransaksi.biayaLayanan || 1000;
  var totalAkhir = subtotal + biayaLayanan; 

  if (containerBarang) {
    containerBarang.innerHTML = ""; 
    
    for (var j = 0; j < lastTxItems.length; j++) {
      var item = lastTxItems[j];
      var totalHargaItem = item.harga * item.qty;
      
      containerBarang.innerHTML += `
        <div class="flex justify-between items-start text-slate-600 gap-4 py-1">
          <span class="flex-1 leading-tight">${item.nama} <b class="text-slate-400">x${item.qty}</b></span>
          <span class="font-medium text-slate-700">${formatRupiah(totalHargaItem)}</span>
        </div>
      `;
    }
  }

  if (totalNominalEl) {
    totalNominalEl.textContent = formatRupiah(totalAkhir);
  }

  if (metodePembayaranEl && dataTransaksi.metodePembayaran) {
    metodePembayaranEl.textContent = dataTransaksi.metodePembayaran;
  }

  if (txIdEl) {
    var nomorAcak = Math.floor(100000 + Math.random() * 900000);
    txIdEl.textContent = "#AKS-" + nomorAcak;
  }
});