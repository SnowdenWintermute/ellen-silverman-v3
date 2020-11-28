import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';

import PaintingForm from '../forms/PaintingForm'

import { getSeriesList } from '../../apiCalls/series'
import { addPainting } from '../../apiCalls/paintings'

const AddProduct = () => {
  const [loading, setLoading] = useState(false)
  const [seriesList, setSeriesList] = useState([])
  const [formData, setFormData] = useState(null)
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

  // load categories and set form data
  const initFormDataAndLoadSeriesList = useCallback(async () => {
    try {
      const fetchedSeriesList = await getSeriesList()
      console.log(fetchedSeriesList)
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
  };

  const loadSeries = async () => await setSeriesList(getSeriesList().data)

  const handleSubmit = async (e) => {
    console.log(e)
    e.preventDefault();
    try {
      setLoading(true)
      const res = await addPainting(values, user.token)
      console.log(res)
      toast.success(`Added ${values.title} to ${values.series} series.`)
      setValues({ ...initialValues })
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
      toast.error(err)
    }
  };



  const loadingSpinner = () =>
    loading && (
      <span>Loading...</span>
    );

  return (
    <div className="page-frame">
      {loadingSpinner()}
      <PaintingForm handleSubmit={handleSubmit} handleChange={handleChange} values={values} seriesList={seriesList} loading={loading} />
    </div>
  );
};

export default AddProduct;
