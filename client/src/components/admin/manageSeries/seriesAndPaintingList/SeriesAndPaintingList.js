import React from 'react'
import { Typography, Table, TableRow, TableCell, TableBody } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ProgressIndicator from '../../../common/progressIndicator/ProgressIndicator'
import Accordion from '../../../common/accordion/Accordion'
import AccordionSummary from '../../../common/accordion/AccordionSummary'
import AccordionDetails from '../../../common/accordion/AccordionDetails'
import PaintingRow from './PaintingRow';
import RedButton from '../../../common/button/RedButton';
import PrimaryButton from '../../../common/button/PrimaryButton';

const SeriesAndPaintingList = ({
  seriesListLoading,
  seriesList,
  expanded,
  handlePanelChange,
  paintingLists,
  openSeriesEditModal,
  openDeleteSeriesModal,
  openDeletePaintingModal
}) => {
  return (
    <>
      {seriesListLoading ? <ProgressIndicator />
        : seriesList.length === 0 ? "No series yet..." : seriesList.map((series, i) =>
          <Accordion square expanded={expanded === i} key={`series-${i}`} onChange={handlePanelChange(i)}>
            <AccordionSummary aria-controls="series-list" id="series-list" expandIcon={<ExpandMoreIcon />}>
              <Typography>
                {series.name} {`(${series.numberOfPaintings}) Veiws: ${series.viewCounter ? series.viewCounter.views : 0}`}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Table size="small" aria-label={series.name}>
                <TableBody>
                  {paintingLists[series._id] && paintingLists[series._id].map((painting, i) => (
                    <PaintingRow key={i} painting={painting} openDeletePaintingModal={openDeletePaintingModal} />
                  ))}
                  <TableRow>
                    <TableCell align="left">
                      <PrimaryButton title="EDIT SERIES" onClick={() => openSeriesEditModal(series.name, series._id)} />
                    </TableCell>
                    <TableCell align="right">
                      <RedButton title="DELETE SERIES" onClick={() => openDeleteSeriesModal(series.name, series._id)} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </AccordionDetails>
          </Accordion>)}
    </>
  )
}

export default SeriesAndPaintingList