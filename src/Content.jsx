import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Login from "./pages/Login";
import MovieDetails from "./pages/MovieDetails";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import History from "./pages/History";


class Content extends Component {
  render() {

    return (
      <div className="content">
        <Switch>
          <Route exact path="/" render={() => (
                <Redirect to="/login"/>
                )}/>
          <Route 
            path = "/cart"
            component = {Cart}/>
          <Route 
            path = "/history"
            component = {History} />
          <Route
            path = "/login"
            render = {props => <Login {...props} {...this.props}/>}/>
          <Route 
            path="/details" 
            component={MovieDetails} />
          <Route
            path = "/register"
            render = {props => <Register {...props} {...this.props}/>}/>
          <Route 
            path = "/search" 
            render = {props => <Search {...props} {...this.props}/>}/>
            component = {Search}/>  
          <Route 
            path="/" 
            component={Home} />
        </Switch>
      </div>
    );
  }
}

export default Content;
