import { Container, Form, Button} from 'react-bootstrap';
import { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const { setLoginState } = useContext(UserContext);
  const history = useHistory();
  const { login } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUsername = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let user = {
      email,
      password
    }
    let userlogin = await login(user);

    if (userlogin) {
      setLoginState(true);
      history.push('/');
    } else {
      return;
    }
  };

  return (
    <Container className='mx-auto py-5'>
      <h1 className='text-center login-info'>Logga in</h1>
      <Form onSubmit={handleLogin}>
    
        <Form.Group controlId='formBasicEmail'>
          <Form.Label className='login-info'>Emailadress</Form.Label>
          <Form.Control
            onChange={handleUsername}
            type='email'
            placeholder='Email'
            required
          />
        </Form.Group>
        <Form.Group controlId='formBasicPassword'>
          <Form.Label className='login-info'>Lösenord</Form.Label>
          <Form.Control
            onChange={handlePassword}
            type='password'
            placeholder='Lösenord'
            required
          />
        </Form.Group>
        <Container className='text-center'>
          <Button variant='primary' type='submit'> LOGGA IN</Button>
        </Container>
          </Form>
    </Container>
  );
}
