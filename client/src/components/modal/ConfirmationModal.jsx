import React from 'react'

export default function ConfirmationModal({ showModal, setShowModal, message, action }) {
  return (
    <>
      {showModal && (
        <div className="modal fade show" tabIndex="-1" aria-labelledby="exampleModalLabel" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Attention!</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {message}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>No</button>
                <button type="button" className="btn btn-primary" onClick={action}>Yes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
