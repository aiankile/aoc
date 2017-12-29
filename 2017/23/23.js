const inp = document.body.textContent.trim().split("\n").map(r => r.split(" "));

// copied & adjusted from day 18
class Processor {
	constructor(list, debug=false) {
		this.registers = {};		
		this.list = list;
		this.current = 0;
		this.halt = false;
		this.mulCount = 0;
		if(!debug) this.register('a').value = 1;
	}
	run() {
		while(!this.halt && this.step()) {};
	}
	step() {
		if(this.halt || this.current < 0 || this.current >= this.list.length) return false;
		let shift = this.exec(this.current);
		if(shift === undefined) shift = 1;
		this.current += shift;
		return shift !== 0;
	}
	exec(index) {
		let cmd = this.list[index];
		if(!(cmd[0] in this)) return;		
		return this[cmd[0]](...cmd.slice(1));
	}
	register(X) {
		if(!(X in this.registers)) this.registers[X] = {value:0};
		return this.registers[X];
	}
	resolve(X) {
		let Y = parseInt(X,10);
		return Y == X ? Y : this.register(X).value;
	}
	// cmds
	set(X,Y) {
		this.register(X).value = this.resolve(Y);
	}
	sub(X,Y) {
		this.register(X).value -= this.resolve(Y);
	}
	mul(X,Y) {
		this.register(X).value *= this.resolve(Y);
		this.mulCount++;
	}
	jnz(X,Y) {
		if(this.resolve(X) !== 0) return this.resolve(Y);
	}
}

// 23-1
let proc = new Processor(inp, true);
proc.run();
console.log("DAY 23-1:", proc.mulCount);	// 3969

// 23-2 HCF -> takes forever
//proc = new Processor(inp);
//proc.run();
//console.log("DAY 23-2:", proc.register('h').value);

// 23-2 optimized
let h = 0;
mainLoop:
for(let b = 106500; b <= 123500; b += 17) {	// manual param parsing!!!
	for(let d = 2, dm = Math.floor(b/2); d <= dm; d++) {
		for(let e = d, em = Math.floor(b/d); e <= em; e++) {
			if(d*e === b) {h++;	continue mainLoop;}
		}
	}	
}
console.log("DAY 23-2:", h);	// 917