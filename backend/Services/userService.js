const User = require("../Models/User");
const bcrypt = require("bcrypt");

exports.signupService = async (firstname, lastname, email, password, phoneNumber, city) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const userToCreate = {
            firstname, lastname, email, password: hashedPassword, phoneNumber
        }
        if (city && city.trim() !== '') {
            userToCreate.city = city;
        }
        // Create user in DB
        const newUser = await User.create(userToCreate);

        // Return only the id for security (never return passowrd)
        return {
            id: newUser._id,
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            email: newUser.email
        };
    } catch (error) {
        throw error;
    }
}