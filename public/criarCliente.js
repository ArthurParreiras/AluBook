document.getElementById('criarClienteForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const dados = {
        nome: formData.get('nome'),
        telefone: formData.get('telefone'),
        cpf: formData.get('cpf')
    };

    try {
        const response = await fetch('http://localhost:3000/criar-cliente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            alert(`Erro ao criar cliente: ${errorResponse.error}`);
            return;
        }

        const result = await response.json();
        alert(result.message);
        form.reset();
    } catch (error) {
        console.error('Erro ao criar cliente:', error);
        alert('Erro ao criar cliente.');
    }
});
