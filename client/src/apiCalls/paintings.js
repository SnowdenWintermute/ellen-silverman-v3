import axios from "axios";

export const getPainting = async (slug) => await axios.get(`${process.env.REACT_APP_API}/paintings/${slug}`);

export const getPaintingWithFullImage = async (slug) => await axios.get(`${process.env.REACT_APP_API}/paintings/with-full-image/${slug}`);

export const getPaintingThumbnail = async (id) => await axios.get(`${process.env.REACT_APP_API}/paintings/thumbnail/${id}`);

export const addPainting = async (painting, authToken) => await axios.post(
  `${process.env.REACT_APP_API}/paintings`,
  painting,
  {
    headers: {
      authToken,
      "Content-Type": `multipart/form-data; boundary=${painting._boundary}`,
    },
  });

export const editPainting = async (painting, authToken) => await axios.put(
  `${process.env.REACT_APP_API}/paintings`,
  painting,
  {
    headers: {
      authToken,
      "Content-Type": `multipart/form-data; boundary=${painting._boundary}`,
    },
  });


export const removePainting = async (id, authToken) =>
  await axios.delete(`${process.env.REACT_APP_API}/paintings`, {
    headers: {
      authToken,
    },
    data: {
      id,
    },
  });

export const uploadPaintingCSVFormData = async (
  csvFormData,
  authToken,
  handleProgressEvent
) =>
  await axios.post(
    `${process.env.REACT_APP_API}/paintings/upload-csv`,
    csvFormData,
    {
      headers: {
        authToken,
        "Content-Type": `multipart/form-data; boundary=${csvFormData._boundary}`,
      },
      onUploadProgress: (progressEvent) => {
        handleProgressEvent(progressEvent);
      },
    }
  );

export const uploadMultiplePaintingImages = async (
  formData,
  authToken,
  handleProgressEvent
) =>
  await axios.post(
    `${process.env.REACT_APP_API}/paintings/upload-multiple-painting-images`,
    formData,
    {
      headers: {
        authToken,
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
      },
      onUploadProgress: (progressEvent) => {
        handleProgressEvent(progressEvent);
      },
    }
  );
