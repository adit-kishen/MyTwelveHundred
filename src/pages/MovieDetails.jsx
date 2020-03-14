import React, { Component, Fragment } from "react";

import "../css/form.css";
import Billing from "../services/Billing";


class MovieDetails extends Component {
  state = {
    quantity: 0
  };

  handleSubmit = e => {
    const {quantity} = this.state

    console.log(quantity)
    console.log("MOVIE_ID IN MOVIEDEETS: " + e)

    if(quantity != 0) {
      Billing.insertCart(quantity, e).then(response => {
        alert(JSON.stringify(response.data, null, 4));
        console.log(response.data);
      }).catch(error => alert(error));
    } else {
      alert("Quantity must be > 0", null, 4)
    }
  };

  updateField = e => {
    const { name, value } = e.target;
    this.setState({[name]: value });
  };
  
  render() {

    const {quantity} = this.state
    const {movie} = this.props.location.state;

    console.log("MOVIE: " + movie);
    const {movie_id, title, year, director, rating, num_votes, budget, revenue, overview, backdrop_path, poster_path, genres, people } = movie;
    
    let posterPath = 'https://image.tmdb.org/t/p/w200' + poster_path;
    let backPath = 'https://image.tmdb.org/t/p/w500' + backdrop_path;
    console.log(posterPath);
    console.log(backPath);
    const ppl = people.map((person) =>
          <p>....{person.name}</p>
    );

    const gnres = genres.map((genre) => 
          <p>...{genre.name}</p>
      );

    return (
      <div className="form-box-scroll">
        <img src={posterPath} alt="Pic"></img>
        <h1>{title}</h1>
        <p> .....</p>
        <p> ...</p>
        <p> ..</p>
        <p>Year: {year}</p>
        <p>Director: {director} </p>
        <p>Rating: {rating} </p>
        <p>Number of Votes: {num_votes} </p>
        <p>Budget: ${budget} </p>
        <p>Revenue: ${revenue} </p>
        <p>Overview: {overview} </p> 
        <p>People: {}</p>
        {ppl}
        <p>Genres: {}</p>
        {gnres}
        <label>Quantity:</label>
        <input
            className="form-input"
            type="quantity"
            name="quantity"
            value={quantity}
            placeholder="50"
            onChange={this.updateField}
          />

        <button onClick={() => this.handleSubmit(movie_id)} className="form-button">Add to Cart</button>

        <img src={backPath} alt="Pic"></img>
        

      </div>
    );
  }
}

export default MovieDetails;
