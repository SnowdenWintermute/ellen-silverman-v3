import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';
import AccordionTablePanel from '../../common/accordion/AccordionTablePanel';

const AddedPaintingsResultsAccordion = ({ paintingsAdded, paintingsUpdated, errors }) => {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      {errors.length > 0 &&
        <AccordionTablePanel
          expanded={expanded}
          handleChange={handleChange}
          panelNumber={"1"}
          panelContent={errors}
          title="Errors"
        >
          {errors.map((error, i) => (
            <TableRow key={`error-${i}`}>
              <TableCell align="left" style={{ width: '200px' }}>{error.paintingTitle}</TableCell>
              <TableCell align="left">{error.error.message}</TableCell>
            </TableRow>
          ))}
        </AccordionTablePanel>
      }
      {paintingsAdded.length > 0 &&
        <AccordionTablePanel
          expanded={expanded}
          handleChange={handleChange}
          panelNumber={"2"}
          panelContent={paintingsAdded}
          title="Paintings Added"
        >
          {paintingsAdded.map((painting, i) => (
            <TableRow key={`painting-added-${i}`}>
              <TableCell align="left">{painting.title}</TableCell>
            </TableRow>
          ))}
        </AccordionTablePanel>
      }
      {paintingsUpdated.length > 0 &&
        <AccordionTablePanel
          expanded={expanded}
          handleChange={handleChange}
          panelNumber={"3"}
          panelContent={paintingsUpdated}
          title="Paintings Updated"
        >
          {paintingsUpdated.map((painting, i) => (
            <TableRow key={`painting-updated-${i}`}>
              <TableCell align="left">{painting.title}</TableCell>
            </TableRow>
          ))}
        </AccordionTablePanel>
      }
    </div>
  );
}

export default AddedPaintingsResultsAccordion