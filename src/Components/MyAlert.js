import { useContext, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import nodeContext from '../Context/Notes/NotesContext';

function MyAlert(props) {
  const {alert,setAlert,alertMessage,alertVariant} = useContext(nodeContext);
  const [show, setShow] = useState(alert);
  const closeAfter = () => {
    setTimeout(function(){setAlert(false)},5000);
  }
  closeAfter();
  return (
    <>
      <Alert show={alert} variant={alertVariant}>
        <Alert.Heading>{alertMessage}</Alert.Heading>
      </Alert>
    </>
  );
}

export default MyAlert;