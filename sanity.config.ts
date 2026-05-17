import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import product from './src/schemas/sanity/product'
import testimonial from './src/schemas/sanity/testimonial'
import siteSettings from './src/schemas/sanity/siteSettings'
import about from './src/schemas/sanity/about'
import diferencial from './src/schemas/sanity/diferencial'
import galleryItem from './src/schemas/sanity/galleryItem'
import stat from './src/schemas/sanity/stat'
import productType from './src/schemas/sanity/productType'
import flavor from './src/schemas/sanity/flavor'

export default defineConfig({
  name: 'default',
  title: 'Doces Paixão — Admin',
  basePath: '/admin',

  projectId: 'yi5nhzrm',
  dataset: 'production',

  plugins: [structureTool()],

  schema: {
    types: [product, testimonial, siteSettings, about, diferencial, galleryItem, stat, productType, flavor],
  },
})
