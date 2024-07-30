O frontend deste projeto foi desenvolvido com React. Ele fornece a interface de usuário para autenticação e gerenciamento de turnos e intervalos de almoço. Utiliza react-router-dom para navegação e axios para interações com a API.

Estrutura do Projeto
O projeto é composto pelos seguintes principais componentes e serviços:

Componentes
Login

Descrição: Tela de login para autenticação de usuários.
Localização: src/components/Login.tsx
Estado:
username: Nome de usuário
password: Senha
message: Mensagem de feedback
Funções:
handleLogin: Envia uma requisição de login para a API e armazena o token e o ID do usuário no localStorage.
Points

Descrição: Tela para gerenciamento de turnos e intervalos de almoço.
Localização: src/components/Points.tsx
Estado:
points: Lista de turnos do usuário
message: Mensagem de feedback
loading: Estado de carregamento
Funções:
fetchPoints: Obtém os turnos do usuário autenticado.
handleStartShift: Inicia um novo turno.
handleEndShift: Finaliza o turno atual.
handleStartLunch: Inicia o intervalo de almoço.
handleEndLunch: Finaliza o intervalo de almoço.
calculateHoursWorked: Calcula as horas trabalhadas em um turno.
handleLogout: Remove o token e ID do localStorage e redireciona para a tela de login.
Register

Descrição: Tela de registro para criar uma nova conta de usuário.
Localização: src/components/Register.tsx
Estado:
username: Nome de usuário
password: Senha
message: Mensagem de feedback
Funções:
handleRegister: Envia uma requisição de registro para a API e redireciona para a tela de login.
PrivateRoute

Descrição: Componente de rota protegida que verifica se o usuário está autenticado antes de permitir o acesso.
Localização: src/components/PrivateRoute.tsx
Função:
Verifica a presença de um token no localStorage. Se o token estiver presente, renderiza os componentes filhos. Caso contrário, redireciona para a tela de login.
Serviços
Api
Descrição: Configuração do cliente HTTP axios para interagir com a API backend.
Localização: src/services/Api.ts
Configuração:
baseURL: URL base do backend (exemplo: http://localhost:3000).
Configuração
Instalação das Dependências

Navegue até o diretório do frontend e instale as dependências:

bash
Copiar código
npm install
Configuração da API

Certifique-se de que a URL base da API está correta no arquivo src/services/Api.ts. O valor padrão é http://localhost:3000. Ajuste conforme a URL do seu backend.

Inicialização do Servidor de Desenvolvimento

Para iniciar o servidor de desenvolvimento, execute:

bash
Copiar código
npm start
Configuração de Rotas



Uso
Registro de Novo Usuário

Navegue até a tela de registro.
Forneça um nome de usuário e uma senha.
Clique em "Register" para criar uma nova conta.
Login

Navegue até a tela de login.
Forneça suas credenciais de login.
Clique em "Login" para acessar a tela de pontos.
Gerenciamento de Turnos e Intervalos

Na tela de pontos, você pode iniciar e encerrar turnos e intervalos de almoço.
Utilize os botões disponíveis para gerenciar seus turnos e intervalos.
Logout

Na tela de pontos, clique em "Logout" para sair da sessão atual e retornar à tela de login.