import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import nodeContext from '../Context/Notes/NotesContext';
import { useNavigate } from 'react-router-dom';

function SignUpForm() {
    const navigate = useNavigate();
    const { newUserCredentails, setNewUserCredentails, signUp, setAlertsMessageFunc } = useContext(nodeContext);
    const [validated, setValidated] = useState(false);


    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        const json = await signUp(newUserCredentails);
        
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            navigate('/');
        }
        else {
            setAlertsMessageFunc(json.error, "danger");
        }
    };

    const handleOnChnage = (e) => {
        setNewUserCredentails({ ...newUserCredentails, [e.target.name]: e.target.value });
    }
    const [checkVar, setCheckVar] = useState(true);

    const onCheckChange = () => {
        setCheckVar(!document.querySelector('.checkBox22>input').checked);
    }

    return (
        <>
            <Row className="container loginInner ">
                <Form className="container" noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group as={Col} md="" >
                        <Form.Label htmlFor='name'>Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Name"
                            defaultValue=""
                            name='name'
                            id='name'
                            onChange={handleOnChnage}
                        />
                        {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                    </Form.Group>
                    <Form.Group as={Col} md="" >
                        <Form.Label htmlFor='username'>User Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="User Name"
                            defaultValue=""
                            name='username'
                            id='username'
                            onChange={handleOnChnage}
                        />
                        {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                    </Form.Group>
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
                                onChange={handleOnChnage}
                                id='password'
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a password.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Check
                            required
                            label="Agree to terms and conditions"
                            type="checkbox"
                            name='agree'
                            value='yes'
                            className='checkBox22'
                            onChange={onCheckChange}
                        />
                    </Form.Group>
                    <Button disabled={checkVar} type="submit">Submit form</Button>
                </Form>
            </Row>
        </>
    );
}

export default SignUpForm;