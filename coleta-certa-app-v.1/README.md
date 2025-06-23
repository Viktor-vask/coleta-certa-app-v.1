#  Coleta Certa

### Plataforma Colaborativa para Monitoramento de Lixo Urbano

---

## 📜 Sobre o Projeto

[cite_start] O "Coleta Certa" é um protótipo de aplicação web responsiva desenvolvido como trabalho final para a disciplina de **ITS093 - Tópicos em Programação Avançada** da Universidade Federal do Amazonas (UFAM).

[cite_start] O projeto busca resolver um problema cívico real: a falha na comunicação entre cidadãos e os órgãos responsáveis pela coleta de lixo urbano. A plataforma permite que qualquer pessoa denuncie pontos de acúmulo de lixo ou descarte irregular de forma rápida e geolocalizada, transformando moradores em fiscais ativos da limpeza de sua cidade.

## ✨ Funcionalidades Implementadas

* **Registro de Denúncias via Mapa:** O usuário pode clicar em um mapa interativo para marcar a localização exata de uma ocorrência.
* **Formulário Intuitivo:** Além da localização, é possível adicionar uma descrição detalhada do problema.
* **Localização Automática:** Um botão "Me Localize" no formulário centraliza o mapa e posiciona o marcador na localização atual do dispositivo, facilitando o registro de denúncias no local.
* **Visualização Centralizada:** Todas as denúncias são exibidas em tempo real em um mapa geral e em uma lista na página inicial.
* **Gerenciamento de Status:** Funcionalidade de administrador simulada que permite alterar o status de uma denúncia ("Registrado", "Em verificação", "Resolvido") diretamente na página inicial.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com uma arquitetura moderna baseada em JavaScript.

* **Frontend:**
    * **React:** Biblioteca para construção de interfaces de usuário reativas e componentizadas (SPA).
    * **Vite:** Ferramenta de desenvolvimento de última geração para um ambiente rápido e otimizado.
    * **Leaflet & React-Leaflet:** Para a criação e interatividade dos mapas.
* **Backend (Serverless):**
    * [cite_start] **Firebase (Google Cloud):** Utilizado como plataforma de nuvem para o backend.
    * **Firestore:** Banco de dados NoSQL para armazenamento em tempo real de todas as denúncias.
* **Estilização:**
    * **CSS puro:** Para estilização customizada dos componentes.
    * **Google Fonts:** Para uma tipografia limpa e profissional.

[cite_start] _**Observação:** A funcionalidade de upload de imagens para o Firebase Storage foi planejada, mas desativada devido a limitações do plano gratuito do Firebase que exigiam faturamento para a configuração de CORS._

## 🚀 Começando

Siga estas instruções para obter uma cópia do projeto e rodá-la na sua máquina local para desenvolvimento e testes.

### Pré-requisitos

Você precisa ter o Node.js e o npm (que vem com o Node) instalados em seu computador.
* [Node.js](https://nodejs.org/en/)

### Instalação e Configuração

1.  [cite_start] **Clone o repositório** (se estiver usando Git, conforme recomendado no trabalho ):
    ```sh
    git clone [https://github.com/Viktor-vask/coleta-certa-app-v.1.git](https://github.com/Viktor-vask/coleta-certa-final.git)
    ```
2.  **Navegue até a pasta do projeto:**
    ```sh
    cd coleta-certa-final
    ```
3.  **Instale as dependências do NPM:**
    ```sh
    npm install
    ```
4.  **Configure as Variáveis de Ambiente do Firebase:**
    * Crie um arquivo chamado `.env` na pasta raiz do projeto.
    * Vá para as **Configurações do Projeto** no seu console do Firebase, registre um novo app web e copie as credenciais.
    * Cole as credenciais no seu arquivo `.env` no seguinte formato:
        ```env
        VITE_API_KEY="SUA_API_KEY"
        VITE_AUTH_DOMAIN="SEU_AUTH_DOMAIN"
        VITE_PROJECT_ID="SEU_PROJECT_ID"
        VITE_STORAGE_BUCKET="SEU_STORAGE_BUCKET"
        VITE_MESSAGING_SENDER_ID="SEU_MESSAGING_SENDER_ID"
        VITE_APP_ID="SEU_APP_ID"
        ```

## ▶️ Rodando a Aplicação

Após a instalação, inicie o servidor de desenvolvimento com o comando:

```sh
npm run dev