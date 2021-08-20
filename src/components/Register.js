import { Container, Form, Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function Register() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inputValidation, setInputValidation] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const { register } = useContext(UserContext);


  useEffect(() => {
    if (confirmPassword === "") {
      setInputValidation(true);
    } else {
      setInputValidation(false);
      
      if (password === confirmPassword) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }
  }, [password, confirmPassword]);

  const emailInput = (e) => {
      setEmail(e.target.value);
  };

  const passwordInput = (e) => {
      setPassword(e.target.value);
  };

  const checkPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
  
    let user = {
      email: email,
      password: password,
    };
    let newUser = await register(user);
    if (newUser.error) {
      return;
    } else {
      history.push("/login");
    }
  };

  return (
    <Container>
      <h1 className="text-center login-info">Registrera</h1>
      <Form onSubmit={handleSubmit}>
    
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="login-info">Emailadress</Form.Label>
          <Form.Control
            onChange={emailInput}
            type="email"
            placeholder="Email"
            required
          />
        </Form.Group>
     
        <Form.Group controlId="formBasicPassword">
          <Form.Label className="login-info">Lösenord</Form.Label>
          <Form.Control
            onChange={passwordInput}
            type="password"
            placeholder="Lösenord"
            required
          />
        </Form.Group>

        <Form.Group controlId="formConfirmPassword2">
          <Form.Label>Bekräfta lösenordet</Form.Label>
          <Form.Control
            className={
              inputValidation ? "" : isValid ? "is-valid" : "is-invalid"
            }
            onChange={checkPassword}
            type="password"
            name="confirm"
            placeholder="Bekräfta lösenord"
            required
          />
        </Form.Group>

        <Container className="text-center">
          <Button variant="primary" type="submit"> REGISTRERA</Button>
        </Container>
      </Form>
    </Container>
  );
}
