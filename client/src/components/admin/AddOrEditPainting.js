import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
// api
import { getSeriesList } from '../../apiCalls/series'
import { addPainting, editPainting, getPainting } from '../../apiCalls/paintings'
// components
import PaintingForm from '../forms/PaintingForm'

const AddOrEditPainting = (props) => {
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [seriesList, setSeriesList] = useState([])
  const [formData, setFormData] = useState(null)
  const [formFieldErrors, setFormFieldErrors] = useState({})
  const initialValues = {
    title: "",
    height: "",
    width: "",
    drawingMaterial: "",
    support: "",
    year: "",
    image: "",
    thumbnail: "",
    price: "",
    series: "",
    description: "",
  }
  const [values, setValues] = useState({
    ...initialValues
  });
  const user = useSelector(state => state.user);

  const initFormDataAndLoadSeriesList = useCallback(async () => {
    try {
      const fetchedSeriesList = await getSeriesList()
      setSeriesList(fetchedSeriesList)
      setFormData(new FormData())
    } catch (err) {
      console.log(err)
      toast.error(err)
    }
  }, []);

  useEffect(() => {
    initFormDataAndLoadSeriesList();
  }, [initFormDataAndLoadSeriesList]);

  useEffect(() => {
    const { paintingSlug } = props.match.params
    const getPaintingAndSetInitialValues = async () => {
      if (paintingSlug) {
        const paintingToEdit = await getPainting(paintingSlug)
        setEditMode(true)
        const newValues = { ...initialValues }
        Object.keys(newValues).forEach(valueKey => {
          newValues[valueKey] = paintingToEdit.data[valueKey] || ""
          if (formData) formData.set(valueKey, paintingToEdit.data[valueKey]);
        })
        setValues({ ...newValues })
      }
    }
    getPaintingAndSetInitialValues()
  }, [formData])

  const handleChange = name => event => {
    console.log(event.target.files[0])
    const value = name === 'image' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    if (name === "image") {
      if (event.target.files[0]) {
        if (!editMode) {
          const titleFromImageName = event.target.files[0].name.split('.')[0]
          setValues({ ...values, image: event.target.files[0], title: titleFromImageName })
          formData.set("title", titleFromImageName)
        } else setValues({ ...values, image: event.target.files[0] })
      }
      else setValues({ ...values, image: null, title: "" })
    }
    else setValues({ ...values, [name]: value });
    const newFormFieldErrors = { ...formFieldErrors }
    delete newFormFieldErrors[name]
    setFormFieldErrors(newFormFieldErrors)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      let res
      if (editMode) res = await editPainting(formData, user.token)
      else res = await addPainting(formData, user.token)
      console.log({ ...res })
      if (res.response) {
        if (res.response.data.error) {
          if (res.response.data.error.errors && Object.keys(res.response.data.error.errors).length) {
            setFormFieldErrors({ ...res.response.data.error.errors })
          } else toast.error(res.response.data.error.message)
        }
      } else if (res.data) {
        if (editMode) {
          toast.success(`Edited ${res.data.title}.`)
        }
        else {
          toast.success(`Added ${res.data.title}.`)
          setValues({ ...initialValues })
        }
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
      toast.error(err.message)
    }
  };


  return (
    <div className="page-frame">
      <PaintingForm editMode={editMode} handleSubmit={handleSubmit} handleChange={handleChange} values={values} seriesList={seriesList} loading={loading} formFieldErrors={formFieldErrors} />
    </div>
  )
}

export default AddOrEditPainting;
