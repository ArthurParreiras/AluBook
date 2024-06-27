document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.btn').addEventListener('click', async () => {
      const cpf = document.getElementById('cpf').value;

      if (!cpf) {
          alert('Por favor, insira um CPF válido.');
          return;
      }

      try {
          const response = await fetch(`http://localhost:3000/consultar-cliente/${cpf}`);
          if (!response.ok) {
              const errorResponse = await response.json();
              alert(`Erro ao consultar cliente: ${errorResponse.error}`);
              return;
          }

          const cliente = await response.json();
          alert(`Cliente encontrado: ${cliente.nome}, Telefone: ${cliente.telefone}`);
      } catch (error) {
          console.error('Erro ao consultar cliente:', error);
          alert('Erro ao consultar cliente');
      }
  });
});

  