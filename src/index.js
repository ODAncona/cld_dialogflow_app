import * as fs from "fs";
import { parse } from "csv-parse";
import { get } from "http";

const CSV_PATH = "./data/boissons.csv";

async function getData(filepath) {
    let ret = [];
    fs.createReadStream(filepath)
        .pipe(parse({ columns: true }))
        .on("data", (row) => {
            ret.push(row);
        });
    return ret;
}

const mdr = await getData(CSV_PATH);
console.log(mdr)
