document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-btn');
    const searchInput = document.getElementById('test');
  
    // Search button click event
    searchButton.addEventListener('click', () => {
      const searchTerm = searchInput.value.trim();
      if (searchTerm !== '') {
        // Perform search logic
        fetch(`/googleBooks/search?userSearch=${searchTerm}`)
          .then((response) => response.json())
          .then((data) => {
            // Handle the search results
            console.log(data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  });
  
















// const searchForBook = () => {
//   const userSearch = document.querySelector('#test').value;
//   console.log('userSearch', userSearch);

//   fetch(`/api/google-books/search?userSearch=${encodeURIComponent(userSearch)}`)
//     .then(response => response.json())
//     .then(result => {
//       console.log(result);
//     });
// }

// document.querySelector('#search-btn').addEventListener('click', searchForBook);


// // const searchForBook = () => {
// //   const userSearch = document.querySelector('#test').value;
// //   console.log('userSearch', userSearch);

// //   fetch(`/api/search?query=${userSearch}`)
// //     .then(response => response.json())
// //     .then(result => {
// //       console.log(result);
// //     });
// // };

// document.querySelector('#search-btn').addEventListener('click', searchForBook);



// require('dotenv').config();
// const apiKey = process.env.API_KEY;

// const searchForBook = () => {
//   const userSearch = document.querySelector('#test').value;
//   console.log('userSearch', userSearch)

//   fetch(`https://www.googleapis.com/books/v1/volumes?q=${userSearch}&key=${apiKey}`)
//     .then(response => response.json())
//     .then(result => {
//   console.log(result)
//   })

// }

// document.querySelector('#search-btn').addEventListener('click', searchForBook);

// google.books.load();

// function initialize() {
//   let searchInput = '';

//   let search = new google.books.Search();
//   search.execute(searchInput, function(books) {
//     for (let i = 0, i < books.length; i++) {
//       let book = books[i];
//       console.log(book.title);
//     }
//   });
// }

// google.books.setOnLoadCallBack(initialize);