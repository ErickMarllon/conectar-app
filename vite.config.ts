import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const plugins = [
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
  ];

  if (mode === 'analyze') {
    plugins.push(
      visualizer({
        filename: `dist/bundle-analysis-${mode}.html`,
        open: true,
        gzipSize: true,
      }) as any
    );
  }

  return {
    envDir: './',
    plugins,
    server: {
      port: Number(env.VITE_APP_PORT) || 3000,
      open: true,
      fs: {
        allow: ['..'],
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'charts-vendor': ['react-apexcharts', 'apexcharts'],
            'ui-vendor': ['@mui/material', '@emotion/react'],
          }
        }
      },
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
        'lottie-web': 'lottie-web/build/player/lottie_light.js',
      },
    },
  };
});