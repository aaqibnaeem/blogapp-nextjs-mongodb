"use client"
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function SignUp() {

    const route = useRouter()

    let [user, setuser] = useState({
        email: "",
        password: "",

    })

    const handleChange = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value })
    }

    const submit = () => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/api/users/Login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: user
        };

        axios.request(config)
            .then((response) => {
                localStorage.setItem("user_id", response.data.data._id)
                localStorage.setItem('user_name', `${response.data.data.firstName} ${response.data.data.lastName}`)
                console.log(response.data)
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
                if (response.data.message !== 'Not found User' && response.data.message !== 'password incorrect') {
                    setTimeout(() => {
                        route.push("/Components/Dashboard")
                    }, 1500);
                }

            })
            .catch((error) => {
                console.log(error);
            });

    }



    return (
        <div className='bg-slate-100'>
            <header className='bg-black text-white flex justify-between p-2'>
                <h2 className='text-2xl'>Personal Blog Website</h2>
                <nav>
                    <ul className='flex space-x-2 text-lg'>
                        <Link href='/' style={{ textDecoration: "none", color: "white" }}>
                            <li>
                                Sign Up
                            </li>
                        </Link>
                    </ul>
                </nav>
            </header>
            <div className='h-20 bg-slate-100 text-dark text-3xl font-semibold ps-5 flex items-center'>
                <h1>Login</h1>
            </div>
            <div style={{ minHeight: "90vh" }} className='flex flex-col items-center justify-center border'>
                <Input
                    handleChange={handleChange}
                    type="email" placeholder={"Enter Email"} value={user.email} name="email" />
                <Input
                    handleChange={handleChange}
                    type="password" placeholder={"Enter Password"} value={user.password} name="password" />
                <button disabled={!user.email || !user.password} style={{ height: "40px", width: "400px" }} className='bg-black text-white' onClick={() => submit()}>Login</button>
            </div>
            <ToastContainer />
        </div>

    )
}

export const Input = ({ type, placeholder, value, name, handleChange }) => {
    return (
        <input className='border-2 outline-2 rounded px-5 mb-1'
            style={{ height: "40px", width: "400px" }}
            value={value}
            onChange={(e) => handleChange(e)}
            type={type} placeholder={placeholder} name={name} />
    )
}



export default SignUp