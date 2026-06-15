const password = (id, iconElement) => {
  const input = document.getElementById(id);
  
  if (input.type === "password") {
    input.type = "text";
    iconElement.setAttribute("data-feather", "eye-off");
  } else {
    input.type = "password";
    iconElement.setAttribute("data-feather", "eye");
  }
  feather.replace();
};

const confirmPassword = (id, iconElement) => {
  const input = document.getElementById(id);
  
  if (input.type === "password") {
    input.type = "text";
    iconElement.setAttribute("data-feather", "eye-off");
  } else {
    input.type = "password";
    iconElement.setAttribute("data-feather", "eye");
  }
  feather.replace();
};

const validasiLogin = (event) => {
  event.preventDefault();

  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  if (emailValue === '' || passwordValue === '') {
    alert('Mohon maaf, Anda harus mengisi alamat email dan password terlebih dahulu!');
  } else {
    window.location.href = "home.html";
  }
};

const validasiDaftar = (event) => {
  event.preventDefault();

  const emailInput = document.getElementById('emailDaftar');
  const passwordInput = document.getElementById('passwordDaftar');
  const confirmPasswordInput = document.getElementById('confirmPassword');

  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  const confirmPasswordValue = confirmPasswordInput.value.trim();

  if (emailValue === '' || passwordValue === '' || confirmPasswordValue === '') {
    alert('Mohon maaf, Anda harus mengisi semua kolom (Email, Password, dan Konfirmasi Password) terlebih dahulu!');
    return; 
  }

  if (passwordValue !== confirmPasswordValue) {
    alert('Konfirmasi password tidak cocok! Pastikan password yang Anda masukkan sama.');
    return; 
  }

  alert('Pendaftaran berhasil! Akun Anda telah dibuat.');
  window.location.href = "login.html"; 
};