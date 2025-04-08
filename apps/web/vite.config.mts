import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react-swc'
import { loadEnv } from 'vite';
import tailwindcss from "@tailwindcss/vite";

import pkg from './package.json';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

const setupPlugins = () => ([
  react(),
  tailwindcss()
]);

// https://vitejs.dev/config/
export default defineConfig(({ mode }: { mode: string }) => {
  const root = pathResolve('.');
  const ENV = loadEnv(mode, root) as unknown as ImportMetaEnv;
  return {
    define: {
      _APP_VERSION: JSON.stringify(pkg.version),
      'process.env': {}
    },
    plugins: setupPlugins(),
    resolve: {
      alias: [
        // /@/xxxx => src/xxxx
        {
          find: /@\//,
          replacement: `${root}/src/`
        },
        // /#/xxxx => types/xxxx
        {
          find: /#\//,
          replacement: `${root}/types/`
        }
      ]
    },
    server: {
      port: +ENV.VITE_PORT || 5173,
      proxy: {
        '/api': {
          target: ENV.VITE_API_URL || 'http://localhost:3200',
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
