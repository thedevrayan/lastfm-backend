import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import playlistRoutes from './routes/playlistRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', playlistRoutes);

const PORT = Number(process.env.PORT) || 3000;

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error("❌ ERRO FATAL: variável MONGODB_URI não encontrada!");
  process.exit(1);
}

mongoose.connect(mongoURI)
  .then(() => {
    console.log('✅ MongoDB Atlas conectado!');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });

  })
  .catch(err => console.error('❌ Erro ao conectar no MongoDB Atlas:', err));

  app.get("/", (req, res) => {
  res.json({ message: "Backend funcionando no Railway!" });
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
