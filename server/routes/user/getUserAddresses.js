const Address = require('../../models/address')
const User = require('../../models/user')

exports.getUserAddresses = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).populate('addresses')
    res.json(user.addresses)
  } catch (error) {
    res.json(error)
  }
}