const input = document.body.textContent.trim().split("\n").map(r => ({out:r.split(/\[[a-z]*\]/), in:r.split(/(?:^|\])[a-z]+(?:\[|$)/).filter(w=>w.length)}));

// 07-1
function hasABBA(str) {
	return str.split("").some((v,i,a) => i<a.length-3 && a[i+3]===v && a[i+1]===a[i+2] && a[i+1]!==v);
}
let supportTLS = input.filter(r => r.out.some(w => hasABBA(w)) && !r.in.some(w => hasABBA(w))).length;
console.log("DAY 07-1:", supportTLS);	// 110

// 07-2
function getBAB(str) {
	return str.split("").map((v,i) => [v,i]).filter((v,i,a) => i<a.length-2 && a[i+2][0]===v[0] && a[i+1][0]!==v[0]).map(x => str.charAt(x[1]+1)+str.charAt(x[1])+str.charAt(x[1]+1));
}
let supportSSL = input.filter(r => r.out.some(w => getBAB(w).some(bab => r.in.some(i => i.indexOf(bab)>-1)))).length;
console.log("DAY 07-2", supportSSL);	// 242
