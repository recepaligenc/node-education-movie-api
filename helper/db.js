var mongooseLib = require('mongoose');
mongooseLib.set('useCreateIndex', true);

module.exports = ()=>{
    mongooseLib.connect('mongodb://udemyuser:vJvkm6GzHKUH@37.247.111.142:29111/udemy', {useNewUrlParser: true, useFindAndModify: false });
    mongooseLib.connection.on('open', ()=>{
        console.log('connection created');
    });

    mongooseLib.connection.on('error', (err)=>{
        console.log('connection failed');
    });
};
