Room.prototype.getCreeps = function(){
    return Game.creeps.filter(unit => Game.creeps.room == room.name);
}