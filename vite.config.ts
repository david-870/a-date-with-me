import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function redirectToDateHtml(): Plugin {
  return {
    name: 'redirect-to-date-html',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/' || req.url === '/index.html') {
          res.writeHead(302, { Location: '/date.html' })
          res.end()
          return
        }
        next()
      })
    },
  }
}

export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/a-date-with-me/' : '/',
  plugins: [react(), tailwindcss(), redirectToDateHtml()],
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'date.html'),
    },
  },
  server: {
    open: '/date.html',
  },
})
