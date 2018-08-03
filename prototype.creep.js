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

    /**
     * stores up to 32 true/false values
     * in as compact form as possible
     */
    Object.defineProperty(Creep.prototype, 'flags', {
        get: function(){
            if(!this._flags){
                if(this.memory.flags === undefined){
                    this.memory.flags = 0;
                }
            this._flags = this.memory.flags;
            }
            return this._flags;
        },
        set: function(newValue){
            this._flags = newValue;
            this.memory.flags = newValue;
        }
    })

    /**
     * Toggles a given flag
     * @param {number} idx Index of flag to toggle
     */
    Creep.prototype.toggleFlag = function(idx){
        this.flags = this.flags ^ (1<<idx);
    }

    /**
     * Toggles all given flags
     * @param {number[]} idx Index array opf flags to toggle
     */
    Creep.prototype.toggleFlags = function(idx){
        indexes = 0;
        for(let index in idx){
            indexes += 1<<index;
        }
        this.flags = this.flags ^ indexes;
    }

    /**
     * sets a flag at given index
     * @param {number} idx the index of the flag
     * @param {boolean} [value] the state of the flag
     */
    Creep.prototype.setFlag = function(idx, value){
        value === undefined ? 1 : value;
        index = 1<<idx;
        this.flags = this.flags & (-index - 1) ^ index;
    }

    /**
     * sets flags at given indexes
     * @param {number[]} idx the array of indexes to set
     * @param {bool} [value] the state to set
     */
    Creep.prototype.setFlags = function(idx, value){
        value === undefined ? 1 : value;
        indexes = 0;
        for(let index in idx){
            indexes += 1<<index;
        }
        this.flags = this.flags & (-index - 1) ^ index;
    }

    /**
     * gets a flag at a position
     * @param {number} idx The index of the flag to retreive
     * @returns {boolean} The state of the flag
     */
    Creep.prototype.getFlag = function(idx){
        return (this.flags & (1<<idx)) != 0;
    }

    /**
     * 
     * @param {number[]} idx Array of indexes to check
     * @returns {Object} Object of booleans referenced by index
     */
    Creep.prototype.getFlags = function(idx){
        result = {};
        for(let index in idx){
            result[index] = (this.flags & (1<<index)) != 0;
        }
        return result;
    }
}