let inp = document.body.textContent.trim(), level, garbage, score, gc;

// 9-1
level = score = gc = 0;
garbage = false;
for(let i = 0, im = inp.length; i < im; i++) {
    if(inp[i] === '!') {i++; continue;}
    if(!garbage) {
        if(inp[i] === "{") {level++; score += level;}
        if(inp[i] === "}") level--;
        if(inp[i] === "<") garbage = true;
    }
    else {
        if(inp[i] === ">") garbage = false;
        else gc++;
    }    
}
console.log("DAY 9-1:", score); // 12396

// 9-2
console.log("DAY 9-2:", gc);    // 6346