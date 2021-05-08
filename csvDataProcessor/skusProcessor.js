const fs = require("fs");
const csv = require('csv-parser');
const { Transform } = require('stream');
var readStream = fs.createReadStream("./rawCsvData/skus.csv");
var writeStream = fs.createWriteStream("./processedCsvData/skus.csv");

const deleQuotTr = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().replaceAll('"', ''));
    callback();
  }
});

readStream
  .pipe(deleQuotTr)
  .pipe(csv())
  .on('headers', (headers) => {
    writeStream.write(`style_id,size,quantity\n`)
  })
  .on('data', row => {
      let {styleId,size,quantity} = row
      if ( quantity !== undefined) {
        writeStream.write(`${styleId},${size},${quantity}\n`)
      }
  })
  .on('end', ()=> console.log('<<----------- complete processing raw skus.csv data ----------->>'))