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