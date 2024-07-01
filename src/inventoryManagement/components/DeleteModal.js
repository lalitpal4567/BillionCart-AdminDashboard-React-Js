import React from 'react'

const DeleteModal = ({ show, onClose, onConfirm }) => {
    if (!show) return null;
    return (
        <div className="modal d-flex justify-content-center align-items-center" tabindex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <p>Are you sure you want to delete it?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={onConfirm}>Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal
