const inp = 312051;

// 3-1
function solve(target) {
    let base = 0;
    let sum = 1;
    while(sum < target) sum += 8*(++base);
    let diff = sum - target; 
    let rest = diff - Math.floor(diff / (2*base))*2*base;
    let delta = Math.abs(base - rest);    
    return base + delta;
}
console.log("DAY 3-1:", solve(inp));

// 3-2
let map = {0:{0:1}}, cur = 1, pos = [0,0];
function setCell(x,y) {
   if(!(x in map)) map[x] = {};
   map[x][y] = 0;
   [x-1,x,x+1].forEach(i => {
      if(i in map) [y-1,y,y+1].forEach(j => {
         if((i != x || j != y) && j in map[i]) map[x][y] += map[i][j];
      })
   });
   return map[x][y];
}
function nextCell(x,y) {
    let base = Math.max(Math.abs(x),Math.abs(y));
    if(x == base && y < base && y > -base) return [x,y+1];
    if(y == base && x > -base) return [x-1,y];
    if(x == -base && y > -base) return [x,y-1];
    return [x+1,y];
}
while(cur < inp) {
  pos = nextCell(pos[0],pos[1]);
  cur = setCell(pos[0],pos[1]);
}
console.log("DAY 3-2:", cur); // 312453