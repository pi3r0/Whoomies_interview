/**
 * gets the comments for one movie. 
 * @param {String} moveiId -
 * @param {Number} limit -
 * @returns {[Comments]}
 */

const findCommentsByMovie = async (movieId, limit = 30) => {
  if (movieId === undefined) {
    throw "Movie params must be set";
  }

  let commentsForTheMovie = await allCommentsQuery(movieId).find();

  return commentsForTheMovie === undefined ? [] : commentsForTheMovie;
};

const allCommentsQuery = (movieId, limit) => {
  let commentsQuery = new Parse.Query("Comments");
  commentsQuery.include(["movie"]);

  if (movieId !== undefined) {
    let searchedMovie = new Parse.Object("Movies");
    searchedMovie.id = movieId;
    commentsQuery.equalTo("movie", searchedMovie);
  }

  if (limit !== undefined) {
    commentsQuery.limit(limit);
  }

  return commentsQuery;
};

module.exports = exports = { findCommentsByMovie };