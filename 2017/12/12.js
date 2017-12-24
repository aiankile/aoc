const inp = document.body.textContent.trim().split("\n").map(r => r.split(" <-> ")).map(r => [r[1].split(", "),0,0]);

function count(data, index, group) {
	data[index][1] = group;
	return 1 + data[index][0].filter(x => x !== index && data[x][1] === 0).reduce((acc,val) => acc + count(data, val, group), 0);
}
let group = 1;
inp.forEach((v,i,a) => {if(v[1] === 0) v[2] = count(a, i, group++);});

console.log("DAY 12-1:", inp[0][2]);	// 115
console.log("DAY 12-2:", group-1);		// 221