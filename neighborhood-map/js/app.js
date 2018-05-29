const UI = (function () {

    let wrapperMenu, menu, header, form, locationsList;

    function init() {
        wrapperMenu = document.querySelector('.wrapper-menu');
        menu = document.querySelector('.menu');
        header = document.querySelector('.main-header');
        form = document.getElementById('locations');
        locationsList = document.querySelector('.locations');
        wrapperMenu.addEventListener('click', toggleClases);
    }

    function toggleClases() {
        wrapperMenu.classList.toggle('open');
        menu.classList.toggle('show-menu');
        header.classList.toggle('hide');
    }

    return {
        init
    };
}());

UI.init();