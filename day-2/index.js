const fs = require('fs');

function isSafe(report) {
	const values = report.split(" ").map((value) => parseInt(value));
	const isIncreasing = values[0] < values[1]

	for (let i = 0; i < values.length - 1; i++) {
		if (isIncreasing) {
			if (values[i] >= values[i + 1]) { // decreasing or same
				return false;
			}
			if (values[i] + 3 < values[i + 1]) { // four away
				return false
			}
		} else {
			if (values[i] <= values[i + 1]) { // increasing or same
				return false;
			}
			if (values[i] - 3 > values[i + 1]) { // four away
				return false
			}
		}
	}
	return true;
}

let safeReports = 0;
try {
	const data = fs.readFileSync("data.txt", "utf8");
	const rows = data.split("\n");

	for (const row of rows) {
		if (row.length > 0) {
			if (isSafe(row)) {
				safeReports++;
			}
		}
	}
} catch (e) {
	console.log(`error: ${e}`);
}

console.log(`Num: ${safeReports}`);
