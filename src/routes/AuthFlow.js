import React, { Component } from "react";
// import { Switch, Route } from "react-router-dom";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import { Tabs } from "antd";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

const { TabPane } = Tabs;
class AuthFlow extends Component {
  state = {
    flow: [
      {
        component: Register,
        path: "/register"
      },
      {
        component: Login,
        path: "/"
      }
    ]
  };
  render() {
    return (
      <div
        style={{
          flex: 1,
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <h1 style={{ fontWeight: 200 }}>BelliseStyle</h1>
        <Tabs
          defaultActiveKey="1"
          style={{
            width: 450,
            boxShadow: "0 0 60px rgba(0,0,0,.1)",
            backgroundColor: "#fff",
            padding: "0 20px",
            paddingBottom: 20,
            borderRadius: 5
          }}
        >
          <TabPane tab="Connexion" key="1">
            <LoginForm />
          </TabPane>
          <TabPane tab="Inscription" key="2">
            <RegisterForm />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default AuthFlow;
