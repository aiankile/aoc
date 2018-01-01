const moves = document.body.textContent.trim().split(", ").map(m => ({turn:m.substr(0,1)==='R'?1:-1, dist:parseInt(m.substr(1),10)}));
const dirs = [[-1,0],[0,1],[1,0],[0,-1]];

// 01-1
let posLog = ["0:0"];
let distHQ = moves.reduce((state,move) => {
	state.dir=(state.dir+move.turn+4)%4;	
	// part2 redundancy -->
	for(let d = 1; d <= move.dist;d++) posLog.push(state.pos.map((x,i) => x+d*dirs[state.dir][i]).join(":"));
	// <--
	state.pos = state.pos.map((x,i) => x+move.dist*dirs[state.dir][i]);
	return state;
},{pos:[0,0],dir:0}).pos.reduce((sum,x) => sum+Math.abs(x),0);
console.log("DAY 01-1:", distHQ);	// 226

// 01-2
console.log("DAY 01-2:", posLog.find((v,i,a) => a.slice(i+1).includes(v)).split(":").reduce((sum,x) => sum+Math.abs(parseInt(x,10)),0));	// 79
