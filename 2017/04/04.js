let inp = document.body.textContent.trim().split("\n"), result;

// 4-1
result = inp.length - inp.map(p => p.split(' ')).map(p => {let count = {}; p.forEach(w => count[w] = w in count ? count[w]+1 : 1); return count; } ).filter(p => Object.values(p).find(x => x > 1)).length;
console.log("DAY 4-1:", result);  // 337

// 4-2
result = inp.length - inp.map(p => p.split(' ')).map(p => {let count = {}; p.forEach(w => {x = w.split("").sort().join(""); count[x] = x in count ? count[x]+1 : 1;}); return count; } ).filter(p => Object.values(p).find(x => x > 1)).length;
console.log("DAY 4-2:", result);  // 231