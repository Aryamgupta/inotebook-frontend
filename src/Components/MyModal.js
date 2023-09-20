import { useState ,useRef, useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import nodeContext from '../Context/Notes/NotesContext';
import AddNote from './AddNote';

function MyModal(props) {
  const {show,setShow,editnote,idToBeDeleted,note,setAlertsMessageFunc} = useContext(nodeContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleOnEdit = () =>{
    handleClose();
    if((note.title && note.title.length < 3) ||(note.description && note.description.length < 5)){
        setAlertsMessageFunc("Small Entries" , "danger");
        return;
    }
    editnote(idToBeDeleted,note.title,note.description,note.tag);
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <AddNote  setAddBtn = {false}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleOnEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MyModal;