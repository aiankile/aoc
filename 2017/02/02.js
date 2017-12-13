var inp = document.body.textContent.trim().split("\n").map(r => r.split("\t").map(c => parseInt(c,10))), result;

// 02-1
result = inp.map(r => Math.max(...r) - Math.min(...r) ).reduce((sum,r) => sum+r);
console.log('DAY 02-1:', result);

// 02-2
result = inp.map(r => r.map(c1 => r.map(c2 => c2/c1).filter(d => d !== 1 && d === parseInt(d,10))).filter(c => c.length)).map(r1 => r1[0][0]).reduce((acc,val) => acc+val);
console.log('DAY 02-2:', result);