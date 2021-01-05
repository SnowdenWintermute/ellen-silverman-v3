const User = require("../../models/user");
const Cart = require("../../models/cart");

exports.remove = async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  const userCart = await Cart.findOne({ orderedBy: user._id });
  try {
    await userCart.remove();
    res.json({ ok: true });
  } catch (error) {
    res.json(error);
  }
};
