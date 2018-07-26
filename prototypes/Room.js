Room.prototype.getCreeps = function(){
    return Game.creeps.filter(unit => Game.creeps.room === room);
}

Room.prototype.getSpawn = function(){
    return Game.spawns.filter(spawn => Game.spawns.room === room);
}

Room.prototype.setSpawners = function(){
    this.spawners = this.getSpawn();
}

Room.prototype.getSpawners = function(){
    return this.spawners;
}