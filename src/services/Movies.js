import { moviesEPs } from "../Config.json";
import Socket from "../util/Socket";

const { searchEP, browseEP, detailsEP } = moviesEPs;

async function search(searchTitle, searchYear, searchDirector, searchGenre, filterPageLimit, filterSortBy, filterDirection, offset) {
  let path = ""
  let first = true

  console.log(searchTitle)
  console.log(searchYear)
  console.log(searchDirector)
  console.log(searchGenre)
  console.log(filterPageLimit)
  console.log(filterSortBy)
  console.log(filterDirection)
  
  if(searchTitle.trim() != "") {
    path = path + "?title=" + searchTitle;
    first = false;
  }

  if(searchYear.trim() != "") {
    if(first) {
      path = path + "?year=" + searchYear;
      first = false
    } else {
      path = path + "&year=" + searchYear;
    }
  }

  if(searchDirector.trim() != "") {
    if(first) {
      path = path + "?director=" + searchDirector;
      first = false
    } else {
      path = path + "&director=" + searchDirector;
    }
  }

  if(searchGenre.trim() != "") {
    if(first) {
      path = path + "?genre=" + searchGenre;
      first = false
    } else {
      path = path + "&genre=" + searchGenre;
    }
  }

  if(filterPageLimit.trim() != "") {
    if(first) {
      path = path + "?limit=" + filterPageLimit;
      first = false
    } else {
      path = path + "&limit=" + filterPageLimit;
    }
  }

  if(filterSortBy.trim() != "") {
    path = path + "&orderby=" + filterSortBy;
  }

  if(filterDirection.trim() != "") {
    path = path + "&direction=" + filterDirection;
  }

  // if(offset !== undefined) {
  //   path = path + "&offset=" + offset;
  // }

  path = searchEP + path;

  console.log("PATH: " + path)

  return await Socket.GET(path);
}

async function browse(searchKeywords, filterPageLimit, filterSortBy, filterDirection, offset) {
  let path = ""
  let first = true

  console.log(searchKeywords)
  console.log(filterPageLimit)
  console.log(filterSortBy)
  console.log(filterDirection)

  path = path + "/" + searchKeywords;

  path = path + "?limit=" + filterPageLimit;

  path = path + "&orderby=" + filterSortBy;

  path = path + "&direction=" + filterDirection;
  
  // if(offset !== undefined) {
  //   path = path + "&offset=" + offset;
  // }

  path = browseEP + path;

  console.log("PATH: " + path)

  return await Socket.GET(path);
}


async function details(movie_id) {
  let path = ""

  console.log(movie_id)

  path = path + "/" + movie_id;
  path = detailsEP + path;

  console.log("PATH: " + path)

  return await Socket.GET(path);
}

export default {
  search,
  browse,
  details
};
