/*************************************************************************
 *
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 *  Copyright 2013 Adobe Systems Incorporated
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 **************************************************************************/

var exec = require('child_process').exec;

module.exports = function(context) {

	exec("phonegap --experimental restore plugins", function(error, stdout, stderr) {
		if (error || stderr || stdout.match(/\[error\]/i)) {
			var code = error ? error.code : 1;
			console.error('Error restoring plugins. code: [' + code + ']');
			console.error(stdout);
			console.error(stderr);
			process.exit(code);
		} else {
			console.log("Successfully restored plugins.");
		}
	});

};