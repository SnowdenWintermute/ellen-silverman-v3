module.exports = (user, order) => {
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
              Order Confirmation
            </h2>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <h3>
              Thank you for your order. We will send an email when your items ship.
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
        ${order.paintings.map(painting => `<tr>
          <td>
            ${painting.painting.title}
          </td>
            $${painting.painting.price}
          </td>
        </tr>`)}
        <tr>
          <td>
            Order total:
          </td>
          <td>
            $${order.orderTotal}
          </td>
        </tr>
      </tbody>
     </table>`
  )
}