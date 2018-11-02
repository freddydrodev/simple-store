import React from "react";
import { Icon } from "antd";

const LoadingScreen = () => (
  <div
    style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <Icon type="loading" style={{ fontSize: 40 }} className="text-primary" />
  </div>
);
export default LoadingScreen;
