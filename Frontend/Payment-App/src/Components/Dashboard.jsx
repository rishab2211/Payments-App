import axios from "axios";
import { useEffect, useState } from "react"
import { Users } from "./Users";

export function Dashboard(){

    return(
        <>
            <div className="m-4 flex flex-col gap-4">
                <div className="flex justify-between">
                    <div className="text-2xl font-bold cursor-pointer" >Payments App</div>
                    <div className="flex gap-2 items-center">
                        <div>Hello, User</div>
                        <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center font-semibold" >{localStorage.getItem(firstName)}</div>
                    </div>
                </div>

                <div className="text-xl font-semibold">Your balance $10000</div>

                <div>
                    <Users />
                </div>
            </div>
        </>
    )
}

