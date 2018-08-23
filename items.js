var Item = function(itemInfo) {
	this.info = {
		name: itemInfo.name,
		id: generateId(itemInfo.type),
		object: 'item',
		type: itemInfo.type,
		weight: itemInfo.weight
	}
	this.interactions = {
		pickUp: itemInfo.pickUp,
		
	}
	this.inspect = function() {
		
	}
	switch(itemInfo.type) {
		case 'weapon':
			this.damage = function() {
				console.log('weapon damage');
			}
	}
};

var Weapon = function(weaponInfo) {
	var weapon = this;
	this.info: {
		name: weaponInfo.name,
		id: generateId('weapon'),
		object: 'weapon',
		weight: weaponInfo.weight,
	}
	this.damage = function() {
		
	}
}