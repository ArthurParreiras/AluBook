    
    document.addEventListener('DOMContentLoaded', () => {
    let currentPage = 1;
  
    const fetchBooks = (page) => {
      fetch(`http://localhost:3000/books?page=${page}`)
        .then(response => response.json())
        .then(data => {
          displayBooks(data);
        })
        .catch(error => console.error('Error fetching books:', error));
    };
  
    const displayBooks = (books) => {
      const tbody = document.querySelector('.display-livros tbody');
      tbody.innerHTML = '';
  
      books.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${book.nome}</td>
          <td>${book.autor}</td>
          <td>${book.ano}</td>
          <td>${book.genero}</td>
          <td>${book.quantidade}</td>
        `;
        tbody.appendChild(row);
      });
    };
  
    document.querySelector('#nextPage').addEventListener('click', () => {
      currentPage++;
      fetchBooks(currentPage);
    });
  
    document.querySelector('#prevPage').addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        fetchBooks(currentPage);
      }
    });
  
    fetchBooks(currentPage);
  });