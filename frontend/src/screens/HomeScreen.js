import { useEffect, useState } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import OrderFormScreen from './OrderFormScreen'
import OrderListScreen from './OrderListScreen'
import { useSelector, useDispatch } from 'react-redux'
import { confirmAlert } from 'react-confirm-alert'
import { Confirm } from '../components/Confirm'
import Message from '../components/Message'
import Loader from '../components/Loader'

import {
  getOrders as getOrdersSlice,
  addOrder as addOrderSlice,
  editOrder as editOrderSlice,
  deleteOrder as deleteOrderSlice,
  getOrderById as getOrderByIdSlice,
} from '../redux/orders/orderThunks'

const HomeScreen = () => {
  const [inputFields, setInputFields] = useState([
    {
      item: '',
      unit: '',
      quantityRequested: '',
      remarks: '',
    },
  ])
  const [edit, setEdit] = useState(false)
  const [id, setId] = useState(null)

  const dispatch = useDispatch()
  const getOrders = useSelector((state) => state.getOrders)
  const { loadingGetOrders, errorGetOrders, orders } = getOrders

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

  const formCleanHandler = () => {
    setInputFields([
      {
        item: '',
        unit: '',
        quantityRequested: '',
        remarks: '',
      },
    ])
    setEdit(false)
  }

  useEffect(() => {
    userInfo.roles.includes('Admin')
      ? dispatch(getOrdersSlice())
      : dispatch(getOrderByIdSlice({ id: userInfo._id }))
    if (successAddOrder || successEditOrder) {
      formCleanHandler()
    }
  }, [dispatch, successAddOrder, successEditOrder, successDeleteOrder])

  const deleteHandler = (order) => {
    confirmAlert(Confirm(() => dispatch(deleteOrderSlice(order))))
  }

  const editHandler = (order) => {
    setInputFields(order.orderItems)
    setId(order._id)
    setEdit(true)
  }

  const handleAddField = () => {
    setInputFields([...inputFields, { firstName: '', lastName: '' }])
  }

  const handleRemoveField = (index) => {
    const allOldInputFields = [...inputFields]
    allOldInputFields.splice(index, 1)
    setInputFields(allOldInputFields)
  }

  const handleInputChange = (e, index) => {
    const { name, value } = e.target

    const allOldInputFields = [...inputFields]
    allOldInputFields[index][name] = value

    setInputFields(allOldInputFields)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    edit
      ? dispatch(editOrderSlice({ inputFields, id }))
      : dispatch(addOrderSlice({ inputFields }))
  }

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

      {errorGetOrders && <Message variant='danger'>{errorGetOrders}</Message>}
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

      {loadingGetOrders ||
      loadingAddOrder ||
      loadingDeleteOrder ||
      loadingEditOrder ? (
        <Loader />
      ) : (
        <OrderListScreen
          orders={orders}
          deleteHandler={deleteHandler}
          editHandler={editHandler}
        />
      )}
    </>
  )
}

export default HomeScreen
