const mongoose = require('mongoose');
const schema = mongoose.Schema;

const bcrypt = require('bcryptjs');

const users_schema = new schema({
    FullName: {
        type: String,
        required: true,
        trim: true
    },
    Avatar: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Avatars._id"
    },
    Username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    Password: {
        type: String,
        required: true,
        trim: true
    },
    DateCreated: {
        type: Date,
        default: () => Date.now(),
        required: true
    }
}, { collection: "Users" });

users_schema.pre("save", function () {
    this.Password = bcrypt.hashSync(this.Password, bcrypt.genSaltSync(10));
});

const users_model = mongoose.model("Users", users_schema);

module.exports = { users_model };