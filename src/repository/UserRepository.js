const { User } = require('../models/User');

exports.getAllUsers = async () => {
    try {
        const users = await User.findAll();
        return users;
    } catch (err) {
        console.error(err);
        throw new Error('Error fetching users');
    }
};

exports.createUser = async (userData) => {
    const { email, password } = userData;
    try {
        const users = await User.create({ email, password });
        return users;
    } catch (err) {
        console.error(err);
        throw new Error('Error creating user');
    }
};
