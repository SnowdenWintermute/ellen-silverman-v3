import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel';
import { FormHelperText, TextField, Select, MenuItem, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import ImageInput from './ImageInput'
import MaterialPaperNarrow from '../common/paper/MaterialPaperNarrow'
import AdminFeatureHeader from '../admin/subComponents/AdminFeatureHeader';

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
    marginBottom: "10px"
  },
  select: {
    textAlign: "left"
  }
}));

const PaintingForm = ({ loading, editMode, handleSubmit, handleChange, values, seriesList, formFieldErrors }) => {
  const classes = useStyles()
  const {
    title,
    height,
    width,
    year,
    image,
    thumbnail,
    series,
    drawingMaterial,
    support,
    price,
    description,
  } = values;

  const drawingMaterialOptions = ['oil', 'pastel', 'watercolor', 'acrylic', 'graphite', 'charcoal', 'ink', 'crayon']
  const supportOptions = ['canvas', 'paper', 'card stock', 'vellum', 'fabric', 'stone', 'wood', 'metal']

  return (
    <MaterialPaperNarrow>
      <form onSubmit={handleSubmit}>
        <Grid container item xs={12}>
          <AdminFeatureHeader headerText={`${editMode ? "Edit" : "Add New"} Painting`} />
          <Grid item xs={12}>
            <FormControl variant="filled" className={classes.input}>
              <ImageInput handleChange={handleChange} selectedImage={image ? image : (thumbnail && typeof thumbnail.contentType !== undefined) ? thumbnail : ""} />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.input} variant="filled" error={formFieldErrors.series && true}>
              <InputLabel id="select-series">Series</InputLabel>
              {Object.keys(seriesList).length > 0 && <Select className={classes.select} labelId="select-series" onChange={handleChange('series')} value={series}>
                {seriesList.length &&
                  seriesList.map((ser, i) => (
                    <MenuItem key={i} value={ser._id}>
                      {ser.name}
                    </MenuItem>
                  ))}
              </Select>}
              {formFieldErrors.series && <FormHelperText>{formFieldErrors.series.message}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField className={classes.input} label="Title" variant="filled" width="75px" onChange={handleChange('title')} value={title} error={formFieldErrors.title && true} helperText={formFieldErrors.title ? formFieldErrors.title.message : ""} />
          </Grid>
          <Grid item xs={12}>
            <TextField className={classes.input} label="Height" variant="filled" onChange={handleChange('height')} value={height} error={formFieldErrors.height && true} helperText={formFieldErrors.height ? formFieldErrors.height.message : ""} />
          </Grid>
          <Grid item xs={12}>
            <TextField className={classes.input} label="Width" variant="filled" onChange={handleChange('width')} value={width} error={formFieldErrors.width && true} helperText={formFieldErrors.width ? formFieldErrors.width.message : ""} />
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.input} variant="filled">
              <InputLabel id="select-drawing-material">Drawing Material</InputLabel>
              <Select className={classes.select} labelId="select-drawing-material" onChange={handleChange('drawingMaterial')} value={drawingMaterial}>
                {drawingMaterialOptions.length &&
                  drawingMaterialOptions.map((item, i) => (
                    <MenuItem key={i} value={item}>
                      {item}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.input} variant="filled">
              <InputLabel id="select-support">Support</InputLabel>
              <Select className={classes.select} labelId="select-support" onChange={handleChange('support')} value={support}>
                {supportOptions.length &&
                  supportOptions.map((item, i) => (
                    <MenuItem key={i} value={item}>
                      {item}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField className={classes.input} label="Year" variant="filled" onChange={handleChange('year')} value={year} error={formFieldErrors.year && true} helperText={formFieldErrors.year ? formFieldErrors.year.message : ""} />
          </Grid>
          <Grid item xs={12}>
            <TextField className={classes.input} label="Price" variant="filled" onChange={handleChange('price')} value={price} error={formFieldErrors.price && true} helperText={formFieldErrors.price ? formFieldErrors.price.message : ""} />
          </Grid>
          <Grid item xs={12}>
            <TextField className={classes.input} label="Description" variant="filled" multiline onChange={handleChange('description')} value={description} error={formFieldErrors.description && true} helperText={formFieldErrors.description ? formFieldErrors.description.message : ""} />
          </Grid>
          <Grid item xs={12}>
            <Button disabled={loading} variant="contained" color="primary" type="submit">{editMode ? "EDIT" : "ADD"} PAINTING</Button>
          </Grid>
        </Grid>
      </form>
    </MaterialPaperNarrow>
  )
}
export default PaintingForm