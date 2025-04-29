const express = require('express');
const cors = require('cors');
const { sendMessageToGigaChat, clearSessionHistory } = require('./gigaChatServer');

// Инициализация Express
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// API endpoints
app.post('/api/chat', async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    
    if (!message || !sessionId) {
      return res.status(400).json({ 
        error: 'Необходимо указать сообщение и идентификатор сессии' 
      });
    }
    
    const response = await sendMessageToGigaChat(message, sessionId);
    res.json({ message: response });
  } catch (error) {
    console.error('Ошибка обработки запроса:', error);
    res.status(500).json({ 
      error: 'Произошла ошибка при обработке запроса: ' + error.message 
    });
  }
});

app.post('/api/chat/clear', (req, res) => {
  try {
    const { sessionId } = req.body;
    
    if (!sessionId) {
      return res.status(400).json({ 
        error: 'Необходимо указать идентификатор сессии' 
      });
    }
    
    clearSessionHistory(sessionId);
    res.json({ message: 'История сессии успешно очищена' });
  } catch (error) {
    console.error('Ошибка при очистке истории:', error);
    res.status(500).json({ 
      error: 'Произошла ошибка при очистке истории: ' + error.message 
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    gigaChatConfigured: Boolean(process.env.GIGACHAT_CLIENT_ID && process.env.GIGACHAT_AUTHORIZATION_KEY)
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  console.log(`API доступно по адресу http://localhost:${PORT}/api`);
  console.log(`Состояние GigaChat API: ${Boolean(process.env.GIGACHAT_CLIENT_ID && process.env.GIGACHAT_AUTHORIZATION_KEY) ? 'настроено' : 'не настроено'}`);
});
