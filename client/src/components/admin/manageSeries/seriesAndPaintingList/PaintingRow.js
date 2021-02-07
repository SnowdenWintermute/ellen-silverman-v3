import React from 'react'
import { Link } from 'react-router-dom';
import { Icon, TableRow, TableCell, IconButton } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

const PaintingRow = ({ painting, openDeletePaintingModal }) => {
  return (
    <TableRow>
      <TableCell align="left">{painting.title} ({painting.viewCounter ? painting.viewCounter.views : 0} views)</TableCell>
      <TableCell align="right">
        <Link to={`/admin/edit-painting/${painting.slug}`}>
          <IconButton>
            <Icon>
              <EditIcon />
            </Icon>
          </IconButton>
        </Link>
        <IconButton>
          <Icon>
            <DeleteForeverIcon onClick={() => openDeletePaintingModal(painting)} />
          </Icon>
        </IconButton>
      </TableCell>
    </TableRow>
  )
}
export default PaintingRow