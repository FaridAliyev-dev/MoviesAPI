async function loadMovieDetail(id) {
  try {
    const response = await fetch(
      `https://movies-json-server.vercel.app/movies/${id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }
    const movie = await response.json();

    const genres = Array.isArray(movie.genres)
      ? movie.genres.join(", ")
      : "N/A";
    const actors = Array.isArray(movie.actors)
      ? movie.actors.join(", ")
      : "N/A";

    const movieDetail = `
        <div class="card">
          <img src="${movie.image}" class="card-img-top" alt="${movie.title}">
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">Full Title: ${movie.fullTitle}</p>
            <p class="card-text">Year: ${movie.year}</p>
            <p class="card-text">Crew: ${movie.crew}</p>
            <p class="card-text">Rating: ${movie.imDbRating}</p>
            <p class="card-text">Rating Count: ${movie.imDbRatingCount}</p>
            <p class="card-text">Bookmarked: ${
              movie.isBookmarked ? "Yes" : "No"
            }</p>
          </div>
        </div>
      `;
    document.getElementById("movieDetail").innerHTML = movieDetail;
  } catch (error) {
    console.error("Error fetching movie details", error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Failed to load movie details. Please try again later.",
    });
  }
}

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

if (movieId) {
  loadMovieDetail(movieId);
}
