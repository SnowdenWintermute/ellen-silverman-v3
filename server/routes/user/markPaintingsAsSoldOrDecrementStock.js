const Painting = require('../../models/painting')

module.exports = markPaintingsAsSoldOrDecrementStock = async (order) => {
  for (const painting of order.paintings) {
    try {
      const currPainting = await Painting.findById(painting.painting)
      currPainting.stock -= 1
      if (currPainting.stock < 1) currPainting.stock = 0
      if (currPainting.stock === 0) currPainting.sold = true
      await currPainting.save()
    } catch (error) {
      console.log(error)
    }
  }
}