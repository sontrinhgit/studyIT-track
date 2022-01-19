import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import AlertMessage from "../Layout/AlertMessage";
const LoginForm = () => {
  //context
  const {loginUser} = useContext(AuthContext)

  //router
  const history = useHistory()

  //local state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [alert, setAlert] = useState(null)

  const { username, password } = loginForm;

  const onChangeLoginForm = (event) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  const login = async event => {
    event.preventDefault()

    try {
      const loginData = await loginUser(loginForm)
      if(loginData.success) {
        history.push("/dashboard")
      }
      else {
        setAlert({type: 'danger', message: loginData.message})
        setTimeout(() => setAlert(null), 5000)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Fragment>
      <Form className="my-4" style={{ width: "500px" }} onSubmit={login}>
      <AlertMessage info={alert} />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
            value={username} //gia tri nay thay doi thi gia tri o State cung se tu dong thay doi
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            className="mt-2"
            value={password}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Button
          variant="success"
          type="submit"
          className="mt-2"
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          Login
        </Button>
      </Form>
      <p>
        Do not have an account?
        <Link to="/register">
          <Button variant="info" size="sm" className="ml-2">
            Register
          </Button>
        </Link>
      </p>
    </Fragment>
  );
};

export default LoginForm;
