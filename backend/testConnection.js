// testConnection.js

import sequelize from './backend/config/database'; // Caminho ajustado para acessar o arquivo database.js

// Função para testar a conexão com o banco de dados
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexão bem-sucedida com o banco de dados.');
  } catch (error) {
    console.error('Erro ao conectar-se ao banco de dados:', error);
  }
}

// Testar a conexão com o banco de dados
testConnection();
