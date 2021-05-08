const fs = require("fs");
const csv = require('csv-parser');
const { Transform } = require('stream');
var readStream = fs.createReadStream("./rawCsvData/product.csv");
var writeStream = fs.createWriteStream("./processedCsvData/product.csv");

readStream
  .pipe(csv())
  .on('headers', (headers) => {
    writeStream.write(`product_id,results\n`)
  })
  .on('data', row => {
    writeStream.write(`${row.id},[]\n`)
  })
  .on('end', ()=> console.log('<<----------- complete processing raw product.csv data ----------->>'))