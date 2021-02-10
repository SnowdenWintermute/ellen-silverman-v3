import React from 'react'
import { Table, TableBody, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from './Accordion'
import AccordionSummary from './AccordionSummary'
import AccordionDetails from './AccordionDetails'

const AccordionTablePanel = ({ expanded, handleChange, panelNumber, panelContent, title, children }) => {
  return (
    <Accordion square expanded={expanded === `panel${panelNumber}`} onChange={handleChange(`panel${panelNumber}`)}>
      <AccordionSummary aria-controls={`panel${panelNumber}d-content`} id={`panel${panelNumber}d-header`} expandIcon={<ExpandMoreIcon />}>
        <Typography>{title} ({panelContent.length})</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Table size="small" aria-label={title}>
          <TableBody>
            {children}
          </TableBody>
        </Table>
      </AccordionDetails>
    </Accordion>
  )
}
export default AccordionTablePanel