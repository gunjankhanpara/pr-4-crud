const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/project');
const db = mongoose.connection;

db.on('err',console.error.bind(console,"DB is no coonect"));
db.on('connected',(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("db id connect");
})

module.exports = db