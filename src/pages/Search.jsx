

//




import React, { Component } from "react";

import Movies from "../services/Movies";
/*
  Using localStorage is similar to how we use
  dictionarys. 
  
  To set a variable call `localStorage.set("key", value)`
  To get a variable call `localStorage.get("key")`

  Local Storage persists through website refreshes so
  it is perfect for storing things we dont want to lose
  like a users session

  You must call `const localStorage = require("local-storage");`
  in any class that you want to use this in, it is the same
  local storage in the entire website regardless of where you call
  it as each website gets the same instance of the storage.

  So think of it as a global dictionary.
*/
const localStorage = require("local-storage");

class Search extends Component {
  state = {
    searchTitle: "",
    searchYear: "",
    searchDirector: "",
    searchGenre: "",
    searchKeywords: "",
    filterPageLimit: "10",
    filterSortBy: "title",
    filterDirection: "asc",
    offset: 0,
    movie_id: "",
    movies: []

  };

  handleSubmit = e => {
    e.preventDefault();

    const {searchTitle, searchYear, searchDirector, searchGenre, searchKeywords, filterPageLimit, filterSortBy, filterDirection, offset} = this.state;
    if(searchKeywords.trim() != "") {
      Movies.browse(searchKeywords, filterPageLimit, filterSortBy, filterDirection, offset).then(response => {
        alert(JSON.stringify(response.data, null, 4));
        console.log(typeof(response.data.movies));
        this.updateMovies(response.data.movies);
      }).catch(error => alert(error));
    } else {
      Movies.search(searchTitle, searchYear, searchDirector, searchGenre, filterPageLimit, filterSortBy, filterDirection, offset).then(response => {
        alert(JSON.stringify(response.data, null, 4));
        console.log(typeof(response.data.movies));
        this.updateMovies(response.data.movies);
      }).catch(error => alert(error));
    }

  }

  updateMovies = (responseResults) => {
    this.setState({movies: responseResults})
  };

  // makeHeaders = () => {
  //   let header = Object.keys(this.state.movies)
  //     return header.map((key, index) => {
  //        return <th key={index}>{key.toUpperCase()}</th>
  //     })
  // };

  checkDetails = e => {
    console.log("MOVIE_ID: " + e)
    Movies.details(e).then(response => {
      alert(JSON.stringify(response.data, null, 4));
      let resultCode = response.data.resultCode;
      console.log(resultCode);
      resultCode == JSON.stringify(210) && this.props.history.push({
                                                              pathname: "/details",
                                                              state: {movie: response.data.movie}
                                                            });;
    }).catch(error => alert(error));

  };

  showMovies = (movies) => {
    //const {movies} = this.state
    if(movies) {
      return movies.map((movie) => {
        const {title, year, director, movie_id } = movie //destructuring
        console.log("movie_id before passing: " + movie_id)
        return (
           <tr key = {title} onClick = {() => this.checkDetails(movie_id)}>
              <td>{title}</td>
              <td>{year}</td>
              <td>{director}</td>  
           </tr>
        )
     })
    } else {
      return (<tr></tr>)
    }
  };

  updateField = e => {
    const { name, value } = e.target;
    this.setState({[name]: value });
  };

  updateFieldHandleSubmit = e => {
    this.updateField(e);
    this.handleSubmit(e);
  };

  addToOffset = e => {

    const {offset} = this.setState
    console.log("OFFSET:" + offset+e)
    this.setState({offset: offset+e})
  }
  render() {

    const { searchTitle, searchYear, searchDirector, searchGenre, searchKeywords, filterPageLimit, filterSortBy, filterDirection, offset, movies } = this.state;
    return (
      <div className="form-searchbox">
        <h1>Search</h1>
        <form onSubmit={this.handleSubmit}>
          <label className="form-label">Search</label>
          <input
            className="form-input"
            type="searchTitle"
            name="searchTitle"
            value={searchTitle}
            placeholder="title"
            onChange={this.updateField}
          />
          <input
            className="form-input"
            type="searchYear"
            name="searchYear"
            value={searchYear}
            placeholder="year"
            onChange={this.updateField}
          />
          <input
            className="form-input"
            type="searchDirector"
            name="searchDirector"
            value={searchDirector}
            placeholder="director"
            onChange={this.updateField}
          />
          <input
            className="form-input"
            type="searchGenre"
            name="searchGenre"
            value={searchGenre}
            placeholder="genre"
            onChange={this.updateField}
          />

          <label className="form-label">SearchKeywords</label>
          <input
            className="form-input"
            type="searchKeywords"
            name="searchKeywords"
            value={searchKeywords}
            placeholder="invasion, alien, based on comic"
            onChange={this.updateField}
          />
          <button className="form-button">Search</button>

          <label>Choose a page limit:</label>
          <select name = "filterPageLimit" value = {filterPageLimit} onChange = {this.updateFieldHandleSubmit} 
              className="form-select">
            <option value= "10" >10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>

          <label>Sort by:</label>
          <select name = "filterSortBy" value = {filterSortBy} onChange = {this.updateFieldHandleSubmit} 
              className="form-select">
            <option value="title">title</option>
            <option value="director">director</option>
            <option value="year">year</option>
            <option value="rating">rating</option>
          </select>

          <label>Direction of sort:</label>
          <select name = "filterDirection" value = {filterDirection} onChange = {this.updateFieldHandleSubmit} 
              className="form-select">
            <option value="asc">asc</option>
            <option value="desc">desc</option>
          </select>
          
        <h1>Movies</h1>
        <table id = "movies" className = "form-searchbox">
          <tbody>
          {/* <tr>{this.makeHeaders()}</tr> */}
            {this.showMovies(movies)}

          </tbody>

          <button onClick ={() => this.addToOffset(filterPageLimit)}className="form-button">Next</button>
        </table>
        </form>
      </div>
    );
  }
}

export default Search;
