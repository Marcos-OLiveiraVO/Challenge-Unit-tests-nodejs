# Desafio de Refatoração de aplicação finApi.


<h1> Sobre </h1>
<h4>Desafio de refatoração de usecases e banco de dados alem de implementar os testes de integração e de unidades.</h4>

<h2> 🚩 Testes de integração </h2>
   implementado testes de integrações fazendo uma cobertura completa das rotas e controllers.
<h2> 🌌 Testes de unidades </h2>
  implementado testes de unidades fazendo uma cobertura completa da logica do sistema.

<h3>🚨 Rotas da aplicação</h3>

<details>
  <summary>POST <code>/api/v1/users</code></summary>
  <br>
  A rota recebe <code>name</code>, <code>email</code> e <code>password</code> dentro do corpo da requisição, salva o usuário criado no banco e retorna uma resposta vazia com status <code>201</code>.
</details>

<details>
  <summary>POST <code>/api/v1/sessions</code></summary>
  <br>
  A rota recebe <code>email</code> e <code>password</code> no corpo da requisição e retorna os dados do usuário autenticado junto à um token JWT.
  <br><br>
  💡 Essa aplicação não possui refresh token, ou seja, o token criado dura apenas 1 dia e deve ser recriado após o período mencionado.
</details>

<details>
  <summary>GET <code>/api/v1/profile</code></summary>
  <br>
  A rota recebe um token JWT pelo header da requisição e retorna as informações do usuário autenticado.
</details>

<details>
  <summary>GET <code>/api/v1/statements/balance</code></summary>
  <br>
  A rota recebe um token JWT pelo header da requisição e retorna uma lista com todas as operações de depósito e saque do usuário autenticado e também o saldo total numa propriedade <code>balance</code>.
</details>

<details>
  <summary>POST <code>/api/v1/statements/deposit</code></summary>
  <br>
  A rota recebe um token JWT pelo header e <code>amount</code> e <code>description</code> no corpo da requisição, registra a operação de depósito do valor e retorna as informações do depósito criado com status <code>201</code>.
</details>

<details>
  <summary>POST <code>/api/v1/statements/withdraw</code></summary>
  <br>
  A rota recebe um token JWT pelo header e <code>amount</code> e <code>description</code> no corpo da requisição, registra a operação de saque do valor (caso o usuário possua saldo válido) e retorna as informações do saque criado com status <code>201</code>.
</details>

<details>
  <summary>GET <code>/api/v1/statements/:statement_id</code></summary>
  <br>
  A rota recebe um token JWT pelo header e o id de uma operação registrada (saque ou depósito) na URL da rota e retorna as informações da operação encontrada.  
</details>


🚦 Para Testar a aplicação faça um clone do mesmo

      yarn git clone https://github.com/Marcos-OLiveiraVO/Challenge-Unit-tests-nodejs.git
  
🚀 Instale as dependencias 
  
      yarn or npm install
      
🚀 Rode os testes

      yarn test
      
🚀 Rode a aplicação 

      yarn dev
