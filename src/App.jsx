import React, { Component } from "react";
import Axios from "axios";

import NavBar from "./NavBar";
import Content from "./Content";


const localStorage = require("local-storage");

class App extends Component {
  state = {
    loggedIn: this.checkedLoggedIn()
  };

  handleLogin = (email, session_id) => {
    const { common } = Axios.defaults.headers;

    localStorage.set("email", email)
    localStorage.set("session_id", session_id)

    common["email"] = email;
    common["session_id"] = session_id;

    this.setState({ loggedIn: true });
  };

  handleLogOut = () => {
    const { common } = Axios.defaults.headers;

    localStorage.remove("email");
    localStorage.remove("session_id");

    delete common["email"];
    delete common["session_id"];

    this.setState({ loggedIn: false });
  };

  checkedLoggedIn() {
    return (
      localStorage.get("email") !== null &&
      localStorage.get("session_id") !== null
    );
  }

  render() {
    const { loggedIn } = this.state;

    return (
      <div className="app">
        <NavBar handleLogOut={this.handleLogOut} loggedIn={loggedIn} />
        <Content handleLogin={this.handleLogin} />
      </div>
    );
  }
}

export default App;
