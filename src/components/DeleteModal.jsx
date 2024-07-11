/* eslint-disable no-unused-vars */
import React from 'react';
import '../styles/deleteModal.css';
import CloseIcon from "../assets/images/closeIcon.svg";

const DeleteModal = ({ taskId, handleDelete, closeModal }) => {

    return (
        <div className="deleteModal">
            <div className="deleteHead">
                <img src={CloseIcon} alt="Cross" onClick={closeModal} />
            </div>
            <div className="deleteBody">
                <span>Delete Task?</span>
                <p>Are you sure you want to delete this task?</p>
            </div>
            <div className="buttonGroup">
                <button className="cancelBtn" onClick={closeModal}>Close</button>
                <button className="deleteBtn" onClick={() => handleDelete(taskId)}>Delete</button>
            </div>
        </div>
    );
};

export default DeleteModal;
