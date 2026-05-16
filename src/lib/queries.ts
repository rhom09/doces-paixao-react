export const ALL_PRODUCTS_QUERY = `*[_type == "product" && active == true] | order(_createdAt asc) {
  "id": _id,
  name,
  category,
  description,
  price,
  tag,
  image,
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
  image,
  "imageUrl": image.asset->url,
  "imageAlt": name
}`

export const ALL_TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(rating desc) {
  "id": _id,
  text,
  authorName,
  authorRole,
  avatar,
  "avatarUrl": avatar.asset->url,
  rating
}`

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  phone,
  address,
  email,
  socialLinks
}`

export const ALL_DIFERENCIAIS_QUERY = `*[_type == "diferencial"] | order(order asc) {
  "id": _id,
  number,
  icon,
  title,
  description
}`

export const ALL_GALLERY_ITEMS_QUERY = `*[_type == "galleryItem"] | order(order asc) {
  "id": _id,
  image,
  "imageUrl": image.asset->url,
  caption,
  alt,
  span
}`

export const ABOUT_QUERY = `*[_type == "about"][0] {
  label,
  title,
  content,
  image,
  "imageUrl": image.asset->url,
  badgeTitle,
  badgeSubtitle,
  features
}`

export const ALL_STATS_QUERY = `*[_type == "stat"] | order(order asc) {
  "id": _id,
  icon,
  value,
  counterTarget,
  suffix,
  label,
  colorClass
}`
