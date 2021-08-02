import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
// import LoginForm from './LoginForm';
import CreateNewBugForm from '../CreateNewBugForm/CreateNewBugForm'

function CreateNewBugFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Add Bug</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateNewBugForm showFunc={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default CreateNewBugFormModal;
