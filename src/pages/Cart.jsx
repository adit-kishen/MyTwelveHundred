import React, { Component } from "react";

import Billing from "../services/Billing";



class Cart extends Component {
  state = {
    items: [],
    total: 0
  };

  componentDidMount() {
    {this.getItems()}
    {this.getTotal()}
  };

  getTotal = () => {

    const {items} = this.state
    let tota = 0;
    if (items !== undefined) {
      tota = items.reduce((tot, item) => tot + ((item.unit_price*(1-item.discount)) *item.quantity), 0);
    } 
    console.log(items)
    console.log(tota)
    this.setState({total:tota.toFixed(2)})

  };
  getItems = () => {
    console.log("YOYO")
    Billing.retrieveCart().then(response => {
      alert(JSON.stringify(response.data, null, 4));
      console.log(response.data.items);
      this.updateItems(response.data.items)
    }).catch(error => alert(error));
  };

  updateItem = e => {
    const{movie_id, quantity} = e.target;
    console.log(movie_id)
    console.log(quantity)
  };

  updateChange = (movie_id, qty) => {
      console.log(movie_id)
      console.log(qty)

    if(qty != 0) {
      Billing.updateCart(movie_id, qty).then(response => {
        alert(JSON.stringify(response.data, null, 4));
        this.getItems();
      }).catch(error => alert(error));
    } else {
      alert("Quantity must be > 0", null, 4)
    }


  };
  updateField = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  placeOrder = () => {
    const {items} = this.state

    if (items != []) {
      Billing.placeOrder().then(response => {
        alert(JSON.stringify(response.data, null, 4));
        if(response !== undefined) {
          let url = response.data.approve_url;
          console.log(url)
          window.open(url)
        }
      }).catch(error => alert(error));
    } else {
      alert("Nothing in cart", null, 4)
    }
  };
  deleteMovie = (movie_id) => {

    Billing.deleteCart(movie_id).then(response => {
      alert(JSON.stringify(response.data, null, 4));
      this.getItems();
    }).catch(error => alert(error));

  };
  showCart = () => {
    const {items } = this.state
    if(items) {
      return items.map((item) => {
        const {movie_title, quantity, movie_id, unit_price, discount} = item //destructuring
        let qty = this.qty
        console.log(movie_title)
        console.log(discount)

        console.log(unit_price)
        console.log(quantity)

        let totalUnit = (quantity*(1-discount)*unit_price).toFixed(2);
        
        console.log(totalUnit)
          return (
            <tr key = {movie_title} >
                <td>{movie_title}</td>
                <td>{quantity}</td>
                <td>${totalUnit}</td>
                <td>
                  <label>Change Quantity:</label>
                    <input
                        className="form-input"
                        type="qty"
                        name="qty"
                        placeholder = {quantity}
                        value={qty}
                        onChange = {this.updateField}
                      /> 
                      <button onClick={() => this.updateChange(movie_id, this.state.qty)} className="form-button">Change Quant</button>
                      </td>
                <td> <button onClick={() => this.deleteMovie(movie_id)} className="form-button">Delete Item</button></td>
            </tr>
            
          )
     })
    } else {
      return (<tr></tr>)
    }
  };


  updateItems = (responseResults) => {
    this.setState({items: responseResults})
  };

  render() {
    const{total} = this.state
    console.log("WE HERE" + this.state.items)
    return (
      <div>
        <h1>Cart</h1>
        <table id = "movies" className = "form-searchbox">
          <tbody>
            <th> Movie </th>
            <th>Quantity</th>
            <th>Total</th>
            <th> Change Quantity</th>
            <th>DELETE</th>
            <th></th>
            {this.showCart()}
          <tr> <td> ${total} <button onClick={() => this.getTotal()} className="form-button">Show Total</button></td></tr>
            
          </tbody>

          <button onClick={this.placeOrder} className="form-button">Complete Order</button>
        </table>
       
      </div>
    );
  }
}

export default Cart;
