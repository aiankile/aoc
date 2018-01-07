const input = document.body.textContent.trim().split("\n").map(r => r.split(""));
function solve(input, func) {
	return input[0]
	.map((c,i) => input.map(r => r[i]))
	.map(c => c.map((d,di,da) => [d,da.filter(x => x===d).length]).find((d,di,da) => d[1]===func(...da.map(x => x[1]))))
	.map(c => c[0]).join("");
}

// 06-1
console.log("DAY 06-1:", solve(input, Math.max));	// kqsdmzft

// 06-2
console.log("DAY 06-1:", solve(input, Math.min));	// tpooccyo
