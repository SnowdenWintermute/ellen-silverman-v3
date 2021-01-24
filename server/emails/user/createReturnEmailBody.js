module.exports = (order, selectedPaintings, returnNotes) => {
  return (
    `<table>
      <thead>
        <tr>
          <th style="text-align: left;">
            <h2>
              McGuffSilverman.com
            </h2>
          </th>
          <th style="text-align: right;">
            <h2>
              Return Confirmation
            </h2>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <h3>
              Your return request has been received and is being processed.
            </h3>
          </td>
          <td>
            <h3>
              Order ID: ${order._id}
            </h3>
          </td>
        </tr>
        <tr>
          <td>
            <a target="_blank" href="https://mcguffsilverman.com/user/history">
            View or manage orders
            </a>
          </td>
          <td>
          </td>
        </tr>
        ${Object.keys(selectedPaintings).map(painting => selectedPaintings[painting] && `<tr>
          <td>
            ${painting}
          </td>
            Reason for return: ${returnNotes[painting]}
          </td>
        </tr>`)}
      </tbody>
     </table>`
  )
}