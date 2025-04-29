
/**
 * Основной файл запуска бэкенд-сервера
 */

const app = require('./gigaChatServer');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Сервер GigaChat запущен на порту ${PORT}`);
  console.log(`API доступен по адресу: http://localhost:${PORT}/api`);
  console.log(`Проверить статус сервера: http://localhost:${PORT}/api/health`);
});
