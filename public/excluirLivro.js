document.addEventListener('DOMContentLoaded', function () {
    const button = document.querySelector('button');

    button.addEventListener('click', function () {
        const idLivro = document.getElementById('cpf').value;

        fetch('http://localhost:3000/livros/' + idLivro, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert(result.message);
            } else {
                alert('Erro: ' + result.message);
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao excluir livro.');
        });
    });
});

