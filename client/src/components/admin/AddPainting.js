import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
// api
import { getSeriesList } from '../../apiCalls/series'
import { addPainting } from '../../apiCalls/paintings'
// components
import PaintingForm from '../forms/PaintingForm'
import CircularProgress from '@material-ui/core/CircularProgress';

const AddSeries = () => {
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

  const handleChange = name => event => {
    const value = name === 'image' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
    const newFormFieldErrors = { ...formFieldErrors }
    delete newFormFieldErrors[name]
    setFormFieldErrors(newFormFieldErrors)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("oy")
    try {
      setLoading(true)
      const res = await addPainting(formData, user.token)
      if (res.response) {
        if (res.response.data.error) {
          if (res.response.data.error.errors && Object.keys(res.response.data.error.errors).length) {
            setFormFieldErrors({ ...res.response.data.error.errors })
          } else toast.error(res.response.data.error.message)
        }
      } else if (res.data) {
        toast.success(`Added ${res.data.title}.`)
        setValues({ ...initialValues })
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
      toast.error(err.message)
    }
  };


  return (
    <div className="page-frame">
      {loading ? <CircularProgress /> :
        <PaintingForm handleSubmit={handleSubmit} handleChange={handleChange} values={values} seriesList={seriesList} loading={loading} formFieldErrors={formFieldErrors} />
      }
    </div>
  )
}

export default AddSeries;
