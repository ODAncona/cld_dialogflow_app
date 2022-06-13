import {parse} from "csv-parse";
import express from "express";
import * as fs from "fs";

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

app.listen(process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

data = await getData(CSV_PATH);

// Express BASIC
app.get("/", (req, res) => {
  res.send("Welcome to Chill API");
});

// Express get price
app.post("/infos/", (req, res) => {
  console.log("START");
  console.log(req.body);
  console.log("STOP");

  const beer = "swaf";
  const beerPrice = getBeer(beer).prix;
  const beerText = "La boisson " + req.params.beerName + " coûte " + beerPrice + ".";
  const response = {
    fulfillmentMessages: [
      {
        text: {
          text: [beerText]
        }
      }
    ]
  };
  res.send(JSON.stringify(response));
});
/*
// Express get infos
app.post("/infos/:beerName", (req, res) => {
  const beerInfos = getBeer(req.params.beerName);
  const response = {
    fulfillmentMessages: [
      {
        text: {
          text: beerInfos
        }
      }
    ]
  };
  res.send(JSON.stringify(response));
});
*/