document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('.inputs');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio do formulário
        
        // Obter valores dos campos do formulário
        const nomeLivro = form.querySelector('input[name="nome"]').value;
        const idLivro = form.querySelector('input[name="username"]').value;
        const autor = form.querySelector('input[name="password"]').value;
        const cpfCliente = form.querySelector('input[name="password"]').value;
        const data = form.querySelector('input[name="password"]').value;
        
        // Validar campos
        if (!nomeLivro || !idLivro || !autor || !cpfCliente || !data) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        // Validar CPF (básico, apenas para formato)
        if (!/^\d{11}$/.test(cpfCliente)) {
            alert('CPF inválido. Deve conter 11 dígitos.');
            return;
        }
        
        // Se a validação passar, processar os dados (ex: enviar para o servidor)
        // Aqui você pode adicionar a lógica para enviar os dados para o servidor ou armazená-los localmente
        alert('Empréstimo cadastrado com sucesso!');
        
        // Redefinir formulário após o envio bem-sucedido
        form.reset();
    });
});
