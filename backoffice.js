const handleSubmit = (e) => {
  e.preventDefault();
  submitMovie();
};

let id = null;
const submitMovie = async () => {
  let spinner = document.querySelector("#loadingSpinner");
  console.log(spinner);
  spinner.classList.toggle("d-none"); // showing the spinner
  let movie = {
    name: document.querySelector("#name").value,
    description: document.querySelector("#desc").value,
    category: document.querySelector("#category").value,
    imageUrl: document.querySelector("#img").value,
  };
  let urlParams = new URLSearchParams(window.location.search);
  id = urlParams.get("id");
  try {
    let response;
    if (id) {
      response = await fetch(url + id, {
        method: "PUT",
        body: JSON.stringify(movie),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: header,
        }),
      });
    } else {
      response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(movie),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: header,
        }),
      });
    }

    if (response.ok) {
      spinner.classList.toggle("d-none");
      // checking the ok property which stores the successful result of the operation
      alert(`Product ${id ? "updated" : "created"} successfully`);
      location.assign("index.html");
    } else {
      spinner.classList.toggle("d-none");
      alert("Something went wrong!");
    }
  } catch (error) {
    console.log(error);
  }
};
let count = 1;
loadMoviesTab = async () => {
  let genre = await getMoviesGenre();
  let moviesString = "";
  let tBody = document.querySelector("tbody");
  tBody.innerHTML = "";
  genre.forEach(async (element) => {
    let movies = await getMovies(element);
    movies.forEach((movie) => {
      moviesString += `<tr>
                            <th scope="row">${count++}</th>
                            <td>${movie.name}</td>
                            <td>${movie.category}</td>
                            <td>${movie.updatedAt.split("T")[0]}</td>
                            <td>
                                <a onclick="removeMovie('${
                                  movie._id
                                }')"><i class="fas fa-window-close"></i></a>
                                <a href="backoffice.html?id=${movie._id}">
                                <i class="fas fa-edit"></i>
                                </a>
                            </td>
                        </tr>`;
    });
    tBody.innerHTML = moviesString;
  });
};

removeMovie = async (id) => {
  try {
    let response = await fetch(url + id, {
      method: "DELETE",
      headers: {
        Authorization: header,
      },
    });
    if (response.ok) {
      window.location.reload();
    } else {
      console.log("Something went wrong");
    }
  } catch (error) {
    console.log(error);
  }
};

window.onload = async () => {
  let loggedUser = JSON.parse(myStorage.getItem("user"));
  loginForm(loggedUser);
  loadMoviesTab();

  let urlParams = new URLSearchParams(window.location.search);
  id = urlParams.get("id");
  console.log(id);
  if (id) {
    let genre = await getMoviesGenre();
    genre.forEach(async (element) => {
      let movies = await getMovies(element);
      console.log(movies);
      movies.forEach((movie) => {
        if (movie._id === id) {
          document.getElementById("name").value = movie.name;
          document.getElementById("desc").value = movie.description;
          document.getElementById("category").value = movie.category;
          document.getElementById("submitBtn").value = "Update Movie";
        }
      });
    });
  }
};
