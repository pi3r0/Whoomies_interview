/**
 * gets the comments for one movie. 
 * @param {String} moveiId -
 * @param {Number} limit -
 * @returns {[Comments]}
 */

const findCommentsByMovie = async (moveiId, limit = 30) => {
    if (moveiId === undefined) {
        throw "Movie params must be set"
    }
    
    let commentsForTheMovie = await allCommentsQuery(moveiId).find();
    
    return commentsForTheMovie === undefined ? [] : commentsForTheMovie
}

const allCommentsQuery = (movieId, limit) => {
 
  let commmentsQuery = new Parse.Query("Comments");
  commmentsQuery.include(["movie"])

  if (moveiId !== undefined) {
    let searchedMovie = new Parse.Object("Movies");
    searchedMovie.id = moveiId;
    commentsQuery.equalTo("movie", searchedMovie);
  }

  if (limit !== undefined) {
      commentsQuery.limit(limit);
  }

  return commmentsQuery;
};

module.exports = exports = { findCommentsByMovie };