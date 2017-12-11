let cond = {
	">": (a,b) => a > b,
	"<": (a,b) => a < b,
	">=": (a,b) => a >= b,
	"<=": (a,b) => a <= b,
	"==": (a,b) => a == b,
	"!=": (a,b) => a != b,
};
let inp = document.body.textContent.trim().split("\n").map(i => i.split(" "));

console.log('DAY 08-1');
var regs = {};
let max = -Infinity;
inp.forEach(r => {
	if( cond[r[5]]( r[4] in regs ? regs[r[4]] : 0, parseInt(r[6],10) ) ) {
		regs[r[0]] = (r[0] in regs ? regs[r[0]] : 0) + (r[1] == "inc" ? 1 : -1) * parseInt(r[2],10);
		if(regs[r[0]] > max) max = regs[r[0]];
	}	
});
console.log('Largest value:', Math.max(...Object.values(regs)));

console.log('DAY 08-2: Largest ever:', max);