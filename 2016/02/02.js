const instr = document.body.textContent.trim().split("\n").map(r => r.split(""));
const moves = {R:[0,1],L:[0,-1],U:[-1,0],D:[1,0]};

// 02-1
let pos = [1,1], code = '';
instr.forEach(i => {
	pos = i.reduce((newPos,move) => newPos.map((p,i) => Math.max(Math.min(p+moves[move][i],2),0)), pos);
	code += 3*pos[0] + pos[1] + 1;
});
console.log("DAY 02-1:", code);	// 65556

// 02-2
pos = [2,0], code = '';
instr.forEach(i => {
	i.forEach(m => {
		let moveAxis = moves[m][0] ? 0 : 1, keepAxis = moveAxis ? 0 : 1;
		pos[moveAxis] = Math.max(Math.min(pos[moveAxis]+moves[m][moveAxis], 4-Math.abs(2-pos[keepAxis])), Math.abs(2-pos[keepAxis]));	
	});
	code += ([1,2,5,10,13][pos[0]] + (pos[1]-Math.abs(2-pos[0]))).toString(16).toUpperCase();
});
console.log("DAY 02-2:", code);	// CB779
