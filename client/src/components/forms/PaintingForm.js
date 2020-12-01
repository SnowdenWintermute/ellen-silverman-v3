import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const PaintingForm = ({ handleSubmit, handleChange, values, seriesList, loading, formFieldErrors }) => {
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
    <form className="standard-form" onSubmit={handleSubmit}>
      <h4>Post Photo</h4>
      <div className="">
        <label className="button button-standard-size button-basic">
          <input onChange={handleChange('image')} type="file" name="image" accept="image/*" />
        </label>
      </div>
      <FormControl variant="filled">
        <InputLabel id="select-series">Series</InputLabel>
        <Select labelId="select-series" onChange={handleChange('series')} value={series}>
          {seriesList.length &&
            seriesList.map((ser, i) => (
              <MenuItem key={i} value={ser._id}>
                {ser.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <TextField label="Title" variant="filled" onChange={handleChange('title')} value={title} error={formFieldErrors.title && true} helperText={formFieldErrors.title ? formFieldErrors.title.message : ""} />
      <TextField label="Height" variant="filled" onChange={handleChange('height')} value={height} />
      <TextField label="Width" variant="filled" onChange={handleChange('width')} value={width} />
      <FormControl variant="filled">
        <InputLabel id="select-drawing-material">Drawing Material</InputLabel>
        <Select labelId="select-drawing-material" onChange={handleChange('drawingMaterial')} value={drawingMaterial}>
          {drawingMaterialOptions.length &&
            drawingMaterialOptions.map((item, i) => (
              <MenuItem key={i} value={item}>
                {item}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl variant="filled">
        <InputLabel id="select-support">Support</InputLabel>
        <Select labelId="select-support" onChange={handleChange('support')} value={support}>
          {supportOptions.length &&
            supportOptions.map((item, i) => (
              <MenuItem key={i} value={item}>
                {item}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <TextField label="Year" variant="filled" onChange={handleChange('year')} value={year} />
      <TextField label="Price" variant="filled" onChange={handleChange('price')} value={price} />
      <TextField label="Description" variant="filled" multiline onChange={handleChange('description')} value={description} />

      <button disabled={loading} className="button button-standard-size button-basic">ADD PAINTING</button>
    </form>
  )
}
export default PaintingForm