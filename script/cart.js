document.addEventListener("DOMContentLoaded", function () {
  const cartItemContainer = document.getElementById("cartItems");
  const ringkasanBelanja = document.getElementById("ringkasanBelanja");
  
  if (!cartItemContainer) return;

  let dataLokal = localStorage.getItem("cartItems");
  let cartItem = [];
  
  if (dataLokal) {
    cartItem = JSON.parse(dataLokal);
  }

  for (let i = 0; i < cartItem.length; i++) {
    if (cartItem[i].checked === undefined) {
      cartItem[i].checked = true;
    }
    if (!cartItem[i].qty) {
      cartItem[i].qty = 1;
    }
  }

  function formatRp(val) {
    return "Rp " + new Intl.NumberFormat("id-ID").format(val);
  }

  function updateUI() {
    localStorage.setItem("cartItems", JSON.stringify(cartItem));
    renderCart();
  }

  function renderCart() {
    if (cartItem.length === 0) {
      cartItemContainer.innerHTML = '<p class="text-slate-500 p-4">Keranjang kosong.</p>';
      if (ringkasanBelanja) {
        ringkasanBelanja.classList.add("hidden");
      }
    } else {
      if (ringkasanBelanja) {
        ringkasanBelanja.classList.remove("hidden");
      }

      let htmlContent = "";
      for (let i = 0; i < cartItem.length; i++) {
        let item = cartItem[i];
        
        let isChecked = "";
        if (item.checked) {
          isChecked = "checked";
        }

        htmlContent += '<article class="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl mb-4">' +
          '<input type="checkbox" ' + isChecked + ' onchange="toggleCheck(' + i + ')" class="w-5 h-5 accent-[#112D4E] cursor-pointer">' +
          '<img src="' + item.gambar + '" class="w-20 h-24 object-cover rounded-lg bg-slate-100" />' +
          '<div class="flex-1">' +
            '<h2 class="font-semibold text-slate-800">' + item.nama + '</h2>' +
            '<p class="font-bold text-slate-900 mt-1">' + formatRp(item.harga) + '</p>' +
          '</div>' +
          '<div class="flex items-center gap-4">' +
            '<button onclick="updateQty(' + i + ', -1)" class="px-3 py-1 bg-slate-100 cursor-pointer rounded">-</button>' +
            '<span class="text-sm font-medium">' + item.qty + '</span>' +
            '<button onclick="updateQty(' + i + ', 1)" class="px-3 py-1 bg-slate-100 cursor-pointer rounded">+</button>' +
            '<button onclick="hapusItem(' + i + ')" class="text-red-500 cursor-pointer"><i data-feather="trash-2" class="w-4 h-4"></i></button>' +
          '</div>' +
        '</article>';
      }
      
      cartItemContainer.innerHTML = htmlContent;

      let total = 0;
      let count = 0;

      for (let i = 0; i < cartItem.length; i++) {
        if (cartItem[i].checked) {
          total += cartItem[i].harga * cartItem[i].qty;
          count += cartItem[i].qty;
        }
      }

      document.getElementById("totalItem").textContent = count;
      document.getElementById("subtotalText").textContent = formatRp(total);
    }
    
    if (typeof feather !== "undefined") {
      feather.replace();
    }
  }

  window.toggleCheck = function (i) {
    cartItem[i].checked = !cartItem[i].checked;
    updateUI();
  };

  window.updateQty = function (i, delta) {
    cartItem[i].qty = cartItem[i].qty + delta;
    if (cartItem[i].qty < 1) {
      cartItem[i].qty = 1;
    }
    updateUI();
  };

  window.hapusItem = function (i) {
    cartItem.splice(i, 1);
    updateUI();
  };

  window.prosesCheckout = function () {
    let adaYangTerpilih = false;
    let itemTerpilihId = [];

    for (let i = 0; i < cartItem.length; i++) {
      if (cartItem[i].checked) {
        adaYangTerpilih = true;
        itemTerpilihId.push(cartItem[i].id);
      }
    }

    if (adaYangTerpilih === false) {
      return alert("Pilih minimal satu produk!");
    }

    localStorage.setItem("checkoutItems", JSON.stringify(itemTerpilihId));
    window.location.href = "checkout.html";
  };

  renderCart();
});