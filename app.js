(function() {
  angular.module('aklamioApp', ['angular-toArrayFilter', 'ui.unique'])
    .controller('MainCtrl', ['$http', 'filterFilter', 'toArrayFilter', 'uniqueFilter', function($http, filterFilter, toArrayFilter, uniqueFilter) {
      var self = this;
      self.items = [];
      self.countries = [];
      $http.get('/auto_data.json').then(function(response) {
        self.items = toArrayFilter(response.data);
        self.items = filterFilter(self.items, {type: 'promotion'});
        angular.forEach(self.items, function(k, v) {
          self.countries.push(k.country);
        });
        self.countries = uniqueFilter(self.countries);
      }, function(errResponse) {
        console.error('Error while fetching notes');
      });
    }]);
})();

