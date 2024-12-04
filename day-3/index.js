const fs = require('fs');


function calc(input) {
	let total = 0;
	const regex = /mul\(\d+,\d+\)/g
	const numRegex = /\d+/g;
	//console.log(input);
	const result = input.match(regex);
	//console.log(result);
	result.forEach((item) => {
		const nums = item.match(numRegex).map(Number);
		total += nums[0] * nums[1];
	});
	return total;
}


try {
	const data = fs.readFileSync("data.txt", "utf8");
	const output = calc(data);
	console.log(output);
} catch (e) {
	console.log(`error: ${e}`);
}
