const { avatars_model } = require('../models/avatars');

const get_random_num = num => Math.floor(Math.random() * num);

const get_random_avatar = async () => {

    const avatars = await avatars_model.find({});

    random_avatar_index = get_random_num(avatars.length);

    return avatars[random_avatar_index]._id.toString();

}

module.exports = { get_random_avatar };