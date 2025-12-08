const signupService = (username, password, firstname, lastname, email) => {
    try {
        //saving the data in database
        return {
            user: username
        }
    } catch (err) {
        throw err;
    }
}
module.exports = { signupService }