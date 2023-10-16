const toggleMenuState = (button) => {
    const sidebarMenuOverlay = document.getElementById("sidebarMenuOverlay");
    const sidebarMenu = document.getElementById("sidebarMenu");

    sidebarMenu.classList.toggle("-translate-x-64");
    sidebarMenuOverlay.classList.toggle("invisible");
    button.classList.toggle("translate-x-64");
}