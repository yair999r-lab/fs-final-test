import { useNavigate } from "react-router-dom"
import { useHandelFatch } from "../hooks/Fatchhook"

interface user {
    user: {
    username: string,
    password: string,
    email: string
    id: number}
}

const Profile = () => {
    
    const navigate = useNavigate()
    let token = localStorage.getItem("token")
    const {data, loading, error} = useHandelFatch<user>("http://localhost:3000/profile", "POST", {Authorization: `bearer ${token}`})

    if(!token) navigate("/")
    if(loading) return <h4>loading</h4>
    if(error || !data) return <h4>{error}</h4>
  return (
    <>
    <nav>
        <button onClick={() =>{navigate("/")}}>logout</button>
    </nav>
    <div>
        <h3>user data:</h3>
        <h4>user name: {data.user.username}</h4>
        <h4>user id: {data.user.id}</h4>
        <h4>user email: {data.user.email}</h4>
    </div></>
  )
}

export default Profile