import express from 'express';
import { PrismaClient } from '@prisma/client';

const cors = require('cors');

const app = express();
const prisma = new PrismaClient({ log: ['query'] });
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());

app.get('/tasks/list-many', async (req, res) => {
  const task = await prisma.task.findMany();
  return res.status(200).json(task);
});

app.post('/tasks/create', async (req, res) => {
  const { title, description, isFavorited, color } = req.body;

  const task = await prisma.task.create({
    data: { title, description, isFavorited, color },
  });
  return res.status(201).json(task);
});

// app.put('/tasks/:id', async (req, res) => {
//   const { id } = req.params;
//   const { title, description, isFavorited, color } = req.body;
//   const task = await prisma.task.update({
//     where: { id },
//     data: { title, description, isFavorited, color },
//   });
//   return res.status(201).json(task);
// });

// app.delete('/tasks/:id', async (req, res) => {
//   const { id } = req.params;
//   await prisma.task.delete({ where: { id } });
//   res.status(204).send();
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
