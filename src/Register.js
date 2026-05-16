import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register(){

    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();

    const registerUser=()=>
    {
        fetch("http://localhost:8080/auth/register",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({
            username: username,
            password: password
        })
    }).then((res)=>res.json())
    .then(()=> {
    alert("Registration Successful");
    navigate("/");
    })
      .catch(() => {
        alert("Registration Failed");
      });
    };

    return(
        <div className="container">

      <h1>Register</h1>

      <input type="text" placeholder="Enter Username" value={username}
        onChange={(e) => setUsername(e.target.value)}/>
      <input type="password" placeholder="Enter Password" value={password}
        onChange={(e) => setPassword(e.target.value)}/>
      <button className="register-btn" onClick={registerUser}>
        Register
      </button>
      <p> Already Registered? <Link to="/">Login Here</Link></p>

    </div>
    )
}
export default Register;