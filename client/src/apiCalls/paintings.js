import axios from "axios";

export const getPainting = async (slug) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/paintings/${slug}`
    );
    return res;
  } catch (err) {
    return err;
  }
};
export const getPaintingWithFullImage = async (slug) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/paintings/with-full-image/${slug}`
    );
    return res;
  } catch (err) {
    return err;
  }
};

export const getPaintingThumbnail = async (id) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/paintings/thumbnail/${id}`
    );
    return res;
  } catch (err) {
    return err;
  }
}

export const addPainting = async (painting, authToken) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/paintings`,
      painting,
      {
        headers: {
          authToken,
          "Content-Type": `multipart/form-data; boundary=${painting._boundary}`,
        },
      }
    );
    return res;
  } catch (err) {
    return err;
  }
};

export const editPainting = async (painting, authToken) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API}/paintings`,
      painting,
      {
        headers: {
          authToken,
          "Content-Type": `multipart/form-data; boundary=${painting._boundary}`,
        },
      }
    );
    return res;
  } catch (err) {
    return err;
  }
};

export const removePainting = async (id, authToken) => {
  try {
    const deletedPainting = await axios.delete(
      `${process.env.REACT_APP_API}/paintings`,
      {
        headers: {
          authToken,
        },
        data: {
          id,
        },
      }
    );
    return deletedPainting;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const uploadPaintingCSVFormData = async (csvFormData, authToken, handleProgressEvent) => {
  try {
    const res = await axios.post(
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
    return res;
  } catch (err) {
    return err;
  }
};

export const uploadMultiplePaintingImages = async (
  formData,
  authToken,
  handleProgressEvent
) => {
  try {
    const res = await axios.post(
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
    return res;
  } catch (err) {
    return err;
  }
};
