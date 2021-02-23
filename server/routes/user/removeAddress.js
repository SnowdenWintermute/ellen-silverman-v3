const Address = require('../../models/address')
const User = require('../../models/user')

exports.removeAddress = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).populate('addresses')
    const addressToRemove = await Address.findById(req.body.addressIdToRemove)
    const newUserAddressList = user.addresses.map(address => {
      if (address._id.toString() !== addressToRemove._id.toString()) return address._id
    })
    if (newUserAddressList[0] === null) newUserAddressList = []
    user.addresses = newUserAddressList
    await user.save()
    await addressToRemove.remove()
    const userAfterUpdatedAddresses = await User.findById(user._id).populate('addresses')
    res.json(userAfterUpdatedAddresses.addresses)
  } catch (error) {
    res.json(error)
  }
}