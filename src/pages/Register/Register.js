import React, { Component } from "react";
import RegisterForm from "../../components/auth/RegisterForm";

class Register extends Component {
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
        <h1>Inscription</h1>
        <RegisterForm />
      </div>
    );
  }
}

export default Register;
