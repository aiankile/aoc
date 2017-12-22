const letters = "abcdefghijklmnop";
const map = {
	s: {
		f(s,p) {s.splice(0,16,...s.slice(16-p), ...s.slice(0,16-p))},
		p(p) {return parseInt(p,10);}
	},
	x: {
		f(s,p) {let val0 = s[p[0]], val1 = s[p[1]]; s[p[0]] = val1; s[p[1]] = val0;},
		p(p) {return p.split("/").map(x => parseInt(x,10));}
	},
	p: {
		f(s,p) {let pos0 = s.indexOf(p[0]), pos1 = s.indexOf(p[1]); s[pos0] = p[1]; s[pos1] = p[0];},
		p(p) {return p.split("/").map(x => letters.indexOf(x));}
	}
};
const inp = document.body.textContent.trim().split(",").map(m => [m.substr(0,1), m.substr(1)]).map(m => [map[m[0]].f, map[m[0]].p(m[1])]);

// 16-1
let state = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];	// letter indices at positions i
inp.forEach(m => m[0](state,m[1]));
console.log("DAY 16-1:", state.map(x => letters[x]).join("")); // jkmflcgpdbonihea

// 16-2
let newState = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], loop = 0, states = [], footprint;
while((footprint = newState.map(x => letters[x]).join("")) !== letters || loop == 0) {	
	states[loop] = footprint;
	inp.forEach(m => m[0](newState,m[1]));
	loop++;
}
console.log("DAY 16-2:", states[1000000000%loop]);