import React, { Component } from "react";
import RegisterForm from "../../components/auth/RegisterForm";

class Register extends Component {
  render() {
    return (
      <div
        style={{
          height: "100%",
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
