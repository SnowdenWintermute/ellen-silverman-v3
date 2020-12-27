const painting = require('../../models/painting');
const Painting = require('../../models/painting');

exports.remove = async (req, res) => {
  try {
    const paintingToRemove = await Painting.findById(req.body.id).select('_id title slug series')
    const removedPainting = { ...paintingToRemove._doc }
    await paintingToRemove.remove()
    console.log("removed: ", removedPainting)
    return res.status(200).json(removedPainting)
  } catch (err) {
    return res.status(400).json({ error: err })
  }
};