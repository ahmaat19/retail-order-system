import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

// header configuration
const configHeader = (getState) => {
  const {
    userLogin: { userInfo },
  } = getState()

  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  }
}

// get all orders
export const getOrders = createAsyncThunk(
  'getOrders',
  async (_, { getState }) => {
    const config = configHeader(getState)
    try {
      const { data } = await axios.get(`/api/orders`, config)
      return data
    } catch (error) {
      throw error.response.data
    }
  }
)

// add new order
export const addOrder = createAsyncThunk(
  'addOrder',
  async (order, { getState }) => {
    const config = configHeader(getState)
    try {
      const { data } = await axios.post(`/api/orders`, order, config)
      return data
    } catch (error) {
      throw error.response.data
    }
  }
)

// edit order
export const editOrder = createAsyncThunk(
  'editOrder',
  async (order, { getState }) => {
    const config = configHeader(getState)
    try {
      const { data } = await axios.put(`/api/orders/${order.id}`, order, config)
      return data
    } catch (error) {
      throw error.response.data
    }
  }
)

// delete order
export const deleteOrder = createAsyncThunk(
  'deleteOrder',
  async (order, { getState }) => {
    const config = configHeader(getState)
    try {
      const { data } = await axios.delete(`/api/orders/${order._id}`, config)
      return data
    } catch (error) {
      throw error.response.data
    }
  }
)

// get order by ID
export const getOrderById = createAsyncThunk(
  'getOrderById',
  async (id, { getState }) => {
    const config = configHeader(getState)
    try {
      const { data } = await axios.get(`/api/orders/${id}`, config)
      return data
    } catch (error) {
      throw error.response.data
    }
  }
)
