Advanced Component Development
=========

Adobe Experience Manger allows your mobile app content to be separated across multiple packages. This flexibility makes it simple for web developers to independently contribute components that can then be consumned by a separately installed app.

This module will walk you through the creation of several basic PhoneGap components that could be consumed by an AEM App.
These components will be installed in their own package in order to demonstrate the modular approach to app development AEM enables.
All of the examples in module will make use of the [Sightly](http://docs.adobe.com/docs/en/aem/6-0/develop/sightly.html) templating language.

Components in AEM are simply a directory that contains some configuration details and then whatever HTML, CSS and JavaScript is required to render the actual component.

## Lesson 1 – Version Component

This component will display the app's version number as text. Such a component would be useful on an app's about screen. 
This component makes use of the [AppVersion](https://github.com/whiteoctober/cordova-plugin-app-version) plugin.

```
Note: Use of this component requires the AppVersion plugin to be added to your app.

  phonegap plugin add https://github.com/whiteoctober/cordova-plugin-app-version.git
```

### Exercise 1

1. Create a new component directory
  a. `./content-components/src/main/content/jcr_root/apps/summit-developer-lab/components/app-version`
1. Copy contents from new component from base component
  a. `./content-components/src/main/content/jcr_root/apps/summit-developer-lab/components/_base`
1. Edit properties of app-version component
  a. `.content.xml`

### Exercise 2 - HTML

1. Create a new HTML file with the same name as the component directory 
  a. `app-version.html`
1. Add HTML for displaying version number
  a. The HTML will be dependent on the app supporting the angular JS framework and Ionic CSS.
  
```
<div class="row" ng-controller="VersionController" ng-cloak>
    <div class="col col-33 col-offset-67">
        <p class="calm">${'Version:' @ i18n} {{version}}</p>
    </div>
</div>
```

### Exercise 3 - JavaScript

Create a new client library to support the HTML. 

1. Create a `js` directory under the component's `clientlibs` directory
1. Create a `version.js` file under the `js` directory you created
1. Add `version.js` to the `js.txt` file in order for the AEM client library manager to include it
1. Add JavaScript to `version.js` that will access the AppVersion plugin API

```
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
```

You have now successfully created a component that can be consumed by AEM apps.

## Lesson 2 – Feedback Component

This component will display a button to allow posting messages to Twitter.
This component makes use of the [SocialSharing](https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin.git) plugin.

```
Note: Use of this component requires the SocialSharing plugin to be added to your app.

  phonegap plugin add https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin.git
```

### Exercise 1

1. Create a new component directory following steps from Lesson 1
  a. `./content-components/src/main/content/jcr_root/apps/summit-developer-lab/components/feedback`
1. Edit properties of feedback component
1. Add items to component's property dialog
  a. Open `_cq_dialog/.content.xml`
  a. Add the following XML under the `columns` node
  
```
<items jcr:primaryType="nt:unstructured">
    <feedback
        jcr:primaryType="nt:unstructured"
        jcr:title="Message"
        sling:resourceType="granite/ui/components/foundation/form/fieldset">
        <items jcr:primaryType="nt:unstructured">
            <message
                jcr:primaryType="nt:unstructured"
                sling:resourceType="granite/ui/components/foundation/form/textarea"
                fieldLabel="Message"
                name="./message"
                required="{Boolean}true"/>
            <subject
                jcr:primaryType="nt:unstructured"
                sling:resourceType="granite/ui/components/foundation/form/textfield"
                fieldLabel="Subject"
                name="./subject"/>
            <file
                jcr:primaryType="nt:unstructured"
                sling:resourceType="granite/ui/components/foundation/form/textfield"
                fieldLabel="File"
                name="./file"/>
            <url
                jcr:primaryType="nt:unstructured"
                sling:resourceType="granite/ui/components/foundation/form/textfield"
                fieldLabel="url"
                name="./url"/>
            <charset
                jcr:primaryType="nt:unstructured"
                sling:resourceType="granite/ui/components/foundation/form/hidden"
                ignoreData="{Boolean}true"
                name="_charset_"
                value="utf-8"/>
        </items>
    </feedback>
</items>
```

This XML is the standard way components are able to customize the user interface of Adobe Experience Manager.

### Exercise 2 - HTML

1. Create a new HTML file with the same name as the component directory 
  a. `feedback.html`
1. Add HTML for displaying any beacons that are found
  a. The HTML will be dependent on the app supporting the angular JS framework and Ionic CSS.
  
```
<div class="feedback padding" ng-controller="FeedbackController">
    <button class="button button-block button-positive icon-left ion-social-twitter" ng-click="share('${properties.message}')">
        ${'Share Feedback' @ i18n}
    </button>
</div>
```

### Exercise 3 - JavaScript

Create a new client library to support the HTML following the same steps from Lesson 1. 

1. Create a `js` directory under the component's `clientlibs` directory
1. Create a `feedback.js` file under the `js` directory you created
1. Add `feedback.js` to the `js.txt` file in order for the AEM client library manager to include it
1. Add JavaScript to `feedback.js` that will access the AppVersion plugin API

```
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
```

You have now created a component that will allow your app to send messages to Twitter by making use of the Social Sharing plugin.

## Lesson 3 – Beacon Component

This component will locate any nearby beacons and display any that are found.
This component makes use of the [Estimote](https://github.com/Telerik-Verified-Plugins/Estimote) plugin.

```
Note: Use of this component requires the Estimote plugin to be added to your app.

  phonegap plugin add https://github.com/Telerik-Verified-Plugins/Estimote
```

### Exercise 1

1. Create a new component directory following steps from Lesson 1
  a. `./content-components/src/main/content/jcr_root/apps/summit-developer-lab/components/beacon-demo`
1. Edit properties of beacon-demo component

### Exercise 2 - HTML

1. Create a new HTML file with the same name as the component directory 
  a. `beacon-demo.html`
1. Add HTML for displaying any beacons that are found
  a. The HTML will be dependent on the app supporting the angular JS framework and Ionic CSS.
  
```
<div class="beacon padding" ng-controller="BeaconController">
    <div class="button-bar">
        <a class="button" ng-click="start()" ng-disabled="started">${'Start' @ i18n}</a>
        <a class="button" ng-click="stop()" ng-disabled="!started">${'Stop' @ i18n}</a>
    </div>
    <div class="card" ng-show="message">
        <div class="item item-text-wrap">
            {{message}}
        </div>
    </div>
    <div class="list list-inset" ng-hide="!started">
        <div class="item">
            ${'Beacons Found' @i18n}:
        </div>
        <div ng-repeat="beacon in beacons">
            <div class="item item-divider">
                ${'Color' @i18n}: {{beacon.color}}
            </div>
            <div class="item">
                ${'Distance' @i18n}: {{beacon.distance}} m
            </div>
            <div class="item">
                ${'Major/Minor' @i18n}: {{beacon.major}}.{{beacon.minor}}
            </div>
            <div class="item">
                ${'RSSI' @i18n}: {{beacon.rssi}}
            </div>
        </div>
    </div>
</div>
```

### Exercise 3 - JavaScript

Create a new client library to support the HTML following the same steps from Lesson 1. 

1. Create a `js` directory under the component's `clientlibs` directory
1. Create a `beacon.js` file under the `js` directory you created
1. Add `beacon.js` to the `js.txt` file in order for the AEM client library manager to include it
1. Add JavaScript to `beacon.js` that will access the AppVersion plugin API

```
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
```

## Lesson 4 – Package Installation

A separate maven build will be used to include all the components developed in this module into a content package for AEM. 
This approach allows for components to be developed independently from the rest of an AEM app. This could be especially useful when your
component and app development are performed my different teams or to share components across multiple apps.


### Exercise 1 – Installing a package to AEM

1. Open a temrinal window at the root folder of this project
1. Go to the `content-compnents` directory
  a. `cd content-components`
1. Run `mvn -PautoInstallPackage clean install` to build just the component content package and install to an AEM instance

The components you developed are now available to be included in an AEM app by content authors.

### Resources

Sightly:

- http://docs.adobe.com/docs/en/aem/6-0/develop/sightly.html
- https://github.com/Adobe-Marketing-Cloud/sightly-spec/blob/master/SPECIFICATION.md
- components: /libs/wcm/foundation/components

Granite UI

- http://docs.adobe.com/docs/en/aem/6-0/develop/ref/granite-ui/api/index.html
- https://docs.adobe.com/docs/en/aem/6-0/develop/platform/overlays.html

Touch UI components

- https://helpx.adobe.com/experience-manager/using/creating-touchui-component.html

AngularJS:

- https://docs.angularjs.org/tutorial

[Next →](../module4)

