import { createSlice } from '@reduxjs/toolkit'

import {
  getOrders,
  addOrder,
  editOrder,
  deleteOrder,
  getOrderById,
  getOrderDetails,
} from './orderThunks'

// get all orders
const getOrdersSlice = createSlice({
  name: 'getOrders',
  initialState: {},
  reducers: {
    resetGetOrderState: (state) => {
      state.loadingGetOrder = false
      state.successGetOrder = false
      state.errorGetOrder = null
    },
  },
  extraReducers: {
    [getOrders.pending]: (state) => {
      state.loadingGetOrders = true
    },
    [getOrders.fulfilled]: (state, { payload }) => {
      state.loadingGetOrders = false
      state.successGetOrders = true
      state.orders = payload
    },
    [getOrders.rejected]: (state, { error }) => {
      state.loadingGetOrders = false
      state.errorOrders = error.message
    },
  },
})

// add new order
const addOrderSlice = createSlice({
  name: 'addOrder',
  initialState: {},
  reducers: {
    resetAddOrderState: (state) => {
      state.loadingAddOrder = false
      state.successAddOrder = false
      state.errorAddOrder = null
    },
  },
  extraReducers: {
    [addOrder.pending]: (state) => {
      state.loadingAddOrder = true
    },
    [addOrder.fulfilled]: (state, { payload }) => {
      state.loadingAddOrder = false
      state.successAddOrder = true
      state.order = payload
    },
    [addOrder.rejected]: (state, { error }) => {
      state.loadingAddOrder = false
      state.errorAddOrder = error.message
    },
  },
})

// edit order
const editOrderSlice = createSlice({
  name: 'editOrder',
  reducers: {
    resetEditOrderState: (state) => {
      state.loadingEditOrder = false
      state.successEditOrder = false
      state.errorEditOrder = null
    },
  },
  initialState: {},
  extraReducers: {
    [editOrder.pending]: (state) => {
      state.loadingEditOrder = true
    },
    [editOrder.fulfilled]: (state, { payload }) => {
      state.loadingEditOrder = false
      state.successEditOrder = true
      state.order = payload
    },
    [editOrder.rejected]: (state, { error }) => {
      state.loadingEditOrder = false
      state.errorEditOrder = error.message
    },
  },
})

// delete order
const deleteOrderSlice = createSlice({
  name: 'deleteOrder',
  initialState: {},
  reducers: {
    resetDeleteOrderState: (state) => {
      state.loadingDeleteOrder = false
      state.successDeleteOrder = false
      state.errorDeleteOrder = null
    },
  },
  extraReducers: {
    [deleteOrder.pending]: (state) => {
      state.loadingDeleteOrder = true
    },
    [deleteOrder.fulfilled]: (state, { payload }) => {
      state.loadingDeleteOrder = false
      state.successDeleteOrder = true
      state.order = payload
    },
    [deleteOrder.rejected]: (state, { error }) => {
      state.loadingDeleteOrder = false
      state.errorDeleteOrder = error.message
    },
  },
})

// get order by id
const getOrderByIdSlice = createSlice({
  name: 'getOrderById',
  initialState: {},
  reducers: {
    resetGetOrderByIdState: (state) => {
      state.loadingGetOrder = false
      state.successGetOrder = false
      state.errorGetOrder = null
    },
  },
  extraReducers: {
    [getOrderById.pending]: (state) => {
      state.loadingGetOrderById = true
    },
    [getOrderById.fulfilled]: (state, { payload }) => {
      state.loadingGetOrderById = false
      state.successGetOrderById = true
      state.orders = payload
    },
    [getOrderById.rejected]: (state, { error }) => {
      state.loadingGetOrderById = false
      state.errorOrders = error.message
    },
  },
})

// get order details
const getOrderDetailsSlice = createSlice({
  name: 'getOrderDetails',
  initialState: {},
  reducers: {
    resetGetOrderDetailsState: (state) => {
      state.loadingGetOrder = false
      state.successGetOrder = false
      state.errorGetOrder = null
    },
  },
  extraReducers: {
    [getOrderDetails.pending]: (state) => {
      state.loadingGetOrderDetails = true
    },
    [getOrderDetails.fulfilled]: (state, { payload }) => {
      state.loadingGetOrderDetails = false
      state.successGetOrderDetails = true
      state.order = payload
    },
    [getOrderDetails.rejected]: (state, { error }) => {
      state.loadingGetOrderDetails = false
      state.errorOrders = error.message
    },
  },
})

export const deleteOrderSliceReducer = deleteOrderSlice.reducer
export const editOrderSliceReducer = editOrderSlice.reducer
export const addOrderSliceReducer = addOrderSlice.reducer
export const getOrdersSliceReducer = getOrdersSlice.reducer
export const getOrderByIdSliceReducer = getOrderByIdSlice.reducer
export const getOrderDetailsSliceReducer = getOrderDetailsSlice.reducer

export const { resetEditOrderState } = editOrderSlice.actions
export const { resetAddOrderState } = addOrderSlice.actions
export const { resetGetOrderState } = getOrdersSlice.actions
export const { resetDeleteOrderState } = deleteOrderSlice.actions
export const { resetGetOrderByIdState } = getOrderByIdSlice.actions
export const { resetGetOrderDetailsState } = getOrderDetailsSlice.actions
