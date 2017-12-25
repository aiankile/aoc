const inp = document.body.textContent.trim().split("\n").map(r => r.split(" "));

class Processor {
	constructor(list, dual, options={}) {
		this.options = Object.assign({single: false}, options);
		this.registers = {};		
		this.list = list;
		this.current = 0;
		this.halt = false;
		
		// sound (part 1)
		if(this.options.single) {
			this.frequency = undefined;
		}
		// master-slave (part 2)
		else {
			this.queue = [];
			this.dual = dual === undefined ? new Processor(list, this, this.options) : dual;
			this.master = dual === undefined;
			this.register("p").value = this.master ? 0 : 1;
			this.sendCount = 0;
		}
	}
	run() {
		while(!this.halt) this.step();
	}
	step() {
		if(this.halt || this.current < 0 || this.current >= this.list.length) return false;
		let shift = this.exec(this.current);
		if(shift === undefined) shift = 1;
		this.current += shift;
		// master -> trigger & check slave
		if(!this.options.single && this.master) {			
			if(!this.dual.step() && shift === 0) this.halt = true;
		}
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
	snd(X) {
		// part 1 version
		if(this.options.single) this.frequency = this.resolve(X);
		// part 2 version
		else {
			this.dual.queue.push(this.resolve(X));
			this.sendCount++;
		}
	}
	set(X,Y) {
		this.register(X).value = this.resolve(Y);
	}
	add(X,Y) {
		this.register(X).value += this.resolve(Y);
	}
	mul(X,Y) {
		this.register(X).value *= this.resolve(Y);
	}
	mod(X,Y) {
		this.register(X).value %= this.resolve(Y);
	}
	rcv(X) {
		// part 1 version
		if(this.options.single) {
			if(this.resolve(X) !== 0) {
				console.log("DAY 18-1:", this.frequency);
				this.halt = true;
			}
		}
		// part 2 version
		else {
			if(!this.queue.length) return 0;	// jump 0 = wait
			this.register(X).value = this.queue.shift();			
		}
	}
	jgz(X,Y) {
		if(this.resolve(X) > 0) return this.resolve(Y);
	}
}

// 18-1
let proc = new Processor(inp, undefined, {single: true});
proc.run();	// 2951

// 18-2
let p = new Processor(inp);
p.run();
console.log("DAY 18-2:", p.dual.sendCount);