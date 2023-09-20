import React , {useContext, useState} from 'react';
import MyModal from './MyModal';
import OtherContext from '../Context/Notes/OthersContext';
import nodeContext from '../Context/Notes/NotesContext';

function About() {
  
  const {obj} = useContext(nodeContext);
  console.log(obj);

  const [modalOpen,setModalOpen] = useState(false);

  return (
    <div>
    </div>
  )
}

export default About;
