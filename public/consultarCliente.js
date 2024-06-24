// Seleciona o botão de consulta
const consultarBtn = document.querySelector('.btn');

// Adiciona um ouvinte de evento para o clique no botão de consulta
consultarBtn.addEventListener('click', () => {
    // Obtém o valor do CPF digitado pelo usuário
    const cpfCliente = document.getElementById('cpf').value;

    // Faz a requisição para a API utilizando o CPF do cliente como parâmetro
    fetch(`http://localhost:3000/api/clientes/${cpfCliente}`)
        .then(response => {
            // Verifica se a resposta da requisição foi bem-sucedida
            if (response.ok) {
                // Se a resposta foi bem-sucedida, converte-a para JSON
                return response.json();
            } else {
                // Se a resposta não foi bem-sucedida, lança um erro
                throw new Error('Erro ao consultar cliente');
            }
        })
        .then(data => {
            // Verifica se o cliente foi encontrado na base de dados
            if (data.length > 0) {
                // Se o cliente foi encontrado, exibe uma mensagem na tela
                alert('Cliente encontrado!');
            } else {
                // Se o cliente não foi encontrado, exibe uma mensagem na tela
                alert('Cliente não encontrado!');
            }
        })
        .catch(error => {
            // Se houver algum erro durante o processo, exibe uma mensagem na tela
            console.error('Erro:', error);
            alert('Erro ao consultar cliente');
        });
});
