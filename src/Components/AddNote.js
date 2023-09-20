import React, { useContext, useState } from 'react';
import noteContext from '../Context/Notes/NotesContext';


function AddNote(props) {
    const context = useContext(noteContext);
    const { addnote,editnote,editBtnFunc,setEditBtnFunc,note,setNote,setAlertsMessageFunc} = context;


    const handleAddNode = () => {

        const allSelection =  document.getElementsByClassName('form-control');
        for(let i = 0 ; i < allSelection.length ; i++){
            allSelection[i].value = "";
        }
        addnote(note);
        
    }

    const handleOnChnage = (e) => {
        setNote({...note , [e.target.name] : e.target.value});
        // console.log(note);
    }

    return (
        <div>
            <div className="container my-3">
                <h1>{props.heading}</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label"  >Title</label>
                        <input type="text" className="form-control" id='title' name='title' onChange={handleOnChnage} minLength={3} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" onChange={handleOnChnage} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" onChange={handleOnChnage} />
                    </div>
                    <button disabled={!(note.title) || !(note.description) || (note.title && note.title.length < 3)   || (note.description && note.description.length < 5)} type='button' className={`btn btn-primary ${(!props.setAddBtn)?"d-none":""}`} onClick={handleAddNode}>Add Note</button>
                </form>
            </div>
        </div>
    );
}

export default AddNote;
