import * as fs from "fs";
import {
  parse
} from "csv-parse";
import express from 'express';

// Configuration
const CSV_PATH = "./data/boissons.csv";
let data = [];
const parser = parse({
  delimiter: ","
}, (err, data) => {
  console.log(data);
});

// Parsing function
const getData = async (filepath) => {
  fs.createReadStream(CSV_PATH).pipe(parser);
}

const app = express();

// Express BASIC
app.get('/', (req, res) => {
  res.send('Hello World');
})

// Express get price
app.get('/price', (req, res) => {
  res.send('1CHF');
})

// Express get infos
app.get('/infos', (req, res) => {
  res.send(true);
})

// Execution
console.log("API started...");
app.listen(3000);

const mdr = await getData(CSV_PATH);
console.log(mdr)
