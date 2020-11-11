fetch('/files/movie.json')
  .then(response => response.text())
  .then(text => {
console.log(text);
})

