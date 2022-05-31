import * as fs from "fs";
import {
  parse
} from "csv-parse";
import express from 'express';

// Configuration
const CSV_PATH = "./data/boissons.csv";
let data = [];


// Parsing function
const getData = async (filepath) => {
  const parser = parse({
    delimiter: ","
  }, (err, data) => {
    console.log(data);
  });
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

const mdr = await getData(CSV_PATH);
console.log(mdr)

// Execution
console.log("Server running on port 3000");
app.listen(3000);
