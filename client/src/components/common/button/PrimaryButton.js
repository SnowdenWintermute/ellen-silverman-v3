import React from 'react'
import { Button, makeStyles } from '@material-ui/core'
import classnames from 'classnames'

const useStyles = makeStyles({
  fullWidth: {
    width: "100%"
  },
})

const PrimaryButton = ({ onClick, title, fullWidth, isSubmit, disabled, customClasses }) => {
  const classes = useStyles()
  return (
    <Button
      variant="contained"
      color="primary"
      className={classnames(customClasses, fullWidth && classes.fullWidth)}
      type={isSubmit && "submit"}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </Button>
  )
}
export default PrimaryButton