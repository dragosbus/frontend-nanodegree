(function () {

    const viewModel = {
        list: ko.observableArray([]),
        location: ko.observable(''),
        getData() {
            fetch('../data.json').then(res => res.json())
                .then(res => this.list(res.response.venues))
                
        },
        getDataOnSubmit() {
            fetch(`https://api.foursquare.com/v2/venues/search?near=${this.location()}&oauth_token=YHUU0MTN4R21M5JE21AL5J4EJMXIJCBQGTSDGF4ODPGGSNOR&v=20180526`)
                .then(res => res.json()).then(res => this.list(res.response.venues));
        }
    };

    ko.applyBindings(viewModel);

    document.addEventListener('DOMContentLoaded', ()=> {
       viewModel.getData();
    });
}());