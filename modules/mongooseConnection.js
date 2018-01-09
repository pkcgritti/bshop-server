const mongo = require('mongodb')
const mongoose = require('mongoose')
const connURI = 'mongodb://localhost/barberapp'
const mConn = mongoose.createConnection(connURI)

mongoose.Promise = require('bluebird')

module.exports = mConn 
