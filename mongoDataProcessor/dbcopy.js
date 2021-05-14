const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


const agg = [
  {
    '$lookup': {
      'from': 'skus',
      'localField': 'style_id',
      'foreignField': 'style_id',
      'as': 'skus'
    }
  }, {
    '$addFields': {
      'skus': {
        '$arrayToObject': {
          '$map': {
            'input': '$skus',
            'as': 'out',
            'in': {
              'k': '$$out.size',
              'v': '$$out.quantity'
            }
          }
        }
      }
    }
  }, {
    '$lookup': {
      'from': 'photo',
      'localField': 'style_id',
      'foreignField': 'style_id',
      'as': 'photos'
    }
  }, {
    '$addFields': {
      'photos': {
        '$map': {
          'input': '$photos',
          'as': 'out',
          'in': {
            'url': '$$out.url',
            'thumbnail_url': '$$out.thumbnail_url'
          }
        }
      }
    }
  }, {
    '$out': 'style'
  }
];




const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'sdc-test';
const client = new MongoClient(url,{ useNewUrlParser: true, useUnifiedTopology: true });
// Use connect method to connect to the server
client.connect(function(err) {
  const db = client.db(dbName);
  const coll = db.collection('style');
  coll.aggregate(agg);
});