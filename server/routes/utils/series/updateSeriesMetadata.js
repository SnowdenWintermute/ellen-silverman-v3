const Series = require('../../../models/series')
const Painting = require('../../../models/painting')

module.exports = async (seriesIdArray) => {
  try {
    for (seriesId of seriesIdArray) {
      const series = await Series.findById(seriesId)
      const paintings = await Painting.find({ seriesList: seriesId })
      // console.log("paintings: ", paintings)
      const paintingsWithImages = paintings.filter(painting => {
        if (painting.thumbnail) console.log("painting ", painting.title)
        if (painting.thumbnail.contentType) return painting
      })
      console.log("paintingsWithImages", paintingsWithImages)
      console.log("seriesID ", seriesId)
      console.log("seriesName", series.name)
      series.numberOfPaintings = paintingsWithImages.length
      series.years.earliest = paintings.reduce((acc, painting) => {
        if (!acc) return painting.year
        else if (painting.year < acc) return painting.year
        else return acc
      }, 0) || null
      series.years.latest = paintings.reduce((acc, painting) => {
        if (!acc) return painting.year
        else if (painting.year > acc) return painting.year
        else return acc
      }, 0) || null
      // will have to adjust this when selling postcards
      series.numberSold = paintings.reduce((acc = 0, painting) => {
        if (painting.sold) return acc + 1
        else return acc
      }, 0)
      await series.save()
      // console.log("seriesMetadataUpdated: ", series)
    }
  } catch (error) {
    return console.log(error)
  }
}