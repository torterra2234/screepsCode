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

    /**
     * returns the name of the room the creep belongs to
     * @returns {String} Room name
     */
    Creep.prototype.getRoom = function(){
        return this.name.slice(0, -5);
    };

    /**
     * returns creep ID number among it's type
     * Should never exceed the count of creeps in a room outside of manual spawns
     * cannot exceed 255 (8 bits)
     * @returns {number}
     */
    Creep.prototype.getTypeID = function(){
        return creep.name.slice(-5,-4) >> 4;
    };

    /**
     * Gets the creep's tier
     * max value should be 15 (4 bits)
     * @returns {number}
     */
    Creep.prototype.getTier = function(){
        return creep.name.slice(-5,-4) && 0xf;
    }

    /**
     * filler function to obtain creeps role from its name
     * THIS VALUE SHOULD ALWAYS BE ACCESSED FROM MEMORY
     * @returns {String}
     */
    Creep.prototype.getRole = function(){
        roleName = creep.name.slice(-4);
        for(let role in Roles){
            if(Roles[role].name === roleName){
                return role;
            }
        }
    }

    /**
     * retrieves creep data from its name
     * @param {boolean} [roleFromName] whether to use the name to retrive the role
     * @returns {object} object of parameters
     */
    Creep.prototype.parseNameToObject = function(roleFromName){
        return {room: this.getRoom(), id: this.getTypeID(), tier: this.getTier(), role: (roleFromName == true ? this.getRole() : this.memory.role)};
    }
}