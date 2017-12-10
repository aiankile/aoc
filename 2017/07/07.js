let programs = {};
document.body.textContent.split("\n").filter(r => r.length).forEach(r => {
	let d = r.split(" -> ").map(c => c.trim());
	d[0] = d[0].split(" ");
	programs[d[0][0]] = {
		id: d[0][0],
		ownWeight: parseInt(d[0][1].substring(1,d[0][1].length-1),10),
		children: d.length > 1 ? d[1].split(", ") : [],
		childrenWeight() { return this.children.reduce((acc, c) => acc+c.totalWeight(), 0); },
		totalWeight() { return this.ownWeight + this.childrenWeight(); }
	};	
});
for(let id in programs) {
	if('children' in programs[id]) {
		programs[id].children = programs[id].children.map(c => {
			programs[c].parent = programs[id];			
			return programs[c];
		});
	}
}

console.log('DAY 7-1');
let id = Object.keys(programs)[0];
while('parent' in programs[id]) id = programs[id].parent.id;
console.log('Bottom program id:', id);

console.log('DAY 7-2');
let unbalanced = Object.values(programs).filter(p => p.children.length).filter(p => p.children.filter(c => c.totalWeight() != p.children[0].totalWeight()).length);
let brokenDisc = unbalanced.filter(u => !unbalanced.map(x => x.parent).includes(u))[0];
let discWeights = brokenDisc.children.map(c => c.totalWeight());
let expectedWeight = discWeights.filter(w => w == Math.min(...discWeights)).length > discWeights.filter(w => w == Math.max(...discWeights)).length ? Math.min(...discWeights) : Math.max(...discWeights);
let brokenProgram = brokenDisc.children.find(c => c.totalWeight() != expectedWeight);
let correctWeight = brokenProgram.ownWeight + (expectedWeight - brokenProgram.totalWeight());
console.log('Correct weight for '+brokenProgram.id+':', correctWeight);