import * as fs from "fs";
import {parse} from "csv-parse";
import express from "express";

// Configuration
const CSV_PATH = "./data/boissons.csv";
const PARSER_CONF = {
  delimiter: ",",
  columns: true
};
let data = [];
const parser = parse(PARSER_CONF);

// Parsing function
const getData = async filepath => {
  let out = [];
  let rstream = fs.createReadStream(CSV_PATH);
  rstream
    .pipe(parser)
    .on("data", data => out.push(data))
    .on("end", () => console.log("parsing done..."));
  await new Promise(resolve => setTimeout(resolve, 1000));
  return out;
};

// Getter
const getBeer = name => {
  let n = data.find(e => e.nom == name.toLowerCase());
  return n ? n : "Bière inexistante";
};

//--------------------- Web Server -----------------------
const app = express();

// Execution
console.log("API started...");
app.listen(3000);

data = await getData(CSV_PATH);

// Express BASIC
app.get("/", (req, res) => {
  res.send("Welcome to Chill API");
});

// Express get price
app.get("/price/:beerName", (req, res) => {
  res.send(getBeer(req.params.beerName).prix);
});

// Express get infos
app.get("/infos/:beerName", (req, res) => {
  res.send(getBeer(req.params.beerName));
});
