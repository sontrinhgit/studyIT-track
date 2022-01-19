import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import AlertMessage from "../Layout/AlertMessage";
const RegisterForm = () => {

  const {registerUser} = useContext(AuthContext)

  const history = useHistory()
  
  //local state
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });

  const [alert, setAlert] = useState(null)

  const { username, password, confirmPassword } = registerForm;

  const onChangeRegisterForm = (event) =>
    setRegisterForm({ ...registerForm, [event.target.name]: event.target.value });

  const register = async event => {
    event.preventDefault()

    if(password !== confirmPassword) {
      setAlert({type: "danger", message: "Password do not match"})
      setTimeout(()=> setAlert(null), 5000)
      return
    }

    try {
      const registerData = await registerUser(registerForm)
      if(registerData.success) {
        history.push("/dashboard")
      }
      else {
        setAlert({type: 'danger', message: registerData.message})
        setTimeout(() => setAlert(null), 5000)
      }
      return
    }  catch (error) {
      console.log(error)
    }
  }
  return (
    <Fragment>
      <Form className="my-4" style={{width: '500px'}} onSubmit={register}>
      <AlertMessage info={alert} />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={onChangeRegisterForm}
            required
          />
        </Form.Group>
        <Form.Group >
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={onChangeRegisterForm}
            className="mt-2"
          />
        </Form.Group>
        <Form.Group >
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            required
            onChange={onChangeRegisterForm}
            value={confirmPassword}
            className="mt-2"
          />
        </Form.Group>
        <Button variant="success" type="submit" className="mt-2" style={{alignItems: 'center', justifyContent: 'center'}}>
          Register
        </Button>
      </Form>
      <p>
        Already have an account ?
        <Link to="/login">
          <Button variant="info" size="sm" className="ml-2" >
            Login
          </Button>
        </Link>
      </p>
      </Fragment>
  );
};

export default RegisterForm;
