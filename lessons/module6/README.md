Adobe Mobile Services Analytics
=========

## Lesson 1 – Add Analytics Tracking 

Instrumenting an app to send analytic data involves adding the Adobe Mobile Services plugin to your app and then instrumenting the app to use the plugin API.

### Exercise 1 – Add Tracking capability to your app
The developer lab has already completed the following steps required to add tracking capabilities to an app. 

1. Add the ADB mobile plugin 
  a. See: [/content/src/main/content/jcr_root/content/phonegap/summit-developer-lab/shell/_jcr_content/pge-app/app-content/phonegap/www/config.xml](../../content/src/main/content/jcr_root/content/phonegap/summit-developer-lab/shell/_jcr_content/pge-app/app-content/phonegap/www/config.xml)

2.	Copy AMS config to native project 
  a. A cordova after_prepare hook can be used to copy the AMS config to the the native project
b. See: [content/src/main/content/jcr_root/content/phonegap/summit-developer-lab/shell/jcr_content/pge-app/app-content/phonegap/scripts/copy_AMS_config.js](../../content/src/main/content/jcr_root/content/phonegap/summit-developer-lab/shell/jcr_content/pge-app/app-content/phonegap/scripts/copy_AMS_config.js)

3.	Add the ADB mobile content sync config
  a.	Used to include the uploaded mobile config with the app assets package
  b.	See: [content/src/main/content/jcr_root/content/phonegap/summit-developer-lab/shell/jcr_content/pge-app/app-config-dev/ams-ADBMobileConfig](../../content/src/main/content/jcr_root/content/phonegap/summit-developer-lab/shell/jcr_content/pge-app/app-config-dev/ams-ADBMobileConfig)

### Exercise 2 – Add Tracking to a Component
1.	Open phonegap-camera.js created during [Module 3](../module3)
2.	Add instrumentation to track camera actions 

```
if (window.ADB){
    ADB.trackAction('browseForAPicture', {});
}
```

3.	Install all project changes to AEM
  a. `mvn -PautoInstallPackage clean install`

## Lesson 2 – Add Analytics Reporting

### Exercise 1 – Add an Adobe Mobile Services configuration 

`Pre-configured`

### Exercise 2 – Add an Adobe Mobile Services configuration to your app
1.	Navigate to the Apps Dashboard for your app
2.	Confirm the Metrics tile starts to load the latest metrics
3.	Click the down arrow icon from the Metrics tile and select Upload AMS SDK Config 
4.	Click Upload Adobe Mobile Services Application Config 
5.	Browse to the provided ADBMobileConfig.json at `summit-developer-lab/lessons/module6` and click Open
6.	This `ADBMobileConfig.json` will now be associated to your AMS Configuration
Outcome

## Lesson 3 – Test Analytics Reporting

### Exercise 1 – Launch Bloodhound
1.	Launch the Bloodhound application
2.	Notice that no events are being tracked

### Exercise 2 –Test your instrumented app
1.	Download a development payload package from the AEM Apps dashboard
2.	Unzip the downloaded package
3.	Run the app in the iOS simulator (phonegap run ios)
4.	Note lifecycle events in Bloodhound
5.	Navigate to a variety of pages in the app
6.	Return to Bloodhound and notice actions and events


[Return →](../)