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

        // Verifica se o usuário e senha correspondem ao esperado
        if (username === 'parreiras' && password === '1234') {
            // Redireciona para a página menu.html
            window.location.href = 'menu.html';
        } else {
            alert("Nome de usuário ou senha inválidos.");
        }
    });
});

