/**
 * Сервис для взаимодействия с GigaChat API через бэкенд-сервер
 */

// Кеш для хранения истории разговоров по идентификаторам сессий
const conversationHistoryCache = new Map<string, Array<{role: 'user' | 'assistant' | 'system', content: string}>>();

// Базовый URL для API сервера (может быть изменен через переменные окружения)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

/**
 * Отправляет сообщение на бэкенд GigaChat и возвращает ответ
 * @param message Сообщение пользователя
 * @param sessionId Идентификатор сессии для сохранения контекста разговора
 * @returns Ответ от GigaChat
 */
export const sendMessage = async (message: string, sessionId: string = 'default'): Promise<string> => {
  try {
    // Отправляем запрос к бэкенд-серверу
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        sessionId
      }),
    });

    if (!response.ok) {
      throw new Error(`Ошибка запроса к серверу: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Обновляем локальное хранилище истории
    let history = conversationHistoryCache.get(sessionId) || [];
    history = [...history, 
      { role: 'user', content: message },
      { role: 'assistant', content: data.message }
    ];
    
    // Ограничиваем историю последними 10 сообщениями
    if (history.length > 10) {
      history = history.slice(history.length - 10);
    }
    
    conversationHistoryCache.set(sessionId, history);
    
    return data.message;
  } catch (error) {
    console.error('Ошибка при отправке сообщения:', error);
    return getFallbackResponse(message);
  }
};

/**
 * Очищает историю разговора для указанной сессии
 * @param sessionId Идентификатор сессии
 */
export const clearConversation = async (sessionId: string = 'default'): Promise<void> => {
  try {
    // Отправляем запрос на очистку истории на сервере
    await fetch(`${API_BASE_URL}/chat/clear`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId
      }),
    });
    
    // Очищаем локальное хранилище
    conversationHistoryCache.delete(sessionId);
  } catch (error) {
    console.error('Ошибка при очистке истории:', error);
    // Очищаем локальное хранилище даже при ошибке
    conversationHistoryCache.delete(sessionId);
  }
};

/**
 * Проверяет доступность сервера
 * @returns true если сервер доступен и настроен
 */
export const checkServerHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) return false;
    
    const data = await response.json();
    return data.status === 'ok' && data.gigaChatConfigured;
  } catch (error) {
    console.error('Сервер недоступен:', error);
    return false;
  }
};

/**
 * Заглушка для ответов, если API GigaChat недоступен
 * @param message Сообщение пользователя
 * @returns Подходящий ответ-заглушка
 */
const getFallbackResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('прививк')) {
    return 'Календарь прививок для детей включает вакцинацию против гепатита B, полиомиелита, коклюша, дифтерии, столбняка, кори, краснухи и паротита. Важно соблюдать рекомендованные сроки вакцинации для формирования надежного иммунитета.';
  } else if (lowerMessage.includes('температур')) {
    return 'При высокой температуре у ребенка (выше 38°C) можно дать жаропонижающее средство на основе парацетамола или ибупрофена в возрастной дозировке. Важно обеспечить обильное питье и не кутать ребенка. Если температура держится более 3 дней или сопровождается тревожными симптомами, обратитесь к врачу.';
  } else if (lowerMessage.includes('кашл')) {
    return 'При кашле у ребенка стоит обратиться к врачу, если он сопровождается затруднением дыхания, свистящими хрипами, высокой температурой, или если кашель длится более недели. До консультации с врачом обеспечьте влажность в помещении и обильное питье.';
  } else if (lowerMessage.includes('рост') || lowerMessage.includes('вес')) {
    return 'Для ребенка 2 лет нормальный рост составляет 85-96 см, а вес - 11-15 кг. Показатели могут варьироваться в зависимости от индивидуальных особенностей.';
  } else if (lowerMessage.includes('сон') || lowerMessage.includes('спит')) {
    return 'У детей в возрасте 3 лет норма сна составляет 10-13 часов в сутки, включая дневной сон. Регулярный режим сна помогает укрепить иммунитет и способствует правильному развитию.';
  } else {
    return 'Для правильного развития ребенка важно сбалансированное питание, регулярный сон, физическая активность и регулярные профилактические осмотры у врача. При появлении любых тревожных симптомов рекомендуется консультация специалиста.';
  }
};
