window.onload = () => {
  let loggedUser = JSON.parse(myStorage.getItem("user"));
  loginForm(loggedUser);
  loadTvShows();
};

getMoviesString = async (moviesGenre) => {
  let container = document.querySelector("div.container-fluid");

  if (moviesGenre.length > 0) {
    moviesGenre.forEach(async (genre, index) => {
      let h4 = document.createElement("h4");
      h4.innerHTML = genre.toUpperCase();
      let carouselSlide = document.createElement("div");
      carouselSlide.classList.add("carousel", "slide");
      carouselSlide.setAttribute("data-ride", "carousel");
      carouselSlide.setAttribute("id", genre.toLowerCase());
      let carouselInner = document.createElement("div");
      carouselInner.classList.add("carousel-inner");
      const movies = await getMovies(genre);

      for (let i = 0; i < Math.ceil(movies.length / 6); i++) {
        let carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");
        if (i === 0) {
          carouselItem.classList.add("active");
        }
        let row = document.createElement("div");
        row.classList.add(
          "row",
          "my-4",
          "no-gutters",
          "text-center",
          "row-cols-1",
          "row-cols-md-2",
          "row-cols-lg-4",
          "row-cols-xl-6"
        );
        for (let j = i * 6; j < i + 1 * 6; j++) {
          if (movies[j] === undefined) {
            break;
          }
          let col = document.createElement("col");
          col.classList.add("col");
          let img = document.createElement("img");
          img.classList.add("img-fluid");
          img.setAttribute("type", "button");
          img.setAttribute("data-toggle", "modal");
          img.setAttribute("data-target", "#exampleModal");
          img.setAttribute("onclick", "imgOnclick(this)");
          img.setAttribute("id", movies[j]._id);
          img.setAttribute("src", `images/${movies[j].imageUrl.slice(12)}`);
          col.appendChild(img);
          row.appendChild(col);
        }
        carouselItem.appendChild(row);
        carouselInner.appendChild(carouselItem);
        carouselSlide.appendChild(carouselInner);
        container.appendChild(h4);
        container.appendChild(carouselSlide);
      }
      let carouselControlPrev = document.createElement("a");
      carouselControlPrev.classList.add("carousel-control-prev");
      carouselControlPrev.setAttribute("href", `#${genre.toLowerCase()}`);
      carouselControlPrev.setAttribute("role", "button");
      carouselControlPrev.setAttribute("data-slide", "prev");
      let carouselPrevIcon = document.createElement("span");
      carouselPrevIcon.classList.add("carousel-control-prev-icon");
      carouselPrevIcon.setAttribute("aria-hidden", "true");
      carouselControlPrev.appendChild(carouselPrevIcon);
      let srPrev = document.createElement("span");
      srPrev.classList.add("sr-only");
      srPrev.innerText = "Previous";
      carouselControlPrev.appendChild(srPrev);
      carouselSlide.appendChild(carouselControlPrev);

      let carouselControlNext = document.createElement("a");
      carouselControlNext.classList.add("carousel-control-next");
      carouselControlNext.setAttribute("href", `#${genre.toLowerCase()}`);
      carouselControlNext.setAttribute("role", "button");
      carouselControlNext.setAttribute("data-slide", "next");
      let carouselNextIcon = document.createElement("span");
      carouselNextIcon.classList.add("carousel-control-next-icon");
      carouselNextIcon.setAttribute("aria-hidden", "true");
      carouselControlNext.appendChild(carouselNextIcon);
      let srNext = document.createElement("span");
      srNext.classList.add("sr-only");
      srNext.innerText = "Next";
      carouselControlNext.appendChild(srNext);
      carouselSlide.appendChild(carouselControlNext);
    });
  } else {
    let h2 = document.createElement("h2");
    h2.innerHTML = "NO MOVIES";
    container.appendChild(h2);
  }
};

const imgOnclick = async (img) => {
  let genre = await getMoviesGenre();
  genre.forEach(async (element) => {
    let movies = await getMovies(element);
    movies.forEach(async (movie) => {
      //console.log(movie.id, img.id);
      if (movie._id === img.id) {
        console.log(movie);
        let modalTitle = document.querySelector(".modal-title");
        modalTitle.innerHTML = movie.name;
        let modalBody = document.querySelector(".modal-body");
        modalBody.innerHTML = `<img src="images/${movie.imageUrl.slice(
          12
        )}"></img>
                                <div><strong>Category: </strong>${
                                  movie.category
                                }</div>
                                <div><strong>Description: </strong>${
                                  movie.description
                                }</div>`;
      }
    });
  });
};

loadTvShows = async () => {
  const moviesGenre = await getMoviesGenre();
  getMoviesString(moviesGenre);
};
