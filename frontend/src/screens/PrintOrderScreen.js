import { useEffect, useRef } from 'react'
import { getOrderDetails as getOrderDetailsSlice } from '../redux/orders/orderThunks'
import { useSelector, useDispatch } from 'react-redux'
import Moment from 'react-moment'
import moment from 'moment'

import logo from './logo.png'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useReactToPrint } from 'react-to-print'
import { FaCheckCircle, FaPrint, FaTimesCircle } from 'react-icons/fa'

const PrintOrderScreen = ({ match }) => {
  const orderId = match.params.id

  const dispatch = useDispatch()
  const getOrderDetails = useSelector((state) => state.getOrderDetails)
  const {
    loadingGetOrderDetails,
    errorGetOrderDetails,
    order,
    successGetOrderDetails,
  } = getOrderDetails

  useEffect(() => {
    dispatch(getOrderDetailsSlice(orderId))
  }, [dispatch, orderId])

  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Order Request Report',
    pageStyle: `size: 302.36px 188.98px`,
  })

  return loadingGetOrderDetails || !successGetOrderDetails ? (
    <Loader />
  ) : (
    <>
      {errorGetOrderDetails && (
        <Message variant='danger'>{errorGetOrderDetails} </Message>
      )}

      <div ref={componentRef} className='text-center '>
        <img
          className='img-fluid'
          src={logo}
          alt='logo'
          style={{ maxWidth: '100px' }}
        />
        <h3 className='text-light mb-4'>Order Details</h3>
        <div className='row gy-3  '>
          <div className='col-6 '>
            <span className='fw-bold'>Order ID.: </span> {order._id}
          </div>
          <div className='col-6 '>
            <span className='fw-bold'>Date: </span>{' '}
            <Moment format='YYYY-MM-DD HH:mm:ss'>
              {moment(order.createdAt)}
            </Moment>
          </div>
          <div className='col-6 '>
            <span className='fw-bold'>Department: </span>
            {order.user && order.user.name}
          </div>
          <div className='col-6 '>
            <span className='fw-bold'>Printed Date: </span>{' '}
            <Moment format='YYYY-MM-DD HH:mm:ss'>{moment(Date.now())}</Moment>
          </div>
        </div>
        <hr />

        <div className='table-responsive'>
          <table className='table table-sm hover bordered striped caption-top custom-text-yellows text-info'>
            <thead>
              <tr>
                <th>ITEM</th>
                <th>REQUESTED QTY</th>
                <th>PREVIOUS QTY</th>
                <th>ISSUED QTY</th>
                <th>REMAINING QTY</th>
                <th>STATUS</th>
                <th>REMARKS</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems.map((ord) => (
                <tr key={ord._id}>
                  <td>{ord.item}</td>
                  <td>{ord.quantityRequested}</td>
                  <td>{ord.previousQuantity}</td>
                  <td>{ord.quantityIssued}</td>
                  <td>{ord.quantityRequested - ord.quantityIssued}</td>
                  <td>
                    {ord.quantityIssued === 0 ? (
                      <FaTimesCircle className='text-danger' />
                    ) : (
                      <FaCheckCircle className='text-success' />
                    )}
                  </td>
                  <td>{ord.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button onClick={handlePrint} className='btn btn-info btn-sm float-end'>
        <FaPrint className='mb-1' /> Print
      </button>
    </>
  )
}

export default PrintOrderScreen
