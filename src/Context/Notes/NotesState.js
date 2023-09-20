import React, { useState } from "react";
import NodeContext from "./NotesContext";
const host = process.env.REACT_APP_BASE_URL;
console.log(host);


const NodeState = (props) => {
  // localStorage.setItem('token' , null);
  // variables for the edit the notes
  const [note, setNote] = useState({ title: "", description: "", tag: "" }) // IT SET THE NOTES FOR ADDING AND EDITING THE NOTES 
  const [idToBeDeleted, setIdToBeDeleted] = useState(''); // SET THE ID FOR EDITING PURPOSE
  const [show, setShow] = useState(false); // IT SHOWS THE MODAL FOR WHEN STATE IS CHANGED

  // variable for the edit the notes end

  // variable for the setting the alerts

  const [alert, setAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("success");
  const [alertMessage, setAlertMessage] = useState("this is just a alert");
  const setAlertsMessageFunc = (message, alertVar) => {
    setAlertVariant(alertVar);
    setAlert(true);
    setAlertMessage(message);
  }
  // 

  
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);


  //  variables for setting the login email and password

  const [credential, setCredential] = useState({ email: "", password: "" });

  // login functionality

  const login = async ({ email, password }) => {
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    // console.log(localStorage.getItem('token'));
    return await response.json();
  }

  // sign up functionality

  const [newUserCredentails, setNewUserCredentails] = useState({
    name: "",
    email: "",
    password: "",
    username: ""
  })

  const signUp = async ({name,email,password,username}) => {
    let uname = name;
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: uname, email, password,username }),
    });
    return await response.json();
  }

  // fetch all notes




  const getAllNotes = async () => {
    const response = await fetch(`${host}/api/notes/getallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
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
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });

    let note = await response.json().then((result) => { return result });
    setAlertsMessageFunc("Note Added", "success");
    setNotes(notes.concat(note));
  }


  // delete a note
  const deletenote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      }
    });

    const newNotes = notes.filter((note) => { return (note._id !== id) });

    setAlertsMessageFunc("Note Deleted", "danger");
    setNotes(newNotes);
    // console.log(id);
  }
  // edit a note

  const editnote = async (id, title, description, tag) => {

    // api call
    const response = await fetch(`${host}/api/notes//updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    // console.log(json);
    // for client side editing
    for (let i = 0; i < notes.length; i++) {
      if (notes[i]._id === id) {
        notes[i].title = title;
        notes[i].description = description;
        notes[i].tag = tag;
      }
    }
    setAlertsMessageFunc("Note Edited", "primary");
    getAllNotes();
  }
  return (
    <NodeContext.Provider value={{ notes, addnote, deletenote, editnote, getAllNotes, show, setShow, setIdToBeDeleted, idToBeDeleted, note, setNote, alert, setAlert, alertMessage, alertVariant, setAlertsMessageFunc, credential, setCredential, login,newUserCredentails, setNewUserCredentails,signUp }}>
      {props.children}
    </NodeContext.Provider>

  )
}


export default NodeState;