const input = document.body.textContent.trim().split("\n");
const ops = {
	rect: {
		parse(line) {return line.split(" ")[1].split("x").map(d => parseInt(d))},
		exec(screen, data) {
			screen.filter((r,i) => i<data[1]).forEach(r => {
				r.filter((c,j) => j<data[0]).forEach((c,j) => {r[j]=1;});
			});
		}
	},
	rotate: {
		parse(line) {let p = line.split(" "); return [p[1]==='row', parseInt(p[2].split("=")[1]), parseInt(p[4])];},
		exec(screen, data) {
			if(data[0]) screen[data[1]] = screen[data[1]].map((c,i,a) => a[(i-data[2]+a.length)%a.length]);
			else {let c = screen.map(r => r[data[1]]); screen.forEach((r,i) => {r[data[1]] = c[(i-data[2]+c.length)%c.length];});}
		}
	}
};

// 08-1
let instr = input.map(r => [r.split(" ")[0],r]).map(r => ({f:ops[r[0]].exec, d:ops[r[0]].parse(r[1])}));
let screen = Array(6).fill(Array(50).fill(0)).map(r => r.slice());
instr.forEach(i => {i.f(screen, i.d);});
console.log('DAY 08-1:', screen.reduce((acr,row) => acr+row.reduce((acc,col) => acc+col,0),0));	// 119

// 08-2 (visual solution)
function showScreen(screen) {
	screen.forEach((r,i) => {console.log(i+':', r.map(c => c?'#':' ').join(""));});
}
showScreen(screen);	// ZFHFSFOGPO
