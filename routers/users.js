const express = require('express');
const router = express.Router();

const { add_user, user_login } = require("../controllers/users");

router.route("/").post(add_user);

module.exports = router;