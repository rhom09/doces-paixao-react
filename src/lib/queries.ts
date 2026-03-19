export const ALL_PRODUCTS_QUERY = `*[_type == "product" && active == true] | order(_createdAt asc) {
  "id": _id,
  name,
  category,
  description,
  price,
  tag,
  "imageUrl": image.asset->url,
  "imageAlt": name
}`

export const PRODUCT_BY_ID_QUERY = `*[_type == "product" && _id == $id][0] {
  "id": _id,
  name,
  category,
  description,
  price,
  tag,
  "imageUrl": image.asset->url,
  "imageAlt": name
}`

export const ALL_TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(rating desc) {
  "id": _id,
  text,
  authorName,
  authorRole,
  "avatarUrl": avatar.asset->url,
  avatar,
  rating
}`

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  phone,
  address,
  email,
  socialLinks
}`
