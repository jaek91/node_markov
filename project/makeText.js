/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");



/** create a MarkovMachine obj and generate text from it */
function makeMarkovText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText())
}

/** read in the file from path and generate text from it. */
function makeTextFile(path) {
    fs.readFile(path, "utf8", function cb(err, data) {
      if (err) {
        console.error(`Cannot read file: ${path}: ${err}`);
        process.exit(1);
      } else {
        makeMarkovText(data);
      }
    });
  
}

async function makeTextURL(url) {
    let resp;
    try {
        resp = await axios.get(url);  
    }
    catch (err) {
        console.error(`Can't read the URL: ${url}: ${err}`);
        process.exit(1)
    }
    makeMarkovText(resp.data)
}

/** Parse commandline inputs to determine what to do. */

let [method, path] = process.argv.slice(2);

if (method === "file") {
  makeTextFile(path);
}

else if (method === "url") {
  makeTextURL(path);
}

else {
  console.error(`Unknown method: ${method}`);
  process.exit(1);
}
