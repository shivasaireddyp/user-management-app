import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import "./Register.css"

function Register() {
  let { register, handleSubmit } = useForm();
  let navigate = useNavigate();
  let [error, setError] = useState("");

  let submitHandler = (newUser) => {
    // console.log(new)
    axios
      .post("http://localhost:4000/users-api/register-user", newUser)
      .then((response) => {
        if (response.status === 201) {
          navigate("/login");
        }
        if (response.status !== 201) {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        if (err.response) {
          setError(err.message);
        } else if (err.request) {
          setError(err.message);
        } else {
          setError(err.message);
        }
      });
  };
  return (
    <div className="mb-3">
      <h1 className="text-center">Register</h1>
      <div className="d-flex justify-content-center row">
        <div className="container w-25 border border-dark rounded">
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="form-group mb-2">
              <label for="username">Username</label>
              <input
                type="text"
                className="form-control font-weight-bold"
                id="username"
                placeholder="Username"
                {...register("username")}
              />
              <p className="text-danger">{error}</p>
            </div>
            <div className="form-group mb-2">
              <label for="email">Email address</label>
              <input
                type="email"
                className="form-control font-weight-bold"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                {...register("email")}
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group mb-2">
              <label for="password">Password</label>
              <input
                type="password"
                className="form-control font-weight-bold"
                id="password"
                placeholder="Password"
                {...register("password")}
              />
            </div>
            <div className="form-group mb-2">
              <label for="dob">Date of birth</label>
              <input
                type="date"
                className="form-control font-weight-bold"
                id="dob"
                placeholder="Select"
                {...register("dob")}
              />
            </div>
            <div className="form-group mb-2">
              <label for="image">Image</label>
              <input
                type="text"
                className="form-control font-weight-bold"
                id="image"
                placeholder="Enter URL"
                {...register("image")}
              />
            </div>
            <div className="mb-2">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
