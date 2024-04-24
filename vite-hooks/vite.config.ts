import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import virtual from './plugins/virtual-module';
import requireTransform from 'vite-plugin-require-transform';
import svgr from './plugins/svgr';
import inspect from 'vite-plugin-inspect';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    virtual(),
    requireTransform({}),
    svgr({}),
    inspect(),
    legacy({
      targets: ['ie >= 11'],
    }),
  ],
});
