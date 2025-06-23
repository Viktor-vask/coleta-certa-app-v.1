// src/App.jsx

// Importa o componente 'Outlet' do react-router-dom. 
// O Outlet é usado para renderizar os componentes das rotas dentro da estrutura do aplicativo.
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      {/* Header da aplicação, onde informações como título e menu de navegação são colocados */}
      <header>
        {/* Comentário indicando que, futuramente, pode-se adicionar um menu de navegação mais elaborado */}
        {/* Aqui podemos colocar um menu de navegação no futuro */}
        <h2>Coleta Certa</h2> {/* Título principal da aplicação */}
        
        {/* Menu de navegação com links para diferentes páginas */}
        <nav>
          {/* Links de navegação para as páginas "Ver Denúncias" e "Fazer Denúncia" */}
          <a href="/">Ver Denúncias</a> | <a href="/denunciar">Fazer Denúncia</a>
        </nav>

        <hr /> {/* Linha horizontal para separar o cabeçalho do conteúdo principal */}
      </header>

      {/* O Outlet será substituído pelo conteúdo da rota correspondente */}
      <main>
        {/* O Outlet é usado para renderizar o componente correspondente à rota em uso.
            Isso pode ser a HomePage ou a ReportPage, dependendo da URL */}
        <Outlet />
      </main>
    </div>
  );
}

// Exporta o componente App para ser utilizado em outras partes da aplicação
export default App;
