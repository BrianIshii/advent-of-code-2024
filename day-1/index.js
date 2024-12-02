const fs = require('fs');

const firstList = [];
const secondList = [];
let totalDistance = 0.0;

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

	firstList.sort();
	secondList.sort();

	for (let i = 0; i < firstList.length; i++) {
		totalDistance += Math.abs(secondList[i] - firstList[i]);
	}

	console.log(totalDistance);
} catch (e) {
	console.log(e);
}
