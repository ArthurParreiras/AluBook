document.getElementById('criar-emprestimo-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const dados = {
        idEmprestimo: formData.get('idEmprestimo'),
        nomeCliente: formData.get('nomeCliente'),
        nomeLivro: formData.get('nomeLivro')
    };

    try {
        const response = await fetch('http://localhost:3000/criar-emprestimo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            alert(`Erro ao criar empréstimo: ${errorResponse.error}`);
            return;
        }

        const result = await response.json();
        alert(result.message);
        form.reset();
    } catch (error) {
        console.error('Erro ao criar empréstimo:', error);
        alert('Erro ao criar empréstimo.');
    }
});

document.getElementById('remover-emprestimo-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const idEmprestimo = event.target.idEmprestimo.value.trim();

    if (!idEmprestimo) {
        alert('Por favor, insira um ID de empréstimo.');
        return;
    }

    excluirEmprestimo(idEmprestimo);
});

function excluirEmprestimo(idEmprestimo) {
    fetch(`http://localhost:3000/excluir-emprestimo/${idEmprestimo}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert('Erro: ' + data.error);
        } else {
            alert('Empréstimo excluído com sucesso!');
            document.getElementById('remover-emprestimo-form').reset(); // Limpar o campo ID após a exclusão
        }
    })
    .catch(error => {
        console.error('Erro ao excluir empréstimo:', error);
        alert('Erro ao excluir empréstimo.');
    });
}





  


