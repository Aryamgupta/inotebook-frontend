import React, { useContext, useEffect, useRef } from 'react';
import noteContext from '../Context/Notes/NotesContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import MyModal from './MyModal';
import { useNavigate } from 'react-router-dom';

function Notes() {
    const navigaet = useNavigate();

    const context = useContext(noteContext);
    const { notes, getAllNotes } = context;
    useEffect(() => {
            getAllNotes();        
    }, [])

    return (
        <>
            <MyModal />
            <div className='row'>
                {notes.length == 0 && <div className='container mx-4'>No Notes To Display</div>}
                {notes.map((note) => {
                    // console.log("set ho gya");
                    return <NoteItem key={note._id} note={note} />
                })}
            </div>
        </>
    );
}

export default Notes;
