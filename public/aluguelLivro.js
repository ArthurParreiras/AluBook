document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const idLivro = form.elements['username'].value;
        const cpfCliente = form.elements['password'].value;
        const data = form.elements['password'].value;

        try {
            const response = await fetch('/alugueis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idLivro, cpfCliente, data })
            });

            const result = await response.json();

            if (response.ok) {
                alert('Empréstimo criado com sucesso');
            } else {
                alert(`Erro: ${result.error}`);
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao criar empréstimo');
        }
    });
});


