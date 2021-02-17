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
    } catch (error) {
      console.log(error);
      toast.error(error);
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
    if (name !== "image") setValues({ ...values, [name]: value });
    if (name === "image") {
      if (!value) setValues({ ...values, image: null, title: "" });
      if (editMode) setValues({ ...values, image: event.target.files[0] });
      else {
        const titleFromImageName = event.target.files[0].name.split(".")[0];
        setValues({
          ...values,
          image: event.target.files[0],
          title: titleFromImageName,
        });
        formData.current.set("title", titleFromImageName);
      }
    }
    const newFormFieldErrors = { ...formFieldErrors };
    delete newFormFieldErrors[name];
    setFormFieldErrors(newFormFieldErrors);
  };

  const handleSubmitEdit = async () => {
    const res = await editPainting(formData.current, user.token);
    toast.success(`Edited ${res.data.title}.`);
  }

  const handleSubmitNew = async () => {
    const res = await addPainting(formData.current, user.token);
    toast.success(`Added ${res.data.title}.`);
    setValues({ ...initialValues });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editMode) await handleSubmitEdit()
      else await handleSubmitNew()
    } catch (error) {
      console.log({ ...error })
      if (error.response.data) {
        if (error.response.data.errors) setFormFieldErrors({ ...error.response.data.errors })
        else if (error.response.data.message) toast.error(error.response.data.message);
      }
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
