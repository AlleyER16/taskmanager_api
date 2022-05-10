const mongoose = require('mongoose');

const connectDB = (conn_string) => {
    return mongoose.connect(conn_string);
}

module.exports = connectDB;