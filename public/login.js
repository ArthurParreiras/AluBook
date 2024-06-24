document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const usernameInput = form.querySelector('input[name="username"]');
    const passwordInput = form.querySelector('input[name="password"]');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (!username || !password) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        // Chamar função para validar login (exemplo)
        const loginSuccess = await validateLogin(username, password);

        if (loginSuccess) {
            // Se o login for bem-sucedido, redirecionar ou mostrar uma mensagem de sucesso
            alert("Login bem-sucedido!");
            form.submit();
        } else {
            alert("Nome de usuário ou senha inválidos.");
        }
    });

    async function validateLogin(username, password) {
        // Função de validação de login
        // Esta função deve ser ajustada para conectar ao backend

        // Exemplo de consulta ao backend (ajuste conforme necessário)
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const result = await response.json();
            return result.success;
        } catch (error) {
            console.error('Erro ao validar o login:', error);
            return false;
        }
    }
});
