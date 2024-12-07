const fs = require("fs");

const data = fs.readFileSync("data.txt", "utf8")

const rules = {}
const updates = []
const validUpdates = []
const rows = data.split("\n");

rows.forEach((row) => {
    if (row) {
        if (row.includes("|")) {
            const nums = row.split("|");
            num1 = nums[0];
            num2 = nums[1]
            if (num1 in rules) {
                rules[num1].before.push(num2)
            } else {
                rules[num1] = {
                    before: [num2],
                    after: []
                }
            }

            if (num2 in rules) {
                rules[num2].after.push(num1)
            } else {
                rules[num2] = {
                    before: [],
                    after: [num1]
                }
            }
        } else {
            updates.push(row)
        }
    }
});

console.log(`rules: ${JSON.stringify(rules, 2, null)}`)
console.log(`updates: ${JSON.stringify(updates, 2, null)}`)

updates.forEach((update) => {
    const pages = update.split(",");

    let hasViolation = false;
    for(let i = 0; i < pages.length; i++) {
        if (pages[i] in rules) {
            const beforeViolations = rules[pages[i]].before.filter((pageInBefore) => pages.slice(0, i).includes(pageInBefore))
            const afterViolations = rules[pages[i]].after.filter((pageInAfter) => pages.slice(i, pages.length).includes(pageInAfter))
            console.log(`update: ${update} | ${beforeViolations.length} | ${afterViolations.length}`)
            if (beforeViolations.length || afterViolations.length) {
                hasViolation = true
            }
        }
    }
    if (!hasViolation) {
        validUpdates.push(update)
    }
});

let total = 0;
validUpdates.forEach((validUpdate) => {
    const pages = validUpdate.split(",")
    const midPoint = Math.floor(pages.length / 2);
    console.log(`update: ${validUpdate} | midpoint: ${pages[midPoint]}`)
    total += parseInt(pages[midPoint]);
})
console.log(`total: ${total}`)