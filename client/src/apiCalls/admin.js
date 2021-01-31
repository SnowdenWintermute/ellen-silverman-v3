import axios from 'axios'

export const getOrderById = async (id, authToken) => await axios.get(`${process.env.REACT_APP_API}/admin/orders/id/${id}`, {
  headers: {
    authToken,
  },
})

export const getOrdersByStatus = async (status, authToken) => await axios.get(`${process.env.REACT_APP_API}/admin/orders/${status}`, {
  headers: {
    authToken,
  },
})

export const changeOrderStatus = async (id, newStatus, authToken) => await axios.put(`${process.env.REACT_APP_API}/admin/orders/status`,
  { id, newStatus },
  {
    headers: {
      authToken,
    },
  })

export const updateOrderTracking = async (id, newTracking, authToken) => await axios.put(`${process.env.REACT_APP_API}/admin/orders/tracking`,
  { id, newTracking },
  {
    headers: {
      authToken,
    },
  })