const UserController = {

};
const { User } = require("../schema/schema")

UserController.getUser = async (req, res) => {
    try {
        const requesUser = req.user?.username;
        if (requesUser) {
            console.log("getuser " + req.user?.username)
            const user = await User.findOne({ username: requesUser });
            res.json({
                user,
                isAuthenticated: true,
            })
        } else { return res.json({ error: "error getting" }) }

    } catch (error) {
        console.error(error)
    }
};

UserController.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, pass } = req.body;
        const upUser = { username, pass };
        await User.findByIdAndUpdate(id, upUser);
        res.json({ status: "Update User" });
    } catch (error) {
        console.error(error)
    }
}

module.exports = UserController;