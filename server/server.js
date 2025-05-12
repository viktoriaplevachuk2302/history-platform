import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import admin from 'firebase-admin';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// 👇 потрібне для __dirname в ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ читаємо JSON-файл вручну
const serviceAccountRaw = await fs.readFile(path.join(__dirname, 'firebase-service-key.json'), 'utf8');
const serviceAccount = JSON.parse(serviceAccountRaw);

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(bodyParser.json());

// ✅ Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

// ✅ тестовий маршрут
app.get('/', (req, res) => res.send('API is working ✅'));

// ✅ Отримати середній бал
app.get('/api/score/:userId', async (req, res) => {
  try {
    const snapshot = await db.collection('results')
      .where('userId', '==', req.params.userId)
      .get();

    if (snapshot.empty) return res.json({ avg: 0 });

    const scores = [];
    snapshot.forEach(doc => scores.push(doc.data().score));
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;

    res.json({ avg });
  } catch (err) {
    console.error("❌ Error getting score:", err);
    res.status(500).send('Server error');
  }
});

// ✅ Зберегти результат
app.post('/api/score', async (req, res) => {
  try {
    const { userId, score, date } = req.body;
    if (!userId || score == null || !date) {
      return res.status(400).send('Invalid request body');
    }

    await db.collection('results').add({ userId, score, date });
    res.sendStatus(200);
  } catch (err) {
    console.error("❌ Error saving score:", err);
    res.status(500).send('Server error');
  }
});

// ✅ Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Сервер працює на http://localhost:${PORT}`);
});
