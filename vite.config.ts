import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    envDir: './',
    plugins: [
      react(),
      tailwindcss(),
      tsconfigPaths(),
      svgr({
        svgrOptions: {
          icon: true,
          prettier: false,
          svgo: true,
          svgoConfig: {
            plugins: [
              {
                name: 'removeViewBox',
                active: false,
              },
            ],
          },
        },
      }),
    ],
    server: {
      port: Number(env.VITE_APP_PORT) || 3000,
      open: true,
      fs: {
        allow: ['..'],
      },
    },
    build: {
      chunkSizeWarningLimit: 2000,
      outDir: 'dist',
      assetsInclude: ['**/*.json'],
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@lib': path.resolve(__dirname, 'src/lib'),
        '@assets': path.resolve(__dirname, './public/assets'),
      },
    },
  };
});
