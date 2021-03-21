import Moment from 'react-moment'
import moment from 'moment'

import {
  FaCheckCircle,
  FaEdit,
  FaInfoCircle,
  FaTimesCircle,
  FaTrash,
} from 'react-icons/fa'
import { UnlockAccess } from '../components/UnlockAccess'
import { Link } from 'react-router-dom'

const OrderListScreen = ({
  orders,
  deleteHandler,
  editHandler,
  infoHandler,
  handlePrint,
}) => {
  return (
    <div className='table-responsive '>
      <table className='table table-sm hover bordered striped caption-top custom-text-yellow'>
        <thead>
          <tr>
            <th>REQUESTED BY</th>
            <th>REQUEST DATE</th>
            <th>REQUEST TIME</th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => (
              <tr key={order._id}>
                <th>{order.user && order.user.name}</th>
                <td>
                  <Moment format='YYYY-MM-DD'>{moment(order.createdAt)}</Moment>
                </td>
                <td>
                  <Moment format='HH:mm:ss'>{moment(order.createdAt)}</Moment>
                </td>
                <th>
                  {order.status === 'Approved' ? (
                    <FaCheckCircle className='text-success' />
                  ) : (
                    <FaTimesCircle className='text-danger' />
                  )}
                </th>
                <th>
                  {/* <button
                    onClick={() => infoHandler(order)}
                    className='btn btn-info btn-sm'
                    data-bs-toggle='modal'
                    data-bs-target='#orderInfoModel'
                  >
                    <FaInfoCircle className='mb-1' /> Info
                  </button> */}
                  {UnlockAccess(['User']) && order.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => editHandler(order)}
                        data-bs-toggle='modal'
                        data-bs-target='#orderModel'
                        className='btn btn-success btn-sm mx-1'
                      >
                        <FaEdit className='mb-1' /> Edit
                      </button>
                      <button
                        onClick={() => deleteHandler(order)}
                        className='btn btn-danger btn-sm'
                      >
                        <FaTrash className='mb-1' /> Delete
                      </button>
                    </>
                  )}

                  {!UnlockAccess(['User']) && (
                    <>
                      <button
                        onClick={() => editHandler(order)}
                        data-bs-toggle='modal'
                        data-bs-target='#orderModel'
                        className='btn btn-success btn-sm mx-1'
                      >
                        <FaEdit className='mb-1' /> Edit
                      </button>
                      <button
                        onClick={() => deleteHandler(order)}
                        className='btn btn-danger btn-sm mr-1'
                      >
                        <FaTrash className='mb-1' /> Delete
                      </button>
                    </>
                  )}
                  <Link
                    to={`/order/${order._id}`}
                    className='btn btn-info btn-sm'
                  >
                    <FaInfoCircle className='mb-1' /> Details
                  </Link>
                </th>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrderListScreen
