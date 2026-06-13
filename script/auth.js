function password(id, iconElement) {
  const input = document.getElementById(id);

  if (input.type === "password") {
    input.type = "text";
    iconElement.setAttribute("data-feather", "eye-off");
  } else {
    input.type = "password";
    iconElement.setAttribute("data-feather", "eye");
  }

  feather.replace();
}

function confirmPassword(id, iconElement) {
  const input = document.getElementById(id);

  if (input.type === "password") {
    input.type = "text";
    iconElement.setAttribute("data-feather", "eye-off");
  } else {
    input.type = "password";
    iconElement.setAttribute("data-feather", "eye");
  }

  feather.replace();
}