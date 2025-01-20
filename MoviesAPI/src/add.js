document.getElementById('addMovieForm').addEventListener('submit', async function(e) {
      e.preventDefault();
  
      const title = document.getElementById('title').value;
      const poster = document.getElementById('poster').value;
      const genre = document.getElementById('genre').value;
  
      try {
          await axios.post('https://movies-json-server.vercel.app/movies', {
              title,
              poster,
              genre
          });
  
          window.location.href = 'index.html'; 
      } catch (error) {
          console.error("Error adding movie", error);
      }
  });