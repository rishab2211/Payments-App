import { Link } from "react-router-dom";
import { Signin } from "./Signin";
import { InputFieldSection } from "./InputFieldSection";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export function Signup() {

    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate();


    const signUpData = { username, password, firstName, lastName }



    return (


        <>
            <div className="flex flex-col justify-center items-center w-screen h-screen ">
                <div className="flex flex-col gap-2 justify-center  w-1/2 lg:w-1/3 border border-black rounded-lg p-4 shadow-lg">
                    <div className="text-center">
                        <b className="text-2xl">Sign Up</b>
                        <p >Enter your information to create an account</p>
                    </div>
                    <div>
                        <InputFieldSection fieldName={"First Name"} placeholder={"john"} value={firstName} onChange={e =>  setFirstName(e.target.value) } />
                        <InputFieldSection fieldName={"Last Name"} placeholder={"doe"} value={lastName} onChange={e => setLastName(e.target.value) } />
                        <InputFieldSection fieldName={"Username"} placeholder={"johndoe@example.com"} value={username} onChange={e => setUsername(e.target.value) } />
                        <InputFieldSection fieldName={"Password"} placeholder="" value={password} onChange={e=> setPassword(e.target.value) } />
                    </div>
                    <div className="p-2 flex flex-col items-center gap-1">
                        <button className="bg-black text-white w-full text-center p-1 rounded-md text-lg font-semibold"
                            onClick={

                                

                                async () => {

                                    const response = await axios.post("http://localhost:3000/api/v1/user/signup", signUpData);
                                    console.log("Success:", response.data);

                                    localStorage.setItem("token", response.data.token);
                                    navigate("/dashboard");
                                }
                            } >Sign Up</button>
                        <div className="flex gap-1" >
                            <div>Already have an account?</div>
                            <Link to={"/signin"} className="underline text-blue-400" >Sign In</Link>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}



