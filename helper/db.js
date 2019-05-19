var mongooseLib = require('mongoose');

module.exports = ()=>{
    mongooseLib.connect('mongodb://udemyuser:vJvkm6GzHKUH@127.0.0.1:27017/udemy', {useNewUrlParser: true, useFindAndModify: false });
    mongooseLib.connection.on('open', ()=>{
        console.log('connection created');
    });

    mongooseLib.connection.on('error', (err)=>{
        console.log('connection failed');
    });
};