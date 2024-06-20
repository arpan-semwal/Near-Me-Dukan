import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

export default defineConfig({
  // eslint-disable-next-line no-undef
  base: process.env.NODE_ENV === 'production' ? process.env.VITE_BASE_URL : '/',
  plugins: [react()],
});
