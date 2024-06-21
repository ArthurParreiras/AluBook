
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const matriculaInput = form.querySelector('input[name="username"]');
    const passwordInput = form.querySelector('input[name="password"]');
    const confirmPasswordInput = form.querySelectorAll('input[name="password"]')[1];

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Validação das senhas
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        if (password !== confirmPassword) {
            alert("As senhas não correspondem.");
            return;
        }

        // Validação da matrícula
        const matricula = matriculaInput.value;
        const matriculaExists = await checkMatriculaExists(matricula);
        if (matriculaExists) {
            alert("A matrícula já existe.");
            return;
        }

        // Se tudo estiver ok, submeter o formulário
        form.submit();
    });

    async function checkMatriculaExists(matricula) {
        // Função de validação para verificar se a matrícula existe no banco de dados
        // Esta função deverá ser ajustada para conectar ao backend

        // Exemplo de consulta ao backend (ajuste conforme necessário)
        try {
            const response = await fetch(`/check-matricula?matricula=${matricula}`);
            const result = await response.json();
            return result.exists;
        } catch (error) {
            console.error('Erro ao verificar a matrícula:', error);
            return false;
        }
    }
});