document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.btn');
    button.addEventListener('click', () => {
        const bookId = document.getElementById('bookId').value;

        if (bookId) {
            fetch('SUA_URL_DO_SERVIDOR', {
                method: 'POST', // ou DELETE, dependendo da sua API
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: bookId }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na requisição');
                }
                return response.json();
            })
            .then(data => {
                alert('Livro excluído com sucesso');
                // Aqui você pode adicionar mais lógica, como redirecionar para outra página
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Erro ao excluir livro');
            });
        } else {
            alert('Por favor, insira o ID do livro.');
        }
    });
});
