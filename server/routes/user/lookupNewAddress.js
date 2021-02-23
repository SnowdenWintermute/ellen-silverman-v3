const validate = require('../utils/addresses/validate')
const Address = require('../../models/address')
const User = require('../../models/user')

exports.lookupNewAddress = async (req, res) => {
  const { email } = req.user
  const addressFromClient = req.body.address
  const { fullName, phone, country, firstLine, secondLine, city, state, zip } = addressFromClient
  const user = await User.findOne({ email })
  const newAddress = new Address()
  newAddress.user = user._id
  newAddress.fullName = fullName
  newAddress.phone = phone.toString()
  if (country !== "United States") {
    try {
      newAddress.firstLine = firstLine
      newAddress.secondLine = secondLine
      newAddress.deliveryLastLine = `${city} ${state} ${zip}`
      newAddress.country = country
      newAddress.city = city
      newAddress.state = state
      newAddress.zip = zip.toString()
      await newAddress.save()
      res.json(newAddress)
    } catch (error) {
      console.log(error)
      res.json(error)
    }
  } else {
    try {
      const validationResponse = await validate(addressFromClient)
      const bestCandidate = validationResponse[0].result[0]
      newAddress.firstLine = bestCandidate.deliveryLine1
      newAddress.secondLine = bestCandidate.deliveryLine2
      newAddress.deliveryLastLine = bestCandidate.lastLine
      newAddress.country = "United States"
      newAddress.city = bestCandidate.components.cityName
      newAddress.state = bestCandidate.components.state
      newAddress.zip = bestCandidate.components.zipCode.toString()
      await newAddress.save()
      res.json(newAddress)
    } catch (error) {
      res.json(error)
    }
  }
}