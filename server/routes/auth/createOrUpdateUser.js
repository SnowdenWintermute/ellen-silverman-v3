const User = require("../../models/user")

module.exports = createOrUpdateUser = async (req, res) => {
  try {
    const { name, picture, email } = req.user;

    const user = await User.findOneAndUpdate(
      { email },
      { name: email.split("@")[0], picture },
      { new: true }
    );
    if (user) res.json(user);
    else {
      const newUser = await new User({
        email,
        name: email.split("@")[0],
        picture,
      }).save();
      console.log("USER CREATED", newUser);
      res.json(newUser);
    }
  } catch (error) {
    console.log(error)
    res.json(error)
  }
};