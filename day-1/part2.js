const fs = require('fs');

const firstList = [];
const secondList = [];

try {
	const data = fs.readFileSync("data.txt", "utf8");
	const rows = data.split("\n");
	for (const row of rows) {
		if (row.match(/\d   \d/)) {
			const items = row.split("   ");
			firstList.push(parseInt(items[0]));
			secondList.push(parseInt(items[1]));
		}
	}

	const counts = {};
	let total = 0;
	secondList.forEach((num) => num in counts ? counts[num]++ : counts[num] = 1); 
	console.log(JSON.stringify(counts));
	firstList.forEach((num) => total += (num in counts ? counts[num] * num : 0)); 

	console.log(total);
} catch (e) {
	console.log(e);
}
