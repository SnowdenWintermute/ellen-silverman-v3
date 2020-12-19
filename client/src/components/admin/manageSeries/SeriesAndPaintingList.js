import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Accordion from '../../common/accordion/Accordion'
import AccordionSummary from '../../common/accordion/AccordionSummary'
import AccordionDetails from '../../common/accordion/AccordionDetails'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Icon, Button, Typography, Table, TableRow, TableCell, TableBody, IconButton } from '@material-ui/core'


const SeriesAndPaintingList = ({ seriesListLoading, seriesList, expanded, handlePanelChange, paintingLists, classes, openSeriesEditModal, confirmSeriesDelete }) => {
  return (
    <>
      {seriesListLoading ?
        <Accordion square expanded={false} key={`series-loading`}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<CircularProgress />}>
            <Typography>
              Loading series...
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Table size="small" aria-label="a dense table">
              <TableBody>
                <TableRow>
                  <TableCell align="left" style={{ width: '200px' }}>{"loading"}</TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <Icon>
                        <DeleteForeverIcon />
                      </Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </AccordionDetails>
        </Accordion>
        : seriesList.length === 0 ? "No series yet..." : seriesList.map((series, i) =>
          <Accordion square expanded={expanded === i} key={`series-${i}`} onChange={handlePanelChange(i)}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ExpandMoreIcon />}>
              <Typography>
                {series.name} {`(${series.numberOfPaintings})`}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Table size="small" aria-label="a dense table">
                <TableBody>
                  {paintingLists[series._id] && paintingLists[series._id].map((painting, i) => (
                    <TableRow key={`error-${i}`}>
                      <TableCell align="left" style={{ width: '200px' }}>{painting.title}</TableCell>
                      <TableCell align="right">
                        <IconButton>
                          <Icon>
                            <DeleteForeverIcon />
                          </Icon>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell align="left">
                      <Button variant="contained" color="primary" onClick={() => openSeriesEditModal(series.name, series._id)}>
                        EDIT SERIES
                            </Button>
                    </TableCell>
                    <TableCell align="right">
                      <Button variant="contained" className={classes.deleteButton} onClick={() => confirmSeriesDelete(series.name, series._id)}>
                        DELETE SERIES
                            </Button>
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