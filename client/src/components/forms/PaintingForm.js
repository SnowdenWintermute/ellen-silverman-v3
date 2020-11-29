import React from 'react'

const PaintingForm = ({ handleSubmit, handleChange, values, seriesList, loading }) => {
  const {
    title,
    height,
    width,
    year,
    image,
    thumbnail,
    price,
    description,
  } = values;

  const drawingMaterialOptions = ['oil', 'pastel', 'watercolor', 'acrylic', 'graphite', 'charcoal', 'ink', 'crayon']
  const supportOptions = ['canvas', 'paper', 'card stock', 'vellum', 'fabric', 'stone', 'wood', 'metal']

  return (
    <form className="" onSubmit={handleSubmit}>
      <h4>Post Photo</h4>
      <div className="">
        <label className="button button-standard-size button-basic">
          <input onChange={handleChange('image')} type="file" name="image" accept="image/*" />
        </label>
      </div>

      <div className="">
        <label className="">Series</label>
        <select onChange={handleChange('series')} className="">
          <option>Please select</option>
          {seriesList.length &&
            seriesList.map((ser, i) => (
              <option key={i} value={ser._id}>
                {ser.name}
              </option>
            ))}
        </select>
      </div>

      <div className="">
        <label className="">Title</label>
        <input onChange={handleChange('title')} type="text" className="" value={title} />
      </div>
      <div className="">
        <label className="">Height</label>
        <input onChange={handleChange('height')} type="text" className="" value={height} />
      </div>
      <div className="">
        <label className="">Width</label>
        <input onChange={handleChange('width')} type="text" className="" value={width} />
      </div>
      <div className="">
        <label className="">Drawing Material</label>
        <select onChange={handleChange('drawingMaterial')} className="">
          <option value="">Select material</option>
          {drawingMaterialOptions.map(item => <option key={item} value={item}>{item}</option>)}
        </select>
      </div>
      <div className="">
        <label className="">Support</label>
        <select onChange={handleChange('support')} className="">
          <option value="">Select support</option>
          {supportOptions.map(item => <option key={item} value={item}>{item}</option>)}
        </select>
      </div>
      <div className="">
        <label stlye={{ color: "black", display: 'inline' }}>Year
        <input onChange={handleChange('year')} type="text" className="" value={year} />
        </label>
      </div>
      <div className="">
        <label className="">Price</label>
        <input onChange={handleChange('price')} type="text" className="" value={price} />
      </div>
      <div className="">
        <label className="">Description</label>
        <textarea onChange={handleChange('description')} type="text" className="" value={description} />
      </div>

      <button disabled={loading} className="button button-standard-size button-basic">Add Painting</button>
    </form>
  )
}
export default PaintingForm