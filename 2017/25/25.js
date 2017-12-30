function getConfig() {	
	let input = document.body.textContent.trim().split("\n\n");
	let i0 = input[0].split("\n");
	let config = {
		checksumAfter: parseInt(i0[1].split(" ")[5],10),
		state: i0[0].substr(-2,1),
		states: {}
	};
	input.slice(1).map(s => s.split("\n")).forEach(s => {config.states[s[0].substr(-2,1)] = [
		[parseInt(s[2].substr(-2,1),10), s[3].substr(-3,1)==='h'?1:0, s[4].substr(-2,1)],
		[parseInt(s[6].substr(-2,1),10), s[7].substr(-3,1)==='h'?1:0, s[8].substr(-2,1)]
	];});
	return config;
}

class TuringMachine {
	constructor(config) {
		Object.assign(this, config);
		this.tape = [0];
		this.cursor = 0;
		this.steps = 0;		
	}
	run() {
		while(this.steps < this.checksumAfter) {
			let state = this.states[this.state][this.tape[this.cursor]];
			this.tape[this.cursor] = state[0];
			this.moveTape(state[1]);
			this.state = state[2];
			this.steps++;
		}
	}
	moveTape(right) {
		this.cursor += (right ? 1 : -1);
		if(this.cursor < 0) {
			this.tape = [0,...this.tape];
			this.cursor++;
		}
		if(this.cursor >= this.tape.length) {
			this.tape = [...this.tape,0];
		}
	}
	checksum() {
		return this.tape.filter(v => v === 1).length;
	}
}

// 25-1
let tm = new TuringMachine(getConfig());
tm.run();
console.log("DAY 25-1:", tm.checksum());	// 4217