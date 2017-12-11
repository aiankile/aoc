let inp = document.body.textContent.trim().split(",");
let moves = {n:[1,0],nw:[1,-1],ne:[0,1],s:[-1,0],sw:[0,-1],se:[-1,1]};
function distance(pos) {
	return pos[0]/Math.abs(pos[0]) * pos[1]/Math.abs(pos[1]) >= 0 ? Math.abs(pos[0])+Math.abs(pos[1]) : Math.max(Math.abs(pos[0]),Math.abs(pos[1]))
}

console.log('DAY 11-1');
let end = inp.map(m => moves[m]).reduce((acc,val) => [acc[0]+val[0],acc[1]+val[1]]);
console.log('Shortest distance:', distance(end) );

console.log('DAY 11-2');
let maxDist = 0;
inp.map(m => moves[m]).reduce((acc,val) => { 
	let pos = [acc[0]+val[0],acc[1]+val[1]];
	maxDist = Math.max(maxDist, distance(pos));
	return pos;
});
console.log('Furthest away:', maxDist);