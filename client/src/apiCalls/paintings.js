import axios from 'axios'

export const addPainting = async (painting, authToken) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API}/paintings`, painting, {
      headers: {
        authToken,
        'Content-Type': `multipart/form-data; boundary=${painting._boundary}`
      }
    })
    return res
  } catch (err) {
    return err
  }
};

export const uploadPaintingCSVFormData = async (csvFormData, authToken) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API}/paintings/upload-csv`, csvFormData, {
      headers: {
        authToken,
        'Content-Type': `multipart/form-data; boundary=${csvFormData._boundary}`
      }
    })
    return res
  } catch (err) {
    return err
  }
};

export const uploadMultiplePaintingImages = async (formData, authToken, handleProgressEvent) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API}/paintings/upload-multiple-painting-images`, formData, {
      headers: {
        authToken,
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
      },
      onUploadProgress: (progressEvent) => { handleProgressEvent(progressEvent) }
    })
    return res
  } catch (err) {
    return err
  }
};
