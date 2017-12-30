const parts = document.body.textContent.trim().split("\n")
			 .map(r => r.split("/").map(c => parseInt(c,10)))
			 .map((r,i) => ({index:i, ports:r, strength:r[0]+r[1]}));
const strScale = parts.reduce((acc,part) => acc+part.strength,0);

function buildBridge(parts, longest=false, taken=[], openPort=0) {	
	let bestPath = parts		
		.filter(part => !taken.includes(part.index) && part.ports.includes(openPort))
		.map(part => ({index:part.index, strength:part.strength, nextPort:part.ports.filter((p,i,a) => i !== a.indexOf(openPort))[0]}))
		.map(part => ({index:part.index, strength:part.strength, subBridge:buildBridge(parts, longest, [...taken,part.index], part.nextPort)}))
		.map(part => ({index:part.index, bridge:{parts:[part.index,...part.subBridge?part.subBridge.parts:[]], strength:part.strength+(part.subBridge?part.subBridge.strength:0)}}))
		.find((part,i,a) => (longest ? part.bridge.parts.length+part.bridge.strength/strScale : part.bridge.strength) === Math.max(...a.map(p => longest ? p.bridge.parts.length+p.bridge.strength/strScale : p.bridge.strength)));	
	return bestPath ? bestPath.bridge : undefined;	
}

// 24-1
let bridge1 = buildBridge(parts);
console.log("DAY 24-1:", bridge1.strength);	// 1656

// 24-2
let bridge2 = buildBridge(parts, true);
console.log("DAY 24-2:", bridge2.strength); // 1642
