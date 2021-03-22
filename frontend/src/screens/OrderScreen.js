import { useEffect, useState, useRef } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import OrderFormScreen from './OrderFormScreen'
import OrderListScreen from './OrderListScreen'
import { useSelector, useDispatch } from 'react-redux'
import { confirmAlert } from 'react-confirm-alert'
import { Confirm } from '../components/Confirm'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Pagination from '../components/Pagination'
import moment from 'moment'
import {
  getOrders as getOrdersSlice,
  addOrder as addOrderSlice,
  editOrder as editOrderSlice,
  deleteOrder as deleteOrderSlice,
  getOrderById as getOrderByIdSlice,
} from '../redux/orders/orderThunks'
import {
  resetEditOrderState,
  resetAddOrderState,
  resetDeleteOrderState,
  resetGetOrderState,
} from '../redux/orders/orderSlice'
import OrderInfoScreen from './OrderInfoScreen'
import { UnlockAccess } from '../components/UnlockAccess'

const OrderScreen = () => {
  const [inputFields, setInputFields] = useState([
    {
      item: '',
      quantityIssued: 0,
      quantityRequested: '',
      previousQuantity: 0,
      remarks: '',
      unit: '',
    },
  ])

  const [infoOrder, setInfoOrder] = useState({})
  const [edit, setEdit] = useState(false)
  const [id, setId] = useState(null)
  const [status, setStatus] = useState('Pending')

  const [department, setDepartment] = useState('')
  const [from, setFrom] = useState(moment(Date.now()).format('YYYY-MM-DD'))
  const date = new Date()
  const [to, setTo] = useState(
    moment(date.setDate(date.getDate() + 1)).format('YYYY-MM-DD')
  )

  const dispatch = useDispatch()
  const getOrders = useSelector((state) => state.getOrders)
  const { loadingGetOrders, errorGetOrders, orders } = getOrders

  const getOrderById = useSelector((state) => state.getOrderById)
  const {
    loadingGetOrderById,
    errorGetOrderById,
    orders: ordersById,
  } = getOrderById

  const addOrder = useSelector((state) => state.addOrder)
  const { loadingAddOrder, errorAddOrder, successAddOrder } = addOrder

  const deleteOrder = useSelector((state) => state.deleteOrder)
  const {
    loadingDeleteOrder,
    errorDeleteOrder,
    successDeleteOrder,
  } = deleteOrder

  const editOrder = useSelector((state) => state.editOrder)
  const { loadingEditOrder, errorEditOrder, successEditOrder } = editOrder

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const formCleanHandler = () => {
    setInputFields([
      {
        item: '',
        quantityIssued: 0,
        quantityRequested: '',
        previousQuantity: 0,
        remarks: '',
        unit: '',
      },
    ])
    setEdit(false)
  }

  // console.log(moment(Date.now()).format('YYYY-MM-DD'))

  useEffect(() => {
    if (
      errorAddOrder ||
      errorDeleteOrder ||
      errorEditOrder ||
      errorGetOrders ||
      successAddOrder ||
      successDeleteOrder ||
      successEditOrder
    ) {
      setTimeout(() => {
        dispatch(resetAddOrderState())
        dispatch(resetEditOrderState())
        dispatch(resetDeleteOrderState())
        dispatch(resetGetOrderState())
      }, 5000)
    }
  }, [
    errorAddOrder,
    errorDeleteOrder,
    errorEditOrder,
    errorGetOrders,
    successAddOrder,
    successDeleteOrder,
    successEditOrder,

    dispatch,
  ])

  useEffect(() => {
    UnlockAccess(['Admin', 'Store Keeper'])
      ? dispatch(getOrdersSlice())
      : dispatch(getOrderByIdSlice(userInfo._id))

    if (successAddOrder || successEditOrder) {
      formCleanHandler()
    }
  }, [
    dispatch,
    successAddOrder,
    successEditOrder,
    successDeleteOrder,
    userInfo._id,
  ])

  const deleteHandler = (order) => {
    confirmAlert(Confirm(() => dispatch(deleteOrderSlice(order))))
  }

  const infoHandler = (order) => {
    setInfoOrder(order)
  }

  const editHandler = (order) => {
    setInputFields(order.orderItems)
    setId(order._id)
    setEdit(true)
  }

  const handleAddField = () => {
    setInputFields([
      ...inputFields,
      {
        item: '',
        quantityIssued: 0,
        quantityRequested: '',
        previousQuantity: 0,
        remarks: '',
        unit: '',
      },
    ])
  }

  const handleRemoveField = (index) => {
    const list = [...inputFields]
    list.splice(index, 1)
    setInputFields(list)
  }

  const handleInputChange = (e, index) => {
    const { name, value } = e.target
    const old = inputFields[index]
    const updated = { ...old, [name]: value }
    var list = [...inputFields]
    list[index] = updated
    setInputFields(list)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    edit
      ? UnlockAccess(['Admin', 'Store Keeper'])
        ? dispatch(editOrderSlice({ inputFields, id, status: 'Approved' }))
        : dispatch(editOrderSlice({ inputFields, id, status }))
      : dispatch(addOrderSlice({ inputFields, status }))
  }

  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 20
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  const totalFilteredOrders =
    orders &&
    orders.filter(
      (ord) =>
        ord.createdAt >= from &&
        ord.createdAt <= to &&
        ord.user.name.toLowerCase().includes(department.toLowerCase())
    )

  const totalFilteredOrderById =
    ordersById &&
    ordersById.filter(
      (ord) =>
        ord.createdAt >= from &&
        ord.createdAt <= to &&
        ord.user.name.toLowerCase().includes(department.toLowerCase())
    )

  const currentItemsOrders =
    totalFilteredOrders &&
    totalFilteredOrders.slice(indexOfFirstItem, indexOfLastItem)
  const totalItemsOrders =
    totalFilteredOrders && Math.ceil(totalFilteredOrders.length / itemsPerPage)

  const currentItemsOrderById =
    totalFilteredOrderById &&
    totalFilteredOrderById.slice(indexOfFirstItem, indexOfLastItem)
  const totalItemsOrderById =
    totalFilteredOrderById &&
    Math.ceil(totalFilteredOrderById.length / itemsPerPage)

  return (
    <>
      <div
        className='modal fade'
        id='orderModel'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='orderModelLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-xl modal-lg '>
          <div className='modal-content modal-background'>
            <div className='modal-header'>
              <h3
                className='modal-title custom-text-yellow'
                id='orderModelLabel'
              >
                {edit ? 'Edit Order' : 'Request New Order'}
              </h3>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={formCleanHandler}
              ></button>
            </div>
            <div className='modal-body'>
              <OrderFormScreen
                handleSubmit={handleSubmit}
                handleInputChange={handleInputChange}
                handleAddField={handleAddField}
                handleRemoveField={handleRemoveField}
                inputFields={inputFields}
                formCleanHandler={formCleanHandler}
                edit={edit}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className='modal fade'
        id='orderInfoModel'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='orderInfoModelLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-xl modal-lg '>
          <div className='modal-content modal-background'>
            <div className='modal-header'>
              <h3
                className='modal-title custom-text-yellow'
                id='orderInfoModelLabel'
              >
                Order Info
              </h3>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={formCleanHandler}
              ></button>
            </div>
            <div className='modal-body'>
              <OrderInfoScreen orders={infoOrder} />
            </div>
          </div>
        </div>
      </div>

      {errorGetOrders && <Message variant='danger'>{errorGetOrders}</Message>}
      {errorGetOrderById && (
        <Message variant='danger'>{errorGetOrderById}</Message>
      )}
      {errorAddOrder && <Message variant='danger'>{errorAddOrder}</Message>}
      {errorEditOrder && <Message variant='danger'>{errorEditOrder}</Message>}
      {errorDeleteOrder && (
        <Message variant='danger'>{errorDeleteOrder}</Message>
      )}

      {successAddOrder && (
        <Message variant='success'>
          Order has been requested successfully.
        </Message>
      )}
      {successEditOrder && (
        <Message variant='success'>
          Order has been updated successfully.
        </Message>
      )}
      {successDeleteOrder && (
        <Message variant='success'>
          Order has been deleted successfully.
        </Message>
      )}

      <FaPlusCircle
        data-bs-toggle='modal'
        data-bs-target='#orderModel'
        className='fs-1 p-1 shadow rounded-pill float-end'
        style={{ cursor: 'pointer' }}
      />
      <div className='row mb-4'>
        <div className='col-4'>
          <input
            type='text'
            className='form-control'
            placeholder='Enter department'
            onChange={(e) => setDepartment(e.target.value)}
            name='department'
            value={department}
          />
        </div>
        <div className='col-4'>
          <input
            onChange={(e) => setFrom(e.target.value)}
            name='from'
            value={from}
            type='date'
            className='form-control'
          />
        </div>
        <div className='col-4'>
          <input
            onChange={(e) => setTo(e.target.value)}
            name='to'
            value={to}
            type='date'
            className='form-control'
          />
        </div>
      </div>

      {loadingGetOrders ||
      loadingGetOrderById ||
      loadingAddOrder ||
      loadingDeleteOrder ||
      loadingEditOrder ? (
        <Loader />
      ) : (
        <>
          <OrderListScreen
            orders={
              UnlockAccess(['Admin', 'Store Keeper'])
                ? currentItemsOrders
                : currentItemsOrderById
            }
            deleteHandler={deleteHandler}
            editHandler={editHandler}
            infoHandler={infoHandler}
            userInfo={userInfo}
          />
          <div className='d-flex justify-content-center'>
            <Pagination
              setCurrentPage={setCurrentPage}
              totalItems={
                UnlockAccess(['Admin', 'Store Keeper'])
                  ? totalItemsOrders
                  : totalItemsOrderById
              }
              arrayLength={
                UnlockAccess(['Admin', 'Store Keeper'])
                  ? orders && orders.length
                  : ordersById && ordersById.length
              }
              itemsPerPage={itemsPerPage}
            />
          </div>
        </>
      )}
    </>
  )
}

export default OrderScreen
