var World = function(worldInfo) {
	var world = this;
	this.info = {
		name: worldInfo.name,
		id: generateId('world'),
		locked: worldInfo.locked,
		object: 'world'
	};
	this.places = {
		regions: []
	};
	this.generateRegion = function(regionInfo) {
		var newRegion = new Region(regionInfo, world.info);
		world.places.regions.push(newRegion);
		return newRegion;
	};
};

var Region = function(regionInfo, parentInfo) {
	var region = this;
	this.info = {
		name: regionInfo.name,
		id: generateId('region'),
		worldId: parentInfo.id,
		locked: regionInfo.locked,
		object: 'region'
	};
	this.places = {
		settlements: {
			cities: [],
			towns: [],
			villages: []
		},
		roads: [],
		wilderness: []
	};
	this.generateSettlement = function(settlementInfo) {
		if(settlementInfo.type == 'city') {
			var newSettlement = new Settlement(settlementInfo, region.info);
			region.places.settlements.cities.push(newSettlement);
			return newSettlement;
		} else if(settlementInfo.type == 'town') {
			var newSettlement = new Settlement(settlementInfo, region.info);
			region.places.settlements.towns.push(newSettlement);
			return newSettlement;
		} else if(settlementInfo.type == 'village') {
			var newSettlement = new Settlement(settlementInfo, region.info);
			region.places.settlements.villages.push(newSettlement);
			return newSettlement;
		}
	};
	this.generateRoad = function(roadInfo) {
		var newRoad = new Road(roadInfo);
		region.places.roads.push(newRoad);
		return newRoad;
	};
	this.generateWilderness = function(wildernessInfo) {
		var newWilderness = new Wilderness(wildernessInfo);
		region.places.wilderness.push(newWilderness);
		return newWilderness;
	};
};

var Settlement = function(settlementInfo, parentInfo) {
	var settlement = this;
	this.info = {
		name: settlementInfo.name,
		id: generateId(settlementInfo.type),
		worldId: parentInfo.worldId,
		regionId: parentInfo.id,
		type: settlementInfo.type,
		locked: settlementInfo.locked,
		object: 'settlement'
	};
	if(settlementInfo.type == 'city') {
		this.places = {
			districts: []
		};
	} else if(settlementInfo.type == 'town') {
		this.places = {
			neighborhoods: []
		};
	} else if(settlementInfo.type == 'village') {
		this.places = {
			buildings: [],
			streets: []
		};
	}
	this.generateDistrict = function(districtInfo) {
		if(settlement.info.type == 'city') {
			var newDistrict = new District(districtInfo, settlement.info);
			settlement.places.districts.push(newDistrict);
			return newDistrict;
		} else {
			console.log('This settlement type (' + settlement.info.type + ') does not support districts.');
		}
	};
	this.generateNeighborhood = function(neighborhoodInfo) {
		if(settlement.info.type == 'town') {
			var newNeighborhood = new Neighborhood(neighborhoodInfo, settlement.info, settlement.info.id);
			settlement.places.neighborhoods.push(newNeighborhood);
			return newNeighborhood;
		} else {
			console.log('This settlement type (' + settlement.info.type + ') does not support neighborhoods.');
		}
	};
	this.generateBuilding = function(buildingInfo) {
		if(settlement.info.type == 'village') {
			var newBuilding = new Building(buildingInfo, settlement.info, settlement.info.id);
			settlement.places.buildings.push(newBuilding);
			return newBuilding;
		} else {
			console.log('This settlement type (' + settlement.info.type + ') does not support buildings.');
		}
	};
	this.generateStreet = function(streetInfo) {
		if(settlement.info.type == 'village') {
			var newStreet = new Street(streetInfo, settlement.info, settlement.info.id);
			settlement.places.buildings.push(newStreet);
			return newStreet;
		} else {
			console.log('This settlement type (' + settlement.info.type + ') does not support streets.');
		}
	};
};

var District = function(districtInfo, parentInfo) {
	var district = this;
	this.info = {
		name: districtInfo.name,
		id: generateId('district'),
		worldId: parentInfo.worldId,
		regionId: parentInfo.regionId,
		settlementId: parentInfo.id,
		locked: districtInfo.locked,
		object: 'district'
	};
	this.places = {
		neighborhoods: []
	};
	this.generateNeighborhood = function(neighborhoodInfo) {
		var newNeighborhood = new Neighborhood(neighborhoodInfo, district.info, district.info.settlementId);
		district.places.neighborhoods.push(newNeighborhood);
		return newNeighborhood;
	};
};

var Neighborhood = function(neighborhoodInfo, parentInfo, settlementId) {
	var neighborhood = this;
	this.info = {
		name: neighborhoodInfo.name,
		id: generateId('neighborhood'),
//		parentId: parentInfo.id
		worldId: parentInfo.worldId,
		regionId: parentInfo.regionId,
		settlementId: settlementId,
//		districtId: districtId
		locked: neighborhoodInfo.locked,
		object: 'neighborhood'
	};
	this.places = {
		buildings: [],
		streets: []
	}
	this.generateBuilding = function(buildingInfo) {
		var newBuilding = new Building(buildingInfo, neighborhood.info, settlementId);
		neighborhood.places.buildings.push(newBuilding);
		return newBuilding;
	};
	this.generateStreet = function(streetInfo) {
		var newStreet = new Street(streetInfo, neighborhood.info, settlementId);
		neighborhood.places.streets.push(newStreet);
		return newStreet;
	};
};

var Building = function(buildingInfo, parentInfo, settlementId) {
	var building = this;
	this.info = {
		name: buildingInfo.name,
		id: generateId('building'),
//		parentId: parentInfo.id
		worldId: parentInfo.worldId,
		regionId: parentInfo.regionId,
		settlementId: settlementId,
		locked: buildingInfo.locked,
		object: 'building'
	};
	this.places = {
		rooms: []
	};
	this.generateRoom = function(roomInfo) {
		var newRoom = new Room(roomInfo, building.info);
		building.places.rooms.push(newRoom);
		return newRoom;
	};
};

var Street = function(streetInfo, parentInfo, settlementId) {
	var street = this;
	this.info = {
		name: streetInfo.name,
		id: generateId('street'),
//		parentId: parentInfo.id
		worldId: parentInfo.worldId,
		regionId: parentInfo.regionId,
		settlementId: settlementId,
		locked: streetInfo.locked,
		object: 'street'
	};
};

var Room = function(roomInfo, parentInfo) {
	var room = this;
	this.info = {
		name: roomInfo.name,
		id: generateId('room'),
		worldId: parentInfo.worldId,
		regionId: parentInfo.regionId,
		settlementId: parentInfo.settlementId,
		buildingId: parentInfo.id,
		locked: roomInfo.locked,
		object: 'room'
	};
}

var ids = [];
function generateId(type) {
	var id = '';
	for(var i = 0; i < 6; i++) {
		var random = Math.round(Math.random() * 9);
		id += random;
	}
	if(ids.indexOf(id) >= 0) {
		genereateId(type);
	} else {
		ids.push(id);
		return id;
	}
}

/*
var world = new World({name: 'Casan di Athum'});

var elsirVale = world.generateRegion({name: 'Elsir Vale', worldId: world.info.id});

var kelgarsCoin = elsirVale.generateSettlement({name: 'Kelgar\'s Coin', type: 'city'});
var townCircle = kelgarsCoin.generateDistrict({name: 'Town Circle'});
var merchantDistrict = kelgarsCoin.generateDistrict({name: 'Merchant District'});
var guildsRow = merchantDistrict.generateNeighborhood({name: 'Guilds Row'});
var lowerMerchantDistrict = merchantDistrict.generateNeighborhood({name: 'Lower Merchant District'});
var mageTower = lowerMerchantDistrict.generateBuilding({name: 'Mage Guild of William Doster'});
var dosterStreet = lowerMerchantDistrict.generateStreet({name: 'Doster Street'});
var mtEntryRoom = mageTower.generateRoom({name: 'Entry Room'});

var felwood = elsirVale.generateSettlement({name: 'Felwood', type: 'town'});
var townCenter = felwood.generateNeighborhood({name: 'Town Center'});
var townHall = townCenter.generateBuilding({name: 'Town Hall'});
var mainStreet = townCenter.generateStreet({name: 'Main Street'});
var thEntryRoom = townHall.generateRoom({name: 'Entrance Area'});

var hamlet = elsirVale.generateSettlement({name: 'Hamlet', type: 'village'});
var tavern = hamlet.generateBuilding({name: 'Tavern'});
var hamletRoad = hamlet.generateStreet({name: 'Hamlet Road'});
var tavernFirstFloor = tavern.generateRoom({name: 'Common Area'});
*/

// console.log(world);

var world = new World({name: 'Test World', locked: false});

var region = world.generateRegion({name: 'Test Region', locked: false});

var village = region.generateSettlement({name: 'Village', type: 'village', locked: false});

var home = village.generateBuilding({name: 'Home', locked: false});
var kitchen = home.generateRoom({name: 'Kitchen', locked: false});
home.defaultRoom = kitchen;
var room = home.generateRoom({name: 'Your Room', locked: false});
var gates = village.generateBuilding({name: 'Village Gates', locked: false});
var villageCenter = village.generateBuilding({name: 'Village Center', locked: false});
var entranceHall = villageCenter.generateRoom({name: 'Entrance Hall', locked: false});
villageCenter.defaultRoom = entranceHall;
var office = villageCenter.generateRoom({name: 'Office', locked: true});

room.connectors = [kitchen];
kitchen.connectors = [room, village];
village.connectors = [home, gates, villageCenter];
gates.connectors = [village];
entranceHall.connectors = [office, village];
office.connectors = [entranceHall];

var currentLocation = room;

function changeLocation(location) {
	if(location.info.locked) {
		console.log('That ' + location.info.object + ' is locked!');
	} else {
		$('#location').text(location.info.name);
		$('#connectors').empty();
		location.connectors.forEach(function(place) {
			var li = $('<li>');
			li.attr('data-id', place.info.id);
			li.addClass('connector');
			li.text(place.info.name);
			$('#connectors').append(li);
		});
// 		displayItems(location)
		currentLocation = location;
	}
}

changeLocation(currentLocation);

$(document).on('click', '.connector', function() {
	var id = $(this).data('id');
	var location;
	currentLocation.connectors.forEach(function(place) {
		if(place.info.id == id) {
			location = place;
		}
	});
	if(location.defaultRoom) {
		location = location.defaultRoom;
	}
	changeLocation(location);
});