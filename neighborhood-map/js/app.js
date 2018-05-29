const Model = (function () {

    function init(location) {
        return getData(location);
    }

    function getData(location) {
        return fetch(`https://api.foursquare.com/v2/venues/search?near=${location}&oauth_token=YHUU0MTN4R21M5JE21AL5J4EJMXIJCBQGTSDGF4ODPGGSNOR&v=20180526`).then(res => res.json());
    }

    function fetchData(url) {
        return fetch(url).then(res => res.json());
    }

    return {
        init,fetchData
    };

}());

const UI = (function () {

    let wrapperMenu, menu, header, form, locationsList, map;

    function init() {
        wrapperMenu = document.querySelector('.wrapper-menu');
        menu = document.querySelector('.menu');
        header = document.querySelector('.main-header');
        form = document.getElementById('locations');
        locationsList = document.querySelector('.locations');
        wrapperMenu.addEventListener('click', toggleClases);
        // form.addEventListener('submit', getLocationFromInput);
    }

    function toggleClases() {
        wrapperMenu.classList.toggle('open');
        menu.classList.toggle('show-menu');
        header.classList.toggle('hide');
    }

    function getLocationFromInput(e) {
        e.preventDefault();
        let text = document.querySelector('.location-value');
        let location = text.value;
        Model.init(location).then(newData);
    }

    function newMap(lat, lng) {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: lat,
                lng: lng,
            },
            zoom: 15
        });
    }

    function newData(data) {
        locationsList.innerHTML = '';
        newMap(data.response.geocode.feature.geometry.center.lat, data.response.geocode.feature.geometry.center.lng);
        data.response.venues.forEach(v => {
            locationsList.appendChild(makeLi(v.name));
            MapView.addMarker(map, v);
        });
    }

    function makeLi(name) {
        let li = document.createElement('li');
        li.textContent = name
        return li;
    }


    return {
        init
    };
}());

UI.init();