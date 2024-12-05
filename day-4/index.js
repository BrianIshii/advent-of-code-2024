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

    // horizontal
    for (const row of rows){
        const r = row.join("");
        const matches = r.matchAll("XMAS")
        matches.forEach(() => count++)
        const matchesB = r.matchAll("SAMX")
        matchesB.forEach(() => count++)
    }
    console.log(count);

    // vertical
    for (let i = 0; i < rows[0].length; i++){
        const r = rows.map((row) => row[i]).join("");
        const matches = r.matchAll("XMAS")
        matches.forEach(() => count++)
        const matchesB = r.matchAll("SAMX")
        matchesB.forEach(() => count++)
    }
    console.log(count);

    // diagonal left -> right upper
    for (let i = 0; i < rows[0].length; i++){
            const r = rows.map((row, index) => i + index < rows[0].length ? row[i + index] : "").join("");
            const matches = r.matchAll("XMAS")
            matches.forEach(() => count++)
            const matchesB = r.matchAll("SAMX")
            matchesB.forEach(() => count++)
    }
    console.log(count);

    // diagonal left -> right lower 
    for (let i = 1; i < rows.length; i++){
        const r = rows.map((row, index) => index >= i  && index -i < rows[0].length ? row[index - i] : "").join("");
        const matches = r.matchAll("XMAS")
        matches.forEach(() => count++)
        const matchesB = r.matchAll("SAMX")
        matchesB.forEach(() => count++)
    }
    console.log(count);

    // diagonal right -> left
    for (let i = 0; i < rows[0].length; i++){
        const r = rows.map((row, index) => rows[0].length - i - index >= 0 ? row[rows[0].length - i - index] : "").join("");
        const matches = r.matchAll("XMAS")
        matches.forEach(() => count++)
        const matchesB = r.matchAll("SAMX")
        matchesB.forEach(() => count++)
    }
    
    console.log(count);

    // diagonal right -> right lower 
    for (let i = 1; i < rows.length; i++){
        const r = rows.map((row, index) => (index >= i  && rows[0].length - (index - i) >= 0) ? row[rows[0].length - (index - i)] : "").join("");
        const matches = r.matchAll("XMAS")
        matches.forEach(() => count++)
        const matchesB = r.matchAll("SAMX")
        matchesB.forEach(() => count++)
    }
    
    console.log(count);

} catch (e) {
    console.log(`error: ${e}`);
}