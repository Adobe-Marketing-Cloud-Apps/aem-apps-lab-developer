;(function (angular, undefined) {

    "use strict";

    angular.module('pgeVersion', [])
    	.controller('VersionController', ['$scope', '$window', 'phonegapReady', function($scope, $window, phonegapReady) {

            $scope.version = undefined;

            var determineVersion = phonegapReady(function() {
                if ($window.cordova && $window.cordova.getAppVersion) {
                    $window.cordova.getAppVersion(function(version) {
                       $scope.version = version;
                    });
                }
            });
            determineVersion();

	}]);

})(angular);
