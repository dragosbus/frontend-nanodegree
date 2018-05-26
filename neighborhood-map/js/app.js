const UI = (function () {

    let wrapperMenu, menu, header, map;
   
    function init() {
        wrapperMenu = document.querySelector('.wrapper-menu');
        menu = document.querySelector('.menu');
        header = document.querySelector('.main-header');
        map = document.getElementById('map');

        wrapperMenu.addEventListener('click', toggleClases);
    }

    function toggleClases() {
        wrapperMenu.classList.toggle('open');
        menu.classList.toggle('show-menu');
        header.classList.toggle('hide');
    }
   
    return { init }; 
}());

UI.init();

