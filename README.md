# Building Mobile Apps: Lab
## A PhoneGap Enterprise Introduction for Developers

This lab was orginally developed for [Adobe SUMMIT 2015](http://summit.adobe.com/na/).
Additional content was added for [PhoneGap Day](http://pgday.phonegap.com) workshops.

### Related Links

- [Developer Lab Workbook](http://me.planetrumsey.ca/assets/summit2015/L712_arumsey.pdf)
- [Developer Lab Slides](http://www.slideshare.net/arumsey/l712-arumsey)

### Marketer Lab

A companion lab for marketers was also offered during [Adobe SUMMIT 2015](http://summit.adobe.com/na/).

- [Marketer Lab Workbook](http://me.planetrumsey.ca/assets/summit2015/L718_Fait.pdf)
- [Marketer Lab Slides](http://www.slideshare.net/arumsey/managing-mobile-apps-a-phonegap-enterprise-introduction-for-marketers)

### Minimum Requirements

- AEM 6.1
- [node.js](http://nodejs.org/) version `>=0.10.x`
- [PhoneGap CLI](https://github.com/phonegap/phonegap-cli) version `>=3.6.0`
- (iOS only) Xcode version `==6.1`
- (iOS only) [ios-sim](https://github.com/phonegap/ios-sim#installation) 

### Get started

Clone this repository to begin.
 
    git clone https://github.com/Adobe-Marketing-Cloud-Apps/aem-apps-lab-developer.git

### Lessons

Lessons associated with this lab can be found in the [lessons directory](lessons) of this repository.

### Install

This project is based on the [multimodule-content-package-archetype](http://dev.day.com/content/docs/en/aem/6-0/develop/how-tos/vlt-mavenplugin.html#multimodule-content-package-archetype) (with the bundle removed for simplicity), so it contains the same helpful profiles and properties to build and deploy your project with maven.

From the project root, run:

    mvn -PautoInstallPackage clean install 

... to build the content package and install to a AEM instance. The CRX host and port can be specified on the command line with `mvn -Dcrx.host=otherhost -Dcrx.port=5502 <goals>`

### Edit in AEM

Once built and installed via maven, your new app should be editable in AEM. Take a look at the new [Apps admin console](http://localhost:4502/aem/apps.html/content/phonegap) to view the available apps on your instance.

A new app folder with the name 'Summit Lab' should be listed. Tap it to view the app you installed. If you followed the instructions exactly and have your author instance running locally on `:4502`, you should be able to author your new app via the following link:

[http://localhost:4502/editor.html/content/phonegap/Geometrixx/ShapesCon/en/home.html](http://localhost:4502/editor.html/content/phonegap/Geometrixx/ShapesCon/en/home.html)

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


