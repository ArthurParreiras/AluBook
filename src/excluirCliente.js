document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.btn');
    button.addEventListener('click', () => {
        const cpf = document.getElementById('cpf').value;

        if (cpf) {
            fetch('SUA_URL_DO_SERVIDOR', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cpf: cpf }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na requisição');
                }
                return response.json();
            })
            .then(data => {
                alert('Cliente excluído com sucesso');
                // Aqui você pode adicionar mais lógica, como redirecionar para outra página
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Erro ao excluir cliente');
            });
        } else {
            alert('Por favor, insira o CPF do cliente.');
        }
    });
});
