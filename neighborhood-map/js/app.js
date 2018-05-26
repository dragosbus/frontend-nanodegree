const UI = (function () {

    let wrapperMenu, menu, header, form, locationsList;
   
    function init() {
        wrapperMenu = document.querySelector('.wrapper-menu');
        menu = document.querySelector('.menu');
        header = document.querySelector('.main-header');
        form = document.getElementById('locations');
        locationsList = document.querySelector('.locations');

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
            getData(res).then(res => {
                map = new google.maps.Map(document.getElementById('map'), {
                    center: {
                        lat: res.response.geocode.feature.geometry.center.lat,
                        lng: res.response.geocode.feature.geometry.center.lng
                    },
                    zoom: 15
                });
                res.response.venues.forEach(v => {
                    locationsList.appendChild(makeLi(v.name));
                    console.log(v);
                    addMarker(map, v.location.lat, v.location.lng);
                });
            });
        });
    }

    function makeLi(name) {
        let li = document.createElement('li');
        li.textContent = name
        return li;
    }

    function addMarker(map, lat, long) {
        let pos = { lat:lat, lng:long };
        var marker = new google.maps.Marker({
            position: pos,
            map: map,
            title: 'First Marker!'
        });
    }
   
    return { init }; 
}());

UI.init();

