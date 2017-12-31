const rooms = document.body.textContent.trim().split("\n").map(r => r.split("-")).map(r => ({
	name: r.splice(0,r.length-1),
	sector: parseInt(r[0].split("[")[0],10),
	checksum:r[0].substr(-6,5)
}));

// 04-1
function getChecksum(name) {
	let letters = {};
	name.split("").forEach(letter => {letters[letter] = (letter in letters ? letters[letter] : 0)+1});
	return Object.entries(letters).sort((a,b) => b[1]-a[1] || (a[0]<b[0]?-1:1)).slice(0,5).map(e => e[0]).join("");
}
let realRooms = rooms.filter(room => room.checksum === getChecksum(room.name.join("")));
console.log("DAY 04-1:", realRooms.reduce((sum,room) => sum+room.sector, 0));	// 137896

// 04-2
let decryptedRooms = realRooms.map(room => ({name: room.name.map(part => String.fromCharCode(...part.split("").map(c => (c.charCodeAt(0)-97+room.sector)%26 + 97))).join(" "), sector: room.sector}));
console.log("DAY 04-2:", decryptedRooms.find(room => room.name.split(" ").includes("northpole")).sector);	// 501
