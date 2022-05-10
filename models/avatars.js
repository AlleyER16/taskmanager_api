const mongoose = require('mongoose');
const schema = mongoose.Schema;

const avatars_schema = new schema({
    Path: {
        type: String,
        required: true,
        trim: true
    },
    DateAdded: {
        type: Date,
        required: true,
        default: () => Date.now()
    }
}, { collection: "Avatars" });

const avatars_model = mongoose.model("Avatars", avatars_schema);

module.exports = { avatars_model };