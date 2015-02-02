;(function (angular, contentUpdate, undefined) {

    "use strict";

    /**
     * Module to handle general navigation in the app
     */
    angular.module('cqAppNavigation', ['cqContentSyncUpdate'])
        .controller('AppNavigationController', ['$scope', '$window', '$location', 'cqContentSyncUpdate',
            function ($scope, $window, $location, cqContentSyncUpdate) {
                $scope.transition = '';
                var contentUpdater = contentUpdate();

                /**
                 * Handle back button
                 */
                $scope.back = function() {
                    $scope.transition = 'transition-right';
                    $window.history.back();
                    console.log('[nav] handled back event.');
                };

                /**
                 * Handle navigation to app pages
                 */
                $scope.go = function(path){
                    if ($scope.wcmMode) {
                        // WCMMode is not disabled; head to the page itself
                        navigateToPageInAuthorMode(path);
                    }
                    else {
                        navigateToPageInApp(path);
                    }

                    console.log('[nav] app navigated to: [' + path + '].');
                };

                /**
                 * Toggle the menu
                 */
                $scope.toggleMenu = function() {
                    $scope.navigationMenuStatus = !$scope.navigationMenuStatus;
                };

                /**
                 * Trigger an app update
                 */
                $scope.updateApp = function() {
                    // If update is in progress, NOOP
                    if($scope.updating) return;

                    // Check if an update is available
                    contentUpdater.isContentPackageUpdateAvailable($scope.contentPackageName,
                        function callback(error, isUpdateAvailable) {
                            if (error) {
                                // Alert the error details.
                                return navigator.notification.alert(error, null, 'ContentSync Error');
                            }

                            if (isUpdateAvailable) {
                                // Confirm if the user would like to update now 
                                navigator.notification.confirm('Update is available, would you like to install it now?', 
                                    function onConfirm(buttonIndex) {
                                        if (buttonIndex == 1) {
                                            // user selected 'Update'                                           
                                            $scope.updating = true;
                                            contentUpdater.updateContentPackageByName($scope.contentPackageName,
                                                function callback(error, pathToContent) {
                                                    if (error) {
                                                        return navigator.notification.alert(error, null, 'Error');
                                                    }
                                                    // else 
                                                    console.log('Update complete; reloading app.');
                                                    window.location.reload( true );
                                                });
                                        }
                                        else {
                                            // user selected Later
                                            // no-op
                                        }
                                    }, 
                                    'ContentSync Update',       // title
                                    ['Update', 'Later'] // button labels
                                );
                            }
                            else {
                                navigator.notification.alert('App is up to date.', null, 'ContentSync Update', 'Done');
                            }
                        }
                    );
                };

                /*
                 * Private helpers
                 */
                function navigateToPageInAuthorMode(path) {
                    $window.location.href = path + '.html';
                }

                function navigateToPageInApp(path) {
                    // SPA hash navigation
                    $scope.transition = 'transition-left';
                    $location.url(path);
                    $scope.navigationMenuStatus = false;
                }
            }
        ]);
})(angular, CQ.mobile.contentUpdate);