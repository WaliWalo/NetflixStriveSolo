const url = "https://striveschool-api.herokuapp.com/api/movies/";
const header =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFiYzU3MjRiY2RlMTAwMTc2MTZhODgiLCJpYXQiOjE2MDUwOTk0NzksImV4cCI6MTYwNjMwOTA3OX0.i0zGdN0uflyPVQUp85NtplJivQFLB8qmDUeGYmurw1Y";
getMoviesGenre = async () => {
  try {
    let response = await fetch(url, {
      headers: {
        Authorization: header,
      },
    });

    let movies = await response.json();
    return movies;
  } catch (error) {
    alert(error);
  }
};
getMovies = async (genre) => {
  try {
    let response = await fetch(url + genre, {
      headers: {
        Authorization: header,
      },
    });

    let movies = await response.json();
    return movies;
  } catch (error) {
    alert(error);
  }
};
