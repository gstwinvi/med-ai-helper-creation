
/**
 * API-клиент для работы с GigaChat через бэкенд-сервер
 */

// URL для API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

/**
 * Типы данных для работы с API
 */
interface ApiResponse {
  message: string;
  error?: string;
}

interface HealthCheckResponse {
  status: string;
  timestamp: string;
  gigaChatConfigured: boolean;
}

/**
 * Отправляет сообщение на GigaChat API через бэкенд-сервер
 * @param message Текст сообщения пользователя
 * @param sessionId Идентификатор сессии для поддержания контекста разговора
 * @returns Ответ от API
 */
export const sendMessageToApi = async (message: string, sessionId: string): Promise<string> => {
  try {
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
      const errorData = await response.json();
      throw new Error(errorData.error || `Ошибка сервера: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    return data.message;
  } catch (error) {
    console.error('Ошибка при отправке сообщения в API:', error);
    throw error;
  }
};

/**
 * Очищает историю разговора на сервере
 * @param sessionId Идентификатор сессии
 */
export const clearSessionHistory = async (sessionId: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/clear`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Ошибка сервера: ${response.status}`);
    }
  } catch (error) {
    console.error('Ошибка при очистке истории:', error);
    throw error;
  }
};

/**
 * Проверяет состояние бэкенд-сервера и его подключение к GigaChat
 * @returns Состояние сервера
 */
export const checkApiHealth = async (): Promise<HealthCheckResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    
    if (!response.ok) {
      throw new Error(`Ошибка проверки состояния сервера: ${response.status}`);
    }
    
    return await response.json() as HealthCheckResponse;
  } catch (error) {
    console.error('Ошибка при проверке состояния API:', error);
    throw error;
  }
};
