import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    envDir: './',
    plugins: [react(), tailwindcss(), tsconfigPaths()],

    server: {
      port: Number(env.VITE_APP_PORT) || 3000,
      open: true,
      fs: {
        allow: ['..'],
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@lib': path.resolve(__dirname, 'src/lib'),
        '@assets': path.resolve(__dirname, './public/assets'),
      },
    },
  };
});
