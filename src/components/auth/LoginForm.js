import React, { Component } from "react";
import { Form, Input, Button, Icon } from "antd";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { USER_DB } from "../../configs";
import { logUserIn } from "../../actions";

class LoginForm extends Component {
  state = {
    validating: false,
    passwordVisible: false
  };

  loginHandler = async e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { username, password } = values;
        USER_DB.logIn(username, password)
          .then(res => this.props.login(res))
          .catch(err => console.warn(err));
      }
    });
  };

  switchPasswordVisibility = () => {
    const { passwordVisible } = this.state;

    this.setState({ passwordVisible: !passwordVisible });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { passwordVisible, validating } = this.state;
    return (
      <Form
        className="authForm"
        onSubmit={this.loginHandler}
        hideRequiredMark
        style={{ width: 380 }}
      >
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [
              {
                required: true,
                message: "Username is required",
                whitespace: true
              }
            ]
          })(
            <Input
              prefix={<Icon type="user" />}
              placeholder="Username"
              size="large"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Password is required",
                whitespace: true
              }
            ]
          })(
            <Input
              prefix={<Icon type="lock" />}
              addonAfter={
                <Button
                  tabIndex={-1}
                  onClick={this.switchPasswordVisibility}
                  icon="eye"
                  size="large"
                />
              }
              placeholder="Password"
              type={!passwordVisible ? "password" : "text"}
              size="large"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            block
            size="large"
            loading={validating}
          >
            Se connecter
          </Button>
        </Form.Item>
        <Form.Item>
          <p>
            Vous n'avez pas encore de compte?{" "}
            <Link to="register">Creer un compte.</Link>
          </p>
        </Form.Item>
      </Form>
    );
  }
}

export default connect(
  null,
  { login: logUserIn }
)(withRouter(Form.create()(LoginForm)));
