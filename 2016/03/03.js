const input = document.body.textContent.trim().split("\n").map(r => r.replace(/ {2,}/g, " ").trim().split(" ").map(c => parseInt(c,10)));

// 03-1 ()
console.log("DAY 03-1a:", input.map(t => [t.find(x => x===Math.max(...t)), t.filter((x,i,a) => i!==t.indexOf(Math.max(...t)))]).filter(([l,s]) => s[0]+s[1] > l).length );	// 862
console.log("DAY 03-1b:", input.filter(([a,b,c]) => a+b>c && a+c>b && b+c>a).length );	// 862

// 03-2
console.log("DAY 03-2:", input.map((r,i,a) => [a[i-i%3][i%3],a[i-i%3+1][i%3],a[i-i%3+2][i%3]]).filter(([a,b,c]) => a+b>c && a+c>b && b+c>a).length );	// 1577
