import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";

import { AuthUser } from "../../interfaces/AuthInterface";
import { login } from "../../redux/feature/Auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import { toast } from "react-hot-toast";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

import FormContainer from "../../components/FormContainer/Index";

const Login = () => {
  const { isLoading, user } = useAppSelector((state) => state.auth);

  const [passwordShown, setPasswordShown] = useState(false);
  const [formData, setFormData] = useState<AuthUser>({
    email: "",
    password: "",
  });

  // Show password toggle
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const token = user?.token;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  // Redirect user to home page if user is already logged in
  useEffect(() => {
    if (token) {
      navigate(redirect);
    } else {
      navigate("/login");
    }
  }, [token, navigate, redirect]);

  // Change input value
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ formData, toast, navigate }));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            name='email'
            placeholder='Enter email'
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={passwordShown ? "text" : "password"}
            name='password'
            placeholder='Enter password'
            value={formData.password}
            onChange={handleChange}
          />
          <Form.Check
            type='checkbox'
            className="mt-2"
            label='Show password'
            onClick={togglePasswordVisiblity}
          />
         
          {/* <div className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'>
            <span onClick={togglePasswordVisiblity} className='cursor-pointer'>
              {passwordShown ? <BsEyeFill /> : <BsEyeSlashFill />}
            </span>
          </div> */}
        </Form.Group>

        <Button
          type='submit'
          variant='info'
          className='mt-2'
          disabled={isLoading}
        >
          Sign In
        </Button>
        {isLoading && <p> Loading...</p>}
      </Form>
      <Row className='py-3'>
        <Col>
          Don't have an account?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Login;
