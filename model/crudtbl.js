const mongoose = require('mongoose');

const crudtbl = mongoose.Schema({
    name:{
        type : String,
        require : true
    },
    price:{
        type : String,
        require : true
    },
    page:{
        type : String,
        require : true
    },
    authore:{
        type : String,
        require : true
    },
    avtar:{
        type : String,
        require : true
    }
});

const crud = mongoose.model('crud',crudtbl);

module.exports = crud;