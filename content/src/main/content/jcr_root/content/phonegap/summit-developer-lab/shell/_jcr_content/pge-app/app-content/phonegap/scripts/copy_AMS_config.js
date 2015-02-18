#!/usr/bin/env node
//
// This hook copies various files from our version control system directories
// into the appropriate platform specific location

var filestocopy = {
///////////////////////////
//          iOS
///////////////////////////
    ios : [
        {
            "www/ADBMobileConfig.json": "platforms/ios/Summit Lab/Resources/ADBMobileConfig.json"
        }
    ],
///////////////////////////
//          ANDROID
///////////////////////////
    android: [
        {
            "www/ADBMobileConfig.json": "platforms/android/assets/ADBMobileConfig.json"
        }
    ]
};

var fs = require('fs');
var path = require('path');

// no need to configure below
var platforms = fs.readdirSync('platforms');

for(var i in platforms) {
    var platform = platforms[i];

    if (filestocopy[platform] == undefined) {
        continue;
    }

    filestocopy[platform].forEach(function(obj) {
        Object.keys(obj).forEach(function(srcfile) {
            var destfile = obj[srcfile];

            console.log('Copying ' + srcfile + ' to ' + destfile);

            var destdir = path.dirname(destfile);
            if (fs.existsSync(srcfile) && fs.existsSync(destdir)) {
                fs.createReadStream(srcfile).pipe(
                    fs.createWriteStream(destfile));
            }
        });
    });
};
