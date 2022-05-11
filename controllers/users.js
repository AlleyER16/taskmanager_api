const { users_model } = require('../models/users');

const { StatusCodes } = require("http-status-codes");

const jwt = require("jsonwebtoken");

const { get_random_avatar } = require("./avatars");

const bcrypt = require('bcryptjs');

const add_user = async (req, res) => {

    const { Username } = req.body;

    const username_used = await users_model.find({ Username }).countDocuments();
    if (username_used) return res.status(StatusCodes.NOT_ACCEPTABLE).json({ message: "Username has been used" });

    req.body.Avatar = await get_random_avatar();

    const user = await users_model.create(req.body);
    if (!user) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error creating account. Try again" });

    try {
        
        access_token = jwt.sign(
            { user_id: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRATION }
        );

        res.json({message: "Account created successfully.", access_token, token_type: "Bearer"});

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error creating account. Try again" });
    }

}

const user_login = async (req, res) => {

    const { Username, Password } = req.body;

    if (!Username || !Password) {
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: "Username and password required" });
    }

    const user = await users_model.findOne({ Username }).select("_id,Password");
    if (!user) res.status(StatusCodes.NOT_FOUND).json({ message: "Invalid username or password" });

    if (!bcrypt.compareSync(Password, user.Password)) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid username or password" });
    }

    try {
        
        access_token = jwt.sign(
            { user_id: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRATION }
        );

        res.json({message: "Login successful", access_token, token_type: "Bearer" });
        
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error logging in. Try again" });
    }

}

const user_login_verify = (req, res) => {

    res.json({message: "Verification successful", user: res.user_logged})

}

module.exports = {add_user, user_login, user_login_verify}