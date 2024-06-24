// menu.js

document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutButton');

    logoutButton.addEventListener('click', (event) => {
        event.preventDefault();
        
        // Função para realizar logout
        performLogout();
    });

    function performLogout() {
        // Limpar qualquer dado armazenado relacionado ao usuário, se houver
        // Por exemplo, remover token de autenticação do localStorage
        localStorage.removeItem('authToken');
        
        // Redirecionar para a página de login
        window.location.href = 'login.html';
    }

    // Exibir o nome de usuário armazenado, se houver
    const usernameDisplay = document.getElementById('username');
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
        usernameDisplay.textContent = storedUsername;
    }

    // Adicionar event listeners para os links
    const links = document.querySelectorAll('.card-item');
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetPage = event.target.getAttribute('href');
            window.location.href = targetPage;
        });
    });
});
