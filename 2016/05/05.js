// load CryptJS md5
(function() {
	let script = document.createElement('script');
	script.type = 'text/javascript';
	script.onload = function() {
		
		const input = 'ugkcyxxp';

		// 05-both (rather slow...)
		let password1 = '', password2 = [], p1hits = 0, p2hits = 0, i = 0, current;
		while(p1hits < 8 || p2hits < 8) {
			if((current = CryptoJS.MD5(input+i).toString()).substr(0,5) === '00000') {
				let p6 = current.charAt(5);
				if(p1hits < 8) {
					password1 += p6;
					p1hits++;
				}
				p6 = parseInt(p6,16);
				if(p6 < 8 && password2[p6] === undefined) {
					password2[p6] = current.charAt(6);
					p2hits++;
				}
			}
			i++;
		}
		console.log("DAY 05-1:", password1);			// d4cd2ee1
		console.log("DAY 05-2:", password2.join(""));	// f2c730e5
		
	};
	script.src = 'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js';
	document.body.appendChild(script);
})();