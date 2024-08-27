
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
export function Send() {

    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);



    return (
        <>
            <div className="flex justify-center items-center w-screen h-screen ">
                <div className="flex flex-col items-center w-1/2 lg:w-1/3 border p-4 border-black shadow-lg rounded-md">
                    <div className="text-center">
                        <p className="font-bold text-2xl">Send Money</p>
                        <p>Enter amount to send money</p>
                    </div>

                    <div className="flex items-center gap-2 mt-7">
                        <div className="w-7 h-7 bg-green-500 flex justify-center items-center rounded-full text-white font-semibold">{name[0].toUpperCase()}</div>
                        <div className="font-semibold text-2xl">{name}</div>
                    </div>

                    <div className="w-full p-4">
                        <div className="p-1 font-semibold">Amount(in Rs.)</div>
                        <div><input type="text" placeholder="Enter number" className="border border-black rounded-md p-1 w-full" onChange={e=>setAmount(e.target.value)}/></div>
                    </div>

                    <div className="w-full p-4 pt-0"><button className="w-full p-2 bg-green-500 rounded-md" onClick={()=>{
                        const response = axios.post("http://localhost:3000/api/v1/account/transfer",
                        {
                            to:id,
                            amount:amount
                        },
                        {headers:{
                            Authorization : `Bearer ${localStorage.getItem("token")}`
                        }})
                    }} >Initiate Transfer</button></div>
                </div>


            </div>
        </>
    )
}