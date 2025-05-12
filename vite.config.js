import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Стандартний порт Vite
    open: true,  // Відкривати браузер автоматично
  },
  resolve: {
    alias: {
      '@': '/src', // Для зручних імпортів (наприклад, `@/components/Header`)
    },
  },
});