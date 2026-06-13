document.addEventListener("DOMContentLoaded", function() {
  const container = document.getElementById("semuaProduk");

  fetch("../json/produk.json")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      const params = new URLSearchParams(window.location.search);
      let search = params.get("search");
      let filteredData = data;

      if (search) {
        search = search.toLowerCase();
        filteredData = [];
        for (let i = 0; i < data.length; i++) {
          const p = data[i];
          const keyword = (p.nama + " " + p.penulis + " " + p.kategori + " " + p.deskripsi).toLowerCase();
          if (keyword.indexOf(search) !== -1) {
            filteredData.push(p);
          }
        }
      }

      if (container) {
        if (filteredData.length === 0) {
          container.innerHTML = '<div class="w-full rounded-3xl border border-slate-200 p-10 text-center text-slate-500 shadow-sm">Produk tidak ditemukan.</div>';
        } else {
          for (let j = 0; j < filteredData.length; j++) {
            const produk = filteredData[j];
            const card = document.createElement("div");
            card.className = "group w-full max-w-[220px] bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col";
            
            card.innerHTML = 
              '<a href="detailProduk.html?id=' + produk.id + '" class="flex h-56 w-full overflow-hidden relative p-3 flex items-center justify-center cursor-pointer">' +
                '<img src="' + produk.gambar + '" alt="' + produk.nama + '" class="max-w-full max-h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300" />' +
              '</a>' +
              '<div class="p-4 flex flex-col flex-1 justify-between">' +
                '<div>' +
                  '<a href="detailProduk.html?id=' + produk.id + '" class="cursor-pointer">' +
                    '<h2 class="font-bold text-base text-[#112D4E] line-clamp-2 leading-5 group-hover:text-[#0F4C75] transition-colors">' + produk.nama + '</h2>' +
                  '</a>' +
                  '<p class="text-xs text-slate-500 line-clamp-3 mt-1.5 leading-relaxed">' + produk.deskripsi + '</p>' +
                '</div>' +
                '<div class="flex items-center justify-between pt-4 mt-3 border-t border-slate-50">' +
                  '<p class="font-bold text-sm text-[#0F4C75]">Rp ' + Number(produk.harga).toLocaleString("id-ID") + '</p>' +
                  '<span class="text-xs font-semibold text-amber-600 px-2 py-1 rounded-md flex items-center gap-1">⭐ ' + Number(produk.rating).toFixed(1) + '</span>' +
                '</div>' +
              '</div>';
            container.appendChild(card);
          }
        }
        
        if (typeof feather !== "undefined") {
          feather.replace();
        }
      }
    })
    .catch(function(error) {
      console.log("Gagal memuat produk: " + error);
    });
});