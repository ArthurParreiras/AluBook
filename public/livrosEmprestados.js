document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3000/emprestimos')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar os empréstimos');
            }
            return response.json();
        })
        .then(data => {
            const tbody = document.querySelector('tbody');
            tbody.innerHTML = ''; // Limpa o conteúdo anterior
            data.forEach(emprestimo => {
                const tr = document.createElement('tr');

                const tdNomeLivro = document.createElement('td');
                tdNomeLivro.textContent = emprestimo.nomeLivro;
                tr.appendChild(tdNomeLivro);

                const tdNomeCliente = document.createElement('td');
                tdNomeCliente.textContent = emprestimo.nomeCliente;
                tr.appendChild(tdNomeCliente);

                const tdIdEmprestimo = document.createElement('td');
                tdIdEmprestimo.textContent = emprestimo.idEmprestimo;
                tr.appendChild(tdIdEmprestimo);

                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar os dados dos empréstimos:', error);
        });
});


