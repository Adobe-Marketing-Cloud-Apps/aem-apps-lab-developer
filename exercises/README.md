Developer Lab Exercises
=========

A few things to try:

- Add a child page. It will become linked via the Ionic Menu List component already included on the home page of your app
- Add an image or text component
- Enter 'preview' mode, and drag the page to the right to reveal the left shelf menu


### Exercise 1: Project Overview

The project used by this lab includes a folder structure for developing a typical AEM application and installing resources to the server. This allows the developer to work with the tools they are accustomed to yet still provide a simple means to deploy changes to AEM through packages.

1.  Clone the developer lab from GitHub
  a.  Open Terminal
  b.  `cd ~`
  c.  `mkdir lab712`
  d.  `cd lab712`
  e.  `git clone https://github.com/Adobe-Marketing-Cloud-Apps/summit-developer-lab`
2.  Open lab project in Finder
  a.  cd summit-developer-lab
  b.  open .
3.  Go to  /content/src/main/content/jcr_root 
4.  Explore the directory structure that will be installed to AEM
  a.  /apps: location for components and templates used by app
  b.  /etc/designs: the design used by the app (ie. Styles)
  c.  /content/dam: assets used by the app (ie. Images)
  d.  /content/phonegap: all of the page content for the app
5.  What component does the page template for the app use?
6.  What clientlibs is the app’s design dependent on?

### Exersice 2: Add Project to AEM

1.  Go to root folder of the lab project 
  a.  Open Terminal
  b.  cd ~/lab712/summit-developer-lab
2.  Run `mvn -PautoInstallPackage clean install` to build the content package and install to an AEM instance
3.  In a browser navigate to `http://localhost:4502`
4.  Log in to the AEM author instance using `admin:admin`
5.  Click on Apps from the left navigation rail 
6.  Locate the project you just installed and select it
7.  Explore the Apps Command Center for the project you installed


### Exercise 3: Component Development

- Component: copy `phonegap-camera` to `apps/summit-developer-lab/components`

- JSP 
    - edit `phonegap-camera.jsp`

```
    <%@include file="/libs/foundation/global.jsp" %><%
    %><%@ page session="false" %><%
    %>
    <div ng-controller="CameraCtrl" class="list card">
        <div class="item">
            <h2>Camera</h2>
            <p>Take a picture</p>
        </div>
        
        <div class="item item-image">
            <img ng-src="{{imageSrc}}">
        </div>
        
        <div class="item tabs tabs-secondary tabs-icon-left">
            <a class="tab-item" ng-click="takeAPicture()">
                <i class="icon ion-ios7-camera-outline"></i>
                Take a picture
            </a>
            <a class="tab-item" ng-click="browseForAPicture()">
                <i class="icon ion-ios7-photos-outline"></i>
                Browse gallery
            </a>
        </div>
    </div>
```

- Clientlib
    - edit `clientlibs/phonegap-camera.js`

```
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
                    camera.getPicture(gotPicture, cameraError, {
                        quality: 50,
                        destinationType: Camera.DestinationType.DATA_URL
                    });
                };

                $scope.browseForAPicture = function() {
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
```

- Add module to angular-module-list.js.jsp
    - `phonegapCamera`

