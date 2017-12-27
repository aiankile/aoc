function mirrorX(pattern) {
	return pattern.map(r => r.slice().reverse());
};
function rotateCCW(pattern) {
	let newPattern = pattern.map(r => []), max = pattern.length-1;
	pattern.forEach((r,i) => {r.forEach((c,j) => {newPattern[max-j][i] = c;});});
	return newPattern;
};
function patternTemplate(size) {
	let pattern = [];
	for(let i = 0; i < size; i++) pattern[i] = '0'.repeat(size).split("").map(v => 0);
	return pattern;
}
function patternHash(pattern, size=pattern.length, rIndex=0, cIndex=0) {
	let rFrom = rIndex*size, cFrom = cIndex*size;
	let rTo = rFrom+size, cTo = cFrom+size;
	return parseInt(pattern.filter((r,i) => i >= rFrom && i < rTo).reduce((acc,row) => acc+row.filter((c,j) => j >= cFrom && j < cTo).join(""),''),2);
}
function patternReplace(pattern, data, rIndex, cIndex) {
	let size = data.length;
	let rowOffset = rIndex*size, colOffset = cIndex*size;
	data.forEach((r,i) => { pattern[rowOffset+i].splice(colOffset, size, ...r); });
}
function enhance(pattern, ruleMap) {
	let size = pattern.length % 2 === 0 ? 2 : 3;
	let newPattern = patternTemplate(pattern.length + pattern.length/size);
	for(let i = 0, im = pattern.length / size; i < im; i++) {
		for(let j = 0; j < im; j++) {
			patternReplace(newPattern, ruleMap[size-2][patternHash(pattern, size, i, j)], i, j);
		}
	}
	return newPattern;
}

// init
let rules = document.body.textContent.trim().split("\n").map(r => r.split(" => ").map(c => c.split("/").map(x => x.split("").map(y => y === '#' ? 1 : 0))));
let ruleMap = [[],[]];
rules.forEach(r => {
	let size = r[0].length;
	let patterns = [r[0], mirrorX(r[0])];	
	[0,1,2].forEach(i => {[0,1].forEach(j => {patterns.push(rotateCCW(patterns[2*i+j]));});});
	patterns.forEach(p => {ruleMap[size-2][patternHash(p)] = r[1];});
});

// 21-1
let pattern = [[0,1,0],[0,0,1],[1,1,1]];
for(let i = 0; i < 5; i++) {
	pattern = enhance(pattern, ruleMap);
}
console.log("DAY 21-1:", pattern.reduce((acc,row) => acc+row.filter(c => c === 1).length,0));	// 194

// 21-2
for(let i = 5; i < 18; i++) {
	pattern = enhance(pattern, ruleMap);
}
console.log("DAY 21-2:", pattern.reduce((acc,row) => acc+row.filter(c => c === 1).length,0));	// 2536879