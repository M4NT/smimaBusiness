// backend/config/database.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('smimabd_business', 'smima_master', 'sm1m4$b1s1n355!', {
  host: 'mysql_db', // Nome do serviço do contêiner MySQL
  dialect: 'mysql' // Especificando o dialeto do banco de dados
});

export async function sync() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    await sequelize.sync();
    console.log('Sincronização do banco de dados completa.');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
    throw error;
  }
}

export default sequelize;
