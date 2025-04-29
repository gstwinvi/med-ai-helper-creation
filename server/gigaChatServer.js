
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');

// Загрузка переменных окружения
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Проверка наличия ключей API
if (!process.env.GIGACHAT_CLIENT_ID || !process.env.GIGACHAT_CLIENT_SECRET) {
  console.error('ОШИБКА: Отсутствуют GIGACHAT_CLIENT_ID или GIGACHAT_CLIENT_SECRET в .env файле');
  console.error('Создайте .env файл с необходимыми ключами для работы с GigaChat API');
}

// Парсинг JSON в запросах
app.use(express.json());
// Включение CORS для обращений с фронтенда
app.use(cors());

// Хранилище токенов (в production рекомендуется использовать Redis или другое решение)
let tokenCache = {
  accessToken: null,
  expiry: 0
};

// Получение токена для GigaChat API
const getGigaChatToken = async () => {
  // Проверяем есть ли действующий токен
  const currentTime = Date.now();
  if (tokenCache.accessToken && tokenCache.expiry > currentTime) {
    return tokenCache.accessToken;
  }

  try {
    const response = await axios({
      method: 'POST',
      url: 'https://ngw.devices.sberbank.ru:9443/api/v2/oauth',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'RqUID': uuidv4(),
      },
      data: new URLSearchParams({
        'scope': 'GIGACHAT_API_PERS',
        'grant_type': 'client_credentials',
        'client_id': process.env.GIGACHAT_CLIENT_ID,
        'client_secret': process.env.GIGACHAT_CLIENT_SECRET,
      }),
      // Опция для проверки сертификатов (может потребоваться в некоторых случаях)
      httpsAgent: new (require('https').Agent)({
        rejectUnauthorized: false
      })
    });

    tokenCache.accessToken = response.data.access_token;
    tokenCache.expiry = response.data.expires_at;

    return tokenCache.accessToken;
  } catch (error) {
    console.error('Ошибка при получении токена GigaChat:', error.response?.data || error.message);
    throw error;
  }
};

// Хранилище контекстов разговоров (в production использовать базу данных)
const conversationContexts = new Map();

// Маршрут для проверки состояния сервера
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date(),
    gigaChatConfigured: !!(process.env.GIGACHAT_CLIENT_ID && process.env.GIGACHAT_CLIENT_SECRET)
  });
});

// Маршрут для отправки сообщения
app.post('/api/chat', async (req, res) => {
  try {
    const { message, sessionId = 'default' } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Сообщение не может быть пустым' });
    }

    // Получаем текущий контекст разговора или создаем новый
    let context = conversationContexts.get(sessionId) || [];

    // Получаем токен
    const token = await getGigaChatToken();

    // Формируем системный промпт и историю сообщений
    const messages = [
      {
        role: 'system',
        content: 'Ты - медицинский ассистент для родителей. Отвечай на вопросы о здоровье и развитии детей. Давай короткие, четкие и профессиональные ответы. Указывай, что твои ответы не заменяют консультацию врача.'
      },
      ...context,
      {
        role: 'user',
        content: message
      }
    ];

    // Отправляем запрос к GigaChat API
    const gigaChatResponse = await axios({
      method: 'POST',
      url: 'https://gigachat.devices.sberbank.ru/api/v1/chat/completions',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      data: {
        messages,
        temperature: 0.7,
        max_tokens: 1500
      },
      // Опция для проверки сертификатов
      httpsAgent: new (require('https').Agent)({
        rejectUnauthorized: false
      })
    });

    const assistantMessage = gigaChatResponse.data.choices[0].message.content;

    // Обновляем контекст разговора (сохраняем последние 10 сообщений для экономии токенов)
    context = [
      ...context, 
      { role: 'user', content: message },
      { role: 'assistant', content: assistantMessage }
    ];

    // Ограничиваем историю последними 10 сообщениями
    if (context.length > 10) {
      context = context.slice(context.length - 10);
    }

    // Сохраняем обновленный контекст
    conversationContexts.set(sessionId, context);

    res.json({ message: assistantMessage });
  } catch (error) {
    console.error('Ошибка при обработке сообщения:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Произошла ошибка при обработке вашего запроса',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Маршрут для очистки истории разговора
app.post('/api/chat/clear', (req, res) => {
  const { sessionId = 'default' } = req.body;
  conversationContexts.delete(sessionId);
  res.json({ success: true, message: 'История разговора очищена' });
});

// Запуск сервера
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
    console.log(`Статус конфигурации GigaChat: ${!!(process.env.GIGACHAT_CLIENT_ID && process.env.GIGACHAT_CLIENT_SECRET) ? 'Настроен' : 'Не настроен'}`);
  });
}

// Экспортируем для запуска из index.js
module.exports = app;
