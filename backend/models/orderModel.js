import mongoose from 'mongoose'

const orderScheme = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderItems: [
      {
        item: {
          type: String,
          required: true,
        },
        unit: {
          type: String,
          required: true,
        },
        quantityRequested: {
          type: Number,
          required: true,
        },
        quantityIssued: {
          type: Number,
          required: true,
          default: 0,
        },

        remarks: {
          type: String,
        },
      },
    ],
    status: {
      type: String,
      require: true,
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
)

const OrderModel = mongoose.model('Order', orderScheme)
export default OrderModel
