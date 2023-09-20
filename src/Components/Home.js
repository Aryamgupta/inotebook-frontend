import React, { useContext,useEffect } from 'react';
import noteContext from '../Context/Notes/NotesContext';
import Notes from './Notes';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes } = context;
  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate('/login');
      // console.log('this is working');
    }
}, [])

  return (
    <div className="">
        <AddNote className="primary" heading="Add Note" setAddBtn={true} />
        <div className={`container my-3 ${(notes.length === 0) ? "d-none" : ""}`}>
          <h1>Your Notes</h1>
      </div>
      {localStorage.getItem('token') && <Notes/>}

    </div>

  )


}

export default Home;
