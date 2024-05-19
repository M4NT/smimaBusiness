// app.js
import express, { json as _json } from 'express';
import { sync } from './src/config/database.js'; // Ajuste do caminho de importação

const app = express();
const json = _json;
app.use(json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const PORT = process.env.PORT || 3000;

sync().then(() => {
  app.listen(PORT, () => {
    console.log(`O servidor está rodando na porta: ${PORT} \n Seja bem vindo, mestre gostoso!`);
  });
}).catch(err => {
  console.error('Não foi possível se conectar ao banco:', err);
});
