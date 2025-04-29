// Серверное взаимодействие с GigaChat API
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

// Параметры для подключения к API GigaChat
const GIGACHAT_BASE_URL = 'https://gigachat.devices.sberbank.ru/api/v1';
const AUTH_URL = 'https://ngw.devices.sberbank.ru:9443/api/v2/oauth';

// Конфигурация из переменных окружения
const CLIENT_ID = process.env.GIGACHAT_CLIENT_ID;
const SCOPE = process.env.GIGACHAT_SCOPE || 'GIGACHAT_API_PERS';
const AUTH_KEY = process.env.GIGACHAT_AUTHORIZATION_KEY;

// Хранилище для контекста сессий
const sessionContexts = new Map();

// Время жизни токена и периодическое его обновление
let accessToken = null;
let tokenExpiresAt = 0;

/**
 * Получает токен доступа для GigaChat API
 * @returns {Promise<string>} Токен доступа
 */
async function getAccessToken() {
  // Проверяем, истек ли текущий токен (с запасом в 60 секунд)
  const now = Date.now();
  if (accessToken && now < tokenExpiresAt - 60000) {
    return accessToken;
  }

  try {
    console.log('Получаем новый токен доступа для GigaChat API...');
    
    const response = await axios.post(AUTH_URL, {
      scope: SCOPE
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${AUTH_KEY}`,
        'RqUID': generateRqUID()
      }
    });

    accessToken = response.data.access_token;
    // Токен действителен 30 минут (1800 секунд)
    tokenExpiresAt = now + (response.data.expires_in * 1000);
    
    console.log('Токен доступа успешно получен');
    return accessToken;
  } catch (error) {
    console.error('Ошибка получения токена:', error.response?.data || error.message);
    throw new Error('Не удалось получить токен доступа для GigaChat API');
  }
}

/**
 * Генерирует уникальный идентификатор запроса
 * @returns {string} Уникальный идентификатор
 */
function generateRqUID() {
  return 'request-' + Date.now() + '-' + Math.floor(Math.random() * 1000000);
}

/**
 * Отправляет сообщение в GigaChat и получает ответ
 * @param {string} userMessage Сообщение пользователя
 * @param {string} sessionId Идентификатор сессии
 * @returns {Promise<string>} Ответ от GigaChat
 */
async function sendMessageToGigaChat(userMessage, sessionId) {
  try {
    const token = await getAccessToken();
    
    // Получаем историю сообщений для данной сессии или создаем новую
    let messages = sessionContexts.get(sessionId) || [
      {
        role: 'system',
        content: 'Ты — медицинский ассистент, который помогает родителям с информацией о здоровье и развитии детей. Отвечай кратко, информативно и дружелюбно. Всегда указывай, что твои ответы носят информационный характер и не заменяют консультацию врача.'
      }
    ];
    
    // Добавляем сообщение пользователя
    messages.push({
      role: 'user',
      content: userMessage
    });
    
    // Отправляем запрос к GigaChat API
    const response = await axios.post(`${GIGACHAT_BASE_URL}/chat/completions`, {
      model: 'GigaChat:latest',
      messages: messages,
      temperature: 0.7,
      max_tokens: 1500
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    const assistantResponse = response.data.choices[0].message.content;
    
    // Добавляем ответ ассистента в историю
    messages.push({
      role: 'assistant',
      content: assistantResponse
    });
    
    // Ограничиваем историю до 10 последних сообщений
    if (messages.length > 12) {
      messages = [
        messages[0], // Сохраняем системное сообщение
        ...messages.slice(messages.length - 10) // Берем последние 10 сообщений
      ];
    }
    
    // Сохраняем обновленную историю
    sessionContexts.set(sessionId, messages);
    
    return assistantResponse;
  } catch (error) {
    console.error('Ошибка при отправке запроса к GigaChat API:', error.response?.data || error.message);
    throw new Error('Не удалось получить ответ от GigaChat');
  }
}

/**
 * Очищает историю сообщений для указанной сессии
 * @param {string} sessionId Идентификатор сессии
 */
function clearSessionHistory(sessionId) {
  sessionContexts.delete(sessionId);
}

module.exports = {
  sendMessageToGigaChat,
  clearSessionHistory
};
