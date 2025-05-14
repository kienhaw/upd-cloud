import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.mjs', '.js', '.jsx'],
    alias: {
      Assets: path.resolve(__dirname, './src/assets/'),
      Atoms: path.resolve(__dirname, './src/app/atoms/'),
      Modules: path.resolve(__dirname, './src/app/modules/'),
      Molecules: path.resolve(__dirname, './src/app/molecules/'),
      Translate: path.resolve(__dirname, './src/translate/'),
      Services: path.resolve(__dirname, './src/services/'),
      Features: path.resolve(__dirname, './src/features/'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@configs': path.resolve(__dirname, 'src/configs'),
      '@atoms': path.resolve(__dirname, 'src/app/atoms/'),
      '@molecules': path.resolve(__dirname, 'src/app/molecules/'),
      '@modules': path.resolve(__dirname, 'src/app/modules/'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@features': path.resolve(__dirname, 'src/features'),
    }
  }
})
