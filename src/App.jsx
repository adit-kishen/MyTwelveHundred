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

    console.log("HANDLE LOGOUT CALLED")
    // let email = common["email"];
    // let id = common["session_id"];

    // console.log(email);
    // console.log(id);

    // Idm.logout(email, id)
    //   .then(response => {
    //     alert(JSON.stringify(response.data, null, 4))
    //     console.log(response);
    //     let resultCode = response.data.resultCode;
    //     resultCode == JSON.stringify(121) && this.props.history.push("/login")
    //   })
    //   .catch(error => console.log(error));


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
        {/* <NavBar/> */}
        <Content />
      </div>
    );
  }
}

export default App;
