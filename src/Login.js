import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login(){

    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");

    const navigate=useNavigate();

    const loginUser=()=>{

        fetch("http://localhost:8080/auth/login",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then((res) => res.json())
    .then((data) => {
    localStorage.setItem("token", data.token);
    alert("Login Successful");
    navigate("/books");
})
      .catch(() => {
        alert("Login Failed");
      });
  };

  return (

    <div className="container">

      <h1>Login</h1>
      <input type="text" placeholder="Enter Username" value={username}
        onChange={(e) => setUsername(e.target.value)}/>
      <input type="password" placeholder="Enter Password" value={password}
        onChange={(e) => setPassword(e.target.value)}/>
      <button className="login-btn" onClick={loginUser}>Login</button>
      <p> New User? <Link to="/register">Register Here</Link></p>

    </div>

  );

}

export default Login;

    
