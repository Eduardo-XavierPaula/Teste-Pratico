import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link } from "react-router-dom";
import AddClient from "./components/AddClient";
import Client from "./components/Client";
import ClientsList from "./components/ClientsList";

import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";


class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/clients" className="navbar-brand">
            Eduardo
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/clients"} className="nav-link">
                Clients
              </Link>
            </li>
            
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/clients"]} component={ClientsList} />
            <Route exact path="/add" component={AddClient} />
            <Route path="/clients/:id" component={Client} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
