  const profileBtn = document.getElementById('profileBtn');
  const profileSidebar = document.getElementById('profileSidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const closeSidebarBtn = document.getElementById('closeSidebar');

  function openSidebar() {
    if (profileSidebar && sidebarOverlay) {
      profileSidebar.classList.remove('translate-x-full');
      sidebarOverlay.classList.remove('hidden');
    }
  }

  function closeSidebar() {
    if (profileSidebar && sidebarOverlay) {
      profileSidebar.classList.add('translate-x-full');
      sidebarOverlay.classList.add('hidden');
    }
  }

  if (profileBtn) profileBtn.addEventListener('click', openSidebar);
  if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);
  if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);