const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let db;
const mongoConnect = callback => {
    MongoClient.connect(
        'mongodb+srv://Lycanius:testUser1@cluster0.sybh5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    )
    .then(client => {
        console.log('Connected');
        db = client.db();
        callback()
    })
    .catch(err => {
        console.log(err);
    });
};

const getDb = () => {
    if (db){
        return db;
    }
    throw 'No database found'
};



exports.mongoConnect = mongoConnect;
exports.getDb = getDb;