const MapView = (function () {

    function addMarker(map, data) {
        var largeInfowindow = new google.maps.InfoWindow();
        let pos = {
            lat: data.location.lat,
            lng: data.location.lng
        };
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

    return{addMarker}

}());