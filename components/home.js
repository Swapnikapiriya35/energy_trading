import React, { Component } from "react";
import { Link } from "react-router-dom";

import UserService from "../services/user-service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
          <div>
            <Link to="/add-transaction" className="btn btn-primary mr-2">Add Transaction</Link>
            <Link to="/delete-transaction" className="btn btn-danger mr-2">Delete Transaction</Link>
            <Link to="/view-transactions" className="btn btn-success mr-2">View Past Transactions</Link>
            <Link to="/query-transaction" className="btn btn-info">Query Transaction</Link>
            <Link to="/transaction-status" className="btn btn-info">Transaction Status</Link>
          </div>
        </header>
      </div>
    );
  }
}
