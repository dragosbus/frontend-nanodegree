(function () {

    const viewModel = {
        list: ko.observableArray([]),
        location: ko.observable(''),
        coordinates: ko.observable({}),
        getData() {
            fetch('../data.json').then(res => res.json())
                .then(res => {
                    this.list(res.response.venues);
                    this.coordinates({
                        lat: res.response.geocode.feature.geometry.center.lat,
                        lng: res.response.geocode.feature.geometry.center.lng
                    });
                    setTimeout(this.newData, 100);
                })
                
        },
        getDataOnSubmit() {
            fetch(`https://api.foursquare.com/v2/venues/search?near=${this.location()}&oauth_token=YHUU0MTN4R21M5JE21AL5J4EJMXIJCBQGTSDGF4ODPGGSNOR&v=20180526`)
                .then(res => res.json()).then(res => {
                    this.list(res.response.venues);
                    this.coordinates({
                        lat: res.response.geocode.feature.geometry.center.lat,
                        lng: res.response.geocode.feature.geometry.center.lng
                    });
                }).then(this.newData);
        },
        newMap() {
            let newMap = new google.maps.Map(document.getElementById('map'), {
                center: {
                    lat: this.coordinates().lat,
                    lng: this.coordinates().lng,
                },
                zoom: 15
            });
            return newMap;
        }
    };

    viewModel.newData = function () {
        let map = viewModel.newMap();
        viewModel.list().forEach(marker => {
            MapView.addMarker(map, marker);
        });
    }

    ko.applyBindings(viewModel);

    document.addEventListener('DOMContentLoaded', ()=> {
       viewModel.getData();
    });
}());