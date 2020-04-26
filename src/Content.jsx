import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./pages/Home";

class Content extends Component {
  render() {

    return (
      <div className="content">
        <Switch>
          
          <Route 
            path="/" 
            component={Home} />
          
        </Switch>
      </div>
    );
  }
}

export default Content;
