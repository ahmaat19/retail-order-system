import React from 'react'
import Moment from 'react-moment'
import moment from 'moment'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

const OrderInfoScreen = ({ orders }) => {
  return orders._id ? (
    <>
      <div className='d-flex justify-content-between'>
        <h6 className='custom-text-yellow'>ORDER ID: {orders.user}</h6>
        <h6 className='custom-text-yellow'>
          R. DATE:{' '}
          <Moment format='YYYY-MM-DD HH:mm:ss'>
            {moment(orders.createdAt)}
          </Moment>
        </h6>
      </div>
      <div className='table-responsive '>
        <table className='table table-sm hover bordered striped caption-top custom-text-yellow'>
          <thead>
            <tr>
              <th>ITEMS</th>
              <th>QTY REQUESTED</th>
              <th>QTY ISSUED</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.orderItems.map((order) => (
                <tr key={order._id}>
                  <td>{order.item}</td>
                  <td>{order.quantityRequested}</td>
                  <td>{order.quantityIssued}</td>
                  <td>
                    {order.quantityIssued === 0 ? (
                      <FaTimesCircle className='text-danger' />
                    ) : (
                      <FaCheckCircle className='text-success' />
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    'Nothing'
  )
}

export default OrderInfoScreen
