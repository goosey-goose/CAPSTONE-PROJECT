import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
// import LoginForm from './LoginForm';
// import CreateNewBugForm from '../CreateNewBugForm/CreateNewBugForm'
import CreateNewGroupForm from '../CreateNewGroupForm/CreateNewGroupForm';

function CreateNewGroupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="new_group_button" onClick={() => setShowModal(true)}><i className="fas fa-users"></i></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateNewGroupForm showFunc={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default CreateNewGroupFormModal;
