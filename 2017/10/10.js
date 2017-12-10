function newList() {
	let list = [];
	for(let i = 0, im = 256; i < im; i++) list[i] = i;
	return list;
}

function round(list, lengths, iv={pos:0,skip:0}) {	
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

console.log('DAY 10-1');
var input = [183,0,31,146,254,240,223,150,2,206,161,1,255,232,199,88];
var list = newList();
round(list, input);
console.log('Checksum:', list[0] * list[1]);

console.log('DAY 10-2');
var str = "183,0,31,146,254,240,223,150,2,206,161,1,255,232,199,88";
var input = str.split("").map(c => c.charCodeAt(0)).concat([17, 31, 73, 47, 23]);
var list = newList(), iv = {pos:0,skip:0};
for(let i = 0, im = 64; i < im; i++) round(list, input, iv);
var result = "";
for(let i = 0, im = 16; i < im; i++) result += (function(s) {return s.length > 1 ? s : s = "0"+s;})(list.slice(16*i, 16*i+16).reduce((acc,val) => acc ^ val).toString(16));
console.log('Encoded input:', result);