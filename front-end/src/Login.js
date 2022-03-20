import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3016/api/login", {
        email,
        password,
      });
      localStorage.setItem("accesToken", res);
      Redirect("/interfaceAdmin");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="login">
      <form onsubmit={HandleSubmit}>
        <h1>Login</h1>
        <div className=" aa ">
          <input
            type="email"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="toto@exemple.com"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="aa">
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="ccc">
          Connexion
        </button>
      </form>
    </div>
  );
}
export default Login;
