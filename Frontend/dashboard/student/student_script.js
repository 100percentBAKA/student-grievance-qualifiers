document.addEventListener('DOMContentLoaded', () => {

    // Handling of Sticky Header
    const header = document.getElementById("myHeader");
    const sticky = header.offsetTop;

    window.onscroll = () => {
        if (window.scrollY > sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    };

    // Handling of Sticky Sidebar
    const sidebar = document.getElementById("mySidebar");
    const sidebarTop = sidebar.offsetTop;

    window.onscroll = () => {
        if (window.scrollY > sidebarTop) {
            sidebar.classList.add("sticky-sidebar-active");
        } else {
            sidebar.classList.remove("sticky-sidebar-active");
        }
    };
});
