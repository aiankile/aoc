const step = 335;

// 17-1
let buffer = [0], current = 0;
for(let i = 1; i <= 2017; i++) {
	current = (current+step)%buffer.length + 1;
	buffer.splice(current, 0, i);
}
console.log("DAY 17-1:", buffer[(buffer.indexOf(2017)+1)%buffer.length]);	// 1282

// 17-2
current = 0;
let second = undefined;
for(let i = 1; i <= 5e7; i++) {
	current = (current+step)%i + 1;
	if(current === 1) second = i;
}
console.log("DAY 17-2:", second);	// 27650600