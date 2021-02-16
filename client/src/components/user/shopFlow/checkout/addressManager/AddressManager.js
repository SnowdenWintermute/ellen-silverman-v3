import React, { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { setSelectedShippingAddress } from '../../../../../store/actions/cart-actions'
import { lookupNewAddress, getUserAddresses, confirmNewAddress, removeAddress } from "../../../../../apiCalls/user";
import { toast } from "react-toastify";
import AddressForm from "../../../../forms/AddressForm";
import ConfirmedAddressCardList from './ConfirmedAddressCardList'
import ConfirmAddressModal from "./ConfirmAddressModal";
import ProgressIndicator from '../../../../common/progressIndicator/ProgressIndicator'

const AddressManager = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user);
  const selectedShippingAddress = useSelector((state) => state.cart.selectedShippingAddress);
  const [loadingSavedAddresses, setLoadingSavedAddresses] = useState(true)
  const [addingNewAddress, setAddingNewAddress] = useState(false)
  const [confirmedAddresses, setConfirmedAddresses] = useState([])
  const [addressFromServerToBeConfirmed, setAddressFromServerToBeConfirmed] = useState({})
  const [confirmAddressModalOpen, setConfirmAddressModalOpen] = useState(false)
  const [addressValues, setAddressValues] = useState({
    fullName: "",
    firstLine: "",
    secondLine: "",
    country: "United States",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });

  const loadUserAddresses = useCallback(async () => {
    try {
      const addresses = await getUserAddresses(user.token)
      setConfirmedAddresses(addresses.data)
      if (!selectedShippingAddress) {
        if (addresses.data[0] !== null && addresses.data.length) dispatch(setSelectedShippingAddress(addresses.data[0]._id))
      }
      setLoadingSavedAddresses(false)
    } catch (error) {
      console.log(error)
      toast.error(error);
    }
  }, [user, selectedShippingAddress, dispatch])

  useEffect(() => { loadUserAddresses() }, [loadUserAddresses])

  const handleAddressFieldChange = (fieldName) => e => {
    const newAddressValues = { ...addressValues }
    newAddressValues[fieldName] = e.target.value
    setAddressValues(newAddressValues)
  };

  const handleSubmitNewAddress = async e => {
    e.preventDefault()
    try {
      const newAddress = await lookupNewAddress(addressValues, user.token)
      setAddressFromServerToBeConfirmed(newAddress.data)
      if (newAddress.data && newAddress.data.city) setConfirmAddressModalOpen(true)
      if (!newAddress.data) toast.error("Error validating address. Please double check all fields.")
      else if (!newAddress.data.city) toast.error("Error validating address. Please double check all fields.")
    } catch (error) {
      console.log(error)
      if (!error.data.city) toast.error("Error validating address. Please double check all fields.")
    }
  }

  const handleConfirmAddress = async () => {
    try {
      const newAddresses = await confirmNewAddress(addressFromServerToBeConfirmed._id, user.token)
      setConfirmedAddresses(newAddresses.data)
      dispatch(setSelectedShippingAddress(newAddresses.data[newAddresses.data.length - 1]._id))
      setConfirmAddressModalOpen(false)
      setAddingNewAddress(false)
    } catch (error) {
      console.log(error)
      toast.error(JSON.stringify(error))
    }
  }

  const handleRejectAddress = () => { setConfirmAddressModalOpen(false) }

  const handleRemoveAddress = async addressId => {
    try {
      const newAddressList = await removeAddress(addressId, user.token)
      setConfirmedAddresses(newAddressList.data)
      if (newAddressList.data[0]) dispatch(setSelectedShippingAddress(newAddressList.data[0]._id))
      else dispatch(setSelectedShippingAddress(null))
    } catch (error) {
      console.log(error)
      toast.error(JSON.stringify(error))
    }
  }

  const setDeleteFlagOfSpecifiedAddress = (addressId, flag) => {
    const newAddressList = confirmedAddresses.map(address => {
      if (address._id === addressId) address.flaggedForRemoval = flag
      return address
    })
    setConfirmedAddresses(newAddressList)
  }

  const handleSelectAddressChange = (e) => dispatch(setSelectedShippingAddress(e.target.value))

  return (
    <>
      {loadingSavedAddresses ? <ProgressIndicator /> : (confirmedAddresses.length > 0 && confirmedAddresses[0] !== null && !addingNewAddress) ?
        <ConfirmedAddressCardList
          confirmedAddresses={confirmedAddresses}
          handleRemoveAddress={handleRemoveAddress}
          handleSelectAddressChange={handleSelectAddressChange}
          setDeleteFlagOfSpecifiedAddress={setDeleteFlagOfSpecifiedAddress}
          setAddingNewAddress={setAddingNewAddress}
        />
        : <AddressForm
          values={addressValues}
          handleChange={handleAddressFieldChange}
          handleSubmit={handleSubmitNewAddress}
          confirmedAddresses={confirmedAddresses}
          setAddingNewAddress={setAddingNewAddress}
          formFieldErrors={{}}
        />}
      <ConfirmAddressModal
        addressToConfirm={addressFromServerToBeConfirmed}
        open={confirmAddressModalOpen}
        handleClose={() => setConfirmAddressModalOpen(false)}
        handleConfirmAddress={handleConfirmAddress}
        handleRejectAddress={handleRejectAddress}
      />
    </>
  )
}
export default AddressManager