;(function (angular, undefined) {

    "use strict";

    angular.module('pgeFeedback', [])
    	.controller('FeedbackController', ['$scope', '$window', function($scope, $window) {
            $scope.share = function(message) {
                if (window.plugins && window.plugins.socialsharing) {
                    window.plugins.socialsharing.shareViaTwitter(message, null, null,
                        function () {
                            console.log("Feedback shared via twitter");
                        },
                        function () {
                            console.log("Unable to share feedback via Twitter")
                        }
                    );
                }
            }
	}]);
})(angular);
