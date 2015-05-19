;(function (angular, document, undefined) {

    "use strict";

    angular.module('pgeBeacon', [])
    	.controller('BeaconController', ['$scope', '$window', function($scope, $window) {

            $scope.started = false;
            $scope.message = "";

            function checkSimulator() {
                if (window.navigator.simulator === true) {
                    $scope.message= 'This plugin is not available in the simulator.';
                    return true;
                } else if (window.estimote === undefined) {
                    $scope.message = 'Plugin not found.';
                    return true;
                } else {
                    return false;
                }
            }

            $scope.start = function() {
                $scope.message = "";
                if (!checkSimulator()) {
                    window.estimote.startRanging("pgday");
                    $scope.started = true;
                }
            }

            $scope.stop = function() {
                if (!checkSimulator()) {
                    window.estimote.stopRanging();
                    $scope.started = false;
                }
            }

            function onBeaconsReceived(result) {
                $scope.beaconCount = 0;
                $scope.beacons = [];
                if (result.beacons && result.beacons.length > 0) {
                    $scope.beaconCount = result.beacons.length;
                    $scope.beacons = result.beacons;

                    for (var i=0; i<result.beacons.length; i++) {
                        var beacon = result.beacons[i];
                        if( window.ADB ) {
                            ADB.trackAction( 'beaconFound', {"major": beacon.major, "minor": beacon.minor} );
                        }
                    }
                }
            }

            document.addEventListener('beaconsReceived', onBeaconsReceived, false);

	}]);
})(angular, document);
