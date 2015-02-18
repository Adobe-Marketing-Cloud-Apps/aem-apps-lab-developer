PhoneGap Introduction
=========

PhoneGap is a framework that allows you to create mobile apps using standardized web APIs for the platforms you care about. It is based upon the Apache Cordova open source project.

The PhoneGap command-line interface is a tool that allows you to create new projects, build them on different platforms, either locally or on a remote server, and run them within an emulator or device. You can also use the CLI to initialize project code, after which you use various platforms' SDKs to develop them further.

## Lesson 1 - PhoneGap Basics

### Exercise 1 – PhoneGap Applications
1.	Visit the PhoneGap developer website at http://docs.phonegap.com/ and identify the plugin APIs that might facilitate a unique and compelling mobile experience for you.
2. Take a look at the individual API plugin pages at http://docs.phonegap.com/en/4.0.0/cordova_plugins_pluginapis.md.html and see if you can understand how the plugins work.
3. (Optional) Visit the template PhoneGap application at https://github.com/phonegap/phonegap-start and look at the key constituent parts:
  - phonegap-start / www / index.html
  - phonegap-start / www / config.xml
  - phonegap-start / www / js / index.js

## Lesson 2 - PhoneGap Command Line

### Exercise 1 - Building a mobile application with PhoneGap CLI
In this exercise you will create a PhoneGap application for iOS.

1. Create a basic app by typing the following into the Terminal:
  - `phonegap create my-lab-app`
  - `cd my-lab-app`

2. Inspect the created files in Finder. In the Terminal type `open .` to view them in Finder.
  
### Exercise 2 - Run a basic PhoneGap app
1.	Build and run the app just created by typing the following in the Terminal:
phonegap run ios 
2.	Close the app by pressing SHIFT+CMD+H (or Menu: Hardware>Home)
3.	Close the simulator by pressing CMD+Q (or Menu: iOS Simulator>Quit iOS Simulator)
4.	Edit the app content:
  - In the Finder, find the file www/index.html (in my-lab-app) and CTRL-click on it, then select Open With > Xcode
  - Change ‘Connecting to Device’ to ‘Hello <YOURNAME>. Connecting to Device’
  - Change ‘Device is Ready’ to ‘Hello <YOURNAME>. Device is Ready’
  - Save the document by typing CMD-S (or Menu: File > Save)
  - Run the app to view your changes by typing in the Terminal:
phonegap run ios
  - Confirm the app now shows your name. 
5.	 (Advanced) Change simulated device:
  - Menu: Hardware>Device> …
  - From the home screen, drag right to left with the mouse and click the app icon to re-open it
6.	(Advanced) Debug in browser:
  - Open the Safari web browser
  - Preferences > Advanced > tick “Show Develop menu in menu bar”
  - Menu: Develop > iPhone Simulator > index.html
7.	(Advanced) Create some additional content:
  - Create an additional HTML page ‘my-lab-app/www/page1.html’ 
  - Open my-lab-app/www/index.html and create an html hyperlink to your new page
  - Run the app to view your changes: `phonegap run ios`

### Exercise 3 (optional) – Run a basic PhoneGap app via Xcode
1.	Find the generated Xcode project my-lab-app/platforms/ios/HelloWorld.xcodeproj and open it by double-clicking it.
2.	Click the play icon in the top-left corner to build and run the app in the simulator.
  - If prompted to “Enable Developer Mode on this Mac”, select “Enable” and enter the provided password.


[Next →](../module3)