const User = require("../Models/User");
const bcrypt = require("bcrypt");

const loginUser = async (email, password) => {
    try {
        const user = await User.findOne({ email });

        if (!user) throw new Error("User not found!");

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) throw new Error('Wrong Credentials');

        return user;
    } catch (error) {
        throw new Error('Error login');
    }
}

module.exports = { loginUser };