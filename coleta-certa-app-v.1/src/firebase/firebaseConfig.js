// Importa funções necessárias do SDK do Firebase
import { initializeApp } from "firebase/app";            // Função para inicializar o aplicativo Firebase
import { getFirestore } from "firebase/firestore";       // Função para acessar o Firestore (banco de dados NoSQL do Firebase)
import { getStorage } from "firebase/storage";          // Função para acessar o Firebase Storage (armazenamento de arquivos)

// Configuração do Firebase, geralmente obtida no console do Firebase
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,                                // A chave de API do Firebase (protegida através de variáveis de ambiente)
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,                       // Domínio de autenticação para Firebase Auth
    projectId: import.meta.env.VITE_PROJECT_ID,                        // ID do projeto do Firebase
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,                // Bucket de armazenamento para arquivos (Firebase Storage)
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,      // ID para enviar notificações via Firebase Cloud Messaging (FCM)
    appId: import.meta.env.VITE_APP_ID                               // ID do aplicativo no Firebase
};

// Inicializa o app Firebase com as configurações fornecidas
const app = initializeApp(firebaseConfig);

// Exporta o Firestore e o Storage para serem utilizados em outras partes da aplicação
export const db = getFirestore(app);             // Acesso ao Firestore do Firebase
export const storage = getStorage(app);         // Acesso ao Firebase Storage
