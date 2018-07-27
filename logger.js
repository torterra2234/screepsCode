module.exports = {
	status:function(input){
		console.log('STATUS: ' + input);
	},
	debug:function(input){
		console.log('DEBUG: ' + JSON.stringify(input));
	},
	warning:function(input){
		console.log('WARNING: ' + input);
	},
	error:function(input){
		console.log('ERROR: ' + input);
	}
};