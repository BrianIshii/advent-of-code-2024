const fs = require("fs");

const data = fs.readFileSync("data.txt", "utf8")

const rules = {}
const updates = []
const invalidUpdates = []
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

// console.log(`rules: ${JSON.stringify(rules, 2, null)}`)
// console.log(`updates: ${JSON.stringify(updates, 2, null)}`)

const hasViolation = (update) => {
    if (!update) {
        return false;
    }
    const pages = update.split(",");
    let hasViolation = false;

    for(let i = 0; i < pages.length; i++) {
        if (pages[i] in rules) {
            const beforeViolations = rules[pages[i]].before.filter((pageInBefore) => pages.slice(0, i).includes(pageInBefore))
            const afterViolations = rules[pages[i]].after.filter((pageInAfter) => pages.slice(i, pages.length).includes(pageInAfter))
            // console.log(`update: ${update} | ${beforeViolations.length} | ${afterViolations.length}`)
            if (beforeViolations.length || afterViolations.length) {
                hasViolation = true
            }
        }
    }

    return hasViolation
}
updates.forEach((update) => {
    if (hasViolation(update)) {
        invalidUpdates.push(update)
    }
});

let total = 0;
invalidUpdates.forEach((invalidUpdate) => {
    const pages = invalidUpdate.split(",")
    const updated = [] 
    let pagesToAdd = JSON.parse(JSON.stringify(pages));
    while (pagesToAdd.length) {
        const valuesInAfterList = {};
        pagesToAdd.forEach((pageToAdd) => {
            if (pageToAdd in rules) {
                rules[pageToAdd].after.forEach((a) => valuesInAfterList[a] = true);
            }
        })
        const goodValues = pagesToAdd.filter((page) => Object.keys(valuesInAfterList).includes(page));
        if (goodValues.length === 0) {
            updated.push(...pagesToAdd);
            break;
        } else if (goodValues.length === 1) {
            updated.push(goodValues[0]);
        } else {
            while(goodValues.length) {
                let valuesInBeforeLlist = {};
                goodValues.forEach((goodValue) => {
                    if (goodValue in rules) {
                        rules[goodValue].before.forEach((a) => valuesInBeforeLlist[a] = true);
                    }
                })
                const bestValues = goodValues.filter((page) => !Object.keys(valuesInBeforeLlist).includes(page));
                console.log(`good values ${goodValues} | bvs: ${bestValues}`)
                bestValues.forEach((bv) => {
                    updated.push(bv);
                    const index = goodValues.indexOf(bv)
                    console.log(`index: ${index}`)
                    goodValues.splice(index, 1);
                    const indexPTA = pagesToAdd.indexOf(bv)
                    pagesToAdd.splice(indexPTA, 1);
                });
                valuesInBeforeLlist = {}
            }
        }

    }


    const midPoint = Math.floor(pages.length / 2);
    console.log(`update: ${invalidUpdate} | ${updated} | midpoint: ${pages[midPoint]}`)
    total += parseInt(updated[midPoint]);
})
console.log(`total: ${total}`)