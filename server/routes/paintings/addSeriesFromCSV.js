// checks paintings' series against the list of existing series and adds any that aren't there
module.exports = async (paintings, seriesList) => {
  for (const painting of paintings) {
    if (!painting.series) continue
    if (!seriesList[painting.series]) {
      const seriesToAddToList = await Series.findOne({ name: painting.series })
      if (!seriesToAddToList) seriesList[painting.series] = await new Series({ name: painting.series, slug: slugify(painting.series) }).save()
      else seriesList[painting.series] = seriesToAddToList
    }
    else continue
  }
}