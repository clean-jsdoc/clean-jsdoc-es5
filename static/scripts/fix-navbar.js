(function() {
    function setNavbarMainContentHeight() {
        const heading = document.querySelector('#navbar-heading');
        const searchBox = document.querySelector('#search-box');
        const sidebarMainContent = document.querySelector('#sidebar-main-content');

        let heightToSubtract = 32;

        if (heading) {
            heightToSubtract += heading.getBoundingClientRect().height;
        }

        if (searchBox) {
            heightToSubtract += searchBox.getBoundingClientRect().height;
        }

        sidebarMainContent.style.height += `${window.innerHeight - heightToSubtract}px`;
    }

    setNavbarMainContentHeight();
    window.addEventListener('resize', setNavbarMainContentHeight);
}());
