import React, { Component } from "react";
import { Form, Input, Button, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { USER_DB } from "../../configs";
import { logUserIn } from "../../actions";

class LoginForm extends Component {
  state = {
    validating: false,
    passwordVisible: false
  };

  registerHandler = async e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { username, password } = values;
        USER_DB.signUp(username, password)
          .then(() =>
            USER_DB.logIn(username, password)
              .then(res => {
                this.props.login(res);
              })
              .catch(err => err)
          )
          .catch(err => console.warn(err));
      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Les deux mots de pass ne coincide pas!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    form.validateFields(["confirm"], { force: true });
    callback();
  };

  switchPasswordVisibility = () => {
    const { passwordVisible } = this.state;

    this.setState({ passwordVisible: !passwordVisible });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { passwordVisible, validating } = this.state;
    console.log(this.props);
    return (
      <Form
        className="authForm"
        onSubmit={this.registerHandler}
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
              },
              { min: 8, message: "Au moins 8 lettres" },
              { max: 32, message: "Au plus 32 lettres" }
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
              },
              { validator: this.validateToNextPassword }
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
          {getFieldDecorator("confirm", {
            rules: [
              {
                required: true,
                message: "Confirmation is required",
                whitespace: true
              },
              { validator: this.compareToFirstPassword }
            ]
          })(
            <Input
              prefix={<Icon type="lock" />}
              placeholder="Confirm your password"
              type="password"
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
            S'inscrire
          </Button>
        </Form.Item>
        <Form.Item>
          <p>
            Vous avez deja un compte? <Link to="/">Connectez vous.</Link>
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
