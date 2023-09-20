import React, { useState } from "react";
import OtherContext from "./OthersContext";
import nodeContext from "./NotesContext";

const OthersState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // fetch all notes

  

  const getAllNotes = async () => {
    const response = await fetch(`${host}/api/notes/getallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwN2VlNDk2MWNmZGZmZWQxZDk1OTlhIiwibmFtZSI6ImFyeWFtIn0sImlhdCI6MTY5NTAxODU2OX0.eVEWiQCLYnChLnpPFsulLGk0wpPX7CCdZLa1JhOErZM"
      }
    });
    const json = await response.json();
    // console.log(json.notes);
    setNotes(json.notes);
    // console.log(notes);
  }


  // add a note
  const addnote = async ({ title, description, tag }) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwN2VlNDk2MWNmZGZmZWQxZDk1OTlhIiwibmFtZSI6ImFyeWFtIn0sImlhdCI6MTY5NTAxODU2OX0.eVEWiQCLYnChLnpPFsulLGk0wpPX7CCdZLa1JhOErZM"
      },
      body: JSON.stringify({ title, description, tag }),
    });

    let note = await response.json().then((result) => { return result });

    setNotes(notes.concat(note));
  }


  // delete a note
  const deletenote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwN2VlNDk2MWNmZGZmZWQxZDk1OTlhIiwibmFtZSI6ImFyeWFtIn0sImlhdCI6MTY5NTAxODU2OX0.eVEWiQCLYnChLnpPFsulLGk0wpPX7CCdZLa1JhOErZM"
      }
    });

    const newNotes = notes.filter((note) => { return (note._id !== id) });
    setNotes(newNotes);
    // console.log(id);
  }
  // edit a note

  const editnote = async (id, title, description, tag) => {

    // api call
    const response = await fetch(`${host}/api/notes//updatenote/6507ee4961cfdffed1d9599a`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwN2VlNDk2MWNmZGZmZWQxZDk1OTlhIiwibmFtZSI6ImFyeWFtIn0sImlhdCI6MTY5NTAxODU2OX0.eVEWiQCLYnChLnpPFsulLGk0wpPX7CCdZLa1JhOErZM"
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    // for client side editing
    for (let i = 0; i < notes.length; i++) {
      if (notes[i]._id === id) {
        notes[i].title = title;
        notes[i].description = description;
        notes[i].tag = tag;
      }
    }
  }
  return (
    <OtherContext.Provider value={{ notes, addnote, deletenote, editnote, getAllNotes }}>
      {props.children}
    </OtherContext.Provider>
  )
}

export default OthersState;