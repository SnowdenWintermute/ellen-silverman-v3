const Series = require('../../../models/series')
const Painting = require('../../../models/painting')

module.exports = async (seriesId) => {
  try {
    const series = await Series.findById(seriesId)
    const paintings = await Painting.find({ series: seriesId })
    const paintingsWithImages = paintings.filter(painting => {
      if (painting.thumbnail.contentType) {
        // console.log(painting.thumbnail)
        return painting
      }
    })
    console.log("paintings with images")
    console.log(paintingsWithImages.length)
    console.log(paintingsWithImages)
    series.numberOfPaintings = paintingsWithImages.length
    series.years.earliest = paintings.reduce((acc, painting) => {
      if (!acc) return painting.year
      else if (painting.year < acc) return painting.year
      else return acc
    }, 0)
    series.years.latest = paintings.reduce((acc, painting) => {
      if (!acc) return painting.year
      else if (painting.year > acc) return painting.year
      else return acc
    }, 0)
    // will have to adjust this when selling postcards
    series.numberSold = paintings.reduce((acc = 0, painting) => {
      if (painting.sold) return acc + 1
      else return acc
    }, 0)
    console.log("earliest date: " + series.years.earliest)
    console.log("latest date: " + series.years.latest)
    console.log("number of paintings: " + series.numberOfPaintings)
    console.log("number sold: " + series.numberSold)
    await series.save()
  } catch (error) {
    return console.log(error)
  }
}