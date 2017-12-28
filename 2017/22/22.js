function getMap() {
	return document.body.textContent.trim().split("\n").map(r => r.split("").map(c => c === '#' ? 2 : 0));
}

class Virus {
	constructor(map, evolved=false) {
		this.map = map;		
		this.pos = [(map.length-1)/2, (map.length-1)/2];
		this.facing = 0;
		this.facings = [[-1,0],[0,1],[1,0],[0,-1]];
		this.step = evolved ? 1 : 2;
		this.infected = 0;
	}
	burst() {
		let current = this.map[this.pos[0]][this.pos[1]];
		this.turn(current-1);
		current = this.map[this.pos[0]][this.pos[1]] = (current+this.step)%4;
		if(current == 2) this.infected++;
		this.pos = this.pos.map((p,i) => p + this.facings[this.facing][i]);
		this.expand();
	}
	turn(times) {
		if(times === 0) return;
		this.facing = (this.facing + times + this.facings.length)%this.facings.length;
	}
	expand() {
		if(this.pos[0] < 0) {
			this.map = [this.map[0].map(c => 0),...this.map];
			this.pos[0]++;
		}
		else if(this.pos[0] >= this.map.length) {
			this.map = [...this.map,this.map[0].map(c => 0)];
		}
		else if(this.pos[1] < 0) {
			this.map = this.map.map(r => [0,...r]);
			this.pos[1]++;
		}
		else if(this.pos[1] >= this.map[0].length) {
			this.map = this.map.map(r => [...r,0]);
		}
	}
}

// 22-1
let virus = new Virus(getMap());
for(let i = 0; i < 1e4; i++) virus.burst();
console.log("DAY 22-1:", virus.infected);	// 5240

// 22-2
virus = new Virus(getMap(), true);
for(i = 0; i < 1e7; i++) virus.burst();
console.log("DAY 22-2:", virus.infected);	// 2512144