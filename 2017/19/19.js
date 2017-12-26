const map = document.body.textContent.split("\n").filter(r => r.length).map(r => r.split(""));

// 19
function move(map, state) {
	if(map[state.pos[0]][state.pos[1]] === '+') {		
		if(state.dir[1] === 0) {			
			if(map[state.pos[0]][state.pos[1]-1] === '-') state.dir = [0,-1];
			else if(map[state.pos[0]][state.pos[1]+1] === '-') state.dir = [0,1];
		}
		else {
			if(map[state.pos[0]-1][state.pos[1]] === '|') state.dir = [-1,0];
			else if(map[state.pos[0]+1][state.pos[1]] === '|') state.dir = [1,0];			
		}		
	}
	let newPos = [state.pos[0]+state.dir[0], state.pos[1]+state.dir[1]];	
	if(map[newPos[0]] !== undefined && map[newPos[0]][newPos[1]] !== ' ') {
		state.pos = newPos;
		if(/^[A-Z]$/.test(map[newPos[0]][newPos[1]])) state.letters += map[newPos[0]][newPos[1]];
		state.steps++;
		return true;
	}
	return false;
}
let state = {pos:[0,map[0].indexOf("|")], dir:[1,0], letters:'', steps:1};
while(move(map, state)) {}
console.log("DAY 19-1:", state.letters);	// YOHREPXWN
console.log("DAY 19-2:", state.steps);		// 16734