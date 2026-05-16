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
  if (item.image?.asset) {
    try {
      // Optimize gallery images to be max 800px wide for balance of quality/perf
      return urlFor(item.image).width(800).auto('format').url()
    } catch (e) {
      console.warn('Error generating Sanity URL for gallery item:', item.id, e)
    }
  }

  if (item.imageUrl) {
    return item.imageUrl
  }

  // Fallback
  return '/icons/DocesPaixao512.png'
}
