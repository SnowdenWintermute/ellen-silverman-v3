const User = require("../../models/user")

module.exports = currentUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email })
    res.json(user);
  } catch (error) {
    console.log(error)
    res.json(error)
  }
};
