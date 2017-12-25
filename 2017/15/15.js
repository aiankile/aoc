let gen = [679,771], mul = [16807,48271], div = 2147483647;
function judge() { let cmp = gen.map(v => v%65536); return cmp[0] === cmp[1]; }

// 15-1
function cycle() { gen = gen.map((v,i) => (v*mul[i])%div); }
let count = 0;
for(let i = 0; i < 4e7; i++) {
	cycle();
	if(judge()) count++;
}
console.log("DAY 15-1:", count);	// 626

// 15-2
gen = [679,771], count = 0;
let test = [4,8];
function cycle2() {
	gen = gen.map((v,i) => {
		do { v = (v*mul[i])%div; } while(v%test[i] > 0);		
		return v;
	});
}
for(let i = 0; i < 5e6; i++) {
	cycle2();
	if(judge()) count++;
}
console.log("DAY 15-2:", count);	// 306