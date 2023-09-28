import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// vite.config.js
export default {
  server: {
    proxy: {
      // Redirige toutes les requêtes qui commencent par /api vers un autre serveur
      '/api': {
        target: 'https://auto-programming-proto.ey.r.appspot.com', // l'URL du serveur API
        changeOrigin: true, // autorise le changement d'origine
        rewrite: (path: string) => path.replace(/^\/api/, '') // retire le préfixe /api du chemin de la requête
      }
    }
  }
}
