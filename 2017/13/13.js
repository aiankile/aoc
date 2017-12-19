let inp = document.body.textContent.trim().split("\n").map(r => r.split(": ").map(v => parseInt(v,10))), result;

// 13-1
result = inp.reduce((acc,val) => {
    let cycle = val[1] > 1 ? 2*val[1]-2 : 1;
    return acc + (val[0]%cycle === 0 ? val[0]*val[1] : 0);
}, 0);
console.log('DAY 13-1:', result);

// 13-2 BF
let caught, delay = -1;
do {
    delay++;    
    caught = inp.filter(r => {
        let cycle = r[1] > 1 ? 2*r[1]-2 : 1;
        return (r[0]+delay)%cycle == 0;
    }).length > 0;
} while(caught);
console.log('13-2 BF:', delay); // 3878062

// 13-2 BF2
var cycles = inp.map(r => [r[0], r[1] > 1 ? 2*r[1]-2 : 1]), caught, delay = -1;
do {
    delay++;
    caught = cycles.map(c => (c[0]+delay)%c[1]).filter(m => m == 0).length > 0;
} while(caught);
console.log('13-2 BF:', delay); // 3878062