import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then(response => {
                setUsers(response.data.user)
            })
    }, [filter])


    return (
        <>
            <div className="font-semibold mt-6 text-xl">
                Users
            </div>
            <div>
                <input onChange={
                    (e) => {
                        setFilter(e.target.value);
                    }
                } type="text" placeholder="Search users..." className="w-full p-2 rounded border-slate-200" ></input>
            </div>
            <div>
                {users.map(user => <User key={user._id} user={user} name={localStorage.setItem("name",user.firstName)} />)}
            </div>
        </>
    )
}

function User({ user }) {
    const navigate = useNavigate();

    return <div className="flex justify-between border m-1 items-center">
        <div className="flex gap-2 p-2">
            <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center font-semibold">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="font-semibold">
                    {user.firstName} {user.lastName}
            </div>
        </div>

        <div className="flex flex-col justify-center h-full">
            <button onClick={(e) => {
                navigate("/send?id=" + user._id + "&name=" + user.firstName);
            }}  class="font-semibold p-2 bg-black text-white rounded-md">Send money</button>
        </div>
    </div>

        }