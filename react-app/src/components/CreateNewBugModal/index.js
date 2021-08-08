import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
// import LoginForm from './LoginForm';
import CreateNewBugForm from '../CreateNewBugForm/CreateNewBugForm'

function CreateNewBugFormModal({ addBug }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="new_bug_button" onClick={() => setShowModal(true)}><i className="fas fa-bug"></i></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateNewBugForm showFunc={setShowModal} makeBug={addBug} />
        </Modal>
      )}
    </>
  );
}

export default CreateNewBugFormModal;
