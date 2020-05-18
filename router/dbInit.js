const mongoose = require('mongoose');
const { mongoURL } = require('../config');

const dbURL = mongoURL || 'mongodb://localhost:27017/BPL';

module.exports = () => {

    mongoose.connect(dbURL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

    mongoose.connection.on('connected', function(){
        console.log("Mongoose default connection is open");
    });

    mongoose.connection.on('error', function(err){
        console.log("Mongoose default connection has occured "+err+" error");
    });

    mongoose.connection.on('disconnected', function(){
        console.log("Mongoose default connection is disconnected");
    });

    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log("Mongoose default connection is disconnected due to application termination");
            process.exit(0)
        });
    });
}
