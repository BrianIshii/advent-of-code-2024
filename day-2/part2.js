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
				return false;
			}
		} else {
			if (values[i] <= values[i + 1]) { // increasing or same
				return false;
			}
			if (values[i] - 3 > values[i + 1]) { // four away
				return false;
			}
		}
	}
	return true;
}

function removeAndTryAgain(report) {
	const values = report.split(" ").map((value) => parseInt(value));
	const isIncreasing = values[0] < values[1]

	let badIndicies = [];
	for (let i = 0; i < values.length - 1; i++) {
		if (isIncreasing) {
			if (values[i] >= values[i + 1]) { // decreasing or same
				badIndicies.push(Math.max(i - 1), i, i + 1, Math.min(i + 2, values.length -1));
				break;
			}
			if (values[i] + 3 < values[i + 1]) { // four away
				badIndicies.push(Math.max(i - 1), i, i + 1, Math.min(i + 2, values.length -1));
				break;
			}
		} else {
			if (values[i] <= values[i + 1]) { // increasing or same
				badIndicies.push(Math.max(i - 1), i, i + 1, Math.min(i + 2, values.length -1));
				break;
			}
			if (values[i] - 3 > values[i + 1]) { // four away
				badIndicies.push(Math.max(i - 1), i, i + 1, Math.min(i + 2, values.length -1));
				break;
			}
		}
	}
	console.log(badIndicies);

	for (const i of badIndicies) {
		const newValues = JSON.parse(JSON.stringify(values));
		newValues.splice(i, 1);
		console.log(newValues);
		if (isSafe(newValues.join(" "))) {
			console.log(`fixed removing ${i}`);
			return true;
		}
	}
	return false
}

let safeReports = 0;
try {
	const data = fs.readFileSync("data.txt", "utf8");
	const rows = data.split("\n");

	for (const row of rows) {
		if (row.length > 0) {
			console.log(row);
			if (isSafe(row)) {
				safeReports++;
			} else {
				if (removeAndTryAgain(row)) {
					safeReports++;
				}
			}
		}
	}
} catch (e) {
	console.log(`error: ${e}`);
}

console.log(`Num: ${safeReports}`);
