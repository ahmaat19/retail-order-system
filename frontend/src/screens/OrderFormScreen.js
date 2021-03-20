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
        <div key={index} className='row g-0'>
          <div className='col-sm-10 col-12'>
            <div className='row g-0'>
              <div
                className={`${
                  UnlockAccess(['Admin', 'Store Keeper']) ? 'col-3' : 'col-5'
                }`}
              >
                <input
                  autoFocus
                  type='text'
                  className='form-control border border-success shadow-none '
                  placeholder='Item'
                  name='item'
                  value={inputField.item}
                  required
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
              <div className='col-2'>
                <input
                  type='text'
                  className='form-control border border-success shadow-none '
                  placeholder='Unit'
                  name='unit'
                  value={inputField.unit}
                  required
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
              <div className='col-2'>
                <input
                  type='number'
                  min='0'
                  className='form-control border border-success shadow-none '
                  placeholder='Qty'
                  name='quantityRequested'
                  value={inputField.quantityRequested}
                  required
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>

              {UnlockAccess(['Admin', 'Store Keeper']) && (
                <div className='col-2'>
                  <input
                    type='number'
                    min='0'
                    max={inputField.quantityRequested}
                    className='form-control border border-success shadow-none '
                    placeholder='Issued'
                    name='quantityIssued'
                    value={inputField.quantityIssued}
                    required
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </div>
              )}
              <div className='col-3'>
                <input
                  type='text'
                  className='form-control border border-success shadow-none '
                  placeholder='Remarks'
                  name='remarks'
                  value={inputField.remarks}
                  required
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
            </div>
          </div>

          <div className='col-sm-2 col-12'>
            <div className='btn-group p-0 m-0'>
              {inputFields.length > 1 && (
                <button
                  onClick={() => handleRemoveField(index)}
                  type='button'
                  className='btn btn-danger custom-bg-dark'
                >
                  <FaTimesCircle className='text-danger' />
                </button>
              )}

              {inputFields.length - 1 === index && (
                <button
                  onClick={() => handleAddField()}
                  type='button'
                  className='btn btn-primary custom-bg-dark'
                >
                  <FaPlusCircle />
                </button>
              )}
            </div>
          </div>
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
