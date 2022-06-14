import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getSeriesList } from "../../apiCalls/series";
import {
  addPainting,
  editPainting,
  getPainting,
} from "../../apiCalls/paintings";
import PaintingForm from "../forms/PaintingForm";

const AddOrEditPainting = (props) => {
  const user = useSelector((state) => state.user);
  const formData = useRef(new FormData());
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listOfAvailableSeries, setListOfAvailableSeries] = useState([]);
  const [formFieldErrors, setFormFieldErrors] = useState({});
  const initialValues = {
    uneditedTitle: "",
    title: "",
    height: "",
    width: "",
    drawingMaterial: "",
    support: "",
    year: "",
    image: "",
    thumbnail: "",
    price: "",
    seriesList: [],
    description: "",
  };
  const [values, setValues] = useState({ ...initialValues });

  const loadSeriesList = useCallback(async () => {
    try {
      const fetchedSeriesList = await getSeriesList();
      setListOfAvailableSeries(fetchedSeriesList.data);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }, []);

  useEffect(() => {
    loadSeriesList();
  }, [loadSeriesList]);

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
        newValues["uneditedTitle"] = paintingToEdit.data["title"];
        formData.current.set("uneditedTitle", paintingToEdit.data["title"]);

        setValues({ ...newValues });
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
      setLoading(false);
    };
    if (paintingSlug) {
      getPaintingAndSetInitialValues();
    }
  }, []);

  const handleChange = (name, seriesIndex) => (event) => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    formData.current.set(name, value);
    if (name === "series") {
      if (values.seriesList.indexOf(value) >= 0) return;
      let newSeriesList = [...values.seriesList];
      if (newSeriesList[seriesIndex]) newSeriesList[seriesIndex] = value;
      else newSeriesList.push(value);
      formData.current.set("seriesList", newSeriesList);
      setValues({ ...values, seriesList: newSeriesList });
    } else if (name !== "image") setValues({ ...values, [name]: value });
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

  const handleRemoveSeriesClick = (indexToRemove) => {
    let newSeriesList = values.seriesList.filter(
      (seriesId, i) => i !== indexToRemove
    );
    formData.current.set("seriesList", newSeriesList);
    setValues({ ...values, seriesList: newSeriesList });
  };

  const handleSubmitEdit = async () => {
    const res = await editPainting(formData.current, user.token);
    toast.success(`Edited ${res.data.title}.`);

    setValues({ ...values, uneditedTitle: values.title });
    formData.current.set("uneditedTitle", values["title"]);
  };

  const handleSubmitNew = async () => {
    const res = await addPainting(formData.current, user.token);
    toast.success(`Added ${res.data.title}.`);
    setValues({ ...initialValues });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editMode) await handleSubmitEdit();
      else await handleSubmitNew();
    } catch (error) {
      console.log({ ...error });
      if (error.response.data) {
        if (error.response.data.errors)
          setFormFieldErrors({ ...error.response.data.errors });
        else if (error.response.data.message)
          toast.error(error.response.data.message);
      } else toast.error("Error creating painting (check all fields)");
    }
    setLoading(false);
  };

  return (
    <div className="page-frame">
      <PaintingForm
        editMode={editMode}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        onRemoveSeriesClick={handleRemoveSeriesClick}
        values={values}
        listOfAvailableSeries={listOfAvailableSeries}
        loading={loading}
        formFieldErrors={formFieldErrors}
      />
    </div>
  );
};

export default AddOrEditPainting;
