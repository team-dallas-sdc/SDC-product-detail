const fs = require("fs");
const csv = require('csv-parser');
const { Transform } = require('stream');
var readStream = fs.createReadStream("./rawCsvData/photos.csv");
var writeStream = fs.createWriteStream("./processedCsvData/photos.csv");

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
    writeStream.write(`style_id,url,thumbnail_url\n`)
  })
  .on('data', row => {
    let {styleId,url,thumbnail_url} = row
    writeStream.write(`${styleId},${url},${thumbnail_url}\n`)
  })
  .on('end', ()=> console.log('<<----------- complete processing raw photo.csv data ----------->>'))