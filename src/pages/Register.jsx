import React, { Component } from "react";

import Idm from "../services/Idm";
import "../css/form.css";
/*
  Using localStorage is similar to how we use
  dictionarys. 
  
  To set a variable call `localStorage.set("key", value)`
  To get a variable call `localStorage.get("key")`

  Local Storage persists through website refreshes so
  it is perfect for storing things we dont want to lose
  like a users session

  You must call `const localStorage = require("local-storage");`
  in any class that you want to use this in, it is the same
  local storage in the entire website regardless of where you call
  it as each website gets the same instance of the storage.

  So think of it as a global dictionary.
*/
const localStorage = require("local-storage");

class Register extends Component {
  state = {
    email: "",
    password: ""
  };
  handleRegistered = () => {
    this.setState({registered: true})
  };
  handleSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    Idm.register(email, password)
      .then(response => {
        alert(JSON.stringify(response.data, null, 4));
        //this.resultCode = response.data.resultCode;
        ((110 === response.data.resultCode) || (16 === response.data.resultCode)) && this.props.history.push("/login");
      }).catch(error => alert(error));
    
    this.setState({ email: "", password: "" });
  };


  updateField = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;
    console.log(localStorage.get("email"));
    console.log(localStorage.get("session_id"));
    console.log(this.resultCode);
    return (
      <div className="form-box">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <label className="form-label">Email</label>
          <input
            className="form-input"
            type="email"
            name="email"
            value={email}
            onChange={this.updateField}
          />
          <label className="form-label">Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            value={password}
            onChange={this.updateField}
          />
          <button className="form-button">Register</button>
        </form>
      </div>
    );
  }
}

export default Register;
