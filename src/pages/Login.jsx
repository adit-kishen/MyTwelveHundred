import React, { Component } from "react";

import Idm from "../services/Idm";

import "../css/common.css";

const localStorage = require("local-storage");

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleSubmit = e => {
    e.preventDefault();

    const { handleLogin } = this.props;
    const { email, password } = this.state;

    Idm.login(email, password)
      .then(response => {
        alert(JSON.stringify(response.data, null, 4))
        console.log(response);
        let resultCode = response.data.resultCode;
        // (120 === response.data.resultCode) && 
        resultCode == JSON.stringify(120) && handleLogin(email, response["data"]["session_id"]) 
        resultCode == JSON.stringify(120) && this.props.history.push("/search")
      })
      .catch(error => console.log(error));
  };

  updateField = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  componentDidMount() {
    {this.props.loggedIn && this.props.history.push("/search")};
  };

  componentDidUpdate() {
    {this.props.loggedIn && this.props.history.push("/search")};
  };

  render() {
    console.log(localStorage.get("email"));
    console.log(localStorage.get("session_id"));
    console.log(this.state.resultCode);
    console.log(this.props.loggedIn);
    const { email, password } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <label className="label">Email</label>
          <input
            className="input"
            type="email"
            name="email"
            value={email}
            onChange={this.updateField}
          ></input>
          <label className="label">Password</label>
          <input
            className="input"
            type="password"
            name="password"
            value={password}
            onChange={this.updateField}
          ></input>
          <button className="button">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
