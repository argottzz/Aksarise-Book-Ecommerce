document.addEventListener("DOMContentLoaded", () => {
  const searchInputs = document.querySelectorAll('input[placeholder="Search"], input#search, input#input-group-1');
  const params = new URLSearchParams(window.location.search);
  const currentQuery = params.get("search");

  if (currentQuery) {
    searchInputs.forEach(input => {
      input.value = currentQuery;
    });
  }

  const goToSearch = (value) => {
    const searchTerm = value.trim();
    if (searchTerm) {
      const url = "semuaProduk.html?search=" + encodeURIComponent(searchTerm);
      if (window.location.pathname.endsWith("semuaProduk.html")) {
        window.location.search = "?search=" + encodeURIComponent(searchTerm);
      } else {
        window.location.href = url;
      }
    }
  };

  searchInputs.forEach(input => {
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        goToSearch(input.value);
      }
    });
  });
});