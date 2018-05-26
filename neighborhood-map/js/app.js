const UI = (function () {

    let wrapperMenu, menu, header, map, form;
   
    function init() {
        wrapperMenu = document.querySelector('.wrapper-menu');
        menu = document.querySelector('.menu');
        header = document.querySelector('.main-header');
        map = document.getElementById('map');
        form = document.getElementById('locations');

        wrapperMenu.addEventListener('click', toggleClases);

        form.addEventListener('submit', getLocationFromInput);
    }

    function toggleClases() {
        wrapperMenu.classList.toggle('open');
        menu.classList.toggle('show-menu');
        header.classList.toggle('hide');
    }

    function getData(location) {
        return fetch(`https://api.foursquare.com/v2/venues/search?near=${location}&oauth_token=YHUU0MTN4R21M5JE21AL5J4EJMXIJCBQGTSDGF4ODPGGSNOR&v=20180526`).then(res => res.json());
    }

    function getLocationFromInput(e) {
        e.preventDefault();
        let text = document.querySelector('.location-value');
        
        return new Promise((resolve, reject) => {
            if (text.value) resolve(text.value);
            else reject("Invalid Location");
        }).then(res => {
            getData(res).then(res=>console.log(res))
        });
    }
   
    return { init }; 
}());

UI.init();

