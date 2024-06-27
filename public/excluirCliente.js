document.querySelector('.btn').addEventListener('click', function() {
    const cpf = document.getElementById('cpf').value.trim();

    if (!cpf) {
        alert('Por favor, insira um CPF.');
        return;
    }

    excluirCliente(cpf);
});

function excluirCliente(cpf) {
    fetch(`http://localhost:3000/excluir-cliente/${cpf}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert('Erro: ' + data.error);
        } else {
            alert('Cliente excluído com sucesso!');
            document.getElementById('cpf').value = ''; // Limpar o campo CPF após a exclusão
        }
    })
    .catch(error => {
        console.error('Erro ao excluir cliente:', error);
        alert('Erro ao excluir cliente.');
    });
}


