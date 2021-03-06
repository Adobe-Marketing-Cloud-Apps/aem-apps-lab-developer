App Development
=========

Creating a new PhoneGap Enterprise App starts with a well-defined project structure that not only simplifies installation to AEM but also enables web developers to continue using the same tools they are familiar with. 

## Lesson 1 – Project Structure

### Exercise 1: Project Overview

The project used by this lab includes a folder structure for developing a typical AEM application and installing resources to the server. This allows the developer to work with the tools they are accustomed to yet still provide a simple means to deploy changes to AEM through packages.

1.  Open lab project in Finder
  1.  cd summit-developer-lab
  2.  open .
2.  Go to  /content/src/main/content/jcr_root 
3.  Explore the directory structure that will be installed to AEM
  1.  /apps: location for components and templates used by app
  2.  /etc/designs: the design used by the app (ie. Styles)
  3.  /content/dam: assets used by the app (ie. Images)
  4.  /content/phonegap: all of the page content for the app
4.  What component does the page template for the app use?
5.  What clientlibs is the app’s design dependent on?

## Lesson 2 – Component Development

Components are an integral part to the AEM authoring experience.  They are the building blocks that developers provide to authors for assembling mobile app pages. 

For this module a simple component that accesses a device's camera using Java Server Pages will be created. The next module will go into more detail on AEM component development for mobile apps.

### Exercise 1 – Create Camera Component
1.  Copy [phonegap-camera](phonegap-camera) to [/content/src/main/content/jcr_root/apps/summit-developer-lab/components](/content/src/main/content/jcr_root/apps/summit-developer-lab/components)
2.  Open SublimeText editor
3.  Select Project > Open Project… menu
4.  Go to ~/L712/summit-developer-lab and select summit-developer-lab.sublime-project
5.  Open `.content.xml` of the phonegap-camera component and give your new component a title and description
6.  Notice the group this component belongs to

### Exercise 2 – Add JavaScript to Camera Component
1.  Open clientlibs/phonegap-camera.js in SublimeText
2.  Add JavaScript that will be used by the camera component under the `CameraCtrl` controller
  1. Copy JavaScript from [exercise2](exercise2)
3. Add `phonegapCamera` module to [/content/src/main/content/jcr_root/apps/summit-developer-lab/components/ng-phonegap-page/angular-module-list.js.jsp](/content/src/main/content/jcr_root/apps/summit-developer-lab/components/ng-phonegap-page/angular-module-list.js.jsp)

### Exercise 3 – Add HTML to Camera Component
1. Open phonegap-camera.jsp in SublimeText
2. Add ng-controller attribute to top level DIV
  1. `ng-controller="CameraCtrl"`
3. Add a click handler for takeAPicture() to the first <A/> element
  1. `ng-click="takeAPicture()"`
4. Add a click handler for browseForAPicture() to the second <A/> element
  1. `ng-click="browseForAPicture()"`
5. See: [exercise3](exercise3) for final HTML

## Lesson 3 – Project Installation

This project uses Maven for building and contains helpful profiles and properties to build and deploy your project to AEM.

![Lab Thumbnail](../images/dev-lab-thumbnail.png "Lab Thumbnail")

### Exercise 1 – Installing a Project to AEM
1.  Go to root folder of the lab project 
  1.  Open Terminal
  2.  cd `~/lab712/summit-developer-lab`
2.  Run `mvn -PautoInstallPackage clean install` to build the content package and install to an AEM instance
3.  In a browser navigate to [http://localhost:4502](http://localhost:4502)
4.  Log in to the AEM author instance using `admin:admin`
5.  Click on Apps from the left navigation rail 
6.  Locate the project you just installed and select it
7.  Explore the Apps Dashboard for the project you installed


[Next →](../module3a)

