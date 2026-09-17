import { NavLink } from "react-router-dom"

const HomePage = () => {

    localStorage.setItem("token", "")
  return (
    <div>
        <nav>
            <NavLink to="/sigup">sigup</NavLink>
            <NavLink to="/login">login</NavLink>
        </nav>
    </div>
  )
}

export default HomePage