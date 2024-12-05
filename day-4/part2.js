const fs = require('fs');

const rows = [];
let count = 0;
try {
    const data = fs.readFileSync("data.txt", "utf-8");
    const lines = data.split("\n");

    for (const line of lines) {
        if (line) {
            rows.push(line.split(""))
        }
    }

    for (let row = 0; row < rows.length; row++) {
        for (let col = 0; col < rows[0].length; col++) {
            if (
                row - 1 >= 0 &&
                row + 1 < rows.length &&
                col - 1 >= 0 &&
                col + 1 < rows[0].length &&
                rows[row][col] === "A"
            ) {
                const lr = rows[row-1][col-1] + rows[row+1][col+1]
                const rl = rows[row-1][col+1] + rows[row+1][col-1]
                // console.log(`lr: ${lr} rl: ${rl}`)

                if (lr.includes("S") &&
                lr.includes("M") &&
                rl.includes("S") &&
                rl.includes("M")) {
                    count++
                }
            }
        }
    }

    console.log(count)


} catch (e) {
    console.log(`error: ${e}`);
}