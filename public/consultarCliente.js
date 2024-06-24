// Função para consultar cliente por CPF
function consultarClientePorCPF(cpfCliente) {
    return fetch(`http://localhost:3000/consultar-cliente/${cpfCliente}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao consultar cliente');
        }
        return response.json();
      });
  }
  
  // Função para consultar o cliente
  function consultarCliente() {
      // Obtém o valor do CPF inserido pelo usuário
      const cpfCliente = document.getElementById("cpf").value;
  
      // Realiza a consulta ao servidor
      consultarClientePorCPF(cpfCliente)
        .then(row => {
          if (row) {
            // Exibe os dados do cliente na tela
            document.getElementById("resultado").innerHTML = "<p>Cliente encontrado: " + row.nome_cliente + " - " + row.tel_cliente + "</p>";
          } else {
            document.getElementById("resultado").innerHTML = "<p>Cliente não encontrado</p>";
          }
        })
        .catch(err => {
          console.error('Erro ao consultar cliente:', err);
          document.getElementById("resultado").innerHTML = "<p>Ocorreu um erro ao consultar o cliente</p>";
        });
  }
  
  

  
