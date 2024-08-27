
import { Link, useNavigate} from "react-router-dom"
import { InputFieldSection } from "./InputFieldSection"
import { useState } from "react";
import axios from "axios";


export function Signin() {

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    
    const navigate = useNavigate();


    const signinData = {username,password};
    return (
        <>
            <div className="flex flex-col justify-center items-center w-screen h-screen ">
                <div className="flex flex-col gap-2 justify-center  w-1/2 lg:w-1/3 border border-black rounded-lg p-4 shadow-lg">
                    <div className="text-center">
                        <b className="text-2xl">Sign In</b>
                        <p >Enter your credentials to access your account</p>
                    </div>
                    <div>
                        <InputFieldSection fieldName={"Email"} placeholder={"johndoe@example.com"} value={username} onChange={e=>setUsername(e.target.value)} />
                        <InputFieldSection fieldName={"Password"} placeholder="" value={password} onChange={e=>setPassword(e.target.value)} />
                    </div>
                    <div className="p-2 flex flex-col items-center gap-1">
                        <button className="bg-black text-white w-full text-center p-1 rounded-md text-lg font-semibold" 
                        onClick={
                            async ()=>{
                                const response = await axios.post("http://localhost:3000/api/v1/user/signin",signinData);

                                localStorage.setItem("token", response.data.token)
                                navigate("/dashboard")
                        }} >Sign In</button>
                        <div className="flex gap-1">
                            <div>Already have an account?</div>
                            <Link to={"/signup"} className="underline text-blue-400">Sign Up</Link>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}