document.addEventListener("DOMContentLoaded", function() {
  fetch("../json/produk.json")
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      function renderProduk(items, targetId, useRank) {
        const container = document.getElementById(targetId);
        if (!container) return;

        container.innerHTML = "";

        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const rankHtml = useRank ? '<div class="absolute top-2 left-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-[#112D4E] text-xs font-bold text-white shadow-md border border-white/20">' + (i + 1) + '</div>' : '';
          const desc = item.deskripsi || "Tidak ada deskripsi";
          const harga = Number(item.harga).toLocaleString("id-ID");
          const rating = Number(item.rating || 0).toFixed(1);

          const card = document.createElement("a");
          card.href = "login.html";
          card.className = "group bg-white border border-slate-100 rounded-2xl p-4 w-full max-w-55 snap-start hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-sm relative";
          
          card.innerHTML = rankHtml + 
            '<div class="h-56 w-full bg-slate-50 overflow-hidden relative p-3 flex items-center justify-center rounded-xl">' +
              '<img src="' + item.gambar + '" alt="' + item.nama + '" class="max-w-full max-h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300">' +
            '</div>' +
            '<div class="mt-4 flex flex-col grow justify-between">' +
              '<div>' +
                '<h2 class="font-bold text-base text-[#112D4E] line-clamp-2 leading-5 group-hover:text-[#0F4C75] transition-colors">' + item.nama + '</h2>' +
                '<p class="text-xs text-slate-500 line-clamp-3 mt-1.5 leading-relaxed">' + desc + '</p>' +
              '</div>' +
              '<div class="flex items-center justify-between pt-4 mt-3 border-t border-slate-50">' +
                '<p class="font-bold text-sm text-[#0F4C75]">Rp ' + harga + '</p>' +
                '<span class="text-xs font-semibold bg-amber-50 text-amber-600 px-2 py-1 rounded-md flex items-center gap-1">⭐ ' + rating + '</span>' +
              '</div>' +
            '</div>';
          
          container.appendChild(card);
        }
      }

      renderProduk(data.slice(0, 5), "produkBestSeller", true);
      renderProduk(data.slice(6, 11), "produkPilihan", false);

      if (typeof feather !== "undefined") {
        feather.replace();
      }
    })
    .catch(function(err) {
      console.error(err);
    });
});