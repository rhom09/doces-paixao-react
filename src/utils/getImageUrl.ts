import { urlFor } from '@/lib/sanity'
import type { Product, Testimonial, GalleryItem } from '@/types'

/**
 * Gets the correct URL for a product image, 
 * handling both Sanity objects and static URL strings.
 */
export function getProductImageUrl(product: Product): string {
  if (product.image?.asset) {
    try {
      return urlFor(product.image).width(600).url()
    } catch (e) {
      console.warn('Error generating Sanity URL for product:', product.name, e)
    }
  }
  
  if (product.imageUrl) {
    return product.imageUrl
  }

  // Fallback to high-res brand icon
  return '/icons/DocesPaixao512.png'
}

/**
 * Gets the correct URL for a testimonial avatar,
 * handling both Sanity objects and static URL strings.
 */
export function getAvatarUrl(testimonial: Testimonial): string {
  if (testimonial.avatar?.asset) {
    try {
      return urlFor(testimonial.avatar).width(100).height(100).url()
    } catch (e) {
      console.warn('Error generating Sanity URL for avatar:', testimonial.authorName, e)
    }
  }

  if (testimonial.avatarUrl) {
    return testimonial.avatarUrl
  }

  // Fallback to a neutral user icon or brand icon
  return '/icons/DocesPaixao192.png'
}

/**
 * Gets the correct URL for a gallery image,
 * handling both Sanity objects and static URL strings.
 */
export function getGalleryImageUrl(item: GalleryItem): string {
  // Check if item has a Sanity image object (from some older schemas or unified approach)
  // or if the imageUrl itself was fetched as a direct asset url via GROQ.
  // In our case, the query fetches image.asset->url as imageUrl.
  
  if (item.imageUrl) {
    return item.imageUrl
  }

  // Fallback
  return '/icons/DocesPaixao512.png'
}
