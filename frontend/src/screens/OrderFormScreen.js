import React from 'react'
import { FaPlusCircle, FaTimesCircle } from 'react-icons/fa'
import { UnlockAccess } from '../components/UnlockAccess'

const OrderFormScreen = ({
  formCleanHandler,
  handleSubmit,
  handleAddField,
  handleInputChange,
  handleRemoveField,
  inputFields,
  edit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {inputFields.map((inputField, index) => (
        <div key={index}>
          <div className='row '>
            <div
              className={`${
                UnlockAccess(['Admin', 'Store Keeper']) ? 'col-4' : 'col-5'
              }`}
            >
              <div className='mb-3'>
                <label htmlFor='item' className='form-label'>
                  Item
                </label>
                <input
                  autoFocus
                  type='text'
                  className='form-control border border-success shadow-none '
                  placeholder='Item'
                  name='item'
                  id='item'
                  value={inputField.item}
                  required
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
            </div>

            <div className='col-2'>
              <div className='mb-3'>
                <label htmlFor='quantityRequested' className='form-label'>
                  Requested QTY
                </label>
                <input
                  type='number'
                  min='0'
                  max={inputField.quantityRequested}
                  className='form-control border border-success shadow-none '
                  placeholder='Requested'
                  name='quantityRequested'
                  id='quantityRequested'
                  value={inputField.quantityRequested}
                  required
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
            </div>

            <div className='col-2'>
              <div className='mb-3'>
                <label htmlFor='unit' className='form-label'>
                  Unit
                </label>
                <select
                  name='unit'
                  className='form-control border border-success shadow-none '
                  id='unit'
                  value={inputField.unit}
                  required
                  onChange={(e) => handleInputChange(e, index)}
                >
                  <option value=''>-----</option>
                  <option value='box'>box</option>
                  <option value='pcs'>pcs</option>
                </select>
              </div>
            </div>

            <div className='col-2'>
              <div className='mb-3'>
                <label htmlFor='previousQuantity' className='form-label'>
                  Previous QTY
                </label>
                <input
                  type='number'
                  min='0'
                  className='form-control border border-success shadow-none '
                  placeholder='Previous Qty'
                  name='previousQuantity'
                  id='previousQuantity'
                  value={inputField.previousQuantity}
                  required
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
            </div>
            {UnlockAccess(['Admin', 'Store Keeper']) && (
              <div className='col-2'>
                <div className='mb-3'>
                  <label htmlFor='quantityIssued' className='form-label'>
                    Issued QTY
                  </label>
                  <input
                    type='number'
                    min='0'
                    max={inputField.quantityRequested}
                    className='form-control border border-success shadow-none '
                    placeholder='Issued'
                    name='quantityIssued'
                    id='quantityIssued'
                    value={inputField.quantityIssued}
                    required
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </div>
              </div>
            )}
            <div className='col-9'>
              <div className='mb-3'>
                <label htmlFor='remarks' className='form-label'>
                  Remarks
                </label>
                <input
                  type='text'
                  className='form-control border border-success shadow-none '
                  placeholder='Remarks'
                  name='remarks'
                  id='remarks'
                  value={inputField.remarks}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
            </div>
            <div className='col-3'>
              <div className='mb-3'>
                <label className='form-label'>Actions</label> <br />
                <div className='btn-group'>
                  {inputFields.length > 1 && (
                    <button
                      onClick={() => handleRemoveField(index)}
                      type='button'
                      className='btn btn-danger custom-bg-dark'
                    >
                      <FaTimesCircle className='text-danger mb-1' /> REMOVE
                    </button>
                  )}

                  {inputFields.length - 1 === index && (
                    <button
                      onClick={() => handleAddField()}
                      type='button'
                      className='btn btn-primary custom-bg-dark'
                    >
                      <FaPlusCircle className='mb-1' /> ADD
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
      ))}

      <div className='modal-footer'>
        <button
          type='button'
          className='btn btn-secondary btn-sm'
          data-bs-dismiss='modal'
          onClick={formCleanHandler}
        >
          Close
        </button>
        <button type='submit' className='btn btn-light btn-sm'>
          {edit ? 'Update' : 'Order'}
        </button>
      </div>
    </form>
  )
}

export default OrderFormScreen
