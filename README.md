# Building Mobile Apps: Lab
## A PhoneGap Enterprise Introduction for Developers

### Requirements

- AEM 6.0, with:
	- [Service Pack 1](https://www.adobeaemcloud.com/content/marketplace/marketplaceProxy.html?packagePath=/content/companies/public/adobe/packages/aem600/servicepack/AEM-6.0-Service-Pack) installed
	- [Apps Feature Pack 1](https://www.adobeaemcloud.com/content/marketplace/marketplaceProxy.html?packagePath=/content/companies/public/adobe/packages/cq600/featurepack/cq-6.0.0-featurepack-4558) installed
- [node.js](http://nodejs.org/) version `>=0.10.x`
- [PhoneGap CLI](https://github.com/phonegap/phonegap-cli) version `>=3.6.0`
- (iOS only) Xcode version `==6.1`
- (iOS only) [ios-sim](https://github.com/phonegap/ios-sim#installation) 
- (Android only) [Android SDK](https://developer.android.com/sdk/index.html)

### Get started

Clone this repository to your machine to begin.

### Install

This project is based on the [multimodule-content-package-archetype](http://dev.day.com/content/docs/en/aem/6-0/develop/how-tos/vlt-mavenplugin.html#multimodule-content-package-archetype) (with the bundle removed for simplicity), so it contains the same helpful profiles and properties to build and deploy your project with maven.

From the project root, run:

    mvn -PautoInstallPackage clean install 

... to build the content package and install to a AEM instance. The CRX host and port can be specified on the command line with `mvn -Dcrx.host=otherhost -Dcrx.port=5502 <goals>`


### Edit in AEM

Once built and installed via maven, your new app should be editable in AEM. Take a look at the new [Apps admin console](http://localhost:4502/aem/apps.html/content/phonegap) to view the available apps on your instance.

A new app folder with the brand name you specified above ('Geometrixx' in my case) should be listed. Tap it to view the app you created, which will be listed with the Cordova logo as it's thumbnail. If you followed the instructions exactly and have your author instance running locally on :4502, you should be able to author your new app via the following link:

[http://localhost:4502/editor.html/content/phonegap/Geometrixx/ShapesCon/en/home.html](http://localhost:4502/editor.html/content/phonegap/Geometrixx/ShapesCon/en/home.html)

### Exercises

Exercises associated with this lab can be found in the [exercises directory](exercises) of this repository.

### Run on the iOS Simulator

From the [Apps console](http://localhost:4502/aem/apps.html/content/phonegap), navigate to your app's [Command Center](http://localhost:4502/libs/mobileapps/admin/content/dashboard.html/content/phonegap/Geometrixx/ShapesCon/shell) (your URI will differ based on the values you provided to `customize-app.sh`).

Locate the 'PhoneGap Build' tile, and the down arrow to the top right of the pane. Tap this arrow, then tap the 'Download CLI' item to initiate a download of your app's content. A .zip payload will be downloaded locally. Using your command line of choice, navigate to the directory created by extracting the payload. Using OS X? this handy [Finder toolbar app](https://github.com/jbtule/cdto) makes it easy.

Using the [PhoneGap CLI](https://github.com/phonegap/phonegap-cli), build and deploy your application to the iOS Simulator with the following command:

    phonegap run ios --emulator


### Using with VLT

To use vlt with this project, first build and install the package to your local AEM instance as described above. Then `cd content/src/main/content/jcr_root/` and run:

    vlt --credentials admin:admin checkout -f ../META-INF/vault/filter.xml --force http://localhost:4502/crx

Once the working copy is created, you can use the normal ``vlt up`` and ``vlt ci`` commands.


### Uninstall

From the [package manager console](http://localhost:4502/crx/packmgr/index.jsp), locate the package named 'summit-developer-lab-content-1.0-SNAPSHOT.zip'. It should be at the top of the list. Uninstall this package to remove your app, it's template, component, design, and supporting clientlibs.


