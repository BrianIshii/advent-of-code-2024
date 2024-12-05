const fs = require('fs');


function calc(input) {
	let total = 0;
	const regex = /mul\(\d+,\d+\)/;
	const doRegex = /do\(\)/;
	const dontRegex = /don't\(\)/;
	const numRegex = /\d+/g;
	let i = 0;
	let enabled = true;
	while (i <= input.length) {
		const matches = [
			regex.exec(input.substring(i)),
			dontRegex.exec(input.substring(i)),
			doRegex.exec(input.substring(i)),
		];
		const smallest = matches.reduce((min, obj) => (obj && obj.index < min.index ? obj : min));
		if (!smallest) {
			break;
		}
		const value = smallest[0];
		if (value === "don't()") {
			enabled = false;
		}
		if (value === "do()") {
			enabled = true;
		}
		console.log(smallest.index, smallest[0]);
		i += smallest.index + smallest[0].length;

		if (value === "don't()") {
			enabled = false;
		} else if (value === "do()") {
			enabled = true;
		} else if (enabled) {
			const nums = value.match(numRegex).map(Number);
			total += nums[0] * nums[1];
		}
	}

	//	const nums = item.match(numRegex).map(Number);
//		total += nums[0] * nums[1];
	return total;
}


try {
	const data = fs.readFileSync("data.txt", "utf8");
	const output = calc(data);
	console.log(output);
} catch (e) {
	console.log(`error: ${e}`);
}
