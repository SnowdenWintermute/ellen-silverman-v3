const Address = require('../../models/address')
const User = require('../../models/user')

exports.confirmNewAddress = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.user.email })
    const addressToConfirm = await Address.findById(req.body.addressId)
    if (!addressToConfirm.isValidatedByUser) {
      addressToConfirm.isValidatedByUser = true
      await addressToConfirm.save()
      user.addresses.push(addressToConfirm._id)
      await user.save()
    }
    const addressesToCheckForRemoval = await Address.find({ user: user._id })
    addressesToCheckForRemoval.forEach(addressToRemove => { if (!addressToRemove.isValidatedByUser) addressToRemove.remove() })
    user = await User.findOne({ email: req.user.email }).populate('addresses')
    res.json(user.addresses)
  } catch (error) {
    res.json(error)
  }
}