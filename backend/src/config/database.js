import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('smimabd_mysql', 'master', 'sm1m4', {
  host: 'localhost',
  dialect: 'mysql'
});

export const sync = () => {
  return sequelize.sync();
};

export default sequelize;
