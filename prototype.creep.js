module.exports = function(){
    /**
     * wrapper value to allow methods to be valid for both creeps and structures
     */
    Object.defineProperty(Creep.prototype, 'energyCapacity', {
        get: function(){
            return this.carryCapacity;
        },
        set: function(newValue){
            this.carryCapacity = newValue;
        }
    });

    /**
     * wrapper value to allow methods to be valid for both creeps and structures
     */
    Object.defineProperty(Creep.prototype, 'energy', {
        get: function(){
            return this.carry.energy;
        },
        set: function(newValue){
            this.carry.energy = newValue;
        }
    });
}