import { billingEPs } from "../Config.json";
import Socket from "../util/Socket";

const { cartInsert, cartRetrieve, cartUpdate, orderPlace, cartDelete, orderRetrieve } = billingEPs;

const localStorage = require("local-storage");

async function insertCart(quant, movie_id) {
  let path = "";
  console.log(quant);
  console.log("MOVIE ID IN INSERT CART: " + movie_id);
  let email = localStorage.get("email");

  const data = {
    email: email, 
    movie_id: movie_id, 
    quantity: quant
  }  
  path = cartInsert + path;

  console.log("PATH: " + path)
  console.log("DATA: " + data)

  return await Socket.POST(path, data);
}

async function retrieveCart() {
  let path = "";
  let email = localStorage.get("email");
  const data = {
    email: email,
  };
  
  path = cartRetrieve + path;

  console.log("PATH: " + path)
  console.log("DATA: " + data)

  return await Socket.POST(path, data);
}


async function updateCart(movie_id, quantity) {
  let path = "";
  let email = localStorage.get("email");

  const data = {
    email: email, 
    movie_id: movie_id, 
    quantity: quantity
  }
  path = cartUpdate + path;

  console.log("PATH: " + path)
  console.log("DATA: " + data)

  return await Socket.POST(path, data);
}


async function deleteCart(movie_id) {
  let path = "";
  let email = localStorage.get("email");
  const data = {
    email: email,
    movie_id: movie_id
  };
  
  path = cartDelete + path;

  console.log("PATH: " + path)
  console.log("DATA: " + data)

  return await Socket.POST(path, data);
}

async function retrieveOrder() {
  let path = "";
  let email = localStorage.get("email");
  const data = {
    email: email,
  };
  
  path = orderRetrieve + path;

  console.log("PATH: " + path)
  console.log("DATA: " + data)

  return await Socket.POST(path, data);
}

async function placeOrder() {
  let path = "";
  let email = localStorage.get("email");

  const data = {
    email: email,
  };
  
  path = orderPlace + path;

  console.log("PATH: " + path)
  console.log("DATA: " + data)

  return await Socket.POST(path, data);
}



export default {
  insertCart,
  retrieveCart,
  updateCart,
  placeOrder,
  retrieveOrder,
  deleteCart
};


