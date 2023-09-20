import React, { useContext } from 'react';
import noteContext from '../Context/Notes/NotesContext';

function NoteItem(props) {
    const context = useContext(noteContext);
    const { addnote, deletenote, editnote,setShow, setIdToBeDeleted} = context;
    // console.log(context);
    const handleOnEdit = (note) => {
        setIdToBeDeleted(note._id);
        setShow(true);
    }
    const { note } = props;
    return (
        <div className='col-md-3 my-3'>
            <div className="card">
                <div className="card-body">
                    <div className="d-flex">
                        <h5 className="card-title">{note.title}</h5>
                        <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-primary">
                            {note.tag}</span>
                        <i className="i fa-solid fa-trash " onClick={() => {deletenote(note._id)}}></i>
                        <i className="i fa-solid fa-pen mx-3" onClick={() => {handleOnEdit(note)}} ></i>

                    </div>
                    <p className="card-text">{note.description}</p>



                </div>
            </div>
        </div>
    );
}

export default NoteItem;
