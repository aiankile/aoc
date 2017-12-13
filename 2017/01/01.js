var inp = document.body.textContent.trim(), result;

// 01-1
result = inp.split("").filter((d, i) => d === inp[i+1 >= inp.length ? 0 : i+1]).reduce((acc,val) => parseInt(acc,10) + parseInt(val,10));
console.log('DAY 01-1:', result);

// 01-2
result = inp.split("").filter((d, i) => d === inp[(i+inp.length/2)%inp.length]).reduce((acc,val) => parseInt(acc,10) + parseInt(val,10));
console.log('DAY 01-2:', result);