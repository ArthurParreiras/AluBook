document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Previne o comportamento padrão de redirecionamento do formulário

        const formData = new FormData(form);
        const data = {
            autor: formData.get('autor'),
            nomeLivro: formData.get('namelivro'),
            genero: formData.get('genlivro'),
            idLivro: formData.get('idlivro')
        };

        fetch('http://localhost:3000/livros', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert(result.message);
                form.reset(); // Limpa o formulário
            } else {
                alert('Erro: ' + result.message);
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao cadastrar livro.');
        });
    });
});


