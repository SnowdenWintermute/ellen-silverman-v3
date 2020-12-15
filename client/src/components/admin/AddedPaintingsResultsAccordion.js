import React from 'react';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TableRow from '@material-ui/core/TableRow';
import Accordion from '../common/accordion/Accordion'
import AccordionSummary from '../common/accordion/AccordionSummary'
import AccordionDetails from '../common/accordion/AccordionDetails'

export default function AddedPaintingsResultsAccordion({ paintingsAdded, paintingsUpdated, errors }) {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ExpandMoreIcon />}>
          <Typography>Errors ({errors.length})</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Table size="small" aria-label="a dense table">
            <TableBody>
              {errors.map((error, i) => (
                <TableRow key={`error-${i}`}>
                  <TableCell align="left" style={{ width: '200px' }}>{error.paintingTitle}</TableCell>
                  <TableCell align="left">{error.error.message}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AccordionDetails>
      </Accordion>
      {paintingsAdded.length > 0 && <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" expandIcon={<ExpandMoreIcon />}>
          <Typography>Added Paintings ({paintingsAdded.length})</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Table size="small" aria-label="a dense table">
            <TableBody>
              {paintingsAdded.map((painting, i) => (
                <TableRow key={`error-${i}`}>
                  <TableCell align="left">{painting.title}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AccordionDetails>
      </Accordion>}
      {paintingsUpdated.length > 0 && <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" expandIcon={<ExpandMoreIcon />}>
          <Typography>Updated Paintings ({paintingsUpdated.length})</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Table size="small" aria-label="a dense table">
            <TableBody>
              {paintingsUpdated.map((painting, i) => (
                <TableRow key={`error-${i}`}>
                  <TableCell align="left">{painting.title}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AccordionDetails>
      </Accordion>}
    </div>
  );
}