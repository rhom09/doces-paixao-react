import { defineCliConfig } from 'sanity/cli'
import { loadEnv } from 'vite'

// Carrega as variáveis do arquivo .env baseado no diretório atual
const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '')

export default defineCliConfig({
  api: {
    projectId: env.VITE_SANITY_PROJECT_ID,
    dataset: env.VITE_SANITY_DATASET || 'production',
  },
  reactStrictMode: true,
})

