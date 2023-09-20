import React, { useContext } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import './Components.css';
import nodeContext from '../Context/Notes/NotesContext';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  const { credential, setCredential,login,setAlertsMessageFunc } = useContext(nodeContext);
  const [validated, setValidated] = useState(false);


  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    const json = await login(credential);
    if(json.success){
      localStorage.setItem('token',json.authtoken);
      navigate('/');
    }
    else{
      setAlertsMessageFunc(json.error,"danger");
    }
    setValidated(true);
  };

  const handleOnChnage = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  }

  return (
    <>
      <Row className="container loginInner ">
        <Form className="container" noValidate validated={validated} onSubmit={handleSubmit}>
          <div className="">
            <Form.Group as={Col} md="" >
              <Form.Label htmlFor='email'>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                defaultValue=""
                name='email'
                id='email'
                onChange={handleOnChnage}
              />
              {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
            </Form.Group>

          </div>
          <Form.Group as={Col} md="">
            <Form.Label htmlFor='password'>Password</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">*</InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="password"
                aria-describedby="inputGroupPrepend"
                required
                name='password'
                id='password'
                onChange={handleOnChnage}
              />
              <Form.Control.Feedback type="invalid">
                Please choose a password.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Button type="submit">Submit form</Button>
        </Form>
      </Row>
    </>
  );
}

export default LoginForm;