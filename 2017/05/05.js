let inp, i, j;

// 5-1
inp = document.body.textContent.trim().split("\n").map(r => parseInt(r, 10));
i = j = 0;
while(i >= 0 && i < inp.length) { i += inp[i]++; j++; }
console.log("DAY 5-1:", j); // 360603

// 5-2
inp = document.body.textContent.trim().split("\n").map(r => parseInt(r, 10));
i = j = 0;
while(i >= 0 && i < inp.length) { k = i; i += inp[k]; inp[k] += inp[k] >= 3 ? -1 : 1; j++; }
console.log("DAY 5-2:", j); // 25347697