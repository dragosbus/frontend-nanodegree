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
                locationsList.innerHTML = '';
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
                    addMarker(map, v);
                });
            });
        });
    }

    function makeLi(name) {
        let li = document.createElement('li');
        li.textContent = name
        return li;
    }

    function addMarker(map, data) {
        var largeInfowindow = new google.maps.InfoWindow();
        let pos = { lat: data.location.lat, lng: data.location.lng };
        var marker = new google.maps.Marker({
            position: pos,
            map: map,
            title: data.name,
            category: data.categories[0].pluralName,
            address: data.location.formattedAddress[0],
            animation: google.maps.Animation.DROP,
        });
        marker.addListener('click', function () {
            populateInfoWindow(this, largeInfowindow);
            toggleBounce(this);
        });
    }

    function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        let content = `<div>
        <h4>${marker.title}</h4>
        <div>
            <p>Category:${marker.category}</p>
            <p>Address:${marker.address}</p>
        </div>
        </div>`;
        if (infowindow.marker != marker) {
            infowindow.marker = marker;
            infowindow.setContent(content);
            infowindow.open(map, marker);
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function () {
                infowindow.setMarker = null;
                toggleBounce(marker);
            });
        }
    }

    function toggleBounce(marker) {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }
   
    return { init }; 
}());

UI.init();

