import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import { AccordionTablePanel } from '../../common/accordion/AccordionTablePanel';

const AddedPaintingImagesResultsAccordion = ({ paintingImagesAdded, paintingImagesUpdated, errors }) => {
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
              <TableCell align="left">{error.message}</TableCell>
            </TableRow>
          ))}
        </AccordionTablePanel>
      }
      {paintingImagesAdded.length > 0 &&
        <AccordionTablePanel
          expanded={expanded}
          handleChange={handleChange}
          panelNumber={"2"}
          panelContent={paintingImagesAdded}
          title="Added Images"
        >
          {paintingImagesAdded.map((painting, i) => (
            <TableRow key={`painting-added-${i}`}>
              <TableCell align="left">
                <img
                  className="accordion-image"
                  src={`data:${painting.thumbnail.contentType};base64,${Buffer.from(painting.thumbnail.data).toString('base64')}`}
                  alt={painting.title}
                />
              </TableCell>
              <TableCell align="left">{painting.title}</TableCell>
            </TableRow>
          ))}
        </AccordionTablePanel>
      }
      {paintingImagesUpdated.length > 0 &&
        <AccordionTablePanel
          expanded={expanded}
          handleChange={handleChange}
          panelNumber={"3"}
          panelContent={paintingImagesUpdated}
          title="Updated Images"
        >
          {paintingImagesUpdated.map((painting, i) => (
            <TableRow key={`painting-updated-${i}`}>
              <TableCell align="left">
                <img
                  className="accordion-image"
                  src={`data:${painting.thumbnail.contentType};base64,${Buffer.from(painting.thumbnail.data).toString('base64')}`}
                  alt={painting.title}
                />
              </TableCell>
              <TableCell align="left">{painting.title}</TableCell>
            </TableRow>
          ))}
        </AccordionTablePanel>
      }
    </div>
  );
}

export default AddedPaintingImagesResultsAccordion