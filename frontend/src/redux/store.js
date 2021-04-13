import { configureStore } from '@reduxjs/toolkit'
import {
  userLoginSliceReducer,
  listUserSliceReducer,
  updateUserProfileSliceReducer,
  registerUserSliceReducer,
  deleteUserSliceReducer,
  getUserLogHistorySliceReducer,
  getUserDetailsSliceReducer,
  updateUserSliceReducer,
  forgotPasswordSliceReducer,
  resetPasswordSliceReducer,
} from './users/usersSlice'

import {
  deleteOrderSliceReducer,
  addOrderSliceReducer,
  editOrderSliceReducer,
  getOrdersSliceReducer,
  getOrderByIdSliceReducer,
  getOrderDetailsSliceReducer,
} from './orders/orderSlice'

export default configureStore({
  reducer: {
    userLogin: userLoginSliceReducer,
    userLogHistory: getUserLogHistorySliceReducer,
    userDetails: getUserDetailsSliceReducer,
    userUpdateProfile: updateUserProfileSliceReducer,
    userRegister: registerUserSliceReducer,
    userList: listUserSliceReducer,
    userDelete: deleteUserSliceReducer,
    userUpdate: updateUserSliceReducer,
    userForgotPassword: forgotPasswordSliceReducer,
    userResetPassword: resetPasswordSliceReducer,

    deleteOrder: deleteOrderSliceReducer,
    addOrder: addOrderSliceReducer,
    editOrder: editOrderSliceReducer,
    getOrders: getOrdersSliceReducer,
    getOrderById: getOrderByIdSliceReducer,
    getOrderDetails: getOrderDetailsSliceReducer,
  },
})
