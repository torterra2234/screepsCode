module.exports = {
	/** @param {int, int} a b **/
	add: function(a,b){
		return a + b;
	},
	/** @param {int, int} a b **/
	subtract: function(a,b){
		return a - b;
	},

	calcRRC: function(){
		let count = 0;
		for(let type in Roles){
			count += Roles[type].count;
		}
		return count;
	},
};