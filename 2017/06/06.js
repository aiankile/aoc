let inp = [5,1,10,0,1,7,13,14,3,12,8,10,7,12,0,6], log = {};

// 6-1
function cycle() {
    let i = inp.findIndex(x => x == Math.max(...inp)), j, jm;    
    for(j = 1, jm = inp[i]+1; j < jm; j++) inp[(i+j)%inp.length]++;    
    inp[i] -= (jm-1);
}
while(!(inp.join('-') in log)) {
    log[inp.join('-')]=1;
    cycle();
}
console.log("DAY 6-1:", Object.keys(log).length);   // 5042

// 6-2
console.log("DAY 6-2:", Object.keys(log).length - Object.keys(log).findIndex(x => x === inp.join('-')) );   // 1086