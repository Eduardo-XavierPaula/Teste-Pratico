import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link } from "react-router-dom";
import AddClient from "./components/AddClient";
import Client from "./components/Client";
import ClientsList from "./components/ClientsList";
import UsersList from "./components/UserList";
import AddUser from "./components/AddUser";
import User from "./components/User";
import UserPassword from "./components/UserPassword";

import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";


class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/clients" className="navbar-brand">
            Eduardo App
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
            <Route path="/users/:id" component={UsersList} />
            <Route path="/users_add/:id" component={AddUser} />
            <Route path="/users_edit/:id" component={User} />
            <Route path="/users_edit_password/:id" component={UserPassword} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
