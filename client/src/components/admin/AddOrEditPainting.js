import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getSeriesList } from "../../apiCalls/series";
import { addPainting, editPainting, getPainting } from "../../apiCalls/paintings";
import PaintingForm from "../forms/PaintingForm";

const AddOrEditPainting = (props) => {
  const user = useSelector((state) => state.user);
  const formData = useRef(new FormData());
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [seriesList, setSeriesList] = useState([]);
  const [formFieldErrors, setFormFieldErrors] = useState({});
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
  };
  const [values, setValues] = useState({ ...initialValues });

  const loadSeriesList = useCallback(async () => {
    try {
      const fetchedSeriesList = await getSeriesList();
      setSeriesList(fetchedSeriesList.data);
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  }, []);

  useEffect(() => { loadSeriesList() }, [loadSeriesList]);

  useEffect(() => {
    const { paintingSlug } = props.match.params;
    const getPaintingAndSetInitialValues = async () => {
      try {
        setEditMode(true);
        setLoading(true);
        const paintingToEdit = await getPainting(paintingSlug);
        const newValues = { ...initialValues };
        Object.keys(newValues).forEach((valueKey) => {
          newValues[valueKey] = paintingToEdit.data[valueKey] || "";
          formData.current.set(valueKey, paintingToEdit.data[valueKey]);
        });
        setValues({ ...newValues });
      } catch (error) {
        console.log(error)
        toast.error(error);
      }
      setLoading(false);
    };
    if (paintingSlug) {
      getPaintingAndSetInitialValues();
    }
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    formData.current.set(name, value);
    if (name === "image") {
      if (event.target.files[0]) {
        if (!editMode) {
          const titleFromImageName = event.target.files[0].name.split(".")[0];
          setValues({
            ...values,
            image: event.target.files[0],
            title: titleFromImageName,
          });
          formData.current.set("title", titleFromImageName);
        } else setValues({ ...values, image: event.target.files[0] });
      } else setValues({ ...values, image: null, title: "" });
    } else setValues({ ...values, [name]: value });
    const newFormFieldErrors = { ...formFieldErrors };
    delete newFormFieldErrors[name];
    setFormFieldErrors(newFormFieldErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let res;
      if (editMode) res = await editPainting(formData.current, user.token);
      else res = await addPainting(formData.current, user.token);
      if (editMode) toast.success(`Edited ${res.data.title}.`);
      else {
        toast.success(`Added ${res.data.title}.`);
        setValues({ ...initialValues });
      }
    } catch (error) {
      console.log({ ...error })
      if (error.response.data) toast.error(error.response.data.message);
      else toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="page-frame">
      <PaintingForm
        editMode={editMode}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        values={values}
        seriesList={seriesList}
        loading={loading}
        formFieldErrors={formFieldErrors}
      />
    </div>
  );
};

export default AddOrEditPainting;
