const mongoose = require('mongoose');

function mongooseConnectDB() {
    mongoose
        .connect('mongodb://127.0.0.1:27017/timeTracker', {})
        .then((result) =>
            console.log("Mongoose connected to ", result.connections[0].host)
        )
        .catch((err) => console.log("error connecting to the database", err));
}

module.exports = { mongooseConnectDB };