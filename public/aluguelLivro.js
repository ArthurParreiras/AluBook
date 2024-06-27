document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const nomeLivro = form.nome.value;
        const idLivro = form.username.value;
        const autor = form.password.value;
        const cpfCliente = form.password.value;
        const data = form.password.value;

        // Verificação dos campos
        try {
            const response = await fetch('/api/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nomeLivro, idLivro, autor, cpfCliente })
            });

            const result = await response.json();

            if (result.error) {
                alert(result.error);
            } else {
                const response = await fetch('/api/aluguel', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ nomeLivro, idLivro, autor, cpfCliente, data })
                });
                
                if (response.ok) {
                    alert('Empréstimo cadastrado com sucesso');
                } else {
                    alert('Erro ao cadastrar o empréstimo');
                }
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao verificar os dados do formulário');
        }
    });
});

