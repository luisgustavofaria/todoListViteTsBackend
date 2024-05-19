import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get('/tasks', async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const { title, description, isFavorited, color } = req.body;
  const task = await prisma.task.create({
    data: { title, description, isFavorited, color },
  });
  res.json(task);
});

// app.put('/tasks/:id', async (req, res) => {
//   const { id } = req.params;
//   const { title, description, isFavorited, color } = req.body;
//   const task = await prisma.task.update({
//     where: { id },
//     data: { title, description, isFavorited, color },
//   });
//   res.json(task);
// });

// app.delete('/tasks/:id', async (req, res) => {
//   const { id } = req.params;
//   await prisma.task.delete({ where: { id } });
//   res.status(204).send();
// });

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
