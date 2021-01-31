import { TextField, Typography, Button } from '@material-ui/core'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { createPage } from '../../apiCalls/page'
import MaterialPaperNarrow from '../layout/MaterialPaperNarrow'
import { toast } from 'react-toastify'
import AdminFeatureHeader from './subComponents/AdminFeatureHeader'


const AddPage = () => {
  const user = useSelector(state => state.user)
  const [pageTitle, setPageTitle] = useState("")

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await createPage(pageTitle, user.token)
      toast.success("Page created")
      setPageTitle("")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="page-frame">
      <MaterialPaperNarrow>
        <AdminFeatureHeader headerText={"Add a page to track views on"} subHeaderText={"Mom - ask me before using this feature!"} />
        <form onSubmit={onSubmit}>
          <Typography variant="h5">
            Enter a page title
            </Typography>
          <TextField value={pageTitle} onChange={(e) => setPageTitle(e.target.value)} />
          <br></br>
          <br></br>
          <Button type="submit" variant="contained" color="primary">ADD PAGE</Button>
        </form>
      </MaterialPaperNarrow>
    </div>
  )
}
export default AddPage