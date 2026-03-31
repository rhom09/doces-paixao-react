import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import product from './src/schemas/sanity/product'
import testimonial from './src/schemas/sanity/testimonial'
import siteSettings from './src/schemas/sanity/siteSettings'
import diferencial from './src/schemas/sanity/diferencial'
import galleryItem from './src/schemas/sanity/galleryItem'
import stat from './src/schemas/sanity/stat'

export default defineConfig({
  name: 'default',
  title: 'Doces Paixão — Admin',
  basePath: '/admin',

  projectId: 'yi5nhzrm',
  dataset: 'production',

  plugins: [structureTool()],

  schema: {
    types: [product, testimonial, siteSettings, diferencial, galleryItem, stat],
  },
})
