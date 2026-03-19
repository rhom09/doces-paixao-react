import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import product from './src/schemas/sanity/product'
import testimonial from './src/schemas/sanity/testimonial'
import siteSettings from './src/schemas/sanity/siteSettings'

export default defineConfig({
  name: 'default',
  title: 'Doces Paixão — Admin',
  basePath: '/admin',

  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',

  plugins: [structureTool()],

  schema: {
    types: [product, testimonial, siteSettings],
  },
})
