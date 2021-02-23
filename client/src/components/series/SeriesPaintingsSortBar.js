import React from 'react'
import SortBarHeader from './SortBarHeader'
import SeriesHeaderInfo from './SeriesHeaderInfo'

export const SeriesPaintingsSortBar = ({ series, sortParameter, onSelectSortParameter }) => {
  return (
    <SortBarHeader
      header={series.name}
      sortParameter={sortParameter}
      onSelectSortParameter={onSelectSortParameter}
      filterOptions={[
        "newest",
        "oldest",
        "sold first",
        "not sold first"
      ]}>
      <SeriesHeaderInfo series={series} />
    </SortBarHeader>
  )
}
