const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/CrudDB',(err) => {
    if(!err){
        console.log('MongoDB is connected')
    }
    else
    {
        console.log('MongoDB is not connected' + JSON.stringify(err,undefined,2));
    }
})

module.exports = mongoose ;