import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import StandardDialog from '../../common/dialog/StandardDialog'
import AddedPaintingImagesResultsAccordion from './AddedPaintingImagesResultsAccordion';
import PrimaryButton from '../../common/button/PrimaryButton';

const useStyles = makeStyles(() => ({
  buttonRightSide: {
    float: "right",
    width: "140px"
  }
}));

const AddedImagesResultsDialog = ({ open, onClose, setResultsDialogOpen, imagesAdded, imagesUpdated, errors }) => {
  const classes = useStyles()
  return (
    <StandardDialog open={open} onClose={onClose}>
      <h2 id="simple-modal-title">Results</h2>
      <AddedPaintingImagesResultsAccordion
        paintingImagesAdded={imagesAdded}
        paintingImagesUpdated={imagesUpdated}
        errors={errors}
      />
      <PrimaryButton
        title="OK"
        onClick={() => setResultsDialogOpen(false)}
        customClasses={classes.buttonRightSide}
      />
    </StandardDialog>
  )
}
export default AddedImagesResultsDialog