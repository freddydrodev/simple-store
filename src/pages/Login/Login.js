import React, { Component } from "react";
import LoginForm from "../../components/auth/LoginForm";

class Login extends Component {
  render() {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <h1>Connexion</h1>
        <LoginForm />
      </div>
    );
  }
}

export default Login;
