import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsDown,
  faThumbsUp,
  faImage,
  faMoneyCheckAlt,
  faSearchDollar,
} from "@fortawesome/free-solid-svg-icons";
class App extends Component {
  state = {
    isLoading: false,
    invoices: [],
  };
  remove(id) {
    let updatedInvoice = [...this.state.invoices].filter((i) => i.id !== id);
    this.setState({ invoices: updatedInvoice });
  }
  async componentDidMount() {
    const response = await fetch(
      "https://wjup2fhfo7.execute-api.us-east-1.amazonaws.com/Dev"
    );
    const body = await response.json();
    this.setState({ invoices: body, isLoading: false });
  }
  render() {
    const isLoading = this.state.isLoading;
    const allInvoices = this.state.invoices;

    if (isLoading) return <div>Loading...</div>;
    let invoices = allInvoices.map((invoices) => (
      <tr key={invoices.id}>
        <td>{invoices.Vendor}</td>
        <td>{invoices.Amount}</td>
        <td>{invoices.InvoiceNum}</td>
        <td>{invoices.Date}</td>
        <td>
          <Button
            className="btn btn-lg btn-success"
            onClick={() => this.remove(invoices.id)}
          >
            <FontAwesomeIcon icon={faThumbsUp} />
            OK
          </Button>
        </td>
        <td>
          <Button
            className="btn btn-lg btn-danger"
            onClick={() => this.remove(invoices.id)}
          >
            <FontAwesomeIcon icon={faThumbsDown} />
            NOK
          </Button>
        </td>
        <td>
          <Button
            className="btn btn-lg btn-info"
            onClick={() => this.remove(invoices.id)}
          >
            <FontAwesomeIcon icon={faMoneyCheckAlt} />
            50%
          </Button>
        </td>
        <td>
          <Button
            className="btn btn-lg btn-warning"
            onClick={() => this.remove(invoices.id)}
          >
            <FontAwesomeIcon icon={faSearchDollar} />
            ??
          </Button>
        </td>
        <td>
          <Button
            className="btn btn-lg btn-info"
            onClick={() => this.remove(invoices.id)}
          >
            <FontAwesomeIcon icon={faImage} />
            Image
          </Button>
        </td>
      </tr>
    ));

    return (
      <div className="container border border-secondary rouded center">
        <div className="row">
          <div className="col-12">
            <h4>Pending Invoices - The Test Comapny</h4>
          </div>
        </div>

        <div className="row">
          <div className=".col-xs-12 center text-center">
            <Table dark responsive striped bordered hover>
              <thead>
                <tr>
                  <th>Vendor</th>
                  <th>Amount</th>
                  <th>Invoice</th>
                  <th>Date</th>
                  <th colSpan="4">Actions</th>
                  <th>Image</th>
                </tr>
              </thead>

              <tbody>
                {this.state.invoices.length === 0 ? (
                  <td colSpan="9">All caught up!</td>
                ) : (
                  invoices
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
