import React, { Component } from "react";

import Billing from "../services/Billing";

class History extends Component {
  state = {
    items: []
  };


  componentDidMount() {
    {this.getHistory()}
  };

  updateItems = (responseResults) => {
    this.setState({items: responseResults})
  };

  getHistory = () => {
    Billing.retrieveOrder().then(response => {
      alert(JSON.stringify(response.data, null, 4));
      console.log("HI" + response.data.transactions[0].items[0]);
      this.updateItems(response.data.transactions[0].items)
    }).catch(error => alert(error));
  };

  showHistory = () => {
      const {items} = this.state
      if(items) {
        console.log("items" + items)
        return items.map((item) => {
          const {sale_date, quantity, unit_price, discount} = item //destructuring
          let total = (unit_price*quantity*(1-discount)).toFixed(2);
            return (
              <tr key = {sale_date} >
                  <td>{sale_date}</td>
                  <td>{quantity}</td>
                  <td>${total}</td>
              </tr>
            )
       })
      } else {
        return (<tr></tr>)
      }

  };

  render() {
    const {items} = this.state
    return (
      <div>
        <h1>History</h1>
        <table id = "movies" className = "form-searchbox">
          <tbody>
            <th>Date</th>
            <th>Quantity</th>
            <th>Total</th>
              {this.showHistory(items)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default History;
