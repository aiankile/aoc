function input() {return document.body.textContent.trim().split("\n").map(r => r.split(", ").map(x => x.split("=")).map(y => y[1].slice(1,-1).split(",").map(z => parseInt(z,10))));}
function tick(data, collide=false) {
	data.forEach(p => {
		p[1] = p[1].map((v,i) => v+p[2][i]);
		p[0] = p[0].map((x,i) => x+p[1][i]);
		p[3] = p[0].reduce((acc,val) => acc + Math.abs(val),0);
	});
	// part 2
	if(collide) {
		let collisions = data.map((p,i) => [i,p[0].join(",")]).filter((p,i,a) => a.some(x => x[1] === p[1] && x[0] !== i)).map(p => p[0]);		
		return data.filter((p,i) => !collisions.includes(i));		
	}
	// part 1
	else {
		let minRange = Math.min(...data.map(p => p[3]));
		return data.findIndex(p => p[3] === minRange);
	}
}

// 20-1
let state1 = input(), lastClosest = -1, count1 = 0;
do {
	let closest = tick(state1);
	if(closest !== lastClosest) {
		lastClosest = closest;
		count1 = 0;		
	}
	else {
		count1++;
	}
} while(count1 < 1000);
console.log("DAY 20-1:", lastClosest);		// 344

// 20-2
let state2 = input(), lastLength = state2.length, count2 = 0;
do {
	state2 = tick(state2, true);
	if(state2.length !== lastLength) {
		lastLength = state2.length;
		count2 = 0;
	}
	else {
		count2++;
	}
} while(count2 < 1000);
console.log("DAY 20-2:", state2.length);	// 404