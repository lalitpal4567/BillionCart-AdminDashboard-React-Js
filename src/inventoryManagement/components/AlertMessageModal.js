import React from 'react'

const AlertMessageModal = ({show, onClose}) => {
    if(!show) return;
    return (
        <div className="modal d-flex justify-content-center align-items-center" tabindex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <p>Please ensure all files are 10 MB or smaller.</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={onClose}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AlertMessageModal
