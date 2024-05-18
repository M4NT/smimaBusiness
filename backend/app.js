import express, { json } from 'express';
import { sync } from './config/database';
import { create } from './models/User';

const app = express();
app.use(json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/users', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await create({ username, email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;

sync().then(() => {
  app.listen(PORT, () => {
    console.log(`O servidor está rodando na porta: ${PORT} /n/ Seja bem vindo, mestre gostoso!`);
  });
}).catch(err => {
  console.error('Não foi possível se conectar ao banco:', err);
});
