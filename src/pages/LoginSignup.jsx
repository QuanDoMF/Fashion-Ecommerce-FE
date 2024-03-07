import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import './Css/LoginSignup.css';
import { useDispatch } from "react-redux";
import { login } from "../slices/authSlice";
import { API_ROOT } from "../utils/constants";
import Spinner from "../components/Spinner/Spinner";
const schemaLogin = yup.object({
  username: yup.string(),
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const schemaSignup = yup.object({
  username: yup.string().required("Username is required"),
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginSignup = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState("Login");
  const [defaultEmail, setDefaultEmail] = useState('tquando24@gmail.com');
  const [defaultPassword, setDefaultPassword] = useState('2401');
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(state === "Login" ? schemaLogin : schemaSignup),
    defaultValues: {
      email: defaultEmail,
      password: defaultPassword
    }
  });

  const navigate = useNavigate();

  const setLogin = () => {
    setState("Login");
    reset();
  };

  const setSignup = () => {
    setState("Signup");
    reset();
  };

  useEffect(() => {
    reset({
      email: state === "Login" ? defaultEmail : '',
      password: state === "Login" ? defaultPassword : ''
    });
  }, [state]);

  const handleSignupSubmit = async (data) => {
    setLoading(true)
    reset();
    let responseData;
    await fetch(`${API_ROOT}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => res.json())
      .then((data) => {
        responseData = data;
      })
      .finally(() => setLoading(false))
    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      toast.success('User registration successful', {
        autoClose: 300,
        onClose: () => navigate('/')
      });
      dispatch(login(responseData));
    } else {
      toast.error(responseData.errors);
    }
  };

  const handleLoginSubmit = async (data) => {
    setLoading(true)
    const buildData = { ...data, username: '' };
    let responseData;
    await fetch(`${API_ROOT}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(buildData)
    }).then((res) => res.json())
      .then((data) => {
        responseData = data;
      })
      .finally(() => setLoading(false))
    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      toast.success('Login success', {
        autoClose: 300,
        onClose: () => navigate('/')
      });
      dispatch(login(responseData));
    } else {
      toast.error(responseData.errors);
    }
    reset();
  };

  const onSubmit = async (data, event) => {
    event.preventDefault();
    if (state === "Login") {
      handleLoginSubmit(data);
    } else {
      handleSignupSubmit(data);
    }
  };

  return (
    <>
      {loading && (
        <div className="spinner-overlay">
          <Spinner />
        </div>
      )}
      <div className="loginsignup">
        <div className="loginsignup-container">
          <h1>{state}</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="loginsignup-fields">
              {state === "Signup" && (
                <>
                  <input
                    className={`form-control ${errors?.username?.message ? 'is-invalid' : ''}`}
                    type="text"
                    name="username"
                    placeholder="Your name"
                    {...register('username')}
                  />
                  <span style={{ color: 'red' }}>{errors?.username?.message}</span>
                </>
              )}
              <input
                className={`form-control ${errors?.email?.message ? 'is-invalid' : ''}`}
                type="email"
                name="email"
                placeholder="Email Address"
                {...register('email')}
              />
              <span style={{ color: 'red' }}>{errors?.email?.message}</span>
              <input
                className={`form-control ${errors?.password?.message ? 'is-invalid' : ''}`}
                type="password"
                name="password"
                placeholder="Password"
                {...register('password')}
              />
              <span style={{ color: 'red' }}>{errors?.password?.message}</span>
            </div>
            <button type="submit">Continue</button>
          </form>
          {state === 'Login' ? (
            <p className="loginsignup-login">
              Don't have an account? <span className="pointer cursor-pointer" onClick={setSignup}>Sign Up here</span>
            </p>
          ) : (
            <p className="loginsignup-login">
              Already have an account? <span className="pointer cursor-pointer" onClick={setLogin}>Login here</span>
            </p>
          )}
          <div className="loginsignup-agree ">
            <div><input className="text-center" type="checkbox" name='' id='' /></div>
            <span>By continuing, I agree to the terms of use & privacy policy.</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignup;
