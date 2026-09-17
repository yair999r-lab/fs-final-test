import { useState } from "react"
import { handelFatch } from "../hooks/Fatchhook"
import { useNavigate } from "react-router-dom"

interface sigup {
    username: string,
    password: string,
    email: string
}

const Sigup = () => {

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [userInfo, setUserInfo] = useState<sigup | null>(null)

    const navigate = useNavigate()

    let url = ""
    const {data, loading, error} = handelFatch<sigup>(url, "POST", userInfo)
        
    function heandleForm(){
        console.log(111)
        setUserInfo({username: name, password, email})
        url = "http://localhost:3000/sigup"
    }


  return (
    <div>
        {loading && <h3>loading</h3>}
        {error && <h4>error {error}</h4>}
        {data && <h4>dadasadsdsdsd</h4>}
        {}
        <h3>הרשמה</h3>
        <form onSubmit={() => heandleForm}>
            <label>full name<input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} required/></label>
            <label>password <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/></label>
            <label>email <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/></label>
            <button type='submit'>send</button>
        </form>
    </div>
  )
}

export default Sigup