import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { login } from "../http/api";
import { setIsAuth } from "../redux/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {Dispatch} from "redux";

export function handleLogin(dispatch: Dispatch, navigate: ReturnType<typeof useNavigate>): void {
  let token = localStorage.getItem('token');
  console.log("token", token);

  if (!!token && token !== 'undefined') {
    dispatch(setIsAuth(true));
    navigate('/fs');
  } else {
    dispatch(setIsAuth(false));
    navigate('/auth');
  }
}

function Authorization() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await login(username, password); // Вызываем функцию login с параметрами
    handleLogin(dispatch, navigate);
    setUsername('');
    setPassword('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Authorization;
