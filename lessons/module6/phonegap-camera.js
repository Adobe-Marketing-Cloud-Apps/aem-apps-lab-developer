/**
    Insert JavaScript here
**/


/**

;(function (angular, document, undefined) {

    angular.module('phonegapCamera', ['btford.phonegap.ready'])

        .controller('CameraCtrl', ['$scope', 'camera', function($scope, camera) {

            function gotPicture(imageData) {
                $scope.imageSrc = "data:image/jpeg;base64," + imageData;
            }

            function cameraError(message) {
                console.error('Problem: ' + message);
            }

            $scope.takeAPicture = function() {
              if (window.ADB) {
                ADB.trackAction('takeAPicture', {});
              }              
              camera.getPicture(gotPicture, cameraError, {
                  quality: 50,
                  destinationType: Camera.DestinationType.DATA_URL
              });
            };

            $scope.browseForAPicture = function() {
              if (window.ADB) {
                ADB.trackAction('browseForAPicture', {});
              }
              camera.getPicture(gotPicture, cameraError, {
                  quality: 50,
                  sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                  destinationType: Camera.DestinationType.DATA_URL
              });
            };

        }])

        .factory('camera', function ($rootScope, phonegapReady) {

            return {
              getPicture: phonegapReady(function (onSuccess, onError, options) {
                navigator.camera.getPicture(function () {
                  var that = this,
                    args = arguments;
                    
                  if (onSuccess) {
                    $rootScope.$apply(function () {
                      onSuccess.apply(that, args);
                    });
                  }
                }, function () {
                  var that = this,
                  args = arguments;
                    
                  if (onError) {
                    $rootScope.$apply(function () {
                      onError.apply(that, args);
                    });
                  }
                },
                options);
              })
            }
        })

        ;

}(angular, document));

**/

