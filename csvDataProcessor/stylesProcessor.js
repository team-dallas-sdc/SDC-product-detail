const fs = require("fs");
const csv = require('csv-parser');
const { Transform } = require('stream');
var readStream = fs.createReadStream("./rawCsvData/styles.csv");
var writeStream = fs.createWriteStream("./processedCsvData/styles.csv");

const deleQuotTr = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().replaceAll('"', '').replaceAll('$', ''));
    callback();
  }
});

readStream
  .pipe(deleQuotTr)
  .pipe(csv())
  .on('headers', (headers) => {
    writeStream.write(`product_id,style_id,name,sale_price,original_price,default?\n`)
  })
  .on('data', row => {
    if (Object.keys(row).length === 6) {
      let {id, productId,name,sale_price,original_price,default_style} = row
      if (default_style === undefined) default_style = 0;
      writeStream.write(`${productId},${id},${name},${sale_price},${original_price},${default_style}\n`)
    }
  })
  .on('end', ()=> console.log('<<----------- complete processing raw styles.csv data ----------->>'))