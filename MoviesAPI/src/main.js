const API_URL = "https://movies-json-server.vercel.app/movies";

async function fetchMovies() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching movies:", error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Failed to load movies. Please try again later.",
    });
    return [];
  }
}

async function deleteMovie(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete movie");
        }
        Swal.fire({
          title: "Deleted!",
          text: "The movie has been deleted.",
          icon: "success",
        });
        updateDisplayedMovies();
      } catch (error) {
        console.error("Error deleting movie:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to delete movie. Please try again later.",
        });
      }
    }
  });
}

function displayMovies(movies) {
  const container = document.getElementById("movieCards");
  container.innerHTML = "";

  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("col-md-4", "mb-4");

    card.innerHTML = `
      <div class="card h-100" data-id="${movie.id}">
        <img src="${movie.image}" alt="${movie.title}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">Year: ${movie.year}</p>
          <p class="card-text">Genre: ${movie.crew}</p>
          <button class="btn btn-danger delete-btn">Delete</button>
        </div>
      </div>
    `;

    card.querySelector(".delete-btn").addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent the card click event
      deleteMovie(movie.id);
    });

    card.addEventListener("click", () => {
      window.location.href = `detail.html?id=${movie.id}`;
    });

    container.appendChild(card);
  });
}

async function updateDisplayedMovies() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const sortOrder = document.getElementById("sortSelect").value;

  let movies = await fetchMovies();

  if (searchInput) {
    movies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchInput)
    );
  }

  if (sortOrder === "asc") {
    movies.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    movies.sort((a, b) => b.title.localeCompare(a.title));
  }

  displayMovies(movies);
}

document.addEventListener("DOMContentLoaded", () => {
  updateDisplayedMovies();

  document
    .getElementById("searchInput")
    .addEventListener("input", updateDisplayedMovies);

  document
    .getElementById("sortSelect")
    .addEventListener("change", updateDisplayedMovies);
});
