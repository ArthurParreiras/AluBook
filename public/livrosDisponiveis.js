document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3000/livros')
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('livros-tbody');
            data.forEach(livro => {
                const tr = document.createElement('tr');
                
                const tdNome = document.createElement('td');
                tdNome.textContent = livro.nome_livro;
                tr.appendChild(tdNome);
                
                const tdAutor = document.createElement('td');
                tdAutor.textContent = livro.autor;
                tr.appendChild(tdAutor);

                const tdAno = document.createElement('td');
                tdAno.textContent = livro.anoLivro;
                tr.appendChild(tdAno);

                const tdGenero = document.createElement('td');
                tdGenero.textContent = livro.genero;
                tr.appendChild(tdGenero);

                const tdQuantidade = document.createElement('td');
                tdQuantidade.textContent = livro.qtdLivros;
                tr.appendChild(tdQuantidade);
                
                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar os dados dos livros:', error);
        });
});



