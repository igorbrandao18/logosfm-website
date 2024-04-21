// Define the `phonecatApp` module
var Home = angular.module('Home', []);

// Define the `PhoneListController` controller on the `phonecatApp` module
angular.module('Home', ['angular.filter', 'ngMaterial', 'ngMessages',])
    .controller('MyCtrl', function ($scope, $http, $log, $mdDialog, $mdMedia) {
        $http.get("https://api.logosfm.com.br/api/streaming/api-radio/").success(function (res) {
            $scope.api_radio = res;
            console.log(res);
        });
    })


    .config(function ($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            // Allow loading from our assets domain. **.
            'http://centova6.ciclanohost.com.br:9452/stream'
        ])
    });