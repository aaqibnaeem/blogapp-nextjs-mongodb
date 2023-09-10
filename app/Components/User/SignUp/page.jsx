"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

function SignUp() {
  let [user, setuser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    repeatPassword: undefined,
  });
  const router = useRouter();

  const handleChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };

  const submit = () => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/users/SignUp",
      headers: {
        "Content-Type": "application/json",
      },
      data: user,
    };

    axios
      .request(config)
      .then((response) => {
        toast(response.data.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          router.push("/Components/User/Login");
        }, 1500);
      })
      .catch((error) => {
        toast(error, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };
  return (
    <div className="bg-slate-100">
      <header className="bg-black text-white flex justify-between p-2">
        <h2 className="text-2xl">Personal Blog Website</h2>
        <nav>
          <ul className="flex space-x-2 text-lg">
            <Link
              href="/Components/User/Login"
              style={{ textDecoration: "none", color: "white" }}
            >
              <li>Login</li>
            </Link>
          </ul>
        </nav>
      </header>
      <div className="h-20 bg-slate-100 text-dark text-3xl font-semibold ps-5 flex items-center">
        <h1>Sign Up</h1>
      </div>
      <div
        style={{ minHeight: "90vh" }}
        className="flex flex-col items-center justify-center border"
      >
        <Input
          type="text"
          handleChange={handleChange}
          placeholder={"Enter First name"}
          value={user.firstName}
          name="firstName"
        />
        <Input
          type="text"
          handleChange={handleChange}
          placeholder={"Enter Last name"}
          value={user.lastName}
          name="lastName"
        />
        <Input
          handleChange={handleChange}
          type="email"
          placeholder={"Enter Email"}
          value={user.email}
          name="email"
        />
        <Input
          handleChange={handleChange}
          type="password"
          placeholder={"Enter Password"}
          value={user.password}
          name="password"
        />
        <Input
          handleChange={handleChange}
          type="password"
          placeholder={"Repeat Password"}
          value={user.repeatPassword}
          name="repeatPassword"
        />
        <button
          disabled={user.password !== user.repeatPassword}
          className="bg-black text-white"
          style={{ height: "40px", width: "400px" }}
          onClick={() => submit()}
        >
          Create Account
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export const Input = ({
  type,
  placeholder,
  value,
  name,
  handleChange,
}) => {
  return (
    <input
      className="border-2 outline-2 rounded px-5 mb-1"
      style={{ height: "40px", width: "400px" }}
      value={value}
      onChange={(e) => handleChange(e)}
      type={type}
      placeholder={placeholder}
      name={name}
    />
  );
};
export default SignUp;
