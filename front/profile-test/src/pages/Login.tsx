import { useState } from "react"
import { useHandelFatch } from "../hooks/Fatchhook"
import { useNavigate } from "react-router-dom"

interface login {
    email: string,
    password: string
}

interface getDate {
    message: string,
    token: string
}

const Login = () => {
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const [userInfo, setUserInfo] = useState<login | null>(null)
    const navigate = useNavigate()
    const [url, setUrl] = useState("")
        
        
    const {data, loading, error} = useHandelFatch<getDate>(url, "POST", userInfo)
            
    function heandleForm(){
        setUserInfo({ password, email})
        setUrl("http://localhost:3000/login")
    }

    if(loading) return <h4>loading</h4>
    if(data) {
        console.log(data)
        const token = data.token
        localStorage.setItem("token", token)
        navigate("/profile")
    }
  return (
    <div>
        {error && <h4>{error}</h4>}
         <h3>login</h3>
        <form onSubmit={(e) => {
            e.preventDefault()
            heandleForm()}}>
            <label>password <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/></label>
            <label>email <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/></label>
            <button type='submit'>send</button>
        </form>
    </div>
  )
}

export default Login