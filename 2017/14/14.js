// copied from DAY 10
function knotList() {
	let list = [];
	for(let i = 0, im = 256; i < im; i++) list[i] = i;
	return list;
}
function knotRound(list, lengths, iv) {	
	lengths.forEach(len => {
		let part = list.slice(iv.pos, Math.min(iv.pos+len, list.length));
		if(iv.pos+len > list.length) part = part.concat(list.slice(0, iv.pos+len-list.length));
		part = part.reverse();
		list.splice(iv.pos, Math.min(len, list.length-iv.pos), ...part.slice(0, Math.min(len, list.length-iv.pos)));
		if(iv.pos+len > list.length) list.splice(0, iv.pos+len-list.length, ...part.slice(list.length-iv.pos));	
		iv.pos = (iv.pos + len + iv.skip)%list.length;
		iv.skip++;	
	});
}
function knotHash(input) {
	input = input.split("").map(c => c.charCodeAt(0)).concat([17, 31, 73, 47, 23]);
	let list = knotList(), iv = {pos:0,skip:0};
	for(let i = 0, im = 64; i < im; i++) knotRound(list, input, iv);
	let result = "";
	for(let i = 0, im = 16; i < im; i++) result += (function(s) {return s.length > 1 ? s : s = "0"+s;})(list.slice(16*i, 16*i+16).reduce((acc,val) => acc ^ val).toString(16));
	return result;
}
// end of DAY 10

// 14-1
let inp = 'hwlqcszp', grid = [];
for(let i = 0; i < 128; i++) grid[i] = knotHash(inp+'-'+i).split("").map(c => ('0000' + (parseInt(c,16)).toString(2)).substr(-4)).join("").split("").map(c => parseInt(c,10));
console.log("DAY 14-1:", grid.reduce((rsum,r) => rsum+r.filter(c => c === 1).length,0));	// 8304

// 14-2
let group = 0, map = grid.map(r => []);
function mapGroup(grid, i, j, group) {
	if(grid[i][j] !== 1 || map[i][j] !== undefined) return;
	map[i][j] = group;
	[[-1,0],[0,-1],[1,0],[0,1]].forEach(d => {
		let x = i + d[0], y = j + d[1];
		if(x < 0 || y < 0 || x > 127 || y > 127) return;
		mapGroup(grid, x, y, group);
	});
}
grid.forEach((r,i) => {
	r.forEach((c,j) => {
		if(c === 1 && map[i][j] === undefined) mapGroup(grid, i, j, ++group);
	});
});
console.log("DAY 14-2:", group);	// 1018